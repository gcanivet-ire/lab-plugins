'use client'

import { STAGE_BY_ID, PIPELINE_STAGES } from '@/lib/constants'
import { DEALS } from '@/lib/mock-data'
import type { TimePeriod } from '@/lib/types'
import { isInPeriod } from '@/lib/calculations'

interface ConversionRateTableProps {
  agentId: string
  period: TimePeriod
}

export function ConversionRateTable({ agentId, period }: ConversionRateTableProps) {
  const stages = PIPELINE_STAGES.slice().sort((a, b) => a.order - b.order)

  const rows = stages.map((stageDef, i) => {
    const dealsAtStage = DEALS.filter(
      (d) =>
        (agentId === 'all' || d.agentId === agentId) &&
        STAGE_BY_ID[d.stage]?.order >= stageDef.order &&
        isInPeriod(d.stageChangedAt, period)
    ).length

    const dealsAtNext =
      i < stages.length - 1
        ? DEALS.filter(
            (d) =>
              (agentId === 'all' || d.agentId === agentId) &&
              STAGE_BY_ID[d.stage]?.order >= stages[i + 1].order &&
              isInPeriod(d.stageChangedAt, period)
          ).length
        : null

    const convRate =
      dealsAtNext !== null && dealsAtStage > 0
        ? Math.round((dealsAtNext / dealsAtStage) * 100)
        : null

    return { stage: stageDef, count: dealsAtStage, nextCount: dealsAtNext, convRate }
  })

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-brand-gray-mid">
        <h2 className="section-title">Funnel Conversion</h2>
        <p className="text-xs text-brand-muted mt-0.5">Deals reaching each stage and % advancing</p>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Deals Reached</th>
            <th>Advanced</th>
            <th>Conversion Rate</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ stage, count, nextCount, convRate }) => (
            <tr key={stage.id}>
              <td>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: stage.hex }} />
                  <span className="font-medium text-brand-navy">{stage.label}</span>
                </div>
              </td>
              <td className="font-bold text-brand-navy">{count}</td>
              <td className="text-brand-muted">{nextCount ?? '—'}</td>
              <td>
                {convRate !== null ? (
                  <span className="font-bold" style={{ color: convRate >= 50 ? '#34d399' : convRate >= 25 ? '#fbbf24' : '#f00069' }}>
                    {convRate}%
                  </span>
                ) : (
                  <span className="text-brand-muted">—</span>
                )}
              </td>
              <td className="w-32">
                {convRate !== null && (
                  <div className="h-1.5 rounded-full bg-brand-gray-mid overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${convRate}%`,
                        backgroundColor: convRate >= 50 ? '#34d399' : convRate >= 25 ? '#fbbf24' : '#f00069',
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
