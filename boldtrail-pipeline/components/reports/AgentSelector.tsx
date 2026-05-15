'use client'

import { AGENTS } from '@/lib/mock-data'

interface AgentSelectorProps {
  value: string
  onChange: (id: string) => void
}

export function AgentSelector({ value, onChange }: AgentSelectorProps) {
  return (
    <div className="card p-1.5 flex items-center gap-1 flex-wrap">
      <button
        onClick={() => onChange('all')}
        className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
          value === 'all'
            ? 'text-white shadow-sm'
            : 'text-brand-muted hover:text-brand-navy hover:bg-brand-gray-light'
        }`}
        style={value === 'all' ? { background: 'linear-gradient(135deg, #DC00F9 0%, #FE0007 100%)' } : {}}
      >
        All Agents
      </button>

      {AGENTS.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onChange(agent.id)}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
            value === agent.id
              ? 'text-white shadow-sm'
              : 'text-brand-muted hover:text-brand-navy hover:bg-brand-gray-light'
          }`}
          style={value === agent.id ? { backgroundColor: agent.avatarColor } : {}}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: value === agent.id ? 'rgba(255,255,255,0.25)' : agent.avatarColor }}
          >
            {agent.avatarInitials}
          </span>
          {agent.name.split(' ')[0]}
        </button>
      ))}
    </div>
  )
}
