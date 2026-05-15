'use client'

import { Phone, Mail, MessageSquare, Calendar, CheckCircle2, Home } from 'lucide-react'
import type { ActivitySummary } from '@/lib/calculations'

interface ActivitySummaryBarProps {
  summary: ActivitySummary
}

const METRICS = [
  { key: 'calls' as const, label: 'Calls', icon: Phone, color: '#05205E', bg: 'bg-blue-50' },
  { key: 'emails' as const, label: 'Emails', icon: Mail, color: '#364C7E', bg: 'bg-indigo-50' },
  { key: 'texts' as const, label: 'Texts', icon: MessageSquare, color: '#818cf8', bg: 'bg-violet-50' },
  { key: 'appointmentsSet' as const, label: 'Appts Set', icon: Calendar, color: '#CD00FC', bg: 'bg-purple-50' },
  { key: 'appointmentsMet' as const, label: 'Appts Met', icon: CheckCircle2, color: '#f00069', bg: 'bg-pink-50' },
  { key: 'showings' as const, label: 'Showings', icon: Home, color: '#fbbf24', bg: 'bg-amber-50' },
]

export function ActivitySummaryBar({ summary }: ActivitySummaryBarProps) {
  return (
    <div className="card p-5">
      <h2 className="section-title mb-4">Activity Summary</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {METRICS.map(({ key, label, icon: Icon, color, bg }) => (
          <div key={key} className="flex flex-col items-center text-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <span className="text-2xl font-bold text-brand-navy leading-none">{summary[key]}</span>
            <span className="text-xs text-brand-muted font-medium leading-none">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
