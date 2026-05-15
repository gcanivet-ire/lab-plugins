'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import type { Deal } from '@/lib/types'
import { CONTACT_BY_ID, AGENT_BY_ID } from '@/lib/mock-data'
import { STAGE_BY_ID } from '@/lib/constants'
import { StageBadge } from './StageBadge'
import { formatCurrency } from '@/components/ui/FormatNumber'
import { formatDistanceToNow } from 'date-fns'

type SortKey = 'contact' | 'agent' | 'stage' | 'value' | 'forecastGCI' | 'probability' | 'lastActivity'
type SortDir = 'asc' | 'desc'

interface OpportunityTableProps {
  deals: Deal[]
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="w-3 h-3 text-brand-muted" />
  return sortDir === 'asc'
    ? <ChevronUp className="w-3 h-3 text-brand-navy" />
    : <ChevronDown className="w-3 h-3 text-brand-navy" />
}

export function OpportunityTable({ deals }: OpportunityTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('lastActivity')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...deals].sort((a, b) => {
    let cmp = 0
    const contactA = CONTACT_BY_ID[a.contactId]
    const contactB = CONTACT_BY_ID[b.contactId]
    const agentA = AGENT_BY_ID[a.agentId]
    const agentB = AGENT_BY_ID[b.agentId]

    switch (sortKey) {
      case 'contact': cmp = `${contactA?.lastName}`.localeCompare(`${contactB?.lastName}`); break
      case 'agent': cmp = `${agentA?.name}`.localeCompare(`${agentB?.name}`); break
      case 'stage': cmp = (STAGE_BY_ID[a.stage]?.order ?? 0) - (STAGE_BY_ID[b.stage]?.order ?? 0); break
      case 'value': cmp = a.estimatedValue - b.estimatedValue; break
      case 'forecastGCI': cmp = (a.estimatedValue * a.commissionRate * a.probability) - (b.estimatedValue * b.commissionRate * b.probability); break
      case 'probability': cmp = a.probability - b.probability; break
      case 'lastActivity': cmp = new Date(a.lastActivityAt).getTime() - new Date(b.lastActivityAt).getTime(); break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const cols: { key: SortKey; label: string }[] = [
    { key: 'contact', label: 'Contact' },
    { key: 'agent', label: 'Agent' },
    { key: 'stage', label: 'Stage' },
    { key: 'value', label: 'Est. Value' },
    { key: 'forecastGCI', label: 'Forecast GCI' },
    { key: 'probability', label: 'Probability' },
    { key: 'lastActivity', label: 'Last Activity' },
  ]

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {cols.map(({ key, label }) => (
                <th key={key}>
                  <button className="flex items-center gap-1 hover:text-brand-navy transition-colors" onClick={() => toggleSort(key)}>
                    {label}
                    <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
                  </button>
                </th>
              ))}
              <th>Side</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((deal) => {
              const contact = CONTACT_BY_ID[deal.contactId]
              const agent = AGENT_BY_ID[deal.agentId]
              const forecastGCI = deal.estimatedValue * deal.commissionRate * deal.probability

              return (
                <tr key={deal.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#364C7E' }}>
                        {contact?.firstName?.[0]}{contact?.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy text-sm leading-tight">{contact?.firstName} {contact?.lastName}</p>
                        <p className="text-xs text-brand-muted leading-tight">{deal.leadSource}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: agent?.avatarColor ?? '#364C7E' }}>
                        {agent?.avatarInitials}
                      </div>
                      <span className="text-sm font-medium">{agent?.name}</span>
                    </div>
                  </td>
                  <td><StageBadge stage={deal.stage} /></td>
                  <td><span className="font-semibold text-brand-navy">{formatCurrency(deal.estimatedValue)}</span></td>
                  <td><span className="font-semibold" style={{ color: '#f00069' }}>{formatCurrency(forecastGCI)}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-brand-gray-mid overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${deal.probability * 100}%`, background: 'linear-gradient(90deg, #DC00F9, #FE0007)' }} />
                      </div>
                      <span className="text-sm font-semibold text-brand-navy">{Math.round(deal.probability * 100)}%</span>
                    </div>
                  </td>
                  <td><span className="text-xs text-brand-muted">{formatDistanceToNow(new Date(deal.lastActivityAt), { addSuffix: true })}</span></td>
                  <td>
                    <span className={`stage-badge text-xs ${deal.side === 'buyer' ? 'bg-blue-100 text-blue-700' : deal.side === 'seller' ? 'bg-rose-100 text-rose-700' : 'bg-purple-100 text-purple-700'}`}>
                      {deal.side}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="py-16 text-center text-brand-muted">No deals match the current filters.</div>
        )}
      </div>
    </div>
  )
}
