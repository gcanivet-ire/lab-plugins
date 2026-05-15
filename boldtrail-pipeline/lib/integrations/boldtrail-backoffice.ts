/**
 * BoldTrail BackOffice Integration
 *
 * Mock implementation — replace with real BackOffice API calls once credentials are available.
 */

import type { Transaction } from '../types'
import { TRANSACTIONS, TRANSACTION_BY_ID } from '../mock-data'

export interface BackOfficeTransactionsParams {
  agentId?: string
  status?: Transaction['status']
  from?: string
  to?: string
}

export interface DealLinkResult {
  success: boolean
  transactionId: string
  dealId: string
}

export interface BoldTrailBackOffice {
  getTransactions(params?: BackOfficeTransactionsParams): Promise<Transaction[]>
  getTransaction(id: string): Promise<Transaction | null>
  linkDeal(dealId: string, transactionId: string): Promise<DealLinkResult>
  getAgentGCI(agentId: string, from: string, to: string): Promise<number>
}

export const boldTrailBackOffice: BoldTrailBackOffice = {
  async getTransactions(params = {}) {
    let results = [...TRANSACTIONS]
    if (params.agentId) results = results.filter((t) => t.agentId === params.agentId)
    if (params.status) results = results.filter((t) => t.status === params.status)
    if (params.from) {
      const from = new Date(params.from)
      results = results.filter((t) => t.closingDate && new Date(t.closingDate) >= from)
    }
    if (params.to) {
      const to = new Date(params.to)
      results = results.filter((t) => t.closingDate && new Date(t.closingDate) <= to)
    }
    return results.sort((a, b) => {
      const dateA = a.closingDate ?? a.contractDate
      const dateB = b.closingDate ?? b.contractDate
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
  },

  async getTransaction(id: string) {
    return TRANSACTION_BY_ID[id] ?? null
  },

  async linkDeal(dealId: string, transactionId: string) {
    return { success: true, transactionId, dealId }
  },

  async getAgentGCI(agentId: string, from: string, to: string) {
    const fromDate = new Date(from)
    const toDate = new Date(to)
    return TRANSACTIONS.filter(
      (t) =>
        t.agentId === agentId &&
        t.status === 'closed' &&
        t.closingDate &&
        new Date(t.closingDate) >= fromDate &&
        new Date(t.closingDate) <= toDate
    ).reduce((sum, t) => sum + t.gci, 0)
  },
}

// TODO: Real implementation
// const BACKOFFICE_API_BASE = process.env.BACKOFFICE_API_URL
// const BACKOFFICE_API_KEY  = process.env.BACKOFFICE_API_KEY
