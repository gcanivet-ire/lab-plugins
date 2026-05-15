import { differenceInDays, isAfter, isBefore, startOfMonth, startOfYear, subDays } from 'date-fns'
import type {
  Agent,
  AgentMetrics,
  ConversionRate,
  Deal,
  DealStage,
  StageMetrics,
  TimePeriod,
} from './types'
import { DEAL_STAGES, PIPELINE_STAGES, STAGE_BY_ID } from './constants'
import { ACTIVITIES } from './mock-data/activities'
import { AGENTS, AGENT_BY_ID } from './mock-data/agents'
import { DEALS } from './mock-data/deals'
import { TRANSACTIONS } from './mock-data/transactions'

// ─── Time Period Filtering ─────────────────────────────────────────────────────

export function getPeriodRange(period: TimePeriod): { from: Date; to: Date } {
  const now = new Date()
  switch (period) {
    case 'mtd':
      return { from: startOfMonth(now), to: now }
    case 'ytd':
      return { from: startOfYear(now), to: now }
    case 'last-30':
      return { from: subDays(now, 30), to: now }
    case 'last-90':
      return { from: subDays(now, 90), to: now }
    case 'all-time':
      return { from: new Date('2020-01-01'), to: now }
  }
}

export function isInPeriod(dateStr: string, period: TimePeriod): boolean {
  const { from, to } = getPeriodRange(period)
  const d = new Date(dateStr)
  return !isBefore(d, from) && !isAfter(d, to)
}

// ─── Stage Metrics ─────────────────────────────────────────────────────────────

export function getStageMetrics(deals: Deal[]): StageMetrics[] {
  return DEAL_STAGES.map((stageDef) => {
    const stageDeals = deals.filter((d) => d.stage === stageDef.id)
    const dealCount = stageDeals.length
    const totalEstimatedValue = stageDeals.reduce((sum, d) => sum + d.estimatedValue, 0)
    const forecastGCI = stageDeals.reduce(
      (sum, d) => sum + d.estimatedValue * d.commissionRate * d.probability,
      0
    )
    const avgDaysInStage =
      dealCount > 0
        ? Math.round(
            stageDeals.reduce((sum, d) => sum + differenceInDays(new Date(), new Date(d.stageChangedAt)), 0) /
              dealCount
          )
        : 0

    return {
      stage: stageDef.id,
      dealCount,
      totalEstimatedValue,
      forecastGCI,
      avgDaysInStage,
    }
  })
}

// ─── GCI Totals ───────────────────────────────────────────────────────────────

export function getTotalForecastGCI(deals: Deal[]): number {
  return deals
    .filter((d) => d.stage !== 'closed-lost')
    .reduce((sum, d) => sum + d.estimatedValue * d.commissionRate * d.probability, 0)
}

export function getActualGCI(period: TimePeriod): number {
  return TRANSACTIONS.filter(
    (t) => t.status === 'closed' && t.closingDate && isInPeriod(t.closingDate, period)
  ).reduce((sum, t) => sum + t.gci, 0)
}

// ─── Pipeline Summary ─────────────────────────────────────────────────────────

export interface PipelineSummary {
  activeDeals: number
  totalPipelineValue: number
  totalForecastGCI: number
  underContractCount: number
  underContractValue: number
  closedWonCount: number
  closedWonGCI: number
}

export function getPipelineSummary(period: TimePeriod): PipelineSummary {
  const activeDeals = DEALS.filter(
    (d) => !['closed-won', 'closed-lost'].includes(d.stage)
  )

  const closedWon = DEALS.filter(
    (d) => d.stage === 'closed-won' && isInPeriod(d.stageChangedAt, period)
  )

  const closedWonGCI = TRANSACTIONS.filter(
    (t) => t.status === 'closed' && t.closingDate && isInPeriod(t.closingDate, period)
  ).reduce((sum, t) => sum + t.gci, 0)

  const underContract = DEALS.filter((d) => d.stage === 'under-contract')

  return {
    activeDeals: activeDeals.length,
    totalPipelineValue: activeDeals.reduce((sum, d) => sum + d.estimatedValue, 0),
    totalForecastGCI: getTotalForecastGCI(activeDeals),
    underContractCount: underContract.length,
    underContractValue: underContract.reduce((sum, d) => sum + d.estimatedValue, 0),
    closedWonCount: closedWon.length,
    closedWonGCI,
  }
}

// ─── Agent Metrics ────────────────────────────────────────────────────────────

