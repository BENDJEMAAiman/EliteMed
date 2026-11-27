import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/EliteMed_flat 3.svg'
import { useAuth } from '../../hooks/useAuth'
import { useScrolled } from '../../hooks/useScrolled'
import {
  Bookmark,
  Clipboard,
  CloseIcon,
  Globe,
  HomeIcon,
  MenuIcon,
  Stethoscope,
} from '../ui/Icons'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Accueil', icon: HomeIcon, end: true },
  { to: '/medecine', label: 'Médecine', icon: Stethoscope },
  { to: '/pharmacie', label: 'Pharmacie', icon: Clipboard },
  { to: '/medecine-dentaire', label: 'Médecine Dentaire', icon: Bookmark },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(8)
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  const close = () => setOpen(false)

  async function handleSignOut() {
    close()
    await signOut()
    navigate('/')
  }

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img src={logo} alt="" />
          <span>EliteMed</span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          {/* actions visibles dans le menu mobile */}
          <div className="navbar__actions navbar__actions--mobile">
            {renderActions()}
          </div>
        </nav>

        <div className="navbar__actions navbar__actions--desktop">{renderActions()}</div>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
    </header>
  )

  function renderActions() {
    return (
      <>
        <span className="navbar__lang" aria-label="Langue : français">
          <Globe size={18} /> FR
        </span>

        {loading ? null : user ? (
          <>
            <span className="navbar__user">Bonjour, {firstName}</span>
            <button type="button" className="btn btn--outline" onClick={handleSignOut}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/connexion" className="btn btn--outline" onClick={close}>
              Connexion
            </Link>
            <Link to="/inscription" className="btn btn--light" onClick={close}>
              Inscription
            </Link>
          </>
        )}
      </>
    )
  }
}
