'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/Header'
import { OpportunityTable } from '@/components/opportunities/OpportunityTable'
import { OpportunityFilters, type FilterState } from '@/components/opportunities/OpportunityFilters'
import { DEALS, CONTACT_BY_ID } from '@/lib/mock-data'

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    stages: [],
    agentIds: [],
    sides: [],
  })

  const filteredDeals = useMemo(() => {
    return DEALS.filter((deal) => {
      if (filters.stages.length && !filters.stages.includes(deal.stage)) return false
      if (filters.agentIds.length && !filters.agentIds.includes(deal.agentId)) return false
      if (filters.sides.length && !filters.sides.includes(deal.side)) return false
      if (filters.search) {
        const contact = CONTACT_BY_ID[deal.contactId]
        const fullName = `${contact?.firstName} ${contact?.lastName}`.toLowerCase()
        if (!fullName.includes(filters.search.toLowerCase())) return false
      }
      return true
    })
  }, [filters])

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Opportunities"
        subtitle={`${DEALS.length} total deals across all stages`}
        showPeriodSelector={false}
      />

      <div className="flex-1 p-6 space-y-4 overflow-auto">
        <OpportunityFilters
          filters={filters}
          onChange={setFilters}
          totalDeals={DEALS.length}
          filteredDeals={filteredDeals.length}
        />
        <OpportunityTable deals={filteredDeals} />
      </div>
    </div>
  )
}
