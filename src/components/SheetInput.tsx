import React from 'react';
import { ProjectMeta, BidItem, CalculatedBidItem, ConfigData } from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import {
  Plus,
  Trash2,
  Copy,
  AlertTriangle,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  Calendar,
  Layers,
  Upload,
} from 'lucide-react';

interface SheetInputProps {
  metadata: ProjectMeta;
  items: BidItem[];
  calculatedItems: CalculatedBidItem[];
  config: ConfigData;
  onChangeMetadata: (updated: Partial<ProjectMeta>) => void;
  onUpdateItem: (id: string, updated: Partial<BidItem>) => void;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onOpenCsvModal: () => void;
}

export const SheetInput: React.FC<SheetInputProps> = ({
  metadata,
  items,
  calculatedItems,
  config,
  onChangeMetadata,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  onDuplicateItem,
  onOpenCsvModal,
}) => {
  // Summary calculations
  const totalAmount = items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
  const totalEffectiveWeight = calculatedItems.reduce(
    (acc, it) => acc + (it.validationStatus === 'valid' ? it.effectiveWeightPct : 0),
    0
  );
  const validRowCount = calculatedItems.filter((it) => it.validationStatus === 'valid').length;

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Page Title & Operational Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              DATA INPUT LAYER (01_INPUT)
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              Single Point of Data Maintenance
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--color-primary)] tracking-display">
            Project Metadata & As-Bid Items Input
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-3xl">
            Maintain contract header metadata and bid item schedules. Editable cells feature a pale yellow fill (
            <span className="font-mono text-[11px] px-1 bg-[var(--color-input-bg)] text-[var(--color-primary)] border border-yellow-200 rounded">
              #FFFDE7
            </span>
            ). Formulas and validation guards calculate automatically.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="btn-input-csv-import"
            onClick={onOpenCsvModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.04)] rounded-lg shadow-sm transition-all"
          >
            <Upload className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Bulk CSV Import</span>
          </button>
          <button
            id="btn-add-item-top"
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[#1b43d8] rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bid Item</span>
          </button>
        </div>
      </div>

      {/* A Zone: Project Metadata Block */}
      <div className="card-lift p-6">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[var(--color-border)]">
          <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className="font-heading text-base font-bold text-[var(--color-primary)]">
            Section A: DOT Contract & Project Metadata
          </h2>
          <span className="text-xs text-[var(--color-muted)] ml-auto">
            Propagated automatically to Gantt and Executive S-Curve reports
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* Project Name */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
              Project Name
            </label>
            <input
              id="meta-project-name"
              type="text"
              value={metadata.projectName}
              onChange={(e) => onChangeMetadata({ projectName: e.target.value })}
              placeholder="e.g. Highway Widening"
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 text-xs font-medium text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          {/* Contract Number */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
              Contract Number / ID
            </label>
            <input
              id="meta-contract-number"
              type="text"
              value={metadata.contractNumber}
              onChange={(e) => onChangeMetadata({ contractNumber: e.target.value })}
              placeholder="e.g. NCDOT-2026-C892"
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 text-xs font-mono font-medium text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          {/* County / Location */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
              County / Section
            </label>
            <input
              id="meta-county"
              type="text"
              value={metadata.countyLocation}
              onChange={(e) => onChangeMetadata({ countyLocation: e.target.value })}
              placeholder="e.g. Wake County - Section B"
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 text-xs font-medium text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          {/* Contractor Name */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
              General Contractor
            </label>
            <input
              id="meta-contractor"
              type="text"
              value={metadata.contractorName}
              onChange={(e) => onChangeMetadata({ contractorName: e.target.value })}
              placeholder="e.g. Granite Infrastructure"
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 text-xs font-medium text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          {/* Schedule Data Date */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
              Schedule Data Date
            </label>
            <div className="relative">
              <input
                id="meta-data-date"
                type="date"
                value={metadata.scheduleDataDate}
                onChange={(e) => onChangeMetadata({ scheduleDataDate: e.target.value })}
                className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 text-xs font-mono font-medium text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* B Zone: As-Bid Items Data Table */}
      <div className="card-lift overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[var(--color-primary)]" />
            <h2 className="font-heading text-base font-bold text-[var(--color-primary)]">
              Section B: As-Bid Items Table & Schedule Milestones
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[var(--color-muted)]">
              Showing <strong className="text-[var(--color-primary)]">{items.length}</strong> items (
              <strong className="text-[var(--color-positive)]">{validRowCount}</strong> valid)
            </span>
            <button
              onClick={onAddItem}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(34,81,255,0.08)] hover:bg-[rgba(34,81,255,0.14)] text-[var(--color-accent)] rounded font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Row</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="table-bid-items">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b border-[var(--table-header-sep)]">
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-center w-12">
                  #
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-24">
                  Item Code
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase min-w-[240px]">
                  Description
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-36">
                  Bid Amount ({config.currency})
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-36">
                  Planned Start
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-36">
                  Planned Completion
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-28">
                  Manual Wt %
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-24">
                  Duration
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-right w-24">
                  Effective Wt
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase w-36 text-center">
                  Data Guard
                </th>
                <th className="py-3 px-3 text-[11px] font-semibold text-[var(--color-primary)] tracking-label uppercase text-center w-20">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {items.map((item, idx) => {
                const calc = calculatedItems[idx] || ({} as CalculatedBidItem);
                const isValid = calc.validationStatus === 'valid';

                return (
                  <tr
                    key={item.id}
                    className={`group transition-colors ${
                      !isValid ? 'bg-[rgba(211,47,47,0.03)]' : idx % 2 === 1 ? 'bg-[rgba(5,28,44,0.01)]' : 'bg-white'
                    } hover:bg-[rgba(34,81,255,0.02)]`}
                  >
                    {/* Index */}
                    <td className="py-2.5 px-3 text-center font-mono text-[11px] text-[var(--color-muted)]">
                      {idx + 1}
                    </td>

                    {/* Item Code (Editable) */}
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={item.code}
                        onChange={(e) => onUpdateItem(item.id, { code: e.target.value })}
                        placeholder="001"
                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2 py-1.5 font-mono font-medium text-xs text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      />
                    </td>

                    {/* Description (Editable) */}
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                        placeholder="Item Description"
                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2.5 py-1.5 text-xs text-[var(--color-primary)] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      />
                    </td>

                    {/* Bid Amount (Editable) */}
                    <td className="py-2 px-2">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1.5 text-xs font-mono text-[var(--color-muted)]">
                          {config.currency}
                        </span>
                        <input
                          type="number"
                          step="1000"
                          min="0"
                          value={isNaN(item.amount) ? '' : item.amount}
                          onChange={(e) => onUpdateItem(item.id, { amount: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded pl-6 pr-2 py-1.5 text-right font-mono font-semibold text-xs text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                        />
                      </div>
                    </td>

                    {/* Planned Start Date (Editable) */}
                    <td className="py-2 px-2">
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) => onUpdateItem(item.id, { startDate: e.target.value })}
                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2 py-1.5 font-mono text-[11px] text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      />
                    </td>

                    {/* Planned Completion Date (Editable) */}
                    <td className="py-2 px-2">
                      <input
                        type="date"
                        value={item.completionDate}
                        onChange={(e) => onUpdateItem(item.id, { completionDate: e.target.value })}
                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded px-2 py-1.5 font-mono text-[11px] text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                      />
                    </td>

                    {/* Manual Weight % (Editable, optional) */}
                    <td className="py-2 px-2">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={
                            item.manualWeightPct !== null && item.manualWeightPct !== undefined
                              ? item.manualWeightPct
                              : ''
                          }
                          placeholder="Auto"
                          onChange={(e) => {
                            const val = e.target.value === '' ? null : parseFloat(e.target.value);
                            onUpdateItem(item.id, { manualWeightPct: val });
                          }}
                          className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded pr-5 pl-2 py-1.5 text-right font-mono text-xs text-[var(--color-primary)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                        />
                        <span className="absolute right-2 top-1.5 text-[10px] text-[var(--color-muted)]">%</span>
                      </div>
                    </td>

                    {/* Calculated Duration (System Generated) */}
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-[var(--color-primary)]">
                      {calc.durationDays > 0 ? `${calc.durationDays} d` : '-'}
                    </td>

                    {/* Calculated Effective Weight % (System Generated) */}
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[var(--color-primary)]">
                      {formatPercent(calc.effectiveWeightPct || 0)}
                    </td>

                    {/* Data Guard Status Badge */}
                    <td className="py-2.5 px-4 text-center">
                      {isValid ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[rgba(0,200,83,0.1)] text-[#008738]">
                          <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
                          Valid
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[rgba(211,47,47,0.1)] text-[var(--color-negative)]"
                          title={calc.validationMessage}
                        >
                          <AlertTriangle className="w-3 h-3 text-[var(--color-negative)]" />
                          <span className="truncate max-w-[90px]">{calc.validationMessage}</span>
                        </span>
                      )}
                    </td>

                    {/* Row Actions */}
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => onDuplicateItem(item.id)}
                          className="p-1 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.06)] rounded"
                          title="Duplicate item"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1 text-[var(--color-muted)] hover:text-[var(--color-negative)] hover:bg-[rgba(211,47,47,0.06)] rounded"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Summary Footer Row */}
            <tfoot>
              <tr className="bg-[var(--table-header-bg)] border-t-2 border-[var(--color-primary)] font-bold text-xs text-[var(--color-primary)]">
                <td className="py-3 px-3 text-center" colSpan={3}>
                  <div className="flex items-center justify-between px-3">
                    <span className="uppercase tracking-label font-bold">TOTAL SCHEDULED ITEMS: {items.length}</span>
                    <span className="text-[11px] font-normal text-[var(--color-muted)]">
                      Valid rows: {validRowCount} / {items.length}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm text-[var(--color-primary)]">
                  {formatCurrency(totalAmount, config.currency)}
                </td>
                <td className="py-3 px-3 text-center text-[var(--color-muted)]" colSpan={3}>
                  Contract Total Basis
                </td>
                <td className="py-3 px-3 text-right font-mono text-xs text-[var(--color-muted)]">
                  -
                </td>
                <td className="py-3 px-3 text-right font-mono text-xs text-[var(--color-accent)] font-bold">
                  {formatPercent(totalEffectiveWeight)}
                </td>
                <td className="py-3 px-4 text-center">
                  {validRowCount === items.length ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#008738]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" />
                      Clean Input
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-negative)]">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-negative)]" />
                      Attention Req.
                    </span>
                  )}
                </td>
                <td className="py-3 px-3" />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add item button banner */}
        <div className="p-4 bg-[rgba(5,28,44,0.02)] border-t border-[var(--color-border)] flex items-center justify-between">
          <p className="text-xs text-[var(--color-muted)]">
            Tip: Press Tab to navigate across input cells. Every change instantly cascades through the calculation engine.
          </p>
          <button
            id="btn-add-item-bottom"
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] bg-white border border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.04)] rounded shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Input Safeguard Insight Block */}
      <div className="insight-block p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-label text-[var(--color-accent)]">
              DATA GUARD FIREWALL SPECIFICATION
            </h4>
            <p className="text-xs text-[var(--color-body-text)] leading-relaxed">
              The input table implements an automated pre-validation firewall (Col J). 
              If any item features reversed start/completion dates, negative or zero amounts, or blank descriptions, 
              the system gracefully isolates the offending line and flags it with an action-required status without breaking downstream matrix arrays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
