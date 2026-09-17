import React, { useState } from 'react';
import { WorkbookState } from '../types';
import {
  Download,
  Upload,
  Copy,
  Check,
  RotateCcw,
  X,
  AlertTriangle,
  FileCode,
} from 'lucide-react';

interface BackupModalProps {
  mode: 'export' | 'import' | 'reset' | null;
  onClose: () => void;
  workbookState: WorkbookState;
  onRestoreState: (state: WorkbookState) => void;
  onConfirmReset: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  mode,
  onClose,
  workbookState,
  onRestoreState,
  onConfirmReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!mode) return null;

  const jsonExportStr = JSON.stringify(workbookState, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonExportStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([jsonExportStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `CashCurve_Backup_${workbookState.metadata.contractNumber || 'Project'}_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportJsonText(content || '');
    };
    reader.readAsText(file);
  };

  const handleProcessImport = () => {
    setImportError(null);
    if (!importJsonText.trim()) {
      setImportError('Please paste JSON or choose a backup file.');
      return;
    }

    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.config || !parsed.metadata || !Array.isArray(parsed.items)) {
        throw new Error('Invalid backup schema. Required properties: config, metadata, items.');
      }
      onRestoreState({
        config: parsed.config,
        metadata: parsed.metadata,
        items: parsed.items,
        lastSaved: new Date().toISOString(),
      });
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Malformed JSON backup structure.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.4)] backdrop-blur-sm animate-fadeUp">
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-[var(--color-border)]">
        {/* Export Mode */}
        {mode === 'export' && (
          <div>
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-primary)]">
                  Export Workbook Backup
                </h3>
              </div>
              <button onClick={onClose} className="p-1 text-[var(--color-muted)] hover:text-[var(--color-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-[var(--color-muted)] leading-relaxed">
                Download your complete project workbook configuration, contract metadata, and all bid items 
                as a standard JSON snapshot for offline archival or migration.
              </p>

              <textarea
                readOnly
                rows={10}
                value={jsonExportStr}
                className="w-full bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] rounded-lg p-3 font-mono text-[11px] text-[var(--color-primary)] select-all"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--color-primary)] bg-[rgba(5,28,44,0.06)] hover:bg-[rgba(5,28,44,0.1)] rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00C853]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[#1b43d8] rounded-lg shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup File (.json)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Mode */}
        {mode === 'import' && (
          <div>
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)]">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-primary)]">
                  Import Workbook Backup
                </h3>
              </div>
              <button onClick={onClose} className="p-1 text-[var(--color-muted)] hover:text-[var(--color-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-[var(--color-muted)] leading-relaxed">
                Restore a previously exported JSON backup file. This will restore your configuration, contract metadata, and bid items.
              </p>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
                  Choose Backup File (.json)
                </label>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="text-xs text-[var(--color-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[rgba(5,28,44,0.06)] file:text-[var(--color-primary)] hover:file:bg-[rgba(5,28,44,0.1)] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-label text-[var(--color-muted)] mb-1.5">
                  Or Paste JSON String
                </label>
                <textarea
                  rows={8}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder={`{\n  "config": { ... },\n  "metadata": { ... },\n  "items": [ ... ]\n}`}
                  className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg p-3 font-mono text-[11px] text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              {importError && (
                <div className="p-3 rounded-lg bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.2)] flex items-center gap-2 text-xs text-[var(--color-negative)] font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleProcessImport}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[#1b43d8] rounded-lg shadow-sm transition-all"
                >
                  Restore Backup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Mode */}
        {mode === 'reset' && (
          <div>
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--color-negative)]">
                <div className="p-1.5 rounded-md bg-[rgba(211,47,47,0.08)]">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  Reset Workbook Data?
                </h3>
              </div>
              <button onClick={onClose} className="p-1 text-[var(--color-muted)] hover:text-[var(--color-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-[var(--color-body-text)] leading-relaxed">
                Are you sure you want to reset all data? This will restore the default 
                <strong> NCDOT Highway Improvement ($1,000,000.00) </strong> baseline project and clear custom items stored in local storage.
              </p>

              <div className="p-3.5 rounded-lg bg-[rgba(211,47,47,0.05)] border border-[rgba(211,47,47,0.15)] flex items-start gap-2.5 text-[var(--color-negative)]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Destructive Action</span>
                  <span className="text-[11px] opacity-90">
                    Consider using "Export Backup" first to save your current work if needed.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirmReset();
                    onClose();
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[var(--color-negative)] hover:bg-[#b52626] rounded-lg shadow-sm transition-all"
                >
                  Confirm Reset Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
