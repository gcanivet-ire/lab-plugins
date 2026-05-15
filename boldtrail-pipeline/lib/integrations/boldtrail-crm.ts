/**
 * BoldTrail CRM Integration
 *
 * Mock implementation — replace with real BoldTrail API calls once credentials are available.
 * BoldTrail API docs: https://developers.boldtrail.com
 */

import type { Activity, Contact } from '../types'
import { CONTACTS, CONTACT_BY_ID, ACTIVITIES } from '../mock-data'

export interface CRMContactsParams {
  agentId?: string
  leadSource?: string
  tags?: string[]
  limit?: number
  offset?: number
}

export interface CRMActivitiesParams {
  contactId?: string
  agentId?: string
  from?: string
  to?: string
  type?: Activity['type']
}

export interface SyncResult {
  synced: number
  created: number
  updated: number
  errors: number
  lastSyncAt: string
}

export interface BoldTrailCRM {
  getContacts(params?: CRMContactsParams): Promise<Contact[]>
  getContact(id: string): Promise<Contact | null>
  getActivities(params?: CRMActivitiesParams): Promise<Activity[]>
  syncContacts(): Promise<SyncResult>
}

export const boldTrailCRM: BoldTrailCRM = {
  async getContacts(params = {}) {
    let results = [...CONTACTS]
    if (params.tags?.length) {
      results = results.filter((c) => params.tags!.some((tag) => c.tags.includes(tag)))
    }
    if (params.leadSource) {
      results = results.filter((c) => c.leadSource === params.leadSource)
    }
    if (params.offset) results = results.slice(params.offset)
    if (params.limit) results = results.slice(0, params.limit)
    return results
  },

  async getContact(id: string) {
    return CONTACT_BY_ID[id] ?? null
  },

  async getActivities(params = {}) {
    let results = [...ACTIVITIES]
    if (params.contactId) results = results.filter((a) => a.contactId === params.contactId)
    if (params.agentId) results = results.filter((a) => a.agentId === params.agentId)
    if (params.type) results = results.filter((a) => a.type === params.type)
    if (params.from) {
      const from = new Date(params.from)
      results = results.filter((a) => new Date(a.completedAt) >= from)
    }
    if (params.to) {
      const to = new Date(params.to)
      results = results.filter((a) => new Date(a.completedAt) <= to)
    }
    return results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
  },

  async syncContacts() {
    return { synced: CONTACTS.length, created: 3, updated: 8, errors: 0, lastSyncAt: new Date().toISOString() }
  },
}

// TODO: Real implementation
// const BOLDTRAIL_API_BASE = process.env.BOLDTRAIL_API_URL
// const BOLDTRAIL_API_KEY  = process.env.BOLDTRAIL_API_KEY
