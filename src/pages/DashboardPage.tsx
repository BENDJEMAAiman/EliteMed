import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { GradCap } from '../components/ui/Icons'
import { useAuth } from '../hooks/useAuth'
import {
  STATUS_LABELS,
  fetchMyEnrollments,
  formatDate,
  formatPrice,
  type Enrollment,
  type EnrollmentStatus,
} from '../lib/enrollments'
import '../styles/home.css'
import './DashboardPage.css'

type Filter = 'all' | 'en_attente' | 'confirme' | 'paye'

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'en_attente', label: STATUS_LABELS.en_attente },
  { key: 'confirme', label: STATUS_LABELS.confirme },
  { key: 'paye', label: STATUS_LABELS.paye },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    document.title = 'Tableau de bord — EliteMed'
  }, [])

  useEffect(() => {
    if (!user) return
    let active = true

    fetchMyEnrollments(user.id).then(({ data, error }) => {
      if (!active) return
      if (error) setError(error.message)
      else {
        setError('')
        setItems(data)
      }
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [user])

  const visible = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((e: Enrollment) => e.status === (filter as EnrollmentStatus))
  }, [items, filter])

  return (
    <>
      <Navbar />
      <main className="student-dash">
        <div className="container">
          <header className="student-dash__head">
            <div>
              <h1>Mes inscriptions</h1>
              <p>Consultez vos inscriptions aux formations et leur statut</p>
            </div>
            <Link to="/medecine" className="student-dash__cta">
              <GradCap size={18} />
              Parcourir les formations
            </Link>
          </header>

          <div className="student-dash__toolbar">
            <div className="student-dash__tabs" role="tablist" aria-label="Filtrer par statut">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={filter === key}
                  className={`student-dash__tab ${filter === key ? 'is-active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="student-dash__error">{error}</p>}

          {loading ? (
            <div className="student-dash__list" aria-busy="true">
              <div className="student-dash__card student-dash__card--skeleton" />
              <div className="student-dash__card student-dash__card--skeleton" />
            </div>
          ) : visible.length === 0 ? (
            <section className="student-dash__empty">
              <GradCap size={38} className="student-dash__empty-icon" />
              <h2>Aucune inscription</h2>
              <p>Vous n&apos;êtes inscrit à aucune formation pour le moment</p>
              <Link to="/medecine" className="student-dash__empty-btn">
                Parcourir les formations
              </Link>
            </section>
          ) : (
            <div className="student-dash__list">
              {visible.map((e) => (
                <article key={e.id} className="student-dash__card">
                  <div className="student-dash__card-info">
                    <div className="student-dash__card-meta">
                      <span className={`student-dash__status student-dash__status--${e.status}`}>
                        {STATUS_LABELS[e.status]}
                      </span>
                      <span className="student-dash__ref">{e.ref}</span>
                      <span className="student-dash__date">· {formatDate(e.created_at)}</span>
                    </div>
                    <h2>
                      {e.course_title} — {e.level_label}
                    </h2>
                  </div>
                  <div className="student-dash__card-side">
                    <span className="student-dash__price">{formatPrice(e.price)}</span>
                    {(e.status === 'en_attente' || e.status === 'confirme') && (
                      <Link
                        to={`/paiement/${e.id}`}
                        state={{ enrollment: e }}
                        className="student-dash__card-btn student-dash__card-btn--navy"
                      >
                        Finaliser le paiement
                      </Link>
                    )}
                    {e.status === 'paye' && (
                      <Link
                        to={`/contenu/${e.course_id ?? 'anatomie-osteologie'}`}
                        state={{ enrollment: e }}
                        className="student-dash__card-btn student-dash__card-btn--blue"
                      >
                        Accéder au contenu
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
