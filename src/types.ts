export type TimeScale = 'Weekly' | 'Monthly';
export type AllocationRule = 1 | 2; // 1 = Linear Pro-Rata, 2 = Milestone Lump-Sum at Completion

export interface ConfigData {
  currency: string;
  timeScale: TimeScale;
  allocRule: AllocationRule;
  roundTolerance: number;
  warnLimit: number;
}

export interface ProjectMeta {
  projectName: string;
  contractNumber: string;
  countyLocation: string;
  contractorName: string;
  scheduleDataDate: string;
}

export interface BidItem {
  id: string;
  code: string;
  description: string;
  amount: number;
  startDate: string;
  completionDate: string;
  manualWeightPct?: number | null;
}

export type RowValidationStatus =
  | 'valid'
  | 'missing_code'
  | 'missing_desc'
  | 'invalid_amount'
  | 'missing_dates'
  | 'reversed_dates';

export interface CalculatedBidItem extends BidItem {
  durationDays: number;
  effectiveWeightPct: number;
  validationStatus: RowValidationStatus;
  validationMessage: string;
  activePeriodsCount: number;
}

export interface TimelinePeriod {
  index: number;
  label: string;
  startDate: string;
  endDate: string;
  dateRangeLabel: string;
  isCurrentDataDate: boolean;
}

export interface EngineAudit {
  bidTotal: number;
  engineTotal: number;
  varianceAmount: number;
  finalProgressPct: number;
  isPassed: boolean;
  statusText: 'PASS' | 'ERR';
}

export interface EngineKPI {
  totalContractValue: number;
  projectDurationDays: number;
  projectDurationPeriods: number;
  peakPeriodValue: number;
  peakPeriodIndex: number;
  peakPeriodLabel: string;
}

export interface EngineOutput {
  minStart: string;
  maxFinish: string;
  totalPeriods: number;
  currentPeriodIndex: number;
  periods: TimelinePeriod[];
  calculatedItems: CalculatedBidItem[];
  itemAllocations: { [itemId: string]: number[] };
  periodPlannedValues: number[];
  periodPlannedWeights: number[];
  cumulativePlannedValues: number[];
  cumulativeProgressPcts: number[];
  audit: EngineAudit;
  kpi: EngineKPI;
}

export interface WorkbookState {
  config: ConfigData;
  metadata: ProjectMeta;
  items: BidItem[];
  lastSaved: string;
}

export type ActiveSheet =
  | '00_CONFIG'
  | '01_INPUT'
  | '02_ENGINE'
  | '03_MODULE_A'
  | '04_MODULE_B';
