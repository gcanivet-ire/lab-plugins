import type { Activity } from '../types'

function act(
  id: string,
  dealId: string,
  contactId: string,
  agentId: string,
  type: Activity['type'],
  completedAt: string,
  outcome?: Activity['outcome'],
  durationMinutes?: number
): Activity {
  return { id, dealId, contactId, agentId, type, completedAt, outcome, durationMinutes }
}

export const ACTIVITIES: Activity[] = [
  // Agent 1 (Sarah) - High activity
  act('a-001', 'd-041', 'c-001', 'agent-001', 'call', '2026-04-10T09:15:00Z', 'connected', 18),
  act('a-002', 'd-041', 'c-001', 'agent-001', 'email', '2026-04-09T10:30:00Z'),
  act('a-003', 'd-043', 'c-003', 'agent-001', 'call', '2026-04-10T11:00:00Z', 'connected', 22),
  act('a-004', 'd-043', 'c-003', 'agent-001', 'appointment-met', '2026-04-08T14:00:00Z', 'met', 60),
  act('a-005', 'd-048', 'c-008', 'agent-001', 'call', '2026-04-09T09:45:00Z', 'voicemail', 2),
  act('a-006', 'd-048', 'c-008', 'agent-001', 'text', '2026-04-09T10:00:00Z'),
  act('a-007', 'd-052', 'c-012', 'agent-001', 'email', '2026-04-10T08:30:00Z'),
  act('a-008', 'd-027', 'c-029', 'agent-001', 'appointment-set', '2026-04-07T15:00:00Z', 'scheduled'),
  act('a-009', 'd-036', 'c-013', 'agent-001', 'call', '2026-04-08T13:00:00Z', 'connected', 14),
  act('a-010', 'd-031', 'c-020', 'agent-001', 'email', '2026-04-09T16:00:00Z'),
  act('a-011', 'd-021', 'c-033', 'agent-001', 'call', '2026-04-10T10:30:00Z', 'connected', 25),
  act('a-012', 'd-021', 'c-033', 'agent-001', 'appointment-set', '2026-04-10T11:00:00Z', 'scheduled'),
  act('a-013', 'd-010', 'c-048', 'agent-001', 'call', '2026-04-08T09:00:00Z', 'voicemail', 2),
  act('a-014', 'd-010', 'c-048', 'agent-001', 'email', '2026-04-08T09:05:00Z'),
  act('a-015', 'd-027', 'c-029', 'agent-001', 'appointment-met', '2026-04-09T10:00:00Z', 'met', 90),

  // Agent 2 (James) - High activity
  act('a-016', 'd-042', 'c-002', 'agent-002', 'call', '2026-04-10T09:00:00Z', 'connected', 20),
  act('a-017', 'd-045', 'c-005', 'agent-002', 'email', '2026-04-09T11:00:00Z'),
  act('a-018', 'd-045', 'c-005', 'agent-002', 'call', '2026-04-10T14:00:00Z', 'connected', 30),
  act('a-019', 'd-049', 'c-009', 'agent-002', 'text', '2026-04-08T15:30:00Z'),
  act('a-020', 'd-026', 'c-028', 'agent-002', 'appointment-met', '2026-04-07T09:00:00Z', 'met', 75),
  act('a-021', 'd-026', 'c-028', 'agent-002', 'email', '2026-04-09T08:00:00Z'),
  act('a-022', 'd-037', 'c-015', 'agent-002', 'call', '2026-04-09T10:00:00Z', 'connected', 15),
  act('a-023', 'd-032', 'c-022', 'agent-002', 'appointment-set', '2026-04-08T16:00:00Z', 'scheduled'),
  act('a-024', 'd-022', 'c-034', 'agent-002', 'call', '2026-04-10T11:30:00Z', 'voicemail', 2),
  act('a-025', 'd-022', 'c-034', 'agent-002', 'text', '2026-04-10T11:35:00Z'),
  act('a-026', 'd-013', 'c-042', 'agent-002', 'email', '2026-04-09T14:00:00Z'),
  act('a-027', 'd-013', 'c-042', 'agent-002', 'call', '2026-04-10T15:00:00Z', 'connected', 28),

  // Agent 3 (Priya) - Medium-high activity
  act('a-028', 'd-044', 'c-004', 'agent-003', 'email', '2026-04-09T09:30:00Z'),
  act('a-029', 'd-050', 'c-010', 'agent-003', 'call', '2026-04-10T10:00:00Z', 'connected', 19),
  act('a-030', 'd-050', 'c-010', 'agent-003', 'appointment-set', '2026-04-10T10:30:00Z', 'scheduled'),
  act('a-031', 'd-034', 'c-026', 'agent-003', 'text', '2026-04-08T14:00:00Z'),
  act('a-032', 'd-039', 'c-018', 'agent-003', 'call', '2026-04-09T13:00:00Z', 'connected', 12),
  act('a-033', 'd-023', 'c-035', 'agent-003', 'appointment-met', '2026-04-08T11:00:00Z', 'met', 60),
  act('a-034', 'd-028', 'c-036', 'agent-003', 'email', '2026-04-10T08:00:00Z'),
  act('a-035', 'd-016', 'c-030', 'agent-003', 'call', '2026-04-01T10:00:00Z', 'voicemail', 2),
  act('a-036', 'd-004', 'c-052', 'agent-003', 'call', '2026-04-11T09:15:00Z', 'connected', 8),
  act('a-037', 'd-012', 'c-041', 'agent-003', 'email', '2026-04-08T11:30:00Z'),

  // Agent 4 (Marcus) - Medium activity
  act('a-038', 'd-047', 'c-007', 'agent-004', 'email', '2026-04-09T10:00:00Z'),
  act('a-039', 'd-047', 'c-007', 'agent-004', 'call', '2026-04-10T09:30:00Z', 'connected', 16),
  act('a-040', 'd-040', 'c-019', 'agent-004', 'call', '2026-04-08T14:30:00Z', 'connected', 21),
  act('a-041', 'd-035', 'c-031', 'agent-004', 'text', '2026-04-09T15:00:00Z'),
  act('a-042', 'd-025', 'c-039', 'agent-004', 'appointment-set', '2026-04-07T11:00:00Z', 'scheduled'),
  act('a-043', 'd-030', 'c-032', 'agent-004', 'appointment-met', '2026-04-09T14:00:00Z', 'met', 70),
  act('a-044', 'd-015', 'c-046', 'agent-004', 'email', '2026-04-08T16:00:00Z'),
  act('a-045', 'd-009', 'c-053', 'agent-004', 'call', '2026-04-07T10:00:00Z', 'no-answer', 1),

  // Agent 5 (Aisha) - Developing activity
  act('a-046', 'd-006', 'c-043', 'agent-005', 'call', '2026-04-05T10:00:00Z', 'voicemail', 2),
  act('a-047', 'd-006', 'c-043', 'agent-005', 'text', '2026-04-05T10:05:00Z'),
  act('a-048', 'd-017', 'c-025', 'agent-005', 'email', '2026-03-28T11:00:00Z'),
  act('a-049', 'd-001', 'c-049', 'agent-005', 'call', '2026-04-09T09:00:00Z', 'connected', 10),
  act('a-050', 'd-001', 'c-049', 'agent-005', 'text', '2026-04-09T09:15:00Z'),

  // Agent 6 (Ryan) - Lower activity
  act('a-051', 'd-007', 'c-044', 'agent-006', 'call', '2026-04-08T11:00:00Z', 'no-answer', 1),
  act('a-052', 'd-007', 'c-044', 'agent-006', 'email', '2026-04-08T11:10:00Z'),
  act('a-053', 'd-018', 'c-017', 'agent-006', 'text', '2026-03-15T14:00:00Z'),
  act('a-054', 'd-003', 'c-051', 'agent-006', 'call', '2026-04-10T10:00:00Z', 'connected', 8),

  // Agent 7 (Diana) - Medium-high activity
  act('a-055', 'd-046', 'c-006', 'agent-007', 'email', '2026-04-08T09:00:00Z'),
  act('a-056', 'd-046', 'c-006', 'agent-007', 'call', '2026-04-09T10:00:00Z', 'connected', 22),
  act('a-057', 'd-051', 'c-011', 'agent-007', 'appointment-met', '2026-04-06T13:00:00Z', 'met', 55),
  act('a-058', 'd-033', 'c-024', 'agent-007', 'call', '2026-04-08T14:00:00Z', 'connected', 18),
  act('a-059', 'd-038', 'c-016', 'agent-007', 'email', '2026-04-09T08:30:00Z'),
  act('a-060', 'd-024', 'c-037', 'agent-007', 'appointment-set', '2026-04-09T16:00:00Z', 'scheduled'),
  act('a-061', 'd-029', 'c-038', 'agent-007', 'call', '2026-04-10T09:00:00Z', 'connected', 20),
  act('a-062', 'd-029', 'c-038', 'agent-007', 'text', '2026-04-10T09:30:00Z'),
  act('a-063', 'd-020', 'c-027', 'agent-007', 'email', '2026-04-02T11:00:00Z'),
  act('a-064', 'd-005', 'c-054', 'agent-007', 'call', '2026-04-08T10:00:00Z', 'voicemail', 2),
  act('a-065', 'd-014', 'c-045', 'agent-007', 'email', '2026-04-04T14:00:00Z'),

  // Agent 8 (Tyler) - New agent, lower activity
  act('a-066', 'd-008', 'c-047', 'agent-008', 'call', '2026-04-09T10:00:00Z', 'no-answer', 1),
  act('a-067', 'd-008', 'c-047', 'agent-008', 'email', '2026-04-09T10:05:00Z'),
  act('a-068', 'd-002', 'c-050', 'agent-008', 'call', '2026-04-10T09:00:00Z', 'connected', 8),
  act('a-069', 'd-019', 'c-023', 'agent-008', 'text', '2026-04-05T13:00:00Z'),

  // Historical activities for YTD metrics (Jan-Mar)
  act('a-100', 'd-041', 'c-001', 'agent-001', 'call', '2026-03-20T10:00:00Z', 'connected', 20),
  act('a-101', 'd-041', 'c-001', 'agent-001', 'appointment-set', '2026-03-01T09:00:00Z', 'scheduled'),
  act('a-102', 'd-041', 'c-001', 'agent-001', 'appointment-met', '2026-03-05T10:00:00Z', 'met', 60),
  act('a-103', 'd-042', 'c-002', 'agent-002', 'call', '2026-03-10T10:00:00Z', 'connected', 15),
  act('a-104', 'd-042', 'c-002', 'agent-002', 'appointment-set', '2026-02-20T11:00:00Z', 'scheduled'),
  act('a-105', 'd-042', 'c-002', 'agent-002', 'appointment-met', '2026-02-25T14:00:00Z', 'met', 75),
  act('a-106', 'd-044', 'c-004', 'agent-003', 'call', '2026-02-15T09:30:00Z', 'connected', 18),
  act('a-107', 'd-044', 'c-004', 'agent-003', 'appointment-set', '2026-02-16T10:00:00Z', 'scheduled'),
  act('a-108', 'd-044', 'c-004', 'agent-003', 'appointment-met', '2026-02-20T11:00:00Z', 'met', 60),
  act('a-109', 'd-047', 'c-007', 'agent-004', 'call', '2026-02-05T10:00:00Z', 'connected', 22),
  act('a-110', 'd-047', 'c-007', 'agent-004', 'appointment-set', '2026-02-06T11:00:00Z', 'scheduled'),
  act('a-111', 'd-047', 'c-007', 'agent-004', 'appointment-met', '2026-02-10T09:00:00Z', 'met', 70),
  act('a-112', 'd-046', 'c-006', 'agent-007', 'call', '2026-01-20T10:00:00Z', 'connected', 25),
  act('a-113', 'd-046', 'c-006', 'agent-007', 'appointment-set', '2026-01-22T11:00:00Z', 'scheduled'),
  act('a-114', 'd-046', 'c-006', 'agent-007', 'appointment-met', '2026-01-28T14:00:00Z', 'met', 55),
  act('a-115', 'd-051', 'c-011', 'agent-007', 'call', '2026-03-01T09:00:00Z', 'connected', 18),
  act('a-116', 'd-051', 'c-011', 'agent-007', 'appointment-set', '2026-03-05T10:00:00Z', 'scheduled'),
  act('a-117', 'd-043', 'c-003', 'agent-001', 'call', '2026-03-05T10:00:00Z', 'connected', 25),
  act('a-118', 'd-043', 'c-003', 'agent-001', 'appointment-set', '2026-03-08T11:00:00Z', 'scheduled'),
  act('a-119', 'd-043', 'c-003', 'agent-001', 'appointment-met', '2026-03-12T14:00:00Z', 'met', 90),
  act('a-120', 'd-048', 'c-008', 'agent-001', 'call', '2026-01-10T10:00:00Z', 'connected', 20),
  act('a-121', 'd-048', 'c-008', 'agent-001', 'appointment-set', '2026-01-12T11:00:00Z', 'scheduled'),
  act('a-122', 'd-048', 'c-008', 'agent-001', 'appointment-met', '2026-01-16T09:00:00Z', 'met', 60),
  act('a-123', 'd-052', 'c-012', 'agent-001', 'call', '2025-10-05T10:00:00Z', 'connected', 20),
  act('a-124', 'd-052', 'c-012', 'agent-001', 'appointment-met', '2025-11-01T14:00:00Z', 'met', 80),
  act('a-125', 'd-045', 'c-005', 'agent-002', 'call', '2025-09-10T10:00:00Z', 'connected', 30),
  act('a-126', 'd-045', 'c-005', 'agent-002', 'appointment-met', '2025-10-01T14:00:00Z', 'met', 90),
  act('a-127', 'd-049', 'c-009', 'agent-002', 'call', '2026-02-01T10:00:00Z', 'connected', 15),
  act('a-128', 'd-049', 'c-009', 'agent-002', 'appointment-set', '2026-02-05T11:00:00Z', 'scheduled'),
  act('a-129', 'd-049', 'c-009', 'agent-002', 'appointment-met', '2026-02-10T14:00:00Z', 'met', 60),
  act('a-130', 'd-050', 'c-010', 'agent-003', 'call', '2025-10-15T10:00:00Z', 'connected', 19),
  act('a-131', 'd-050', 'c-010', 'agent-003', 'appointment-met', '2025-11-05T11:00:00Z', 'met', 60),
  act('a-132', 'd-055', 'c-055', 'agent-003', 'call', '2026-01-10T10:00:00Z', 'connected', 20),
  act('a-133', 'd-055', 'c-055', 'agent-003', 'appointment-set', '2026-01-15T11:00:00Z', 'scheduled'),
]

export const ACTIVITY_BY_ID = Object.fromEntries(
  ACTIVITIES.map((a) => [a.id, a])
) as Record<string, Activity>
