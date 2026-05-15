'use client'

import { useState } from 'react'
import type { TimePeriod } from '@/lib/types'
import { Header } from '@/components/layout/Header'
import { SummaryKPIRow } from '@/components/dashboard/SummaryKPIRow'
import { StageMetricsRow } from '@/components/dashboard/StageMetricsRow'
import { GCIForecastChart } from '@/components/dashboard/GCIForecastChart'
import { ActivitySummaryBar } from '@/components/dashboard/ActivitySummaryBar'
import { PipelineFunnelChart } from '@/components/dashboard/PipelineFunnelChart'
import { getPipelineSummary, getStageMetrics, getActivitySummary } from '@/lib/calculations'
import { DEALS } from '@/lib/mock-data'

export default function DashboardPage() {
  const [period, setPeriod] = useState<TimePeriod>('ytd')

  const summary = getPipelineSummary(period)
  const stageMetrics = getStageMetrics(DEALS)
  const activitySummary = getActivitySummary(period)

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Pipeline Dashboard"
        subtitle="Lead-to-close overview for your team"
        period={period}
        onPeriodChange={setPeriod}
      />

      <div className="flex-1 p-6 space-y-5 overflow-auto">
        <SummaryKPIRow summary={summary} />

        <div>
          <h2 className="section-title mb-3">Deals by Stage</h2>
          <StageMetricsRow metrics={stageMetrics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GCIForecastChart metrics={stageMetrics} />
          <PipelineFunnelChart metrics={stageMetrics} />
        </div>

        <ActivitySummaryBar summary={activitySummary} />
      </div>
    </div>
  )
}
