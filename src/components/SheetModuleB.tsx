import React, { useState } from 'react';
import { EngineOutput, ConfigData, ProjectMeta } from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  PieChart,
  Lightbulb,
  ArrowUpRight,
  Maximize2,
} from 'lucide-react';

interface SheetModuleBProps {
  engine: EngineOutput;
  config: ConfigData;
  metadata: ProjectMeta;
}

export const SheetModuleB: React.FC<SheetModuleBProps> = ({ engine, config, metadata }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const periods = engine.periods;
  const periodVals: number[] = engine.periodPlannedValues;
  const cumVals = engine.cumulativePlannedValues;
  const cumPcts = engine.cumulativeProgressPcts;
  const maxPeriodVal = Math.max(...periodVals, 1);
  const totalVal = engine.audit.bidTotal || 1;

  // Chart layout constants
  const chartHeight = 280;
  const chartWidth = 900;
  const padLeft = 70;
  const padRight = 60;
  const padTop = 30;
  const padBottom = 40;
  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;

  const n = periods.length;
  const barStep = n > 0 ? innerWidth / n : 0;
  const barWidth = Math.max(8, barStep * 0.55);

  // SVG S-Curve Path generator
  const sCurvePoints = periods.map((p, i) => {
    const x = padLeft + i * barStep + barStep / 2;
    const pct = cumPcts[i] || 0;
    const y = padTop + innerHeight - pct * innerHeight;
    return { x, y, pct, val: cumVals[i], period: p };
  });

  const pathD = sCurvePoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = sCurvePoints[i - 1];
    // Smooth bezier curve control points
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '');

  // Tooltip item
  const activeTooltip =
    hoveredIdx !== null && periods[hoveredIdx]
      ? {
          period: periods[hoveredIdx],
          val: periodVals[hoveredIdx],
          cumVal: cumVals[hoveredIdx],
          cumPct: cumPcts[hoveredIdx],
          weight: engine.periodPlannedWeights[hoveredIdx],
        }
      : null;

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              FINANCIAL DECISION LAYER (04_MODULE_B)
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              Executive Cash Flow & S-Curve Dashboard
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Construction Cash Curve & Liquidity Analytics
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-3xl">
            Synthesizes discrete scheduled values into executive financial cash flow demands, peak working capital requirements, 
            and cumulative capital curve (S-Curve) dynamics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
          <span>Allocation: </span>
          <strong className="text-[var(--color-primary)] font-semibold">
            {config.allocRule === 1 ? 'Linear Pro-Rata' : 'Milestone Lump-Sum'}
          </strong>
        </div>
      </div>

      {/* A Zone: Management Core Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Contract Total Value */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              TOTAL CONTRACT REVENUE
            </span>
            <span className="p-1 rounded bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)]">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            {formatCurrency(engine.kpi.totalContractValue, config.currency)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Total as-bid contractual baseline sum across all milestones.
          </p>
        </div>

        {/* KPI 2: Total Duration */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              PLANNED PROJECT DURATION
            </span>
            <span className="p-1 rounded bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)]">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            {engine.totalPeriods} {config.timeScale}s
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            {engine.kpi.projectDurationDays} natural calendar days from start to finish.
          </p>
        </div>

        {/* KPI 3: Peak Cash Requirement */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              PEAK PERIOD CASH DEMAND
            </span>
            <span className="p-1 rounded bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-mono text-[10px] font-bold">
              {engine.kpi.peakPeriodLabel}
            </span>
          </div>
          <div className="font-heading text-3xl font-bold text-[var(--color-accent)] tracking-display">
            {formatCurrency(engine.kpi.peakPeriodValue, config.currency)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Maximum single-period cash burn point (Period {engine.kpi.peakPeriodIndex}).
          </p>
        </div>

        {/* KPI 4: Curve Audit Health Badge */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              CURVE MATHEMATICAL INTEGRITY
            </span>
            <span className="p-1 rounded bg-[rgba(0,200,83,0.1)] text-[#008738]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="font-heading text-2xl font-bold text-[#008738] tracking-display">
            {engine.audit.isPassed ? '100% CONVERGED' : 'NEEDS AUDIT'}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Variance: {formatCurrency(engine.audit.varianceAmount, config.currency)} (Conservation Pass).
          </p>
        </div>
      </div>

      {/* B Zone: Interactive Financial S-Curve Combo Visualizer */}
      <div className="card-lift p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
              <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">
                Time-Phased Cash Flow & Cumulative S-Curve Visualizer
              </h2>
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Dual-axis interactive analytics: Bar series represents periodic planned cash burn; continuous spline represents cumulative progress S-Curve.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3 bg-[var(--color-accent)] rounded-xs" />
              <span className="text-[var(--color-primary)] font-medium">Period Planned Value ({config.currency})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[var(--color-primary)]" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] ring-2 ring-[var(--color-primary)]" />
              <span className="text-[var(--color-primary)] font-medium">Cumulative Progress %</span>
            </div>
          </div>
        </div>

        {/* SVG Combo Chart Container */}
        <div className="relative overflow-x-auto">
          <div className="min-w-[750px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Background horizontal grid lines (0%, 25%, 50%, 75%, 100%) */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((level, idx) => {
                const y = padTop + innerHeight - level * innerHeight;
                const dollarVal = level * maxPeriodVal;
                return (
                  <g key={`grid-${idx}`}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={padLeft + innerWidth}
                      y2={y}
                      stroke="rgba(5, 28, 44, 0.07)"
                      strokeDasharray={idx === 0 || idx === 4 ? '' : '3 3'}
                    />
                    {/* Primary Left Axis Labels: Dollars */}
                    <text
                      x={padLeft - 10}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-[var(--color-muted)] font-mono text-[10px]"
                    >
                      {formatCurrency(dollarVal, config.currency)}
                    </text>
                    {/* Secondary Right Axis Labels: Percentages */}
                    <text
                      x={padLeft + innerWidth + 10}
                      y={y + 3}
                      textAnchor="start"
                      className="fill-[var(--color-accent)] font-mono text-[10px] font-bold"
                    >
                      {(level * 100).toFixed(0)}%
                    </text>
                  </g>
                );
              })}

              {/* Clustered Columns (Bars for Periodic Cash Flow) */}
              {periods.map((p, idx) => {
                const val = periodVals[idx] || 0;
                const barHeight = (val / maxPeriodVal) * innerHeight;
                const x = padLeft + idx * barStep + (barStep - barWidth) / 2;
                const y = padTop + innerHeight - barHeight;
                const isHovered = hoveredIdx === idx;
                const isPeak = idx + 1 === engine.kpi.peakPeriodIndex;

                return (
                  <g
                    key={`bar-g-${idx}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="cursor-pointer transition-opacity"
                  >
                    {/* Bar Background Track (10% opacity) */}
                    <rect
                      x={x}
                      y={padTop}
                      width={barWidth}
                      height={innerHeight}
                      fill="rgba(5, 28, 44, 0.03)"
                      rx={2}
                    />

                    {/* Active Bar Fill (Accent #2251FF) */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(0, barHeight)}
                      fill={isHovered ? '#1539cc' : 'var(--color-accent)'}
                      opacity={isHovered ? 1 : 0.88}
                      rx={2}
                      className="transition-all duration-150"
                    />

                    {/* Peak badge indicator on bar top */}
                    {isPeak && (
                      <circle
                        cx={x + barWidth / 2}
                        cy={y - 6}
                        r={3}
                        fill="var(--color-accent)"
                      />
                    )}

                    {/* X Axis Period Label */}
                    <text
                      x={x + barWidth / 2}
                      y={padTop + innerHeight + 18}
                      textAnchor="middle"
                      className={`font-mono text-[9px] ${
                        isHovered
                          ? 'fill-[var(--color-primary)] font-bold'
                          : 'fill-[var(--color-muted)]'
                      }`}
                    >
                      {p.label.replace('Week ', 'W').replace('Month ', 'M')}
                    </text>
                  </g>
                );
              })}

              {/* Smooth S-Curve Line */}
              <path
                d={pathD}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* S-Curve Data Points (Dots) */}
              {sCurvePoints.map((pt, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <g
                    key={`dot-${idx}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 3.5}
                      fill={isHovered ? 'var(--color-primary)' : '#FFFFFF'}
                      stroke="var(--color-accent)"
                      strokeWidth={2}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}

              {/* Hover Indicator Vertical Line */}
              {hoveredIdx !== null && (
                <line
                  x1={padLeft + hoveredIdx * barStep + barStep / 2}
                  y1={padTop}
                  x2={padLeft + hoveredIdx * barStep + barStep / 2}
                  y2={padTop + innerHeight}
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  opacity={0.6}
                  pointerEvents="none"
                />
              )}
            </svg>
          </div>

          {/* Interactive Floating Tooltip Card */}
          {activeTooltip && (
            <div className="mt-3 p-3.5 rounded-lg bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[var(--color-primary)] text-white font-bold text-[11px]">
                  {activeTooltip.period.label}
                </span>
                <span className="text-[var(--color-muted)]">
                  Dates: <strong>{activeTooltip.period.startDate} &rarr; {activeTooltip.period.endDate}</strong>
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-label text-[var(--color-muted)] block">
                    PERIOD PLANNED VALUE
                  </span>
                  <span className="font-bold text-[var(--color-primary)] text-sm">
                    {formatCurrency(activeTooltip.val, config.currency)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-label text-[var(--color-muted)] block">
                    CUMULATIVE PLANNED VALUE
                  </span>
                  <span className="font-bold text-[var(--color-primary)] text-sm">
                    {formatCurrency(activeTooltip.cumVal, config.currency)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-label text-[var(--color-muted)] block">
                    S-CURVE PROGRESS
                  </span>
                  <span className="font-bold text-[var(--color-accent)] text-sm">
                    {formatPercent(activeTooltip.cumPct)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* C Zone: Standard Vertical Timetable Report Table */}
      <div className="card-lift overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-base font-bold text-[var(--color-primary)]">
              Executive Vertical Cash Flow & Progress Ledger
            </h3>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Standardized vertical transpose of calculation tensor for mobile readability, audit trails, and executive briefing.
            </p>
          </div>
          <span className="text-xs text-[var(--color-muted)]">
            Total {periods.length} scheduled periods
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="table-vertical-schedule">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)]">
                <th className="py-3 px-5 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-28">
                  Period Label
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-48">
                  Calendar Window
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-44">
                  Planned Period Value
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase min-w-[180px]">
                  Relative Burn Proportion (Data Bar)
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-44">
                  Cumulative Value
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-36">
                  S-Curve %
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-center w-28">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {periods.map((p, idx) => {
                const val = periodVals[idx] || 0;
                const cumVal = cumVals[idx] || 0;
                const cumPct = cumPcts[idx] || 0;
                const ratio = Math.min(100, Math.round((val / maxPeriodVal) * 100));
                const isPeak = idx + 1 === engine.kpi.peakPeriodIndex;
                const isCurrentDataDate = p.isCurrentDataDate;

                return (
                  <tr
                    key={`row-vert-${p.index}`}
                    className={`hover:bg-[rgba(34,81,255,0.02)] transition-colors ${
                      isCurrentDataDate
                        ? 'bg-[rgba(34,81,255,0.04)] font-medium'
                        : idx % 2 === 1
                        ? 'bg-[rgba(5,28,44,0.01)]'
                        : 'bg-white'
                    }`}
                  >
                    {/* Period Label */}
                    <td className="py-3 px-5 font-mono font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                      <span>{p.label}</span>
                      {isPeak && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-[rgba(34,81,255,0.1)] text-[var(--color-accent)] font-bold">
                          PEAK
                        </span>
                      )}
                      {isCurrentDataDate && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-[rgba(5,28,44,0.1)] text-[var(--color-primary)] font-bold">
                          DATA
                        </span>
                      )}
                    </td>

                    {/* Date Window */}
                    <td className="py-3 px-4 font-mono text-[11px] text-[var(--color-muted)]">
                      {p.startDate} &sim; {p.endDate}
                    </td>

                    {/* Planned Value */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-[var(--color-primary)]">
                      {formatCurrency(val, config.currency)}
                    </td>

                    {/* Inline Data Bar (Accent #2251FF fill, track 10% opacity) */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[rgba(5,28,44,0.1)] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300"
                            style={{ width: `${ratio}%` }}
                          />
                        </div>
                        <span className="w-9 text-right font-mono text-[11px] text-[var(--color-muted)]">
                          {ratio}%
                        </span>
                      </div>
                    </td>

                    {/* Cumulative Value */}
                    <td className="py-3 px-4 text-right font-mono font-semibold text-[var(--color-primary)]">
                      {formatCurrency(cumVal, config.currency)}
                    </td>

                    {/* Cumulative Progress % */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-[var(--color-accent)]">
                      {formatPercent(cumPct)}
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-80" />
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Total Footer */}
            <tfoot>
              <tr className="bg-[var(--table-header-bg)] border-t-2 border-[var(--color-primary)] font-bold text-xs text-[var(--color-primary)]">
                <td className="py-3.5 px-5 uppercase tracking-label font-bold" colSpan={2}>
                  TOTAL PROJECT SCHEDULED HARVEST
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-[var(--color-primary)]">
                  {formatCurrency(totalVal, config.currency)}
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  100% Absorbed Allocation
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-[var(--color-primary)]">
                  {formatCurrency(totalVal, config.currency)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-[var(--color-accent)]">
                  100.00%
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#008738]">
                    CONVERGED
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Strategic Liquidity & Cash Flow Insights Block */}
      <div className="insight-block p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-label text-[var(--color-accent)]">
              EXECUTIVE TREASURY & LIQUIDITY MANAGEMENT BRIEFING
            </h4>
            <p className="text-xs text-[var(--color-body-text)] leading-relaxed">
              Peak cash burn of <strong>{formatCurrency(engine.kpi.peakPeriodValue, config.currency)}</strong> occurs during{' '}
              <strong>{engine.kpi.peakPeriodLabel}</strong>, coinciding with intensive base and intermediate paving activities. 
              Treasury officers should arrange material supplier lines of credit and coordinate invoice requisition submissions with the DOT resident engineer 
              at least 14 days prior to Week {engine.kpi.peakPeriodIndex} to avoid bridge financing charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
