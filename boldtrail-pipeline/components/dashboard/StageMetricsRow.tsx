'use client'

import type { StageMetrics } from '@/lib/types'
import { STAGE_BY_ID } from '@/lib/constants'
import { formatCurrency } from '@/components/ui/FormatNumber'

interface StageMetricsRowProps {
  metrics: StageMetrics[]
}

export function StageMetricsRow({ metrics }: StageMetricsRowProps) {
  const displayStages = metrics.filter((m) => {
    const def = STAGE_BY_ID[m.stage]
    return !def.isTerminal && m.stage !== 'sphere'
  })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
      {displayStages.map((m) => {
        const def = STAGE_BY_ID[m.stage]
        return (
          <div
            key={m.stage}
            className="card p-4 flex flex-col gap-1.5 hover:shadow-card-hover transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: def.hex }} />
              <span className="text-xs font-semibold text-brand-muted truncate leading-none">
                {def.shortLabel}
              </span>
            </div>
            <span className="text-2xl font-bold text-brand-navy leading-none">{m.dealCount}</span>
            <span className="text-xs text-brand-muted leading-none">{formatCurrency(m.forecastGCI)}</span>
          </div>
        )
      })}
    </div>
  )
}
