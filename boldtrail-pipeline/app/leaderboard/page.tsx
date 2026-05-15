'use client'

import { useState } from 'react'
import type { TimePeriod } from '@/lib/types'
import { Header } from '@/components/layout/Header'
import { MetricSelector } from '@/components/leaderboard/MetricSelector'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { TeamSummaryCards } from '@/components/leaderboard/TeamSummaryCards'
import { getLeaderboard, getAgentMetrics, type LeaderboardMetric } from '@/lib/calculations'

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<TimePeriod>('ytd')
  const [metric, setMetric] = useState<LeaderboardMetric>('closings')

  const leaderboard = getLeaderboard(period, metric)
  const allMetrics = getAgentMetrics(period)

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Leaderboard"
        subtitle="Agent performance rankings"
        period={period}
        onPeriodChange={setPeriod}
      />

      <div className="flex-1 p-6 space-y-5 overflow-auto">
        <TeamSummaryCards metrics={allMetrics} />
        <MetricSelector value={metric} onChange={setMetric} />
        <LeaderboardTable data={leaderboard as any} metric={metric} />
      </div>
    </div>
  )
}
