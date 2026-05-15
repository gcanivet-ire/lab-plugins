'use client'

import type { AgentMetrics } from '@/lib/types'
import { formatGCI } from '@/components/ui/FormatNumber'

interface TeamSummaryCardsProps {
  metrics: AgentMetrics[]
}

export function TeamSummaryCards({ metrics }: TeamSummaryCardsProps) {
  const totals = metrics.reduce(
    (acc, m) => ({
      closings: acc.closings + m.closings,
      gci: acc.gci + m.gci,
      calls: acc.calls + m.calls,
      emails: acc.emails + m.emails,
      appointmentsSet: acc.appointmentsSet + m.appointmentsSet,
      appointmentsMet: acc.appointmentsMet + m.appointmentsMet,
    }),
    { closings: 0, gci: 0, calls: 0, emails: 0, appointmentsSet: 0, appointmentsMet: 0 }
  )

  const cards = [
    { label: 'Team Closings', value: totals.closings.toString(), color: '#34d399', bg: 'bg-emerald-50' },
    { label: 'Team GCI', value: formatGCI(totals.gci), color: '#f00069', bg: 'bg-pink-50' },
    { label: 'Total Calls', value: totals.calls.toString(), color: '#05205E', bg: 'bg-blue-50' },
    { label: 'Appts Set', value: totals.appointmentsSet.toString(), color: '#CD00FC', bg: 'bg-purple-50' },
    { label: 'Appts Met', value: totals.appointmentsMet.toString(), color: '#f00069', bg: 'bg-rose-50' },
    {
      label: 'Appt Conv.',
      value: totals.appointmentsSet > 0
        ? `${Math.round((totals.appointmentsMet / totals.appointmentsSet) * 100)}%`
        : '—',
      color: '#364C7E',
      bg: 'bg-indigo-50',
    },
  ]

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map(({ label, value, color, bg }) => (
        <div key={label} className="stat-card text-center">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2 ${bg}`}>
            <span className="text-xs font-bold" style={{ color }}>{value[0]}</span>
          </div>
          <p className="text-xl font-bold text-brand-navy leading-none">{value}</p>
          <p className="text-xs text-brand-muted mt-1 font-medium">{label}</p>
        </div>
      ))}
    </div>
  )
}
