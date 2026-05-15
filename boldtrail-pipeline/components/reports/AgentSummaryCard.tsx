'use client'

import type { AgentMetrics } from '@/lib/types'
import { formatGCI, formatCurrency } from '@/components/ui/FormatNumber'

interface AgentSummaryCardProps {
  metrics: AgentMetrics
}

export function AgentSummaryCard({ metrics }: AgentSummaryCardProps) {
  const { agent } = metrics
  const apptConversion =
    metrics.appointmentsSet > 0
      ? Math.round((metrics.appointmentsMet / metrics.appointmentsSet) * 100)
      : 0

  return (
    <div
      className="card p-5 flex flex-col sm:flex-row gap-5"
      style={{ background: 'linear-gradient(135deg, #05205E 0%, #364C7E 100%)' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
        style={{ backgroundColor: agent.avatarColor }}
      >
        {agent.avatarInitials}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
            <p className="text-blue-200 text-sm mt-0.5 capitalize">
              {agent.tier.replace('-', ' ')} · {agent.email}
            </p>
          </div>
          <span className="px-3 py-1 rounded-pill text-xs font-semibold text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
            {metrics.dealsInPipeline} active deals
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4">
          {[
            { label: 'Closings', value: metrics.closings.toString() },
            { label: 'GCI', value: formatGCI(metrics.gci) },
            { label: 'Listings', value: metrics.listings.toString() },
            { label: 'Calls', value: metrics.calls.toString() },
            { label: 'Appts Set', value: metrics.appointmentsSet.toString() },
            { label: 'Appt Conv.', value: `${apptConversion}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white font-bold text-lg leading-none">{value}</p>
              <p className="text-blue-200 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
