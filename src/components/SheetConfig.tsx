import React from 'react';
import { ConfigData, TimeScale, AllocationRule } from '../types';
import { Sliders, ShieldCheck, HelpCircle, Layers, Cpu, CheckCircle } from 'lucide-react';

interface SheetConfigProps {
  config: ConfigData;
  onChangeConfig: (updated: Partial<ConfigData>) => void;
}

export const SheetConfig: React.FC<SheetConfigProps> = ({ config, onChangeConfig }) => {
  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              CONTROL LAYER (00_CONFIG)
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              Single Point of Truth for Parameters
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Global Configuration & Audit Center
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-3xl">
            Centralized registry for environment variables, currency symbols, temporal discretization step,
            time-phased distribution algorithms, and mathematical conservation tolerances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-lg bg-[var(--color-surface)] shadow-sm border border-[var(--color-border)] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
            <div>
              <div className="text-[10px] uppercase tracking-label font-bold text-[var(--color-muted)]">
                Parameter State
              </div>
              <div className="text-xs font-semibold text-[var(--color-primary)]">
                Active & Enforced
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Parameters Table */}
      <div className="card-lift overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--color-primary)]" />
            <h2 className="font-heading text-lg font-bold text-[var(--color-primary)]">
              Active Control Parameters
            </h2>
          </div>
          <span className="text-xs text-[var(--color-muted)]">
            Editable cells with pale yellow background indicate user-configurable inputs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="table-config">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)]">
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-48">
                  Parameter ID
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase">
                  Business Description
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-72">
                  Configured Value
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-36">
                  Data Type
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase">
                  Downstream Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[13px]">
              {/* CFG_CURRENCY */}
              <tr className="hover:bg-[rgba(5,28,44,0.015)] transition-colors">
                <td className="py-3.5 px-6 font-mono font-semibold text-[var(--color-primary)]">
                  CFG_CURRENCY
                </td>
                <td className="py-3.5 px-6 text-[var(--color-body-text)]">
                  <span className="font-medium text-[var(--color-primary)]">Project Base Currency Symbol</span>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Symbol prefixed on all cost values, KPI cards, and financial schedules across the workbook.
                  </p>
                </td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <select
                      id="input-cfg-currency-select"
                      value={['$', '¥', '€', '£'].includes(config.currency) ? config.currency : 'custom'}
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          onChangeConfig({ currency: e.target.value });
                        }
                      }}
                      className="bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2.5 py-1.5 font-mono text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    >
                      <option value="$">$ (USD / International)</option>
                      <option value="¥">¥ (CNY / JPY)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="£">£ (GBP)</option>
                      <option value="custom">Custom Text</option>
                    </select>

                    <input
                      id="input-cfg-currency"
                      type="text"
                      maxLength={4}
                      value={config.currency}
                      onChange={(e) => onChangeConfig({ currency: e.target.value || '$' })}
                      className="w-16 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2.5 py-1.5 font-mono text-center font-bold text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      title="Editable currency symbol"
                    />
                  </div>
                </td>
                <td className="py-3.5 px-6 font-mono text-xs text-[var(--color-muted)]">
                  Text [1-4 char]
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  Propagated to 01_INPUT, 02_ENGINE, and 04_MODULE_B tables and KPIs.
                </td>
              </tr>

              {/* CFG_TIME_SCALE */}
              <tr className="hover:bg-[rgba(5,28,44,0.015)] transition-colors">
                <td className="py-3.5 px-6 font-mono font-semibold text-[var(--color-primary)]">
                  CFG_TIME_SCALE
                </td>
                <td className="py-3.5 px-6 text-[var(--color-body-text)]">
                  <span className="font-medium text-[var(--color-primary)]">Timeline Discretization Granularity</span>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Step frequency for time axis generation. 'Weekly' uses 7-day increments; 'Monthly' uses calendar months.
                  </p>
                </td>
                <td className="py-3.5 px-6">
                  <div className="inline-flex rounded-lg p-0.5 bg-[var(--color-input-bg)] border border-[var(--color-border)]">
                    <button
                      type="button"
                      id="btn-scale-weekly"
                      onClick={() => onChangeConfig({ timeScale: 'Weekly' })}
                      className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                        config.timeScale === 'Weekly'
                          ? 'bg-[var(--color-accent)] text-white shadow-xs'
                          : 'text-[var(--color-primary)] hover:bg-white/60'
                      }`}
                    >
                      Weekly (7 Days)
                    </button>
                    <button
                      type="button"
                      id="btn-scale-monthly"
                      onClick={() => onChangeConfig({ timeScale: 'Monthly' })}
                      className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                        config.timeScale === 'Monthly'
                          ? 'bg-[var(--color-accent)] text-white shadow-xs'
                          : 'text-[var(--color-primary)] hover:bg-white/60'
                      }`}
                    >
                      Monthly (Calendar)
                    </button>
                  </div>
                </td>
                <td className="py-3.5 px-6 font-mono text-xs text-[var(--color-muted)]">
                  Enum [Weekly/Monthly]
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  Controls period array generator in 02_ENGINE and horizontal width in 03_MODULE_A.
                </td>
              </tr>

              {/* CFG_ALLOC_RULE */}
              <tr className="hover:bg-[rgba(5,28,44,0.015)] transition-colors">
                <td className="py-3.5 px-6 font-mono font-semibold text-[var(--color-primary)]">
                  CFG_ALLOC_RULE
                </td>
                <td className="py-3.5 px-6 text-[var(--color-body-text)]">
                  <span className="font-medium text-[var(--color-primary)]">Time-Phased Value Allocation Algorithm</span>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Defines how bid contract amounts are mathematically spread across work duration periods.
                  </p>
                </td>
                <td className="py-3.5 px-6">
                  <select
                    id="input-cfg-alloc-rule"
                    value={config.allocRule}
                    onChange={(e) => onChangeConfig({ allocRule: Number(e.target.value) as AllocationRule })}
                    className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-3 py-1.5 font-medium text-xs text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  >
                    <option value={1}>Rule 1: Linear Pro-Rata (Even spread over active periods)</option>
                    <option value={2}>Rule 2: Milestone Lump-Sum (100% on completion period)</option>
                  </select>
                </td>
                <td className="py-3.5 px-6 font-mono text-xs text-[var(--color-muted)]">
                  Integer [1 or 2]
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  Directly alters formula matrix in 02_ENGINE and S-curve slope in 04_MODULE_B.
                </td>
              </tr>

              {/* CFG_ROUND_TOLER */}
              <tr className="hover:bg-[rgba(5,28,44,0.015)] transition-colors">
                <td className="py-3.5 px-6 font-mono font-semibold text-[var(--color-primary)]">
                  CFG_ROUND_TOLER
                </td>
                <td className="py-3.5 px-6 text-[var(--color-body-text)]">
                  <span className="font-medium text-[var(--color-primary)]">Mathematical Conservation Tolerance</span>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Maximum acceptable difference between Bid Total and Engine Time-Phased Total to absorb floating-point division cents.
                  </p>
                </td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <input
                      id="input-cfg-toler"
                      type="number"
                      step="0.001"
                      min="0"
                      value={config.roundTolerance}
                      onChange={(e) => onChangeConfig({ roundTolerance: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className="w-28 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-3 py-1.5 font-mono text-xs font-semibold text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                    <span className="text-xs text-[var(--color-muted)] font-mono">{config.currency}</span>
                  </div>
                </td>
                <td className="py-3.5 px-6 font-mono text-xs text-[var(--color-muted)]">
                  Decimal [0.00 - 1.00]
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  Evaluates Check 3: |Audit_Bid_Total - Audit_Engine_Total| &le; Tolerance.
                </td>
              </tr>

              {/* CFG_WARN_LIMIT */}
              <tr className="hover:bg-[rgba(5,28,44,0.015)] transition-colors">
                <td className="py-3.5 px-6 font-mono font-semibold text-[var(--color-primary)]">
                  CFG_WARN_LIMIT
                </td>
                <td className="py-3.5 px-6 text-[var(--color-body-text)]">
                  <span className="font-medium text-[var(--color-primary)]">Anomaly Warning Trigger Threshold</span>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Variance limit beyond which operators receive advisory warnings for review.
                  </p>
                </td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <input
                      id="input-cfg-warn-limit"
                      type="number"
                      step="0.01"
                      min="0"
                      value={config.warnLimit}
                      onChange={(e) => onChangeConfig({ warnLimit: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className="w-28 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-3 py-1.5 font-mono text-xs font-semibold text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                    <span className="text-xs text-[var(--color-muted)] font-mono">{config.currency}</span>
                  </div>
                </td>
                <td className="py-3.5 px-6 font-mono text-xs text-[var(--color-muted)]">
                  Decimal
                </td>
                <td className="py-3.5 px-6 text-xs text-[var(--color-muted)]">
                  Used in audit condition checks and discrepancy highlights.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture Philosophy & Insight Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-lift p-6 space-y-3">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
            <Layers className="w-4 h-4 text-[var(--color-accent)]" />
            <span>"1-1-2" Clean Architecture</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            The workbook strictly decouples data maintenance from visualization:
            <strong className="text-[var(--color-primary)] font-semibold"> 1 Input Layer </strong> 
            (01_INPUT), 
            <strong className="text-[var(--color-primary)] font-semibold"> 1 Unified Engine </strong> 
            (02_ENGINE), and 
            <strong className="text-[var(--color-primary)] font-semibold"> 2 Business Dashboards </strong> 
            (03_MODULE_A for Schedule/Gantt and 04_MODULE_B for Cash/S-Curve).
          </p>
        </div>

        <div className="card-lift p-6 space-y-3">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
            <Cpu className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Real-time JS Formulation</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            All formula calculations run immediately in frontend memory upon every keystroke. 
            There are no submission delays or background roundtrips; changes instantly cascade 
            across 2D time matrices and cumulative curves.
          </p>
        </div>

        <div className="card-lift p-6 space-y-3">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
            <CheckCircle className="w-4 h-4 text-[var(--color-positive)]" />
            <span>Conservation Invariant</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            Guaranteed financial conservation: 
            <span className="font-mono text-[11px] block mt-1 p-1.5 rounded bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)]">
              &sum; As-Bid Contract Amounts &equiv; &sum; Time-Phased Values
            </span>
            Not a single cent is discarded, lost in rounding, or allocated outside the project lifecycle.
          </p>
        </div>
      </div>

      {/* Insight Block */}
      <div className="insight-block p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-label text-[var(--color-accent)]">
              OPERATIONAL CONFIGURATION GUIDELINE
            </h4>
            <p className="text-xs text-[var(--color-body-text)] leading-relaxed">
              When transitioning from competitive bidding to active construction execution, verify if the owner/DOT
              contract stipulates milestone billing or linear progress accrual. Switching 
              <strong className="text-[var(--color-primary)]"> CFG_ALLOC_RULE </strong> 
              from <em>Rule 1 (Linear Pro-Rata)</em> to <em>Rule 2 (Milestone Lump-Sum)</em> shifts all value recognition to each item's completion week, 
              providing an austere sensitivity test for cash flow and working capital cushions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
