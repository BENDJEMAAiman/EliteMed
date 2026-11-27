import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ComingSoonPage from './pages/ComingSoonPage'
import DashboardPage from './pages/DashboardPage'
import DashboardSubPage from './pages/DashboardSubPage'
import { useAuth } from './hooks/useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return null
  if (!session) return <Navigate to="/connexion" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Auth : une seule page, trois vues */}
      <Route path="/connexion" element={<AuthPage key="login" initialPage="login" />} />
      <Route path="/inscription" element={<AuthPage key="signup" initialPage="signup" />} />
      <Route
        path="/mot-de-passe-oublie"
        element={<AuthPage key="forgot" initialPage="forgot" />}
      />

      {/* Dashboard (protégé) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/cours" element={<DashboardSubPage page="cours" />} />
      <Route path="/dashboard/ressources" element={<DashboardSubPage page="ressources" />} />
      <Route path="/dashboard/modules" element={<DashboardSubPage page="modules" />} />
      <Route path="/dashboard/progression" element={<DashboardSubPage page="progression" />} />
      <Route path="/dashboard/paiements" element={<DashboardSubPage page="paiements" />} />
      <Route path="/dashboard/profil" element={<DashboardSubPage page="profil" />} />
      <Route path="/dashboard/parametres" element={<DashboardSubPage page="parametres" />} />
      <Route path="/dashboard/aide" element={<DashboardSubPage page="aide" />} />

      {/* Pages à venir */}
      <Route path="/medecine" element={<ComingSoonPage title="Médecine" />} />
      <Route path="/pharmacie" element={<ComingSoonPage title="Pharmacie" />} />
      <Route
        path="/medecine-dentaire"
        element={<ComingSoonPage title="Médecine Dentaire" />}
      />
      <Route path="/formations" element={<ComingSoonPage title="Formations" />} />
      <Route path="/a-propos" element={<ComingSoonPage title="À Propos" />} />
      <Route path="*" element={<ComingSoonPage title="Page introuvable" />} />
    </Routes>
  )
}