export function getAgentMetrics(period: TimePeriod, agentId?: string): AgentMetrics[] {
  const agents = agentId ? [AGENT_BY_ID[agentId]] : AGENTS

  return agents.filter(Boolean).map((agent) => {
    const agentActivities = ACTIVITIES.filter(
      (a) => a.agentId === agent.id && isInPeriod(a.completedAt, period)
    )
    const agentDeals = DEALS.filter((d) => d.agentId === agent.id)
    const activeAgentDeals = agentDeals.filter((d) => !['closed-won', 'closed-lost'].includes(d.stage))

    const closedTransactions = TRANSACTIONS.filter(
      (t) =>
        t.agentId === agent.id &&
        t.status === 'closed' &&
        t.closingDate &&
        isInPeriod(t.closingDate, period)
    )

    const listings = agentDeals.filter(
      (d) =>
        d.side === 'seller' &&
        ['representation', 'under-contract', 'closed-won'].includes(d.stage) &&
        isInPeriod(d.stageChangedAt, period)
    ).length

    return {
      agentId: agent.id,
      agent,
      period,
      listings,
      closings: closedTransactions.length,
      gci: closedTransactions.reduce((sum, t) => sum + t.gci, 0),
      calls: agentActivities.filter((a) => a.type === 'call').length,
      emails: agentActivities.filter((a) => a.type === 'email').length,
      texts: agentActivities.filter((a) => a.type === 'text').length,
      appointmentsSet: agentActivities.filter((a) => a.type === 'appointment-set').length,
      appointmentsMet: agentActivities.filter((a) => a.type === 'appointment-met').length,
      showings: agentActivities.filter((a) => a.type === 'showing').length,
      dealsInPipeline: activeAgentDeals.length,
      pipelineValue: activeAgentDeals.reduce((sum, d) => sum + d.estimatedValue, 0),
    }
  })
}

// ─── Conversion Rates ─────────────────────────────────────────────────────────

export function getConversionRates(period: TimePeriod): ConversionRate[] {
  const stagesInOrder = PIPELINE_STAGES.slice().sort((a, b) => a.order - b.order)
  const rates: ConversionRate[] = []

  for (let i = 0; i < stagesInOrder.length - 1; i++) {
    const fromStage = stagesInOrder[i]
    const toStage = stagesInOrder[i + 1]

    const entered = DEALS.filter(
      (d) => d.stage === fromStage.id && isInPeriod(d.stageChangedAt, period)
    ).length

    const advanced = DEALS.filter((d) => {
      const stageOrder = STAGE_BY_ID[d.stage]?.order ?? 0
      return stageOrder >= toStage.order && isInPeriod(d.stageChangedAt, period)
    }).length

    rates.push({
      fromStage: fromStage.id as DealStage,
      toStage: toStage.id as DealStage,
      entered: Math.max(entered, advanced),
      advanced,
      rate: entered > 0 ? Math.round((advanced / Math.max(entered, advanced)) * 100) : 0,
    })
  }

  return rates
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export type LeaderboardMetric =
  | 'closings'
  | 'gci'
  | 'listings'
  | 'calls'
  | 'emails'
  | 'appointments-set'
  | 'appointments-met'
  | 'pipeline-value'

export function getLeaderboard(period: TimePeriod, metric: LeaderboardMetric) {
  const allMetrics = getAgentMetrics(period)

  const getValue = (m: AgentMetrics): number => {
    switch (metric) {
      case 'closings':        return m.closings
      case 'gci':             return m.gci
      case 'listings':        return m.listings
      case 'calls':           return m.calls
      case 'emails':          return m.emails
      case 'appointments-set': return m.appointmentsSet
      case 'appointments-met': return m.appointmentsMet
      case 'pipeline-value':  return m.pipelineValue
    }
  }

  return allMetrics
    .map((m) => ({ ...m, value: getValue(m) }))
    .sort((a, b) => b.value - a.value)
    .map((m, i) => ({ ...m, rank: i + 1 }))
}

// ─── Activity Summary ─────────────────────────────────────────────────────────

export interface ActivitySummary {
  calls: number
  emails: number
  texts: number
  appointmentsSet: number
  appointmentsMet: number
  showings: number
  total: number
}

export function getActivitySummary(period: TimePeriod, agentId?: string): ActivitySummary {
  const filtered = ACTIVITIES.filter(
    (a) =>
      isInPeriod(a.completedAt, period) &&
      (!agentId || a.agentId === agentId)
  )

  return {
    calls: filtered.filter((a) => a.type === 'call').length,
    emails: filtered.filter((a) => a.type === 'email').length,
    texts: filtered.filter((a) => a.type === 'text').length,
    appointmentsSet: filtered.filter((a) => a.type === 'appointment-set').length,
    appointmentsMet: filtered.filter((a) => a.type === 'appointment-met').length,
    showings: filtered.filter((a) => a.type === 'showing').length,
    total: filtered.length,
  }
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000)}K`
  }
  return `$${amount.toLocaleString()}`
}

export function formatGCI(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}
