import type { Deal, DealStage } from '../types'
import { STAGE_BY_ID } from '../constants'

function deal(
  id: string,
  contactId: string,
  agentId: string,
  stage: DealStage,
  estimatedValue: number,
  leadSource: string,
  createdAt: string,
  lastActivityAt: string,
  stageChangedAt: string,
  side: Deal['side'] = 'buyer',
  propertyType: Deal['propertyType'] = 'residential',
  probabilityOverride?: number,
  transactionId?: string
): Deal {
  return {
    id,
    contactId,
    agentId,
    stage,
    estimatedValue,
    commissionRate: 0.025,
    probability: probabilityOverride ?? STAGE_BY_ID[stage].defaultProbability,
    leadSource,
    propertyType,
    side,
    createdAt,
    lastActivityAt,
    stageChangedAt,
    transactionId,
  }
}

export const DEALS: Deal[] = [
  // ── New Lead ──────────────────────────────────────────────────────────────
  deal('d-001', 'c-049', 'agent-005', 'new-lead', 620000, 'Cold Call', '2026-04-09', '2026-04-09', '2026-04-09'),
  deal('d-002', 'c-050', 'agent-008', 'new-lead', 540000, 'Realtor.com', '2026-04-10', '2026-04-10', '2026-04-10'),
  deal('d-003', 'c-051', 'agent-006', 'new-lead', 780000, 'BoldTrail IDX', '2026-04-10', '2026-04-10', '2026-04-10'),
  deal('d-004', 'c-052', 'agent-003', 'new-lead', 495000, 'Sign Call', '2026-04-11', '2026-04-11', '2026-04-11'),
  deal('d-005', 'c-054', 'agent-007', 'new-lead', 850000, 'Zillow', '2026-04-08', '2026-04-08', '2026-04-08', 'seller'),

  // ── Attempted Contact ─────────────────────────────────────────────────────
  deal('d-006', 'c-043', 'agent-005', 'attempted', 590000, 'Social Media', '2026-03-28', '2026-04-05', '2026-04-01'),
  deal('d-007', 'c-044', 'agent-006', 'attempted', 475000, 'Open House', '2026-04-01', '2026-04-08', '2026-04-03'),
  deal('d-008', 'c-047', 'agent-008', 'attempted', 920000, 'BoldTrail IDX', '2026-04-02', '2026-04-09', '2026-04-04'),
  deal('d-009', 'c-053', 'agent-004', 'attempted', 670000, 'Direct Mail', '2026-03-25', '2026-04-07', '2026-03-28', 'seller'),
  deal('d-010', 'c-048', 'agent-001', 'attempted', 1100000, 'Past Client', '2026-03-30', '2026-04-08', '2026-04-01', 'seller'),

  // ── Engaged ───────────────────────────────────────────────────────────────
  deal('d-011', 'c-040', 'agent-001', 'engaged', 745000, 'BoldTrail IDX', '2026-03-15', '2026-04-07', '2026-03-25'),
  deal('d-012', 'c-041', 'agent-003', 'engaged', 530000, 'Zillow', '2026-03-18', '2026-04-05', '2026-03-28'),
  deal('d-013', 'c-042', 'agent-002', 'engaged', 880000, 'Agent Referral', '2026-03-10', '2026-04-06', '2026-03-20', 'seller'),
  deal('d-014', 'c-045', 'agent-007', 'engaged', 610000, 'Sphere', '2026-03-20', '2026-04-04', '2026-03-30', 'seller'),
  deal('d-015', 'c-046', 'agent-004', 'engaged', 420000, 'Referral', '2026-03-22', '2026-04-08', '2026-04-01'),

  // ── Nurture ───────────────────────────────────────────────────────────────
  deal('d-016', 'c-030', 'agent-003', 'nurture', 680000, 'Sphere', '2025-11-10', '2026-04-01', '2025-12-01'),
  deal('d-017', 'c-025', 'agent-005', 'nurture', 510000, 'Direct Mail', '2025-10-15', '2026-03-28', '2025-11-20'),
  deal('d-018', 'c-017', 'agent-006', 'nurture', 820000, 'Cold Call', '2025-09-01', '2026-03-15', '2025-10-01'),
  deal('d-019', 'c-023', 'agent-008', 'nurture', 440000, 'Open House', '2025-12-05', '2026-04-05', '2025-12-20'),
  deal('d-020', 'c-027', 'agent-007', 'nurture', 960000, 'Zillow', '2025-11-20', '2026-04-02', '2025-12-10'),

  // ── Appointment Set ───────────────────────────────────────────────────────
  deal('d-021', 'c-033', 'agent-001', 'appointment-set', 895000, 'Realtor.com', '2026-03-20', '2026-04-09', '2026-04-05'),
  deal('d-022', 'c-034', 'agent-002', 'appointment-set', 650000, 'Open House', '2026-03-25', '2026-04-08', '2026-04-06'),
  deal('d-023', 'c-035', 'agent-003', 'appointment-set', 1250000, 'BoldTrail IDX', '2026-03-18', '2026-04-07', '2026-04-03', 'buyer', 'residential'),
  deal('d-024', 'c-037', 'agent-007', 'appointment-set', 580000, 'Past Client', '2026-03-28', '2026-04-09', '2026-04-07'),
  deal('d-025', 'c-039', 'agent-004', 'appointment-set', 730000, 'Direct Mail', '2026-03-22', '2026-04-06', '2026-04-02', 'seller'),

  // ── Appointment Met ───────────────────────────────────────────────────────
  deal('d-026', 'c-028', 'agent-002', 'appointment-met', 975000, 'BoldTrail IDX', '2026-02-20', '2026-04-05', '2026-03-28'),
  deal('d-027', 'c-029', 'agent-001', 'appointment-met', 1450000, 'Agent Referral', '2026-02-10', '2026-04-08', '2026-03-25', 'seller'),
  deal('d-028', 'c-036', 'agent-003', 'appointment-met', 620000, 'Referral', '2026-03-01', '2026-04-07', '2026-04-01'),
  deal('d-029', 'c-038', 'agent-007', 'appointment-met', 540000, 'Sign Call', '2026-03-05', '2026-04-06', '2026-04-03'),
  deal('d-030', 'c-032', 'agent-004', 'appointment-met', 870000, 'Social Media', '2026-02-28', '2026-04-04', '2026-03-22', 'seller'),

  // ── Representation ────────────────────────────────────────────────────────
  deal('d-031', 'c-020', 'agent-001', 'representation', 1100000, 'Realtor.com', '2026-01-15', '2026-04-07', '2026-03-10', 'buyer', 'residential', 0.72),
  deal('d-032', 'c-022', 'agent-002', 'representation', 875000, 'Referral', '2026-01-20', '2026-04-06', '2026-03-05', 'seller', 'residential', 0.68),
  deal('d-033', 'c-024', 'agent-007', 'representation', 1350000, 'Past Client', '2026-01-05', '2026-04-08', '2026-03-15', 'seller', 'residential', 0.75),
  deal('d-034', 'c-026', 'agent-003', 'representation', 660000, 'Sign Call', '2026-02-01', '2026-04-05', '2026-03-20'),
  deal('d-035', 'c-031', 'agent-004', 'representation', 790000, 'Cold Call', '2026-01-25', '2026-04-04', '2026-03-08', 'buyer', 'residential', 0.70),

  // ── Under Contract ────────────────────────────────────────────────────────
  deal('d-036', 'c-013', 'agent-001', 'under-contract', 1280000, 'Zillow', '2025-11-01', '2026-04-08', '2026-03-20', 'buyer', 'residential', 0.88, 'txn-001'),
  deal('d-037', 'c-015', 'agent-002', 'under-contract', 945000, 'BoldTrail IDX', '2025-12-10', '2026-04-07', '2026-03-28', 'buyer', 'residential', 0.85, 'txn-002'),
  deal('d-038', 'c-016', 'agent-007', 'under-contract', 1580000, 'Agent Referral', '2025-11-15', '2026-04-06', '2026-03-15', 'seller', 'residential', 0.90, 'txn-003'),
  deal('d-039', 'c-018', 'agent-003', 'under-contract', 720000, 'Sphere', '2026-01-08', '2026-04-05', '2026-04-01', 'seller', 'residential', 0.87, 'txn-004'),
  deal('d-040', 'c-019', 'agent-004', 'under-contract', 855000, 'Social Media', '2025-12-20', '2026-04-04', '2026-03-25', 'buyer', 'residential', 0.83, 'txn-005'),

  // ── Closed Won ────────────────────────────────────────────────────────────
  deal('d-041', 'c-001', 'agent-001', 'closed-won', 1150000, 'BoldTrail IDX', '2025-10-01', '2026-03-15', '2026-03-15', 'buyer', 'residential', 1.0, 'txn-006'),
  deal('d-042', 'c-002', 'agent-002', 'closed-won', 875000, 'Zillow', '2025-09-15', '2026-02-28', '2026-02-28', 'seller', 'residential', 1.0, 'txn-007'),
  deal('d-043', 'c-003', 'agent-001', 'closed-won', 1340000, 'Referral', '2025-10-10', '2026-03-30', '2026-03-30', 'buyer', 'residential', 1.0, 'txn-008'),
  deal('d-044', 'c-004', 'agent-003', 'closed-won', 620000, 'Open House', '2025-11-05', '2026-03-22', '2026-03-22', 'buyer', 'residential', 1.0, 'txn-009'),
  deal('d-045', 'c-005', 'agent-002', 'closed-won', 2100000, 'Sphere', '2025-09-01', '2026-02-14', '2026-02-14', 'seller', 'residential', 1.0, 'txn-010'),
  deal('d-046', 'c-006', 'agent-007', 'closed-won', 785000, 'Realtor.com', '2025-11-20', '2026-04-05', '2026-04-05', 'buyer', 'residential', 1.0, 'txn-011'),
  deal('d-047', 'c-007', 'agent-004', 'closed-won', 940000, 'Social Media', '2025-10-25', '2026-03-10', '2026-03-10', 'seller', 'residential', 1.0, 'txn-012'),
  deal('d-048', 'c-008', 'agent-001', 'closed-won', 1490000, 'BoldTrail IDX', '2025-08-15', '2026-01-31', '2026-01-31', 'buyer', 'residential', 1.0, 'txn-013'),
  deal('d-049', 'c-009', 'agent-002', 'closed-won', 685000, 'Direct Mail', '2025-11-10', '2026-03-18', '2026-03-18', 'seller', 'residential', 1.0, 'txn-014'),
  deal('d-050', 'c-010', 'agent-003', 'closed-won', 1020000, 'Referral', '2025-10-05', '2026-02-22', '2026-02-22', 'buyer', 'residential', 1.0, 'txn-015'),
  deal('d-051', 'c-011', 'agent-007', 'closed-won', 830000, 'Sign Call', '2025-12-01', '2026-04-02', '2026-04-02', 'buyer', 'residential', 1.0, 'txn-016'),
  deal('d-052', 'c-012', 'agent-001', 'closed-won', 1675000, 'Past Client', '2025-09-20', '2026-01-15', '2026-01-15', 'seller', 'residential', 1.0, 'txn-017'),

  // ── Closed Lost ───────────────────────────────────────────────────────────
  deal('d-053', 'c-014', 'agent-005', 'closed-lost', 560000, 'Open House', '2025-11-15', '2025-12-20', '2025-12-20'),
  deal('d-054', 'c-021', 'agent-006', 'closed-lost', 720000, 'BoldTrail IDX', '2025-10-20', '2025-12-15', '2025-12-15', 'seller'),
  deal('d-055', 'c-055', 'agent-003', 'closed-lost', 890000, 'Agent Referral', '2025-12-01', '2026-02-01', '2026-02-01', 'seller'),

  // ── Sphere of Influence ───────────────────────────────────────────────────
  deal('d-056', 'c-002', 'agent-002', 'sphere', 950000, 'Referral', '2025-01-01', '2026-03-15', '2025-01-01'),
  deal('d-057', 'c-001', 'agent-001', 'sphere', 1200000, 'Past Client', '2024-06-01', '2026-02-20', '2024-06-01'),
  deal('d-058', 'c-004', 'agent-003', 'sphere', 680000, 'Sphere', '2024-09-10', '2026-01-05', '2024-09-10'),
]

export const DEAL_BY_ID = Object.fromEntries(
  DEALS.map((d) => [d.id, d])
) as Record<string, Deal>
