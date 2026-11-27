import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/** Réserve une page aux administrateurs. */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="route-loading" role="status" aria-label="Chargement">
        <span className="spinner" />
      </div>
    )
  }
  if (!user) return <Navigate to="/connexion" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
