import { ConfigData, ProjectMeta, BidItem, WorkbookState } from '../types';

export const DEFAULT_CONFIG: ConfigData = {
  currency: '$',
  timeScale: 'Weekly',
  allocRule: 1, // 1 = Linear Pro-Rata, 2 = Milestone Lump-Sum
  roundTolerance: 0.01,
  warnLimit: 0.00,
};

export const DEFAULT_METADATA: ProjectMeta = {
  projectName: 'ABC Highway Improvements',
  contractNumber: 'NCDOT-2026-C892',
  countyLocation: 'Wake County - Section B',
  contractorName: 'Granite Infrastructure Corp',
  scheduleDataDate: '2026-09-01',
};

export const DEFAULT_ITEMS: BidItem[] = [
  {
    id: 'item-1',
    code: '001',
    description: 'Mobilization & Preparatory Work',
    amount: 50000,
    startDate: '2026-09-01',
    completionDate: '2026-09-15',
    manualWeightPct: null,
  },
  {
    id: 'item-2',
    code: '002',
    description: 'Clearing & Grubbing Right-of-Way',
    amount: 40000,
    startDate: '2026-09-08',
    completionDate: '2026-09-29',
    manualWeightPct: null,
  },
  {
    id: 'item-3',
    code: '003',
    description: 'Roadway Excavation & Embankment Fill',
    amount: 180000,
    startDate: '2026-09-22',
    completionDate: '2026-10-27',
    manualWeightPct: null,
  },
  {
    id: 'item-4',
    code: '004',
    description: 'Reinforced Concrete Storm Drainage & Culverts',
    amount: 110000,
    startDate: '2026-10-06',
    completionDate: '2026-11-10',
    manualWeightPct: null,
  },
  {
    id: 'item-5',
    code: '005',
    description: 'Crushed Aggregate Base Course (CABC)',
    amount: 150000,
    startDate: '2026-10-20',
    completionDate: '2026-11-24',
    manualWeightPct: null,
  },
  {
    id: 'item-6',
    code: '006',
    description: 'Superpave Asphalt Intermediate Course Paving',
    amount: 240000,
    startDate: '2026-11-10',
    completionDate: '2026-12-15',
    manualWeightPct: null,
  },
  {
    id: 'item-7',
    code: '007',
    description: 'Asphalt Surface Course Friction Layer',
    amount: 110000,
    startDate: '2026-12-01',
    completionDate: '2026-12-22',
    manualWeightPct: null,
  },
  {
    id: 'item-8',
    code: '008',
    description: 'Steel W-Beam Highway Guardrails & End Terminals',
    amount: 60000,
    startDate: '2026-12-15',
    completionDate: '2027-01-05',
    manualWeightPct: null,
  },
  {
    id: 'item-9',
    code: '009',
    description: 'Thermoplastic Pavement Markings & Guide Signs',
    amount: 35000,
    startDate: '2026-12-22',
    completionDate: '2027-01-12',
    manualWeightPct: null,
  },
  {
    id: 'item-10',
    code: '010',
    description: 'Punch List Rectification & Final Demobilization',
    amount: 25000,
    startDate: '2027-01-05',
    completionDate: '2027-01-19',
    manualWeightPct: null,
  },
];

export const INITIAL_WORKBOOK_STATE: WorkbookState = {
  config: DEFAULT_CONFIG,
  metadata: DEFAULT_METADATA,
  items: DEFAULT_ITEMS,
  lastSaved: new Date().toISOString(),
};
