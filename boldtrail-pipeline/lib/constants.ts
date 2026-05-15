import type { DealStage, TimePeriod } from './types'

// ─── Deal Stage Definitions ───────────────────────────────────────────────────

export interface StageDefinition {
  id: DealStage
  label: string
  shortLabel: string
  defaultProbability: number
  color: string          // Tailwind bg class
  textColor: string      // Tailwind text class
  hex: string            // Raw hex for chart rendering
  order: number
  isTerminal: boolean
}

export const DEAL_STAGES: StageDefinition[] = [
  {
    id: 'new-lead',
    label: 'New Lead',
    shortLabel: 'New Lead',
    defaultProbability: 0.05,
    color: 'bg-slate-100',
    textColor: 'text-slate-600',
    hex: '#94a3b8',
    order: 1,
    isTerminal: false,
  },
  {
    id: 'attempted',
    label: 'Attempted Contact',
    shortLabel: 'Attempted',
    defaultProbability: 0.10,
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
    hex: '#60a5fa',
    order: 2,
    isTerminal: false,
  },
  {
    id: 'engaged',
    label: 'Engaged',
    shortLabel: 'Engaged',
    defaultProbability: 0.20,
    color: 'bg-indigo-100',
    textColor: 'text-indigo-700',
    hex: '#818cf8',
    order: 3,
    isTerminal: false,
  },
  {
    id: 'nurture',
    label: 'Nurture',
    shortLabel: 'Nurture',
    defaultProbability: 0.15,
    color: 'bg-violet-100',
    textColor: 'text-violet-700',
    hex: '#a78bfa',
    order: 4,
    isTerminal: false,
  },
  {
    id: 'appointment-set',
    label: 'Appointment Set',
    shortLabel: 'Appt Set',
    defaultProbability: 0.35,
    color: 'bg-purple-100',
    textColor: 'text-purple-700',
    hex: '#c084fc',
    order: 5,
    isTerminal: false,
  },
  {
    id: 'appointment-met',
    label: 'Appointment Met',
    shortLabel: 'Appt Met',
    defaultProbability: 0.50,
    color: 'bg-fuchsia-100',
    textColor: 'text-fuchsia-700',
    hex: '#e879f9',
    order: 6,
    isTerminal: false,
  },
  {
    id: 'representation',
    label: 'Representation',
    shortLabel: 'Represent.',
    defaultProbability: 0.70,
    color: 'bg-pink-100',
    textColor: 'text-pink-700',
    hex: '#f472b6',
    order: 7,
    isTerminal: false,
  },
  {
    id: 'under-contract',
    label: 'Under Contract',
    shortLabel: 'Under Contract',
    defaultProbability: 0.85,
    color: 'bg-rose-100',
    textColor: 'text-rose-700',
    hex: '#f00069',
    order: 8,
    isTerminal: false,
  },
  {
    id: 'closed-won',
    label: 'Closed Won',
    shortLabel: 'Closed Won',
    defaultProbability: 1.0,
    color: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    hex: '#34d399',
    order: 9,
    isTerminal: true,
  },
  {
    id: 'closed-lost',
    label: 'Closed Lost',
    shortLabel: 'Closed Lost',
    defaultProbability: 0,
    color: 'bg-gray-100',
    textColor: 'text-gray-500',
    hex: '#9ca3af',
    order: 10,
    isTerminal: true,
  },
  {
    id: 'sphere',
    label: 'Sphere of Influence',
    shortLabel: 'SOI',
    defaultProbability: 0.05,
    color: 'bg-amber-100',
    textColor: 'text-amber-700',
    hex: '#fbbf24',
    order: 11,
    isTerminal: false,
  },
]

export const STAGE_BY_ID = Object.fromEntries(
  DEAL_STAGES.map((s) => [s.id, s])
) as Record<DealStage, StageDefinition>

// Active pipeline stages (exclude terminal + sphere for funnel)
export const PIPELINE_STAGES = DEAL_STAGES.filter(
  (s) => !s.isTerminal && s.id !== 'sphere'
)

// ─── Time Period Labels ───────────────────────────────────────────────────────

export const TIME_PERIOD_LABELS: Record<TimePeriod, string> = {
  mtd: 'Month to Date',
  ytd: 'Year to Date',
  'last-30': 'Last 30 Days',
  'last-90': 'Last 90 Days',
  'all-time': 'All Time',
}

// ─── Lead Sources ─────────────────────────────────────────────────────────────

export const LEAD_SOURCES = [
  'BoldTrail IDX',
  'Referral',
  'Sphere',
  'Open House',
  'Zillow',
  'Realtor.com',
  'Social Media',
  'Direct Mail',
  'Cold Call',
  'Sign Call',
  'Past Client',
  'Agent Referral',
]

// ─── Commission Defaults ──────────────────────────────────────────────────────

export const DEFAULT_COMMISSION_RATE = 0.025 // 2.5%
export const DEFAULT_TEAM_SPLIT = 0.7        // agent keeps 70%

// ─── Chart Colors ─────────────────────────────────────────────────────────────

export const CHART_COLORS = {
  primary: '#f00069',
  secondary: '#CD00FC',
  tertiary: '#05205E',
  quaternary: '#364C7E',
  success: '#34d399',
  warning: '#fbbf24',
  muted: '#99A4BD',
}
