'use client'

import { TrendingUp, DollarSign, CheckCircle, Clock } from 'lucide-react'
import type { PipelineSummary } from '@/lib/calculations'
import { formatCurrency, formatGCI } from '@/components/ui/FormatNumber'

interface SummaryKPIRowProps {
  summary: PipelineSummary
}

export function SummaryKPIRow({ summary }: SummaryKPIRowProps) {
  const kpis = [
    {
      label: 'Active Pipeline',
      value: summary.activeDeals.toString(),
      sub: formatCurrency(summary.totalPipelineValue) + ' est. value',
      icon: TrendingUp,
      gradient: true,
    },
    {
      label: 'Forecast GCI',
      value: formatCurrency(summary.totalForecastGCI),
      sub: 'probability-weighted',
      icon: DollarSign,
      accent: true,
    },
    {
      label: 'Closed (Period)',
      value: summary.closedWonCount.toString(),
      sub: formatGCI(summary.closedWonGCI) + ' GCI earned',
      icon: CheckCircle,
      green: true,
    },
    {
      label: 'Under Contract',
      value: summary.underContractCount.toString(),
      sub: formatCurrency(summary.underContractValue) + ' in escrow',
      icon: Clock,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(({ label, value, sub, icon: Icon, gradient, accent, green }) => (
        <div
          key={label}
          className={`stat-card flex flex-col gap-3 ${gradient ? 'text-white' : ''}`}
          style={gradient ? { background: 'linear-gradient(135deg, #05205E 0%, #364C7E 100%)' } : {}}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${gradient ? 'text-blue-200' : 'text-brand-muted'}`}>
              {label}
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                gradient ? 'bg-white/10' : green ? 'bg-emerald-50' : accent ? 'bg-pink-50' : 'bg-brand-gray-light'
              }`}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: gradient ? '#fff' : green ? '#34d399' : accent ? '#f00069' : '#364C7E' }}
              />
            </div>
          </div>
          <div>
            <span className={`text-3xl font-bold leading-none block ${gradient ? 'text-white' : 'text-brand-navy'}`}>
              {value}
            </span>
            <span className={`text-xs mt-1 block ${gradient ? 'text-blue-200' : 'text-brand-muted'}`}>
              {sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
