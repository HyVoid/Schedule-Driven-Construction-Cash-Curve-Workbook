import React, { useState } from 'react';
import { ActiveSheet, EngineAudit } from '../types';
import {
  FileSpreadsheet,
  Download,
  Upload,
  FileText,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Save,
  Sliders,
  Calendar,
  TrendingUp,
  Cpu,
  Menu,
  X,
  ChevronRight,
  Database,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface SidebarProps {
  activeSheet: ActiveSheet;
  onSelectSheet: (sheet: ActiveSheet) => void;
  audit: EngineAudit;
  lastSavedTime: string;
  onExportBackup: () => void;
  onOpenImport: () => void;
  onOpenCsvModal: () => void;
  onOpenResetConfirm: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface SheetNavMeta {
  id: ActiveSheet;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SHEETS: SheetNavMeta[] = [
  {
    id: '00_CONFIG',
    code: '00_CONFIG',
    title: 'Parameters & Rules',
    subtitle: 'Currency, timescale & rules',
    icon: Sliders,
  },
  {
    id: '01_INPUT',
    code: '01_INPUT',
    title: 'Bid Items & Dates',
    subtitle: 'Project metadata & milestones',
    icon: FileSpreadsheet,
  },
  {
    id: '02_ENGINE',
    code: '02_ENGINE',
    title: 'Calculation Matrix',
    subtitle: '2D tensor & audit checks',
    icon: Cpu,
  },
  {
    id: '03_MODULE_A',
    code: '03_MODULE_A',
    title: 'Gantt & Progress',
    subtitle: 'NCDOT weekly bar chart',
    icon: Calendar,
  },
  {
    id: '04_MODULE_B',
    code: '04_MODULE_B',
    title: 'Cash Flow & S-Curve',
    subtitle: 'Liquidity & cumulative curve',
    icon: TrendingUp,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSheet,
  onSelectSheet,
  audit,
  lastSavedTime,
  onExportBackup,
  onOpenImport,
  onOpenCsvModal,
  onOpenResetConfirm,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSheetClick = (sheetId: ActiveSheet) => {
    onSelectSheet(sheetId);
    setMobileOpen(false);
  };

  const currentSheet = SHEETS.find((s) => s.id === activeSheet) || SHEETS[0];

  return (
    <>
      {/* Mobile Top Header (Visible on < lg screens) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 h-14 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -ml-1 text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] rounded-lg transition-colors"
            aria-label="Toggle Navigation Sidebar"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-xs">
              <FileSpreadsheet className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-heading text-sm font-bold text-[var(--color-primary)] block leading-tight">
                CashCurve
              </span>
              <span className="text-[10px] font-mono text-[var(--color-muted)] leading-none">
                {currentSheet.code}
              </span>
            </div>
          </div>
        </div>

        {/* Right side mobile audit indicator */}
        <div className="flex items-center gap-2">
          {audit.isPassed ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[rgba(0,200,83,0.1)] text-[#008738]">
              <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
              PASS
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[rgba(211,47,47,0.1)] text-[var(--color-negative)]">
              <AlertCircle className="w-3 h-3" />
              AUDIT
            </span>
          )}
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(5,28,44,0.4)] backdrop-blur-xs lg:hidden animate-fadeIn"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col justify-between transition-all duration-300 ease-[var(--ease-standard)] lg:sticky lg:top-0 lg:h-screen lg:z-30 shadow-sm ${
          /* Mobile Drawer State */
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          /* Desktop Collapsed Width */
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[280px] w-[280px]'
        }`}
      >
        {/* Top Section: Brand & Meta */}
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-xs">
                <FileSpreadsheet className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-lg font-bold text-[var(--color-primary)] tracking-tight leading-tight truncate">
                      CashCurve
                    </span>
                    <span className="text-[9px] tracking-label uppercase font-bold text-[var(--color-accent)] px-1.5 py-0.5 rounded bg-[rgba(34,81,255,0.08)]">
                      SaaS
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-muted)] font-medium leading-none mt-0.5 truncate">
                    Schedule-Driven Cash Flow
                  </p>
                </div>
              )}
            </div>

            {/* Collapse/Expand Toggle on Desktop */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-1.5 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.04)] rounded-md transition-colors"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <PanelLeft className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>

              {/* Close Button on Mobile */}
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 text-[var(--color-muted)] hover:text-[var(--color-primary)] rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Audit & Sync Status Widget */}
          {!isCollapsed && (
            <div className="p-3.5 mx-3 mt-3 rounded-xl bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
                  MATHEMATICAL INTEGRITY
                </span>
                {audit.isPassed ? (
                  <span
                    id="sidebar-audit-badge"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[rgba(0,200,83,0.12)] text-[#008738]"
                    title="All 4 audit checks passed: Bid total matches Engine allocation and converges to 100%"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
                    PASS
                  </span>
                ) : (
                  <span
                    id="sidebar-audit-badge"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[rgba(211,47,47,0.12)] text-[var(--color-negative)]"
                    title={`Variance: ${audit.varianceAmount.toFixed(2)}`}
                  >
                    <AlertCircle className="w-3 h-3" />
                    AUDIT
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[var(--color-muted)] pt-1 border-t border-[rgba(5,28,44,0.06)]">
                <span className="flex items-center gap-1">
                  <Save className="w-3 h-3 text-[var(--color-accent)]" />
                  <span>Auto-saved</span>
                </span>
                <span className="font-mono font-semibold text-[var(--color-primary)] text-[10px]">
                  {lastSavedTime || 'Just now'}
                </span>
              </div>
            </div>
          )}

          {/* Collapsed Audit Mini Dot */}
          {isCollapsed && (
            <div className="py-3 flex justify-center border-b border-[var(--color-border)]">
              <span
                className={`w-3 h-3 rounded-full ${
                  audit.isPassed ? 'bg-[#00C853]' : 'bg-[var(--color-negative)]'
                } ring-4 ring-[rgba(5,28,44,0.04)]`}
                title={audit.isPassed ? 'Audit Passed' : 'Audit Variance Detected'}
              />
            </div>
          )}

          {/* Navigation Section */}
          <div className="px-3 pt-4 pb-2">
            {!isCollapsed && (
              <span className="block px-2.5 pb-2 text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
                WORKBOOK SHEETS
              </span>
            )}
            <nav className="space-y-1">
              {SHEETS.map((sheet) => {
                const isActive = activeSheet === sheet.id;
                const IconComponent = sheet.icon;

                return (
                  <button
                    key={sheet.id}
                    id={`sidebar-tab-${sheet.id.toLowerCase()}`}
                    onClick={() => handleSheetClick(sheet.id)}
                    className={`w-full flex items-center rounded-xl transition-all duration-150 group text-left ${
                      isCollapsed
                        ? 'justify-center p-3'
                        : 'px-3 py-2.5 gap-3'
                    } ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-semibold shadow-xs'
                        : 'text-[var(--color-body-text)] hover:bg-[rgba(5,28,44,0.03)] hover:text-[var(--color-primary)]'
                    }`}
                    title={`${sheet.code}: ${sheet.title}`}
                  >
                    {/* Icon */}
                    <span
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-white'
                          : 'bg-[rgba(5,28,44,0.04)] text-[var(--color-muted)] group-hover:text-[var(--color-primary)]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 shrink-0" />
                    </span>

                    {/* Labels (when not collapsed) */}
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold leading-tight truncate">
                            {sheet.code}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                          )}
                        </div>
                        <p
                          className={`text-[11px] truncate leading-tight mt-0.5 ${
                            isActive
                              ? 'text-[var(--color-accent)] opacity-90'
                              : 'text-[var(--color-muted)]'
                          }`}
                        >
                          {sheet.title}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Section: Quick Data Tools & Actions */}
        <div className="p-3 border-t border-[var(--color-border)] space-y-2">
          {!isCollapsed && (
            <span className="block px-2.5 pb-1 text-[10px] font-bold uppercase tracking-label text-[var(--color-muted)]">
              DATA MANAGEMENT
            </span>
          )}

          <div className="space-y-1">
            {/* Bulk CSV Import */}
            <button
              id="sidebar-btn-csv"
              onClick={() => {
                onOpenCsvModal();
                setMobileOpen(false);
              }}
              className={`w-full flex items-center rounded-lg text-xs font-medium text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 gap-2.5'
              }`}
              title="Bulk CSV Import bid items"
            >
              <FileText className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              {!isCollapsed && <span>Bulk CSV Import</span>}
            </button>

            {/* Export Backup */}
            <button
              id="sidebar-btn-export"
              onClick={() => {
                onExportBackup();
                setMobileOpen(false);
              }}
              className={`w-full flex items-center rounded-lg text-xs font-medium text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 gap-2.5'
              }`}
              title="Export JSON backup file"
            >
              <Download className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
              {!isCollapsed && <span>Export Backup</span>}
            </button>

            {/* Import Backup */}
            <button
              id="sidebar-btn-import"
              onClick={() => {
                onOpenImport();
                setMobileOpen(false);
              }}
              className={`w-full flex items-center rounded-lg text-xs font-medium text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 gap-2.5'
              }`}
              title="Restore JSON backup"
            >
              <Upload className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
              {!isCollapsed && <span>Import Backup</span>}
            </button>

            {/* Reset Data */}
            <button
              id="sidebar-btn-reset"
              onClick={() => {
                onOpenResetConfirm();
                setMobileOpen(false);
              }}
              className={`w-full flex items-center rounded-lg text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-negative)] hover:bg-[rgba(211,47,47,0.05)] transition-colors ${
                isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 gap-2.5'
              }`}
              title="Reset to default NCDOT model"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Reset Baseline</span>}
            </button>
          </div>

          {/* Privacy Note Badge */}
          {!isCollapsed && (
            <div className="pt-2 border-t border-[rgba(5,28,44,0.05)] flex items-center gap-2 px-1 text-[10px] text-[var(--color-muted)]">
              <Database className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span className="truncate">Browser Local Storage Only</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
