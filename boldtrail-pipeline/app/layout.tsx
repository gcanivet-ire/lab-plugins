import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'BoldTrail Pipeline',
  description: 'Real estate team lead-to-close pipeline management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="ml-60 min-h-screen bg-brand-gray-light">
          {children}
        </main>
      </body>
    </html>
  )
}
