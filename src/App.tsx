import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ComingSoonPage from './pages/ComingSoonPage'

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
