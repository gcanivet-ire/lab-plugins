'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, TrendingUp, Trophy, FileText, Settings, Users, Zap } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Pipeline Dashboard', icon: BarChart3 },
  { href: '/opportunities', label: 'Opportunities', icon: TrendingUp },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/reports', label: 'Reports', icon: FileText },
]

const SECONDARY_ITEMS = [
  { href: '/team', label: 'Team', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40"
      style={{ backgroundColor: '#05205E' }}
    >
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #DC00F9 0%, #FE0007 100%)' }}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-white font-bold text-sm leading-none block">BoldTrail</span>
          <span className="text-blue-200 text-xs font-medium">Pipeline</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-4 mb-2 text-xs font-semibold text-white/30 uppercase tracking-wider">
          Management
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="px-4 mb-2 text-xs font-semibold text-white/30 uppercase tracking-wider">
            Admin
          </p>
          {SECONDARY_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link key={href} href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #DC00F9 0%, #FE0007 100%)' }}
          >
            TL
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">Team Leader</p>
            <p className="text-blue-200 text-xs truncate">admin@team.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
