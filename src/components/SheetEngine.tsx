import React, { useState } from 'react';
import { EngineOutput, ConfigData, ProjectMeta } from '../types';
import { formatCurrency, formatPercent, formatShortDate } from '../utils/engine';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';

interface SheetEngineProps {
  engine: EngineOutput;
  config: ConfigData;
  metadata: ProjectMeta;
}

export const SheetEngine: React.FC<SheetEngineProps> = ({ engine, config, metadata }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number | null>(null);

  const filteredItems = engine.calculatedItems.filter(
    (it) =>
      it.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      it.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              CALCULATION LAYER (02_ENGINE)
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              Single Source of Truth (SSOT)
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Unified Time-Phased Allocation Engine
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-3xl">
            Central computational matrix executing date discretizations, time-phased allocation, 
            and continuous four-tier financial conservation audits.
          </p>
        </div>

        {/* Global Master Status Badge */}
        <div>
          {engine.audit.isPassed ? (
            <div
              id="engine-audit-card-pass"
              className="p-3.5 rounded-xl bg-[rgba(0,200,83,0.08)] border border-[rgba(0,200,83,0.3)] shadow-sm flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-[#00C853] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-label text-[#008738]">
                  SYSTEM CONSERVATION CHECK
                </div>
                <div className="text-sm font-bold text-[#008738] flex items-center gap-1.5">
                  <span>AUDIT PASS</span>
                  <span className="text-xs font-normal text-[#008738]/80">
                    (&Delta; {formatCurrency(engine.audit.varianceAmount, config.currency)}, 100.00% converge)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="engine-audit-card-fail"
              className="p-3.5 rounded-xl bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.3)] shadow-sm flex items-center gap-3"
            >
              <AlertCircle className="w-6 h-6 text-[var(--color-negative)] shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-label text-[var(--color-negative)]">
                  SYSTEM CONSERVATION CHECK
                </div>
                <div className="text-sm font-bold text-[var(--color-negative)]">
                  AUDIT FAILED - CHECK REQUIRED
                </div>
                <div className="text-xs text-[var(--color-negative)]/90">
                  Variance: {formatCurrency(engine.audit.varianceAmount, config.currency)} (limit: {formatCurrency(config.roundTolerance, config.currency)})
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Console & Audit Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Check 1: Bid Total */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              Check 1: As-Bid Total
            </span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              &sum;('01_INPUT'!Amount)
            </span>
          </div>
          <div className="font-heading text-2xl font-bold text-[var(--color-primary)] tracking-display">
            {formatCurrency(engine.audit.bidTotal, config.currency)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Total contractual value across {engine.calculatedItems.length} bid items.
          </p>
        </div>

        {/* Check 2: Engine Total */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              Check 2: Engine Discretized Total
            </span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              &sum;('02_ENGINE'!Periods)
            </span>
          </div>
          <div className="font-heading text-2xl font-bold text-[var(--color-primary)] tracking-display">
            {formatCurrency(engine.audit.engineTotal, config.currency)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Total value allocated across {engine.totalPeriods} {config.timeScale.toLowerCase()} periods.
          </p>
        </div>

        {/* Check 3: Variance Amount */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              Check 3: Balance Variance
            </span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              |Bid - Engine|
            </span>
          </div>
          <div
            className={`font-heading text-2xl font-bold tracking-display ${
              engine.audit.varianceAmount <= config.roundTolerance
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-negative)]'
            }`}
          >
            {formatCurrency(engine.audit.varianceAmount, config.currency)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Tolerance threshold: &le; {formatCurrency(config.roundTolerance, config.currency)}
          </p>
        </div>

        {/* Check 4: Convergence Pct */}
        <div className="card-lift p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              Check 4: Final S-Convergence
            </span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              Final Cum. %
            </span>
          </div>
          <div
            className={`font-heading text-2xl font-bold tracking-display ${
              Math.abs(engine.audit.finalProgressPct - 1.0) <= 0.0001
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-negative)]'
            }`}
          >
            {formatPercent(engine.audit.finalProgressPct)}
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Required convergence: Exactly 100.00%
          </p>
        </div>
      </div>

      {/* Timeline Meta Summary Bar */}
      <div className="p-4 rounded-xl bg-[var(--color-surface)] shadow-xs border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-label font-bold text-[var(--color-muted)] block">
              Project Timeline Horizon
            </span>
            <span className="font-mono font-semibold text-[var(--color-primary)]">
              {engine.minStart} &rarr; {engine.maxFinish} ({engine.kpi.projectDurationDays} calendar days)
            </span>
          </div>

          <div className="h-6 w-px bg-[var(--color-border)]" />

          <div>
            <span className="text-[10px] uppercase tracking-label font-bold text-[var(--color-muted)] block">
              Discretized Periods
            </span>
            <span className="font-mono font-semibold text-[var(--color-primary)]">
              {engine.totalPeriods} {config.timeScale} increments
            </span>
          </div>

          <div className="h-6 w-px bg-[var(--color-border)]" />

          <div>
            <span className="text-[10px] uppercase tracking-label font-bold text-[var(--color-muted)] block">
              Current Schedule Data Date
            </span>
            <span className="font-mono font-semibold text-[var(--color-accent)]">
              {metadata.scheduleDataDate} (Period {engine.currentPeriodIndex})
            </span>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--color-muted)]" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search items in matrix..."
            className="w-full pl-8 pr-3 py-1.5 bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] rounded-md text-xs text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* 2D Time-Phased Allocation Matrix */}
      <div className="card-lift overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">
              Horizontal Time-Phased Allocation Matrix (2D Tensor)
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Horizontal timeline showing period-by-period value allocation V[i, t] based on{' '}
              {config.allocRule === 1 ? 'Linear Pro-Rata (Rule 1)' : 'Milestone Lump-Sum (Rule 2)'}.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-muted)]">
            Scroll horizontally &rarr;
          </span>
        </div>

        <div className="overflow-x-auto max-h-[700px]">
          <table className="w-full text-left border-collapse" id="table-engine-matrix">
            <thead>
              {/* Row 1: Period Index */}
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] sticky top-0 z-20">
                <th className="py-2.5 px-3 text-[11px] font-bold text-[var(--color-primary)] tracking-label uppercase sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30 min-w-[280px]" colSpan={3}>
                  PROJECT PERIOD INDEX (Timeline_Period_Index)
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-[var(--color-primary)] tracking-label uppercase text-center min-w-[90px]">
                  Act. Wks
                </th>
                {engine.periods.map((p) => {
                  const isCurrent = p.index === engine.currentPeriodIndex;
                  return (
                    <th
                      key={`hdr-idx-${p.index}`}
                      className={`py-2 px-3 text-center text-xs font-mono font-bold min-w-[110px] border-l border-[var(--table-header-sep)] ${
                        isCurrent
                          ? 'bg-[rgba(34,81,255,0.1)] text-[var(--color-accent)] font-extrabold'
                          : 'text-[var(--color-primary)]'
                      }`}
                    >
                      {p.label}
                      {isCurrent && (
                        <span className="block text-[9px] uppercase tracking-tight text-[var(--color-accent)]">
                          [Data Date]
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>

              {/* Row 2: Period Date Range */}
              <tr className="bg-[rgba(5,28,44,0.02)] border-b border-[var(--color-border)] sticky top-[37px] z-20">
                <th className="py-2 px-3 text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-label sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  PERIOD DATE WINDOW (Start ~ End)
                </th>
                <th className="py-2 px-3 text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-label text-center">
                  -
                </th>
                {engine.periods.map((p) => (
                  <th
                    key={`hdr-date-${p.index}`}
                    className="py-2 px-2 text-center text-[10px] font-mono font-medium text-[var(--color-muted)] border-l border-[var(--color-border)]"
                  >
                    {p.dateRangeLabel}
                  </th>
                ))}
              </tr>

              {/* Row 3: Period Total Planned Value */}
              <tr className="bg-[rgba(34,81,255,0.03)] border-b border-[var(--color-border)] sticky top-[69px] z-20">
                <th className="py-2.5 px-3 font-bold text-xs text-[var(--color-primary)] sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  PERIOD TOTAL PLANNED VALUE (&sum; Col)
                </th>
                <th className="py-2.5 px-3 text-center text-xs font-mono font-bold text-[var(--color-primary)]">
                  -
                </th>
                {engine.periodPlannedValues.map((val, idx) => {
                  const maxVal = engine.kpi.peakPeriodValue || 1;
                  const ratio = Math.min(100, Math.round((val / maxVal) * 100));
                  return (
                    <th
                      key={`hdr-pval-${idx}`}
                      className="py-2 px-3 text-right text-xs font-mono font-bold text-[var(--color-primary)] border-l border-[var(--color-border)]"
                    >
                      <div>{formatCurrency(val, config.currency)}</div>
                      {/* Mini inline bar track */}
                      <div className="w-full bg-[rgba(5,28,44,0.08)] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-[var(--color-accent)] h-full rounded-full transition-all duration-300"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>

              {/* Row 4: Period Planned Weight % */}
              <tr className="bg-[rgba(5,28,44,0.02)] border-b border-[var(--color-border)] sticky top-[115px] z-20">
                <th className="py-2 px-3 text-xs font-semibold text-[var(--color-muted)] sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  PERIOD PLANNED WEIGHT %
                </th>
                <th className="py-2 px-3 text-center text-xs font-mono text-[var(--color-muted)]">
                  -
                </th>
                {engine.periodPlannedWeights.map((w, idx) => (
                  <th
                    key={`hdr-pw-${idx}`}
                    className="py-2 px-3 text-right text-xs font-mono font-semibold text-[var(--color-muted)] border-l border-[var(--color-border)]"
                  >
                    {formatPercent(w)}
                  </th>
                ))}
              </tr>

              {/* Row 5: Cumulative Planned Progress % (S-Curve) */}
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[var(--color-primary)] sticky top-[147px] z-20">
                <th className="py-2.5 px-3 font-bold text-xs text-[var(--color-accent)] sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  CUMULATIVE PLANNED PROGRESS % (S-Curve)
                </th>
                <th className="py-2.5 px-3 text-center text-xs font-mono font-bold text-[var(--color-accent)]">
                  -
                </th>
                {engine.cumulativeProgressPcts.map((cumPct, idx) => (
                  <th
                    key={`hdr-cum-${idx}`}
                    className="py-2.5 px-3 text-right text-xs font-mono font-bold text-[var(--color-accent)] border-l border-[var(--color-border)]"
                  >
                    {formatPercent(cumPct)}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Item Allocation Rows */}
            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {filteredItems.map((item, rowIdx) => {
                const allocations = engine.itemAllocations[item.id] || [];
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-[rgba(34,81,255,0.02)] transition-colors ${
                      rowIdx % 2 === 1 ? 'bg-[rgba(5,28,44,0.01)]' : 'bg-white'
                    }`}
                  >
                    {/* Item Code (Sticky Left) */}
                    <td className="py-2.5 px-3 font-mono font-semibold text-[var(--color-primary)] sticky left-0 bg-[inherit] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-10 w-16">
                      {item.code}
                    </td>

                    {/* Item Description */}
                    <td className="py-2.5 px-3 font-medium text-[var(--color-body-text)] max-w-[200px] truncate" title={item.description}>
                      {item.description}
                    </td>

                    {/* Bid Amount */}
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[var(--color-primary)] w-28">
                      {formatCurrency(item.amount, config.currency)}
                    </td>

                    {/* Active Periods Count */}
                    <td className="py-2.5 px-3 text-center font-mono text-[11px] text-[var(--color-muted)]">
                      {item.activePeriodsCount || 0} wks
                    </td>

                    {/* Allocated Amount per Period */}
                    {allocations.map((allocVal, pIdx) => {
                      const isActive = allocVal > 0;
                      const isCurrentWeek = pIdx + 1 === engine.currentPeriodIndex;
                      return (
                        <td
                          key={`cell-${item.id}-${pIdx}`}
                          onClick={() => setSelectedPeriodIdx(pIdx)}
                          className={`py-2 px-3 text-right font-mono text-xs border-l border-[var(--color-border)] interactive-cell cursor-pointer ${
                            isActive
                              ? isCurrentWeek
                                ? 'bg-[rgba(34,81,255,0.08)] font-semibold text-[var(--color-primary)]'
                                : 'bg-[rgba(34,81,255,0.03)] font-medium text-[var(--color-primary)]'
                              : 'text-[var(--color-muted)]/40'
                          }`}
                          title={`${item.code} in ${engine.periods[pIdx]?.label}: ${formatCurrency(allocVal, config.currency)}`}
                        >
                          {isActive ? formatCurrency(allocVal, config.currency) : '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mathematical Formulation Insight Block */}
      <div className="insight-block p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Cpu className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-label text-[var(--color-accent)]">
              MATHEMATICAL ALLOCATION FORMULATION & AUDIT INTEGRITY
            </h4>
            <p className="text-xs text-[var(--color-body-text)] leading-relaxed">
              For any bid item i and period t, the allocation value V[i, t] is computed via temporal intersection logic:
              [S_period, E_period] overlaps with [S_item, E_item]. Under Rule 1 (Linear Pro-Rata), 
              value is distributed as V[i, t] = Amount[i] / ActivePeriods[i]. 
              Under Rule 2 (Milestone Lump-Sum), 100% of value is booked in the period containing E_item. 
              The four-tier audit constantly asserts absolute variance &le; {config.roundTolerance} and terminal S-curve convergence &equiv; 100.00%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
