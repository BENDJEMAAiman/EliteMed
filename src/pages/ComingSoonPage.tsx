import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import '../styles/home.css'

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="coming-soon">
        <h1 className="section-title section-title--xl">{title}</h1>
        <p className="section-sub">Cette section sera bientôt disponible.</p>
        <Link to="/" className="link-arrow">← Retour à l'accueil</Link>
      </main>
      <Footer />
    </>
  )
}
