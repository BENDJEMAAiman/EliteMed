import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ComingSoonPage from './pages/ComingSoonPage'
import FormationPage from './pages/FormationPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import RequireAdmin from './components/auth/RequireAdmin'

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

      {/* Pages à venir */}
      {/* Catalogues par faculté */}
      <Route path="/medecine" element={<FormationPage key="medecine" faculty="medecine" />} />
      <Route path="/pharmacie" element={<FormationPage key="pharmacie" faculty="pharmacie" />} />
      <Route
        path="/medecine-dentaire"
        element={<FormationPage key="dentaire" faculty="medecine-dentaire" />}
      />
      <Route path="/:faculty/:courseId" element={<ComingSoonPage title="Cours" />} />
      {/* Espace administrateur */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        }
      />
      <Route path="/tableau-de-bord" element={<ComingSoonPage title="Tableau de bord" />} />
      <Route path="/formations" element={<ComingSoonPage title="Formations" />} />
      <Route path="/a-propos" element={<ComingSoonPage title="À Propos" />} />
      <Route path="*" element={<ComingSoonPage title="Page introuvable" />} />
    </Routes>
  )
}
