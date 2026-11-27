import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/EliteMed_flat 3.svg'
import {
  HomeIcon,
  BookOpen,
  FileText,
  GradCap,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  User,
} from '../ui/Icons'
import './DashboardSidebar.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tableau de bord', icon: HomeIcon, end: true },
  { to: '/dashboard/cours', label: 'Mes cours', icon: BookOpen },
  { to: '/dashboard/ressources', label: 'Ressources', icon: FileText },
  { to: '/dashboard/modules', label: 'Modules', icon: Stethoscope },
  { to: '/dashboard/progression', label: 'Progression', icon: GradCap },
  { to: '/dashboard/paiements', label: 'Paiements', icon: CreditCard },
]

const BOTTOM_ITEMS = [
  { to: '/dashboard/profil', label: 'Mon profil', icon: User },
  { to: '/dashboard/parametres', label: 'Paramètres', icon: Settings },
  { to: '/dashboard/aide', label: 'Aide & Support', icon: HelpCircle },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    'Étudiant'

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    'Étudiant'

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <aside className={`dash-sidebar ${collapsed ? 'dash-sidebar--collapsed' : ''}`}>
      {/* Brand */}
      <div className="dash-sidebar__brand">
        <img src={logo} alt="EliteMed" className="dash-sidebar__logo" />
        {!collapsed && <span className="dash-sidebar__brand-name">EliteMed</span>}
      </div>

      {/* Toggle collapse button */}
      <button
        type="button"
        className="dash-sidebar__toggle"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? 'Développer le menu' : 'Réduire le menu'}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Main navigation */}
      <nav className="dash-sidebar__nav" aria-label="Navigation du tableau de bord">
        {!collapsed && <span className="dash-sidebar__section-label">Principal</span>}
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `dash-sidebar__link ${isActive ? 'is-active' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <span className="dash-sidebar__link-icon">
              <Icon size={20} />
            </span>
            {!collapsed && <span className="dash-sidebar__link-label">{label}</span>}
          </NavLink>
        ))}

        {!collapsed && <span className="dash-sidebar__section-label" style={{ marginTop: 20 }}>Compte</span>}
        {BOTTOM_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `dash-sidebar__link ${isActive ? 'is-active' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <span className="dash-sidebar__link-icon">
              <Icon size={20} />
            </span>
            {!collapsed && <span className="dash-sidebar__link-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="dash-sidebar__footer">
        <div className="dash-sidebar__user">
          <div className="dash-sidebar__avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="dash-sidebar__user-info">
              <span className="dash-sidebar__user-name">{fullName}</span>
              <span className="dash-sidebar__user-email">{user?.email}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="dash-sidebar__signout"
          onClick={handleSignOut}
          title="Déconnexion"
        >
          <LogOut size={18} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
