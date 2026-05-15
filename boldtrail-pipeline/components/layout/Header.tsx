'use client'

import { RefreshCw, Bell } from 'lucide-react'
import type { TimePeriod } from '@/lib/types'
import { TIME_PERIOD_LABELS } from '@/lib/constants'

const PERIOD_OPTIONS: TimePeriod[] = ['mtd', 'ytd', 'last-30', 'last-90', 'all-time']

interface HeaderProps {
  title: string
  subtitle?: string
  showPeriodSelector?: boolean
  period?: TimePeriod
  onPeriodChange?: (period: TimePeriod) => void
}

export function Header({
  title,
  subtitle,
  showPeriodSelector = true,
  period = 'ytd',
  onPeriodChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-brand-gray-mid px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-brand-navy leading-none">{title}</h1>
        {subtitle && <p className="text-sm text-brand-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {showPeriodSelector && onPeriodChange && (
          <div className="flex items-center bg-brand-gray-light rounded-lg p-1 gap-0.5">
            {PERIOD_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  period === p
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                {p === 'mtd' ? 'MTD' : p === 'ytd' ? 'YTD' : p === 'last-30' ? '30d' : p === 'last-90' ? '90d' : 'All'}
              </button>
            ))}
          </div>
        )}

        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-gray-light transition-colors"
          title="Sync with BoldTrail"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-gray-light transition-colors relative">
          <Bell className="w-4 h-4" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#f00069' }}
          />
        </button>
      </div>
    </header>
  )
}
