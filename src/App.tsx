import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ComingSoonPage from './pages/ComingSoonPage'
import DashboardPage from './pages/DashboardPage'
import FormationPage from './pages/FormationPage'
import CourseDetailPage from './pages/CourseDetailPage'
import JoinFormationPage from './pages/JoinFormationPage'
import PaymentPage from './pages/PaymentPage'
import FormationContentPage from './pages/FormationContentPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import RequireAdmin from './components/auth/RequireAdmin'
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

      {/* Pages à venir */}
      {/* Catalogues par faculté */}
      <Route path="/medecine" element={<FormationPage key="medecine" faculty="medecine" />} />
      <Route path="/pharmacie" element={<FormationPage key="pharmacie" faculty="pharmacie" />} />
      <Route
        path="/medecine-dentaire"
        element={<FormationPage key="dentaire" faculty="medecine-dentaire" />}
      />
      <Route path="/:faculty/:courseId" element={<CourseDetailPage />} />
      <Route path="/:faculty/:courseId/rejoindre" element={<JoinFormationPage />} />
      <Route path="/paiement/:enrollmentId" element={<PaymentPage />} />
      <Route path="/paiement" element={<PaymentPage />} />
      <Route path="/contenu/:courseId" element={<FormationContentPage />} />
      {/* Espace administrateur */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        }
      />
      <Route path="/tableau-de-bord" element={<Navigate to="/dashboard" replace />} />
      <Route path="/formations" element={<ComingSoonPage title="Formations" />} />
      <Route path="/a-propos" element={<ComingSoonPage title="À Propos" />} />
      <Route path="*" element={<ComingSoonPage title="Page introuvable" />} />
    </Routes>
  )
}
