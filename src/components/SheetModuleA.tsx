import React, { useState } from 'react';
import { EngineOutput, ConfigData, ProjectMeta } from '../types';
import { formatPercent, formatShortDate } from '../utils/engine';
import {
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  HelpCircle,
  Flag,
} from 'lucide-react';

interface SheetModuleAProps {
  engine: EngineOutput;
  config: ConfigData;
  metadata: ProjectMeta;
}

export const SheetModuleA: React.FC<SheetModuleAProps> = ({ engine, config, metadata }) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Find cumulative planned progress at current Data Date
  const currentPeriodData = engine.periods.find((p) => p.isCurrentDataDate);
  const currentPeriodIdx = currentPeriodData ? currentPeriodData.index - 1 : 0;
  const currentPlannedPct = engine.cumulativeProgressPcts[currentPeriodIdx] || 0;

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Top Title & Metadata */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              PRESENTATION LAYER (03_MODULE_A)
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              NCDOT Standard Progress Schedule Board
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Construction Schedule & Gantt Bar Visualizer
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-3xl">
            Answers key site management questions: "When will each trade conduct work? 
            What is the cumulative planned progress milestone at current schedule data date?"
          </p>
        </div>

        {/* Current Progress KPI Card */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] shadow-sm border border-[var(--color-border)]">
            <div className="text-[10px] uppercase tracking-label font-bold text-[var(--color-muted)]">
              Planned Progress at Data Date
            </div>
            <div className="font-heading text-2xl font-bold text-[var(--color-accent)] tracking-display">
              {formatPercent(currentPlannedPct)}
            </div>
          </div>
        </div>
      </div>

      {/* A Zone: NCDOT Standard Engineering Header */}
      <div className="card-lift p-6 border-t-4 border-[var(--color-primary)]">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
            <h2 className="font-heading text-sm font-bold uppercase tracking-label text-[var(--color-primary)]">
              STATE OF NORTH CAROLINA DEPARTMENT OF TRANSPORTATION — PROGRESS SCHEDULE
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--color-muted)]">
            FORM NCDOT-SCH-101
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              PROJECT:
            </span>
            <span className="font-bold text-[var(--color-primary)] text-right truncate max-w-[200px]" title={metadata.projectName}>
              {metadata.projectName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              CONTRACT #:
            </span>
            <span className="font-mono font-bold text-[var(--color-primary)]">
              {metadata.contractNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              AUDIT STATUS:
            </span>
            {engine.audit.isPassed ? (
              <span className="inline-flex items-center gap-1 font-semibold text-[#008738]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" />
                AUDIT PASS (0.00 &Delta;)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-negative)]">
                <AlertCircle className="w-3.5 h-3.5 text-[var(--color-negative)]" />
                AUDIT FAILED
              </span>
            )}
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              COUNTY / SECTION:
            </span>
            <span className="font-medium text-[var(--color-primary)]">
              {metadata.countyLocation}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              GENERAL CONTRACTOR:
            </span>
            <span className="font-medium text-[var(--color-primary)]">
              {metadata.contractorName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[rgba(5,28,44,0.05)]">
            <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-label">
              SCHEDULE DATA DATE:
            </span>
            <span className="font-mono font-bold text-[var(--color-accent)]">
              {metadata.scheduleDataDate}
            </span>
          </div>
        </div>
      </div>

      {/* C Zone: Gantt Matrix with Sticky Horizontal Timeline */}
      <div className="card-lift overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-[var(--color-primary)]">
              NCDOT Gantt Bar Schedule Array & S-Curve Control
            </h3>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Interactive timeline bars indicate scheduled activity windows. Red vertical guide pinpoints current Data Date.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-3 rounded-xs bg-[var(--color-primary)]" />
              <span className="text-[var(--color-muted)] font-medium">Scheduled Work Activity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-0.5 h-4 bg-[var(--color-accent)]" />
              <span className="text-[var(--color-muted)] font-medium">Data Date Line</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[750px]">
          <table className="w-full text-left border-collapse" id="table-gantt-chart">
            <thead>
              {/* Timeline Header Row 1: Period Labels */}
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)] sticky top-0 z-20">
                <th className="py-2.5 px-3 text-[11px] font-bold text-[var(--color-primary)] tracking-label uppercase sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30 min-w-[280px]" colSpan={3}>
                  BID ITEMS & SCHEDULE
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-[var(--color-primary)] tracking-label uppercase text-right w-20">
                  DUR.
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-[var(--color-primary)] tracking-label uppercase text-right w-20">
                  WEIGHT
                </th>
                {engine.periods.map((p) => {
                  const isCurrent = p.index === engine.currentPeriodIndex;
                  return (
                    <th
                      key={`gantt-p-${p.index}`}
                      className={`py-2 px-2 text-center text-xs font-mono font-bold min-w-[64px] border-l border-[var(--table-header-sep)] ${
                        isCurrent
                          ? 'bg-[rgba(34,81,255,0.1)] text-[var(--color-accent)] font-extrabold ring-1 ring-[var(--color-accent)] ring-inset'
                          : 'text-[var(--color-primary)]'
                      }`}
                    >
                      {p.label.replace('Week ', 'W').replace('Month ', 'M')}
                    </th>
                  );
                })}
              </tr>

              {/* Timeline Header Row 2: Period Start Dates */}
              <tr className="bg-[rgba(5,28,44,0.02)] border-b border-[var(--color-border)] sticky top-[37px] z-20">
                <th className="py-1.5 px-3 text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-label sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  START DATES
                </th>
                <th className="py-1.5 px-3 text-[10px] text-right text-[var(--color-muted)] font-mono">
                  -
                </th>
                <th className="py-1.5 px-3 text-[10px] text-right text-[var(--color-muted)] font-mono">
                  -
                </th>
                {engine.periods.map((p) => (
                  <th
                    key={`gantt-d-${p.index}`}
                    className="py-1.5 px-1 text-center text-[10px] font-mono text-[var(--color-muted)] border-l border-[var(--color-border)]"
                  >
                    {formatShortDate(p.startDate)}
                  </th>
                ))}
              </tr>

              {/* Timeline Header Row 3: Planned Period % */}
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[var(--color-border)] sticky top-[67px] z-20">
                <th className="py-2 px-3 text-xs font-bold text-[var(--color-primary)] sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  PERIOD PLANNED % (Planned_Weight)
                </th>
                <th className="py-2 px-3 text-right font-mono text-xs text-[var(--color-muted)]">
                  -
                </th>
                <th className="py-2 px-3 text-right font-mono text-xs text-[var(--color-muted)]">
                  -
                </th>
                {engine.periodPlannedWeights.map((w, idx) => (
                  <th
                    key={`gantt-pw-${idx}`}
                    className="py-2 px-1 text-center text-[11px] font-mono font-bold text-[var(--color-primary)] border-l border-[var(--color-border)]"
                  >
                    {formatPercent(w, 1)}
                  </th>
                ))}
              </tr>

              {/* Timeline Header Row 4: Cumulative S-Curve % */}
              <tr className="bg-[rgba(34,81,255,0.05)] border-b-2 border-[var(--color-primary)] sticky top-[101px] z-20">
                <th className="py-2.5 px-3 text-xs font-bold text-[var(--color-accent)] sticky left-0 bg-[var(--color-surface)] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-30" colSpan={3}>
                  CUMULATIVE PLANNED % (S-Curve Milestone)
                </th>
                <th className="py-2.5 px-3 text-right font-mono text-xs text-[var(--color-accent)] font-bold">
                  -
                </th>
                <th className="py-2.5 px-3 text-right font-mono text-xs text-[var(--color-accent)] font-bold">
                  100%
                </th>
                {engine.cumulativeProgressPcts.map((cumPct, idx) => {
                  const isCurrent = idx + 1 === engine.currentPeriodIndex;
                  return (
                    <th
                      key={`gantt-cum-${idx}`}
                      className={`py-2 px-1 text-center text-[11px] font-mono font-bold border-l border-[var(--color-border)] ${
                        isCurrent
                          ? 'text-[var(--color-accent)] bg-[rgba(34,81,255,0.12)] font-extrabold'
                          : 'text-[var(--color-accent)]'
                      }`}
                    >
                      {formatPercent(cumPct, 1)}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Gantt Bar Rows */}
            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {engine.calculatedItems.map((item, rowIdx) => {
                const allocations = engine.itemAllocations[item.id] || [];
                const isHovered = hoveredItemId === item.id;

                return (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    className={`transition-colors ${
                      isHovered ? 'bg-[rgba(34,81,255,0.03)]' : rowIdx % 2 === 1 ? 'bg-[rgba(5,28,44,0.01)]' : 'bg-white'
                    }`}
                  >
                    {/* Item Code */}
                    <td className="py-3 px-3 font-mono font-semibold text-[var(--color-primary)] sticky left-0 bg-[inherit] shadow-[2px_0_4px_rgba(0,0,0,0.03)] z-10 w-16">
                      {item.code}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-3 font-medium text-[var(--color-primary)] max-w-[200px] truncate" title={item.description}>
                      {item.description}
                    </td>

                    {/* Dates */}
                    <td className="py-3 px-2 font-mono text-[10px] text-[var(--color-muted)] whitespace-nowrap">
                      {formatShortDate(item.startDate)} - {formatShortDate(item.completionDate)}
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-3 text-right font-mono font-medium text-[var(--color-primary)]">
                      {item.durationDays}d
                    </td>

                    {/* Weight % */}
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[var(--color-primary)]">
                      {formatPercent(item.effectiveWeightPct, 1)}
                    </td>

                    {/* Timeline Periods with Gantt Bar Cells */}
                    {allocations.map((allocVal, pIdx) => {
                      const isActive = allocVal > 0;
                      const isCurrentDataDate = pIdx + 1 === engine.currentPeriodIndex;

                      return (
                        <td
                          key={`bar-${item.id}-${pIdx}`}
                          className={`py-2 px-1 text-center border-l border-[var(--color-border)] relative ${
                            isCurrentDataDate ? 'bg-[rgba(34,81,255,0.04)]' : ''
                          }`}
                        >
                          {/* Data date vertical needle */}
                          {isCurrentDataDate && (
                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[var(--color-accent)] opacity-40 pointer-events-none -translate-x-1/2 z-10" />
                          )}

                          {isActive ? (
                            <div
                              className="interactive-cell group/bar relative mx-auto w-[90%] h-6 rounded bg-[var(--color-primary)] text-white flex items-center justify-center font-mono text-[10px] font-bold shadow-xs cursor-pointer"
                              title={`${item.description} in ${engine.periods[pIdx]?.label}: Active`}
                            >
                              <span className="opacity-70 group-hover/bar:opacity-100">
                                &#9608;&#9608;
                              </span>
                            </div>
                          ) : (
                            <span className="text-[var(--color-muted)]/20 font-mono text-[10px]">
                              -
                            </span>
                          )}
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

      {/* Progress & Milestone Insight Block */}
      <div className="insight-block p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Flag className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-label text-[var(--color-accent)]">
              NCDOT PROGRESS SCHEDULE COMPLIANCE INSIGHT
            </h4>
            <p className="text-xs text-[var(--color-body-text)] leading-relaxed">
              At the designated baseline Data Date (<strong>{metadata.scheduleDataDate}</strong>, Period {engine.currentPeriodIndex}), 
              the target planned project completion is <strong>{formatPercent(currentPlannedPct)}</strong>. 
              The schedule horizontal array shows that critical path earthwork and drainage overlap between Weeks 4 and 8. 
              Submitting monthly pay requisitions against these predetermined cumulative benchmarks guarantees dispute-free audits with state DOT inspectors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
