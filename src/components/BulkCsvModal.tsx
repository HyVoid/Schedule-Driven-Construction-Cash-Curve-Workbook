import React, { useState } from 'react';
import { BidItem } from '../types';
import { X, Upload, FileText, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface BulkCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportItems: (newItems: BidItem[], replaceExisting: boolean) => void;
}

export const BulkCsvModal: React.FC<BulkCsvModalProps> = ({ isOpen, onClose, onImportItems }) => {
  const [csvText, setCsvText] = useState('');
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleCsv = `Code,Description,Amount,StartDate,CompletionDate,ManualWeight
001,Mobilization & Staging,50000,2026-09-01,2026-09-15,
002,Clearing & Grubbing,40000,2026-09-08,2026-09-29,
003,Roadway Excavation,180000,2026-09-22,2026-10-27,
004,Storm Drainage & Culverts,110000,2026-10-06,2026-11-10,
005,Aggregate Base Course,150000,2026-10-20,2026-11-24,
006,Asphalt Intermediate Course,240000,2026-11-10,2026-12-15,
007,Asphalt Surface Course,110000,2026-12-01,2026-12-22,
008,Guardrails & Barriers,60000,2026-12-15,2027-01-05,
009,Pavement Markings & Signs,35000,2026-12-22,2027-01-12,
010,Demobilization & Cleanup,25000,2027-01-05,2027-01-19,`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content || '');
    };
    reader.readAsText(file);
  };

  const handleProcessImport = () => {
    setParseError(null);
    if (!csvText.trim()) {
      setParseError('Please paste CSV text or select a file.');
      return;
    }

    try {
      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length === 0) {
        setParseError('CSV is empty.');
        return;
      }

      // Check header line
      const firstLine = lines[0].toLowerCase();
      const hasHeader =
        firstLine.includes('code') ||
        firstLine.includes('description') ||
        firstLine.includes('amount');
      const dataLines = hasHeader ? lines.slice(1) : lines;

      const parsedItems: BidItem[] = [];

      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i].trim();
        if (!line) continue;

        // Split CSV handling basic quotes or commas
        const cols = line.split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length < 5) {
          throw new Error(
            `Line ${i + (hasHeader ? 2 : 1)} has insufficient columns (${cols.length}/5). Required: Code, Description, Amount, StartDate, CompletionDate`
          );
        }

        const code = cols[0];
        const description = cols[1];
        const amount = parseFloat(cols[2].replace(/[^0-9.-]+/g, '')) || 0;
        const startDate = cols[3];
        const completionDate = cols[4];
        const manualWeight = cols[5] ? parseFloat(cols[5]) : null;

        parsedItems.push({
          id: `csv-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          code,
          description,
          amount,
          startDate,
          completionDate,
          manualWeightPct: manualWeight,
        });
      }

      if (parsedItems.length === 0) {
        setParseError('No valid bid item rows found.');
        return;
      }

      onImportItems(parsedItems, replaceExisting);
      onClose();
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse CSV data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.4)] backdrop-blur-sm animate-fadeUp">
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-[var(--color-border)]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)]">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[var(--color-primary)]">
              Bulk CSV Bid Items Import
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-muted)] hover:text-[var(--color-primary)] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[var(--color-primary)]">
              CSV Content or File Upload
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCsvText(sampleCsv)}
                className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>Load Sample Template</span>
              </button>
            </div>
          </div>

          {/* File Input */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="text-xs text-[var(--color-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[rgba(5,28,44,0.06)] file:text-[var(--color-primary)] hover:file:bg-[rgba(5,28,44,0.1)] cursor-pointer"
            />
          </div>

          {/* Text Area */}
          <textarea
            rows={8}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`Code,Description,Amount,StartDate,CompletionDate,ManualWeight\n001,Mobilization,50000,2026-09-01,2026-09-15,`}
            className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg p-3 font-mono text-xs text-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />

          {/* Import mode options */}
          <div className="flex items-center gap-6 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="import-mode"
                checked={!replaceExisting}
                onChange={() => setReplaceExisting(false)}
                className="text-[var(--color-accent)]"
              />
              <span className="text-[var(--color-body-text)] font-medium">
                Append items to existing list
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="import-mode"
                checked={replaceExisting}
                onChange={() => setReplaceExisting(true)}
                className="text-[var(--color-accent)]"
              />
              <span className="text-[var(--color-body-text)] font-medium text-[var(--color-negative)]">
                Replace all existing items
              </span>
            </label>
          </div>

          {/* Parse error alert */}
          {parseError && (
            <div className="p-3 rounded-lg bg-[rgba(211,47,47,0.08)] border border-[rgba(211,47,47,0.2)] flex items-center gap-2 text-xs text-[var(--color-negative)] font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[rgba(5,28,44,0.02)] border-t border-[var(--color-border)] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleProcessImport}
            className="px-5 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[#1b43d8] rounded-lg shadow-sm transition-all"
          >
            Process & Import CSV
          </button>
        </div>
      </div>
    </div>
  );
};
