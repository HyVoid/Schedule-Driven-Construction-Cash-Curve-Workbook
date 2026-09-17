import {
  ConfigData,
  ProjectMeta,
  BidItem,
  CalculatedBidItem,
  TimelinePeriod,
  EngineOutput,
  RowValidationStatus,
} from '../types';

// Helper to parse date string YYYY-MM-DD safely without timezone surprises
export function parseDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.trim().split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  const date = new Date(Date.UTC(y, m, d));
  return isNaN(date.getTime()) ? null : date;
}

export function formatDateUTC(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = parseDate(dateStr);
  if (!d) return dateStr;
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${m}/${day}`;
}

export function formatCurrency(val: number, currency = '$'): string {
  if (isNaN(val)) return `${currency}0.00`;
  const formatted = Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return val < 0 ? `-${currency}${formatted}` : `${currency}${formatted}`;
}

export function formatPercent(val: number, decimals = 2): string {
  if (isNaN(val)) return '0.00%';
  return `${(val * 100).toFixed(decimals)}%`;
}

// Row-level validation guard
export function validateRow(item: BidItem): {
  status: RowValidationStatus;
  message: string;
} {
  if (!item.code || !item.code.trim()) {
    return { status: 'missing_code', message: 'Item code is required' };
  }
  if (!item.description || !item.description.trim()) {
    return { status: 'missing_desc', message: 'Description is required' };
  }
  if (isNaN(item.amount) || item.amount <= 0) {
    return { status: 'invalid_amount', message: 'Amount must be > 0' };
  }
  const s = parseDate(item.startDate);
  const e = parseDate(item.completionDate);
  if (!s || !e) {
    return { status: 'missing_dates', message: 'Start and finish dates required' };
  }
  if (e.getTime() < s.getTime()) {
    return { status: 'reversed_dates', message: 'Completion date before start date' };
  }
  return { status: 'valid', message: 'Valid' };
}

// Calculate duration in calendar days
export function calcDurationDays(startDate: string, completionDate: string): number {
  const s = parseDate(startDate);
  const e = parseDate(completionDate);
  if (!s || !e || e.getTime() < s.getTime()) return 0;
  const diffMs = e.getTime() - s.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

// Run complete calculation engine
export function runCalculationEngine(
  config: ConfigData,
  metadata: ProjectMeta,
  items: BidItem[]
): EngineOutput {
  // 1. Calculate row validations & durations
  const totalRawAmount = items.reduce((sum, item) => {
    return isNaN(item.amount) || item.amount <= 0 ? sum : sum + item.amount;
  }, 0);

  const calculatedItems: CalculatedBidItem[] = items.map((item) => {
    const val = validateRow(item);
    const duration = val.status === 'valid' ? calcDurationDays(item.startDate, item.completionDate) : 0;
    
    // Effective Weight Pct: use manual weight if set, otherwise amount / totalRawAmount
    let effWeight = 0;
    if (item.manualWeightPct !== null && item.manualWeightPct !== undefined && !isNaN(item.manualWeightPct)) {
      effWeight = item.manualWeightPct / 100;
    } else if (totalRawAmount > 0 && item.amount > 0) {
      effWeight = item.amount / totalRawAmount;
    }

    return {
      ...item,
      durationDays: duration,
      effectiveWeightPct: effWeight,
      validationStatus: val.status,
      validationMessage: val.message,
      activePeriodsCount: 0, // will compute after periods generated
    };
  });

  // Valid items for date range & allocation
  const validItems = calculatedItems.filter((it) => it.validationStatus === 'valid');

  // If no valid items, return clean empty output
  if (validItems.length === 0) {
    const todayStr = formatDateUTC(new Date());
    return {
      minStart: todayStr,
      maxFinish: todayStr,
      totalPeriods: 1,
      currentPeriodIndex: 1,
      periods: [
        {
          index: 1,
          label: config.timeScale === 'Weekly' ? 'Week 1' : 'Month 1',
          startDate: todayStr,
          endDate: todayStr,
          dateRangeLabel: `${todayStr} ~ ${todayStr}`,
          isCurrentDataDate: true,
        },
      ],
      calculatedItems,
      itemAllocations: {},
      periodPlannedValues: [0],
      periodPlannedWeights: [0],
      cumulativePlannedValues: [0],
      cumulativeProgressPcts: [0],
      audit: {
        bidTotal: 0,
        engineTotal: 0,
        varianceAmount: 0,
        finalProgressPct: 0,
        isPassed: true,
        statusText: 'PASS',
      },
      kpi: {
        totalContractValue: 0,
        projectDurationDays: 0,
        projectDurationPeriods: 1,
        peakPeriodValue: 0,
        peakPeriodIndex: 1,
        peakPeriodLabel: config.timeScale === 'Weekly' ? 'Week 1' : 'Month 1',
      },
    };
  }

  // Find minStart & maxFinish
  let minStartTime = Infinity;
  let maxFinishTime = -Infinity;

  validItems.forEach((it) => {
    const s = parseDate(it.startDate)!.getTime();
    const e = parseDate(it.completionDate)!.getTime();
    if (s < minStartTime) minStartTime = s;
    if (e > maxFinishTime) maxFinishTime = e;
  });

  const minStartDate = new Date(minStartTime);
  const maxFinishDate = new Date(maxFinishTime);
  const minStartStr = formatDateUTC(minStartDate);
  const maxFinishStr = formatDateUTC(maxFinishDate);

  // 2. Generate Timeline Periods
  const periods: TimelinePeriod[] = [];
  const scheduleDataDateObj = parseDate(metadata.scheduleDataDate);
  const scheduleDataDateTime = scheduleDataDateObj ? scheduleDataDateObj.getTime() : minStartTime;

  if (config.timeScale === 'Weekly') {
    let currStart = new Date(minStartTime);
    let pIdx = 1;
    while (currStart.getTime() <= maxFinishTime || periods.length === 0) {
      const currEnd = new Date(currStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      const sStr = formatDateUTC(currStart);
      const eStr = formatDateUTC(currEnd);
      const isCurrent =
        scheduleDataDateTime >= currStart.getTime() && scheduleDataDateTime <= currEnd.getTime();

      periods.push({
        index: pIdx,
        label: `Week ${pIdx}`,
        startDate: sStr,
        endDate: eStr,
        dateRangeLabel: `${formatShortDate(sStr)} - ${formatShortDate(eStr)}`,
        isCurrentDataDate: isCurrent,
      });

      currStart = new Date(currStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      pIdx++;
      // safety limit
      if (pIdx > 500) break;
    }
  } else {
    // Monthly
    const startYear = minStartDate.getUTCFullYear();
    const startMonth = minStartDate.getUTCMonth();
    const endYear = maxFinishDate.getUTCFullYear();
    const endMonth = maxFinishDate.getUTCMonth();
    const totalMonths = Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);

    for (let i = 0; i < totalMonths; i++) {
      const currYear = startYear + Math.floor((startMonth + i) / 12);
      const currMonth = (startMonth + i) % 12;
      const mStart = new Date(Date.UTC(currYear, currMonth, 1));
      // Last day of month
      const mEnd = new Date(Date.UTC(currYear, currMonth + 1, 0));
      const sStr = formatDateUTC(mStart);
      const eStr = formatDateUTC(mEnd);
      const isCurrent =
        scheduleDataDateTime >= mStart.getTime() && scheduleDataDateTime <= mEnd.getTime();

      periods.push({
        index: i + 1,
        label: `Month ${i + 1}`,
        startDate: sStr,
        endDate: eStr,
        dateRangeLabel: `${sStr.substring(0, 7)}`,
        isCurrentDataDate: isCurrent,
      });
    }
  }

  // Fallback if current period not matched
  let currentPeriodIndex = periods.findIndex((p) => p.isCurrentDataDate) + 1;
  if (currentPeriodIndex === 0) {
    if (scheduleDataDateTime < minStartTime) currentPeriodIndex = 1;
    else currentPeriodIndex = periods.length;
  }

  // 3. Calculate active periods count and discrete 2D allocations
  const totalPeriods = periods.length;
  const itemAllocations: { [itemId: string]: number[] } = {};

  calculatedItems.forEach((item) => {
    itemAllocations[item.id] = new Array(totalPeriods).fill(0);
    if (item.validationStatus !== 'valid') {
      item.activePeriodsCount = 0;
      return;
    }

    const itemStartMs = parseDate(item.startDate)!.getTime();
    const itemEndMs = parseDate(item.completionDate)!.getTime();

    // Check which periods overlap: period.end >= item.start && period.start <= item.end
    const activePeriodIndices: number[] = [];
    let completionPeriodIndex = -1;

    periods.forEach((p, idx) => {
      const pStartMs = parseDate(p.startDate)!.getTime();
      const pEndMs = parseDate(p.endDate)!.getTime();
      const isActive = pEndMs >= itemStartMs && pStartMs <= itemEndMs;
      if (isActive) {
        activePeriodIndices.push(idx);
      }
      if (itemEndMs >= pStartMs && itemEndMs <= pEndMs) {
        completionPeriodIndex = idx;
      }
    });

    item.activePeriodsCount = Math.max(1, activePeriodIndices.length);

    if (config.allocRule === 1) {
      // Linear pro-rata across active periods
      const perPeriodVal = item.amount / item.activePeriodsCount;
      activePeriodIndices.forEach((pIdx) => {
        itemAllocations[item.id][pIdx] = perPeriodVal;
      });
    } else {
      // Milestone lump-sum at completion period
      const targetIdx = completionPeriodIndex !== -1 ? completionPeriodIndex : activePeriodIndices[activePeriodIndices.length - 1] ?? 0;
      itemAllocations[item.id][targetIdx] = item.amount;
    }
  });

  // 4. Vertical Totals (Period_Total_Planned_Value)
  const periodPlannedValues: number[] = new Array(totalPeriods).fill(0);
  for (let c = 0; c < totalPeriods; c++) {
    let colSum = 0;
    validItems.forEach((item) => {
      colSum += itemAllocations[item.id]?.[c] || 0;
    });
    periodPlannedValues[c] = colSum;
  }

  // 5. Cumulative Sums & Weights
  const bidTotal = validItems.reduce((sum, it) => sum + it.amount, 0);
  const periodPlannedWeights: number[] = [];
  const cumulativePlannedValues: number[] = [];
  const cumulativeProgressPcts: number[] = [];

  let runningSum = 0;
  for (let c = 0; c < totalPeriods; c++) {
    const val = periodPlannedValues[c];
    runningSum += val;
    cumulativePlannedValues.push(runningSum);

    const weight = bidTotal > 0 ? val / bidTotal : 0;
    periodPlannedWeights.push(weight);

    const progressPct = bidTotal > 0 ? runningSum / bidTotal : 0;
    cumulativeProgressPcts.push(progressPct);
  }

  // 6. Audit Assertions
  const engineTotal = periodPlannedValues.reduce((a, b) => a + b, 0);
  const varianceAmount = Math.abs(bidTotal - engineTotal);
  const finalProgressPct = cumulativeProgressPcts[totalPeriods - 1] || 0;

  const isBalanced = varianceAmount <= config.roundTolerance;
  const isConverged = Math.abs(finalProgressPct - 1.0) <= 0.0001;
  const isPassed = isBalanced && isConverged;

  // 7. Executive KPIs
  let peakVal = 0;
  let peakIdx = 0;
  periodPlannedValues.forEach((v, idx) => {
    if (v > peakVal) {
      peakVal = v;
      peakIdx = idx;
    }
  });

  const projectDurationDays = calcDurationDays(minStartStr, maxFinishStr);

  return {
    minStart: minStartStr,
    maxFinish: maxFinishStr,
    totalPeriods,
    currentPeriodIndex,
    periods,
    calculatedItems,
    itemAllocations,
    periodPlannedValues,
    periodPlannedWeights,
    cumulativePlannedValues,
    cumulativeProgressPcts,
    audit: {
      bidTotal,
      engineTotal,
      varianceAmount,
      finalProgressPct,
      isPassed,
      statusText: isPassed ? 'PASS' : 'ERR',
    },
    kpi: {
      totalContractValue: bidTotal,
      projectDurationDays,
      projectDurationPeriods: totalPeriods,
      peakPeriodValue: peakVal,
      peakPeriodIndex: peakIdx + 1,
      peakPeriodLabel: periods[peakIdx]?.label || `Period ${peakIdx + 1}`,
    },
  };
}
