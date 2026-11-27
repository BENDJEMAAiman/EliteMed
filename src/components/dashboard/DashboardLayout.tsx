import { type ReactNode, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import './DashboardLayout.css'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dash-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="dash-layout__overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <DashboardSidebar />

      <div className="dash-layout__main">
        <DashboardTopbar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="dash-layout__content">
          {children}
        </main>
      </div>
    </div>
  )
}
