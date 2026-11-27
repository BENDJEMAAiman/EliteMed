import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { GradCap, FileText, TrendingUp, CreditCard, User, Settings, HelpCircle, BookOpen } from '../components/ui/Icons'

const COMING_SOON_PAGES: Record<string, { label: string; icon: typeof GradCap }> = {
  cours: { label: 'Mes cours', icon: BookOpen },
  ressources: { label: 'Ressources', icon: FileText },
  modules: { label: 'Modules médicaux', icon: GradCap },
  progression: { label: 'Ma progression', icon: TrendingUp },
  paiements: { label: 'Paiements & commandes', icon: CreditCard },
  profil: { label: 'Mon profil', icon: User },
  parametres: { label: 'Paramètres', icon: Settings },
  aide: { label: 'Aide & Support', icon: HelpCircle },
}

export default function DashboardSubPage({ page }: { page: string }) {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/connexion" replace />

  const info = COMING_SOON_PAGES[page]
  if (!info) return <Navigate to="/dashboard" replace />

  const Icon = info.icon

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 16,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72,
          height: 72,
          borderRadius: 20,
          background: 'var(--blue-tint)',
          color: 'var(--blue)',
          marginBottom: 8,
        }}>
          <Icon size={36} />
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--ink)' }}>
          {info.label}
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--muted)' }}>
          Cette section sera bientôt disponible.
        </p>
        <a href="/dashboard" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 8,
          color: 'var(--blue)',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: 15,
        }}>
          ← Retour au tableau de bord
        </a>
      </div>
    </DashboardLayout>
  )
}
