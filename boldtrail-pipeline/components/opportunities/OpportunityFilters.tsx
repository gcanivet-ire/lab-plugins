'use client'

import { Search, X } from 'lucide-react'
import type { DealStage } from '@/lib/types'
import { DEAL_STAGES } from '@/lib/constants'
import { AGENTS } from '@/lib/mock-data'

export interface FilterState {
  search: string
  stages: DealStage[]
  agentIds: string[]
  sides: string[]
}

interface OpportunityFiltersProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  totalDeals: number
  filteredDeals: number
}

export function OpportunityFilters({ filters, onChange, totalDeals, filteredDeals }: OpportunityFiltersProps) {
  const toggleStage = (stage: DealStage) => {
    const stages = filters.stages.includes(stage)
      ? filters.stages.filter((s) => s !== stage)
      : [...filters.stages, stage]
    onChange({ ...filters, stages })
  }

  const toggleAgent = (agentId: string) => {
    const agentIds = filters.agentIds.includes(agentId)
      ? filters.agentIds.filter((a) => a !== agentId)
      : [...filters.agentIds, agentId]
    onChange({ ...filters, agentIds })
  }

  const clearAll = () => onChange({ search: '', stages: [], agentIds: [], sides: [] })

  const hasFilters = filters.search || filters.stages.length || filters.agentIds.length || filters.sides.length

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="pl-9 pr-4 py-2 text-sm border border-brand-gray-mid rounded-lg bg-brand-gray-light focus:outline-none focus:ring-2 focus:border-transparent w-52"
              style={{ '--tw-ring-color': '#f00069' } as React.CSSProperties}
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => toggleAgent(agent.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  filters.agentIds.includes(agent.id)
                    ? 'text-white border-transparent'
                    : 'text-brand-muted bg-white border-brand-gray-mid hover:border-brand-blue'
                }`}
                style={filters.agentIds.includes(agent.id) ? { backgroundColor: agent.avatarColor } : {}}
              >
                {agent.avatarInitials}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-brand-muted">
            {filteredDeals === totalDeals ? `${totalDeals} deals` : `${filteredDeals} of ${totalDeals}`}
          </span>
          {hasFilters && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-pink transition-colors">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-brand-muted">Stage:</span>
        {DEAL_STAGES.map((stageDef) => (
          <button
            key={stageDef.id}
            onClick={() => toggleStage(stageDef.id)}
            className={`stage-badge transition-all text-xs ${
              filters.stages.includes(stageDef.id)
                ? `${stageDef.color} ${stageDef.textColor} ring-2`
                : 'bg-white text-brand-muted border border-brand-gray-mid hover:border-brand-blue'
            }`}
            style={filters.stages.includes(stageDef.id) ? { outlineColor: stageDef.hex } : {}}
          >
            {stageDef.shortLabel}
          </button>
        ))}
      </div>
    </div>
  )
}
