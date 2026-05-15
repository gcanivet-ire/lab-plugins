'use client'

import type { LeaderboardMetric } from '@/lib/calculations'

const METRICS: { key: LeaderboardMetric; label: string }[] = [
  { key: 'closings', label: 'Closings' },
  { key: 'gci', label: 'GCI' },
  { key: 'listings', label: 'Listings' },
  { key: 'calls', label: 'Calls' },
  { key: 'emails', label: 'Emails' },
  { key: 'appointments-set', label: 'Appts Set' },
  { key: 'appointments-met', label: 'Appts Met' },
  { key: 'pipeline-value', label: 'Pipeline' },
]

interface MetricSelectorProps {
  value: LeaderboardMetric
  onChange: (m: LeaderboardMetric) => void
}

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
  return (
    <div className="card p-1.5 flex items-center gap-1 flex-wrap">
      {METRICS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
            value === key
              ? 'text-white shadow-sm'
              : 'text-brand-muted hover:text-brand-navy hover:bg-brand-gray-light'
          }`}
          style={value === key ? { background: 'linear-gradient(135deg, #DC00F9 0%, #FE0007 100%)' } : {}}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
