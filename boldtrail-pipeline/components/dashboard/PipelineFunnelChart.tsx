'use client'

import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts'
import type { StageMetrics } from '@/lib/types'
import { PIPELINE_STAGES } from '@/lib/constants'
import { formatCurrency } from '@/components/ui/FormatNumber'

interface PipelineFunnelChartProps {
  metrics: StageMetrics[]
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  return (
    <div className="card p-3 text-sm">
      <p className="font-semibold text-brand-navy mb-1">{d.name}</p>
      <p className="text-brand-muted">Deals: <span className="font-bold text-brand-navy">{d.value}</span></p>
      <p className="text-brand-muted">Est. Value: <span className="font-bold text-brand-pink">{formatCurrency(d.totalValue)}</span></p>
    </div>
  )
}

export function PipelineFunnelChart({ metrics }: PipelineFunnelChartProps) {
  const data = PIPELINE_STAGES.map((stageDef) => {
    const m = metrics.find((x) => x.stage === stageDef.id)
    return {
      name: stageDef.shortLabel,
      value: m?.dealCount ?? 0,
      totalValue: m?.totalEstimatedValue ?? 0,
      fill: stageDef.hex,
    }
  }).filter((d) => d.value > 0)

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h2 className="section-title">Pipeline Funnel</h2>
        <p className="text-xs text-brand-muted mt-0.5">Active deals by stage</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <FunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel dataKey="value" data={data} isAnimationActive lastShapeType="rectangle">
            <LabelList position="right" fill="#05205E" stroke="none" dataKey="name" style={{ fontSize: '12px', fontWeight: 600 }} />
            <LabelList position="center" fill="#fff" stroke="none" dataKey="value" style={{ fontSize: '13px', fontWeight: 700 }} />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  )
}
