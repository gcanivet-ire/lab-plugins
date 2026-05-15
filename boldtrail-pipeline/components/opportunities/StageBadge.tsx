import type { DealStage } from '@/lib/types'
import { STAGE_BY_ID } from '@/lib/constants'

interface StageBadgeProps {
  stage: DealStage
  size?: 'sm' | 'md'
}

export function StageBadge({ stage, size = 'md' }: StageBadgeProps) {
  const def = STAGE_BY_ID[stage]
  return (
    <span
      className={`stage-badge ${def.color} ${def.textColor} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : ''
      }`}
    >
      {def.shortLabel}
    </span>
  )
}
