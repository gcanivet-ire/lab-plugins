'use client'

import { Trophy } from 'lucide-react'
import type { AgentMetrics } from '@/lib/types'
import { formatCurrency, formatGCI } from '@/components/ui/FormatNumber'
import type { LeaderboardMetric } from '@/lib/calculations'

interface RankedAgent extends AgentMetrics {
  rank: number
  value: number
}

interface LeaderboardTableProps {
  data: RankedAgent[]
  metric: LeaderboardMetric
}

const METRIC_LABELS: Record<LeaderboardMetric, { label: string; format: (n: number) => string }> = {
  closings: { label: 'Closings', format: (n) => n.toString() },
  gci: { label: 'GCI Earned', format: (n) => formatGCI(n) },
  listings: { label: 'Listings Taken', format: (n) => n.toString() },
  calls: { label: 'Calls Made', format: (n) => n.toString() },
  emails: { label: 'Emails Sent', format: (n) => n.toString() },
  'appointments-set': { label: 'Appointments Set', format: (n) => n.toString() },
  'appointments-met': { label: 'Appointments Met', format: (n) => n.toString() },
  'pipeline-value': { label: 'Pipeline Value', format: (n) => formatCurrency(n) },
}

const RANK_STYLES = [
  { bg: 'bg-amber-50', text: 'text-amber-500', border: 'border-amber-200' },
  { bg: 'bg-gray-50', text: 'text-gray-400', border: 'border-gray-200' },
  { bg: 'bg-orange-50', text: 'text-orange-400', border: 'border-orange-200' },
]

export function LeaderboardTable({ data, metric }: LeaderboardTableProps) {
  const { label, format } = METRIC_LABELS[metric]
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-brand-gray-mid flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="section-title">Leaderboard</h2>
        </div>
        <span className="text-sm font-semibold text-brand-muted">{label}</span>
      </div>

      <div className="divide-y divide-brand-gray-mid">
        {data.map((entry) => {
          const rankStyle = RANK_STYLES[entry.rank - 1]
          const barWidth = maxValue > 0 ? (entry.value / maxValue) * 100 : 0

          return (
            <div key={entry.agentId} className="flex items-center gap-4 px-5 py-4 hover:bg-brand-gray-light transition-colors">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border flex-shrink-0 ${
                  rankStyle
                    ? `${rankStyle.bg} ${rankStyle.text} ${rankStyle.border}`
                    : 'bg-brand-gray-light text-brand-muted border-brand-gray-mid'
                }`}
              >
                {entry.rank <= 3 ? (
                  <Trophy className={`w-3.5 h-3.5 ${rankStyle?.text ?? 'text-brand-muted'}`} />
                ) : (
                  entry.rank
                )}
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: entry.agent.avatarColor }}>
                {entry.agent.avatarInitials}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-navy text-sm leading-tight">{entry.agent.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-brand-muted capitalize">{entry.agent.tier.replace('-', ' ')}</span>
                  <span className="text-brand-gray-mid text-xs">·</span>
                  <span className="text-xs text-brand-muted">{entry.dealsInPipeline} active deals</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-brand-gray-mid overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      background: entry.rank === 1
                        ? 'linear-gradient(90deg, #DC00F9, #FE0007)'
                        : entry.rank === 2
                        ? 'linear-gradient(90deg, #364C7E, #05205E)'
                        : '#99A4BD',
                    }}
                  />
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold leading-none" style={{ color: entry.rank === 1 ? '#f00069' : '#05205E' }}>
                  {format(entry.value)}
                </p>
                <p className="text-xs text-brand-muted mt-0.5">{label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
