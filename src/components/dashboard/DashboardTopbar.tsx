import { useState } from 'react'
import { Bell, Search, MenuIcon } from '../ui/Icons'
import { useAuth } from '../../hooks/useAuth'
import './DashboardTopbar.css'

interface Props {
  onMenuClick?: () => void
}

export default function DashboardTopbar({ onMenuClick }: Props) {
  const { user } = useAuth()
  const [searchValue, setSearchValue] = useState('')

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    'Étudiant'

  return (
    <header className="dash-topbar">
      {/* Mobile menu toggle */}
      <button
        type="button"
        className="dash-topbar__menu-btn"
        onClick={onMenuClick}
        aria-label="Menu"
      >
        <MenuIcon size={22} />
      </button>

      {/* Search */}
      <div className="dash-topbar__search">
        <Search size={16} className="dash-topbar__search-icon" />
        <input
          type="text"
          placeholder="Rechercher un cours, une ressource..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="dash-topbar__search-input"
        />
      </div>

      {/* Right actions */}
      <div className="dash-topbar__actions">
        {/* Notifications */}
        <button type="button" className="dash-topbar__icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="dash-topbar__notif-badge">3</span>
        </button>

        {/* User avatar */}
        <div className="dash-topbar__user">
          <div className="dash-topbar__avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div className="dash-topbar__user-info">
            <span className="dash-topbar__user-greeting">Bonjour,</span>
            <span className="dash-topbar__user-name">{firstName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
