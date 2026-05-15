'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { StageMetrics } from '@/lib/types'
import { STAGE_BY_ID } from '@/lib/constants'
import { formatCurrency } from '@/components/ui/FormatNumber'

interface GCIForecastChartProps {
  metrics: StageMetrics[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="card p-3 text-sm">
      <p className="font-semibold text-brand-navy mb-1">{label}</p>
      <p className="text-brand-muted">
        Forecast GCI: <span className="font-bold text-brand-pink">{formatCurrency(payload[0]?.value ?? 0)}</span>
      </p>
      <p className="text-brand-muted text-xs mt-0.5">Deals: {payload[0]?.payload?.dealCount}</p>
    </div>
  )
}

export function GCIForecastChart({ metrics }: GCIForecastChartProps) {
  const data = metrics
    .filter((m) => {
      const def = STAGE_BY_ID[m.stage]
      return !def.isTerminal && m.stage !== 'sphere' && m.forecastGCI > 0
    })
    .map((m) => ({
      stage: STAGE_BY_ID[m.stage].shortLabel,
      forecastGCI: Math.round(m.forecastGCI),
      dealCount: m.dealCount,
      hex: STAGE_BY_ID[m.stage].hex,
    }))

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="section-title">GCI Forecast by Stage</h2>
          <p className="text-xs text-brand-muted mt-0.5">Weighted by deal probability per stage</p>
        </div>
        <div
          className="px-3 py-1 rounded-pill text-xs font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #DC00F9, #FE0007)' }}
        >
          Forecast
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#DADEE7" strokeDasharray="3 0" />
          <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#99A4BD', fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11, fill: '#99A4BD' }} axisLine={false} tickLine={false} width={60} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(5,32,94,0.04)' }} />
          <Bar dataKey="forecastGCI" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.hex} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
