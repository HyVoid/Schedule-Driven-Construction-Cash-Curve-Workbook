import React, { useState, useEffect, useMemo } from 'react';
import {
  ActiveSheet,
  ConfigData,
  ProjectMeta,
  BidItem,
  WorkbookState,
} from './types';
import {
  DEFAULT_CONFIG,
  DEFAULT_METADATA,
  DEFAULT_ITEMS,
  INITIAL_WORKBOOK_STATE,
} from './data/initialData';
import { runCalculationEngine } from './utils/engine';
import { Sidebar } from './components/Sidebar';
import { SheetConfig } from './components/SheetConfig';
import { SheetInput } from './components/SheetInput';
import { SheetEngine } from './components/SheetEngine';
import { SheetModuleA } from './components/SheetModuleA';
import { SheetModuleB } from './components/SheetModuleB';
import { BulkCsvModal } from './components/BulkCsvModal';
import { BackupModal } from './components/BackupModal';
import { ShieldCheck, Lock, Database } from 'lucide-react';

const STORAGE_KEY = 'construction_cash_curve_workbook_v1';

export default function App() {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>('03_MODULE_A');

  // Load from localStorage or use defaults
  const [config, setConfig] = useState<ConfigData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.config) return parsed.config;
      }
    } catch (e) {
      console.error('Error loading saved config', e);
    }
    return DEFAULT_CONFIG;
  });

  const [metadata, setMetadata] = useState<ProjectMeta>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.metadata) return parsed.metadata;
      }
    } catch (e) {
      console.error('Error loading saved metadata', e);
    }
    return DEFAULT_METADATA;
  });

  const [items, setItems] = useState<BidItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items) && parsed.items.length > 0) return parsed.items;
      }
    } catch (e) {
      console.error('Error loading saved items', e);
    }
    return DEFAULT_ITEMS;
  });

  const [lastSavedTime, setLastSavedTime] = useState<string>(() => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [backupModalMode, setBackupModalMode] = useState<'export' | 'import' | 'reset' | null>(null);

  // Real-time calculation engine (instant propagation to all dependent views)
  const engine = useMemo(() => {
    return runCalculationEngine(config, metadata, items);
  }, [config, metadata, items]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      const stateToSave: WorkbookState = {
        config,
        metadata,
        items,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setLastSavedTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (err) {
      console.error('Failed to auto-save to localStorage', err);
    }
  }, [config, metadata, items]);

  // Handlers for modifying items
  const handleAddItem = () => {
    const nextNum = items.length + 1;
    const codeStr = String(nextNum).padStart(3, '0');
    // Compute a reasonable default start/end based on previous item
    const lastItem = items[items.length - 1];
    const defaultStart = lastItem ? lastItem.completionDate : metadata.scheduleDataDate || '2026-09-01';
    
    // Add 14 days
    const d = new Date(defaultStart);
    d.setDate(d.getDate() + 14);
    const defaultEnd = d.toISOString().split('T')[0];

    const newItem: BidItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      code: codeStr,
      description: `New Construction Milestone ${nextNum}`,
      amount: 50000,
      startDate: defaultStart,
      completionDate: defaultEnd,
      manualWeightPct: null,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, updated: Partial<BidItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updated } : it)));
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((it) => it.id !== id);
    });
  };

  const handleDuplicateItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (!target) return prev;
      const copy: BidItem = {
        ...target,
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        code: `${target.code}-COPY`,
        description: `${target.description} (Copy)`,
      };
      return [...prev, copy];
    });
  };

  const handleImportCsvItems = (newItems: BidItem[], replaceExisting: boolean) => {
    if (replaceExisting) {
      setItems(newItems);
    } else {
      setItems((prev) => [...prev, ...newItems]);
    }
  };

  const handleRestoreState = (restored: WorkbookState) => {
    if (restored.config) setConfig(restored.config);
    if (restored.metadata) setMetadata(restored.metadata);
    if (restored.items) setItems(restored.items);
  };

  const handleConfirmReset = () => {
    setConfig(DEFAULT_CONFIG);
    setMetadata(DEFAULT_METADATA);
    setItems(DEFAULT_ITEMS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const currentWorkbookState: WorkbookState = {
    config,
    metadata,
    items,
    lastSaved: lastSavedTime,
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-bg)] text-[var(--color-body-text)]">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeSheet={activeSheet}
        onSelectSheet={setActiveSheet}
        audit={engine.audit}
        lastSavedTime={lastSavedTime}
        onExportBackup={() => setBackupModalMode('export')}
        onOpenImport={() => setBackupModalMode('import')}
        onOpenCsvModal={() => setIsCsvModalOpen(true)}
        onOpenResetConfirm={() => setBackupModalMode('reset')}
      />

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
          {activeSheet === '00_CONFIG' && (
            <SheetConfig config={config} onChangeConfig={(up) => setConfig((p) => ({ ...p, ...up }))} />
          )}

          {activeSheet === '01_INPUT' && (
            <SheetInput
              metadata={metadata}
              items={items}
              calculatedItems={engine.calculatedItems}
              config={config}
              onChangeMetadata={(up) => setMetadata((p) => ({ ...p, ...up }))}
              onUpdateItem={handleUpdateItem}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onDuplicateItem={handleDuplicateItem}
              onOpenCsvModal={() => setIsCsvModalOpen(true)}
            />
          )}

          {activeSheet === '02_ENGINE' && (
            <SheetEngine engine={engine} config={config} metadata={metadata} />
          )}

          {activeSheet === '03_MODULE_A' && (
            <SheetModuleA engine={engine} config={config} metadata={metadata} />
          )}

          {activeSheet === '04_MODULE_B' && (
            <SheetModuleB engine={engine} config={config} metadata={metadata} />
          )}
        </main>

        {/* Page Footer with Privacy & Storage Guarantee */}
        <footer className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Database className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
            <p>
              All data and calculation storage for this tool are maintained strictly in your browser's local storage. The application itself never retains or transmits any user data.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
            <span>Schedule-Driven Cash Curve v1.2</span>
            <span>&bull;</span>
            <span>NCDOT Standard Specification</span>
          </div>
        </footer>
      </div>

      {/* Bulk CSV Modal */}
      <BulkCsvModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportItems={handleImportCsvItems}
      />

      {/* Backup & Reset Modal */}
      <BackupModal
        mode={backupModalMode}
        onClose={() => setBackupModalMode(null)}
        workbookState={currentWorkbookState}
        onRestoreState={handleRestoreState}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
}
