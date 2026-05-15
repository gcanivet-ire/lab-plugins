import type { Transaction } from '../types'

export const TRANSACTIONS: Transaction[] = [
  // Under Contract
  { id: 'txn-001', dealId: 'd-036', agentId: 'agent-001', address: '2847 Westbrook Drive', city: 'Vancouver', state: 'BC', salePrice: 1280000, listPrice: 1299000, commissionRate: 0.025, gci: 32000, side: 'buyer', status: 'under-contract', contractDate: '2026-03-20', closingDate: '2026-04-25', mlsNumber: 'R2845001' },
  { id: 'txn-002', dealId: 'd-037', agentId: 'agent-002', address: '514 Birchwood Lane', city: 'Burnaby', state: 'BC', salePrice: 945000, listPrice: 959000, commissionRate: 0.025, gci: 23625, side: 'buyer', status: 'under-contract', contractDate: '2026-03-28', closingDate: '2026-05-02', mlsNumber: 'R2845022' },
  { id: 'txn-003', dealId: 'd-038', agentId: 'agent-007', address: '138 Ridgecrest Boulevard', city: 'North Vancouver', state: 'BC', salePrice: 1580000, listPrice: 1575000, commissionRate: 0.025, gci: 39500, side: 'seller', status: 'under-contract', contractDate: '2026-03-15', closingDate: '2026-04-18', mlsNumber: 'R2844987' },
  { id: 'txn-004', dealId: 'd-039', agentId: 'agent-003', address: '3301 Maple Ridge Court', city: 'Surrey', state: 'BC', salePrice: 720000, listPrice: 729000, commissionRate: 0.025, gci: 18000, side: 'seller', status: 'under-contract', contractDate: '2026-04-01', closingDate: '2026-05-15', mlsNumber: 'R2845188' },
  { id: 'txn-005', dealId: 'd-040', agentId: 'agent-004', address: '7720 Lakeview Crescent', city: 'Coquitlam', state: 'BC', salePrice: 855000, listPrice: 869000, commissionRate: 0.025, gci: 21375, side: 'buyer', status: 'under-contract', contractDate: '2026-03-25', closingDate: '2026-04-30', mlsNumber: 'R2845067' },

  // Closed (YTD)
  { id: 'txn-006', dealId: 'd-041', agentId: 'agent-001', address: '1209 Cloverdale Avenue', city: 'Vancouver', state: 'BC', salePrice: 1150000, listPrice: 1189000, commissionRate: 0.025, gci: 28750, side: 'buyer', status: 'closed', contractDate: '2026-02-10', closingDate: '2026-03-15', mlsNumber: 'R2843201' },
  { id: 'txn-007', dealId: 'd-042', agentId: 'agent-002', address: '845 Granville Terrace', city: 'Vancouver', state: 'BC', salePrice: 875000, listPrice: 879000, commissionRate: 0.025, gci: 21875, side: 'seller', status: 'closed', contractDate: '2026-01-25', closingDate: '2026-02-28', mlsNumber: 'R2842788' },
  { id: 'txn-008', dealId: 'd-043', agentId: 'agent-001', address: '4512 Dunbar Street', city: 'Vancouver', state: 'BC', salePrice: 1340000, listPrice: 1349000, commissionRate: 0.025, gci: 33500, side: 'buyer', status: 'closed', contractDate: '2026-02-25', closingDate: '2026-03-30', mlsNumber: 'R2843450' },
  { id: 'txn-009', dealId: 'd-044', agentId: 'agent-003', address: '2218 Kingsway', city: 'Burnaby', state: 'BC', salePrice: 620000, listPrice: 625000, commissionRate: 0.025, gci: 15500, side: 'buyer', status: 'closed', contractDate: '2026-02-18', closingDate: '2026-03-22', mlsNumber: 'R2843321' },
  { id: 'txn-010', dealId: 'd-045', agentId: 'agent-002', address: '1 Shaughnessy Place', city: 'Vancouver', state: 'BC', salePrice: 2100000, listPrice: 2150000, commissionRate: 0.025, gci: 52500, side: 'seller', status: 'closed', contractDate: '2026-01-10', closingDate: '2026-02-14', mlsNumber: 'R2842300' },
  { id: 'txn-011', dealId: 'd-046', agentId: 'agent-007', address: '3388 Marine Way', city: 'North Vancouver', state: 'BC', salePrice: 785000, listPrice: 799000, commissionRate: 0.025, gci: 19625, side: 'buyer', status: 'closed', contractDate: '2026-03-05', closingDate: '2026-04-05', mlsNumber: 'R2844001' },
  { id: 'txn-012', dealId: 'd-047', agentId: 'agent-004', address: '555 West 41st Avenue', city: 'Vancouver', state: 'BC', salePrice: 940000, listPrice: 945000, commissionRate: 0.025, gci: 23500, side: 'seller', status: 'closed', contractDate: '2026-02-05', closingDate: '2026-03-10', mlsNumber: 'R2842900' },
  { id: 'txn-013', dealId: 'd-048', agentId: 'agent-001', address: '987 Nelson Street', city: 'Vancouver', state: 'BC', salePrice: 1490000, listPrice: 1499000, commissionRate: 0.025, gci: 37250, side: 'buyer', status: 'closed', contractDate: '2026-01-05', closingDate: '2026-01-31', mlsNumber: 'R2842100' },
  { id: 'txn-014', dealId: 'd-049', agentId: 'agent-002', address: '661 Renfrew Drive', city: 'Vancouver', state: 'BC', salePrice: 685000, listPrice: 695000, commissionRate: 0.025, gci: 17125, side: 'seller', status: 'closed', contractDate: '2026-02-15', closingDate: '2026-03-18', mlsNumber: 'R2843100' },
  { id: 'txn-015', dealId: 'd-050', agentId: 'agent-003', address: '410 Cambie Street', city: 'Vancouver', state: 'BC', salePrice: 1020000, listPrice: 1029000, commissionRate: 0.025, gci: 25500, side: 'buyer', status: 'closed', contractDate: '2026-01-18', closingDate: '2026-02-22', mlsNumber: 'R2842450' },
  { id: 'txn-016', dealId: 'd-051', agentId: 'agent-007', address: '1720 Arbutus Street', city: 'Vancouver', state: 'BC', salePrice: 830000, listPrice: 839000, commissionRate: 0.025, gci: 20750, side: 'buyer', status: 'closed', contractDate: '2026-03-08', closingDate: '2026-04-02', mlsNumber: 'R2843800' },
  { id: 'txn-017', dealId: 'd-052', agentId: 'agent-001', address: '2245 Point Grey Road', city: 'Vancouver', state: 'BC', salePrice: 1675000, listPrice: 1689000, commissionRate: 0.025, gci: 41875, side: 'seller', status: 'closed', contractDate: '2025-12-15', closingDate: '2026-01-15', mlsNumber: 'R2841500' },
]

export const TRANSACTION_BY_ID = Object.fromEntries(
  TRANSACTIONS.map((t) => [t.id, t])
) as Record<string, Transaction>
