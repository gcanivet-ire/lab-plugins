// ─── Deal Stages ──────────────────────────────────────────────────────────────

export type DealStage =
  | 'new-lead'
  | 'attempted'
  | 'engaged'
  | 'nurture'
  | 'appointment-set'
  | 'appointment-met'
  | 'representation'
  | 'under-contract'
  | 'closed-won'
  | 'closed-lost'
  | 'sphere'

// ─── Agent ────────────────────────────────────────────────────────────────────

export type AgentTier = 'new' | 'developing' | 'producing' | 'top-producer'

export interface Agent {
  id: string
  name: string
  email: string
  phone?: string
  tier: AgentTier
  avatarInitials: string
  avatarColor: string
  joinedAt: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  leadSource: string
  tags: string[]
  crmId?: string
  createdAt: string
}

// ─── Deal / Opportunity ───────────────────────────────────────────────────────

export interface Deal {
  id: string
  contactId: string
  agentId: string
  stage: DealStage
  estimatedValue: number
  commissionRate: number
  probability: number
  leadSource: string
  propertyType: 'residential' | 'condo' | 'multi-family' | 'commercial' | 'land'
  side: 'buyer' | 'seller' | 'both'
  createdAt: string
  lastActivityAt: string
  stageChangedAt: string
  transactionId?: string
  notes?: string
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType =
  | 'call'
  | 'email'
  | 'text'
  | 'appointment-set'
  | 'appointment-met'
  | 'note'
  | 'showing'

export interface Activity {
  id: string
  dealId: string
  contactId: string
  agentId: string
  type: ActivityType
  completedAt: string
  durationMinutes?: number
  outcome?: 'connected' | 'voicemail' | 'no-answer' | 'scheduled' | 'met' | 'cancelled'
  notes?: string
}

// ─── Transaction (BackOffice) ─────────────────────────────────────────────────

export type TransactionStatus = 'under-contract' | 'closed' | 'cancelled' | 'pending'

export interface Transaction {
  id: string
  dealId: string
  agentId: string
  address: string
  city: string
  state: string
  salePrice: number
  listPrice: number
  commissionRate: number
  gci: number
  side: 'buyer' | 'seller' | 'both'
  status: TransactionStatus
  contractDate: string
  closingDate?: string
  mlsNumber?: string
}

// ─── Computed / View Types ────────────────────────────────────────────────────

export interface StageMetrics {
  stage: DealStage
  dealCount: number
  totalEstimatedValue: number
  forecastGCI: number
  avgDaysInStage: number
}

export interface AgentMetrics {
  agentId: string
  agent: Agent
  period: string
  listings: number
  closings: number
  gci: number
  calls: number
  emails: number
  texts: number
  appointmentsSet: number
  appointmentsMet: number
  showings: number
  dealsInPipeline: number
  pipelineValue: number
}

export interface ConversionRate {
  fromStage: DealStage
  toStage: DealStage
  entered: number
  advanced: number
  rate: number
}

export type TimePeriod = 'mtd' | 'ytd' | 'last-30' | 'last-90' | 'all-time'

export type LeaderboardMetric =
  | 'closings'
  | 'gci'
  | 'listings'
  | 'calls'
  | 'emails'
  | 'appointments-set'
  | 'appointments-met'
  | 'pipeline-value'
