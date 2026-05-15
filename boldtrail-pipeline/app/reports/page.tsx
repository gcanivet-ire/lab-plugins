'use client'

import { useState } from 'react'
import type { TimePeriod } from '@/lib/types'
import { Header } from '@/components/layout/Header'
import { AgentSelector } from '@/components/reports/AgentSelector'
import { AgentSummaryCard } from '@/components/reports/AgentSummaryCard'
import { ActivityBreakdown } from '@/components/reports/ActivityBreakdown'
import { ConversionRateTable } from '@/components/reports/ConversionRateTable'
import { getAgentMetrics } from '@/lib/calculations'
import { AGENTS } from '@/lib/mock-data'

export default function ReportsPage() {
  const [period, setPeriod] = useState<TimePeriod>('ytd')
  const [selectedAgentId, setSelectedAgentId] = useState<string>('all')

  const allMetrics = getAgentMetrics(period)
  const selectedMetrics =
    selectedAgentId === 'all'
      ? allMetrics[0]
      : allMetrics.find((m) => m.agentId === selectedAgentId) ?? allMetrics[0]

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Agent Reports"
        subtitle="Performance analytics and conversion rates"
        period={period}
        onPeriodChange={setPeriod}
      />

      <div className="flex-1 p-6 space-y-5 overflow-auto">
        <AgentSelector value={selectedAgentId} onChange={setSelectedAgentId} />
        {selectedMetrics && <AgentSummaryCard metrics={selectedMetrics} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ActivityBreakdown metrics={allMetrics} selectedAgentId={selectedAgentId} />
          <ConversionRateTable agentId={selectedAgentId} period={period} />
        </div>
      </div>
    </div>
  )
}
