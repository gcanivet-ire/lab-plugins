'use client'

import { Phone, Mail, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react'
import type { AgentMetrics } from '@/lib/types'

interface ActivityBreakdownProps {
  metrics: AgentMetrics[]
  selectedAgentId: string
}

const ROW_DEFS = [
  { key: 'calls' as const, label: 'Calls Made', icon: Phone, color: '#05205E' },
  { key: 'emails' as const, label: 'Emails Sent', icon: Mail, color: '#364C7E' },
  { key: 'texts' as const, label: 'Texts Sent', icon: MessageSquare, color: '#818cf8' },
  { key: 'appointmentsSet' as const, label: 'Appointments Set', icon: Calendar, color: '#CD00FC' },
  { key: 'appointmentsMet' as const, label: 'Appointments Met', icon: CheckCircle2, color: '#f00069' },
]

export function ActivityBreakdown({ metrics, selectedAgentId }: ActivityBreakdownProps) {
  const agentData = selectedAgentId === 'all'
    ? null
    : metrics.find((m) => m.agentId === selectedAgentId)

  const teamTotals = metrics.reduce(
    (acc, m) => {
      ROW_DEFS.forEach(({ key }) => { acc[key] = (acc[key] ?? 0) + (m[key] as number) })
      return acc
    },
    {} as Record<string, number>
  )

  const displayData = agentData ?? { ...teamTotals }

  return (
    <div className="card p-5">
      <h2 className="section-title mb-4">Activity Breakdown</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-gray-light">
            <th className="px-4 py-3 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Activity Type</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-brand-muted uppercase tracking-wider">Count</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider">Distribution</th>
          </tr>
        </thead>
        <tbody>
          {ROW_DEFS.map(({ key, label, icon: Icon, color }) => {
            const value = (displayData as any)[key] ?? 0
            const max = Math.max(...ROW_DEFS.map(({ key: k }) => (displayData as any)[k] ?? 0), 1)
            const width = (value / max) * 100

            return (
              <tr key={key} className="border-t border-brand-gray-mid">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <span className="font-medium text-brand-navy">{label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-bold text-brand-navy">{value}</td>
                <td className="px-4 py-3 w-48">
                  <div className="h-2 rounded-full bg-brand-gray-mid overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${width}%`, backgroundColor: color }} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {(() => {
        const set = (displayData as any).appointmentsSet ?? 0
        const met = (displayData as any).appointmentsMet ?? 0
        const rate = set > 0 ? Math.round((met / set) * 100) : 0
        return (
          <div className="mt-4 pt-4 border-t border-brand-gray-mid flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-muted">Appointment Show Rate</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-brand-gray-mid overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${rate}%`, background: 'linear-gradient(90deg, #DC00F9, #FE0007)' }} />
              </div>
              <span className="text-lg font-bold" style={{ color: rate >= 70 ? '#34d399' : rate >= 50 ? '#fbbf24' : '#f00069' }}>
                {rate}%
              </span>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
