'use client'

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { ConversionRate } from '@/lib/types'
import { STAGE_BY_ID } from '@/lib/constants'

interface FunnelConversionChartProps {
  rates: ConversionRate[]
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div className="card p-3 text-sm">
      <p className="font-semibold text-brand-navy mb-1">{d.label}</p>
      <p className="text-brand-muted">
        Conversion:{' '}
        <span className="font-bold" style={{ color: d.rate >= 50 ? '#34d399' : d.rate >= 25 ? '#fbbf24' : '#f00069' }}>
          {d.rate}%
        </span>
      </p>
      <p className="text-brand-muted text-xs mt-0.5">{d.advanced} of {d.entered} advanced</p>
    </div>
  )
}

export function FunnelConversionChart({ rates }: FunnelConversionChartProps) {
  const data = rates.map((r) => ({
    label: `${STAGE_BY_ID[r.fromStage]?.shortLabel} → ${STAGE_BY_ID[r.toStage]?.shortLabel}`,
    rate: r.rate,
    entered: r.entered,
    advanced: r.advanced,
    color: r.rate >= 50 ? '#34d399' : r.rate >= 25 ? '#fbbf24' : '#f00069',
  }))

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h2 className="section-title">Stage Conversion Rates</h2>
        <p className="text-xs text-brand-muted mt-0.5">% of deals advancing from each stage to the next</p>
      </div>

      <div className="flex gap-3 mb-4 text-xs">
        {[
          { label: '≥ 50% — Strong', color: '#34d399' },
          { label: '25–49% — Moderate', color: '#fbbf24' },
          { label: '< 25% — Needs attention', color: '#f00069' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-brand-muted">{label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 40 }}>
          <CartesianGrid vertical={false} stroke="#DADEE7" strokeDasharray="3 0" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#99A4BD', fontWeight: 500 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" interval={0} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: '#99A4BD' }} axisLine={false} tickLine={false} domain={[0, 100]} width={40} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(5,32,94,0.04)' }} />
          <ReferenceLine y={50} stroke="#DADEE7" strokeDasharray="4 4" />
          <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
