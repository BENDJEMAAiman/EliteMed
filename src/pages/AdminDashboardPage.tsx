import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import StatCard from '../components/admin/StatCard'
import EnrollmentCard from '../components/admin/EnrollmentCard'
import { BadgeCheck, Clock, Receipt, Search } from '../components/ui/Icons'
import { useEnrollments } from '../hooks/useEnrollments'
import { STATUS_LABELS, type EnrollmentStatus } from '../lib/enrollments'
import '../styles/home.css'
import '../styles/formations.css'
import '../styles/admin.css'

type Filter = 'all' | EnrollmentStatus

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'en_attente', label: STATUS_LABELS.en_attente },
  { key: 'confirme', label: STATUS_LABELS.confirme },
  { key: 'paye', label: STATUS_LABELS.paye },
  { key: 'rejete', label: STATUS_LABELS.rejete },
]

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function AdminDashboardPage() {
  const { items, loading, error, busyId, setStatus } = useEnrollments()
  const [filter, setFilter] = useState<Filter>('en_attente')
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Gestion des inscriptions — EliteMed'
  }, [])

  const count = (s: EnrollmentStatus) => items.filter((e) => e.status === s).length

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    return items.filter((e) => {
      if (filter !== 'all' && e.status !== filter) return false
      if (!q) return true
      return normalize(`${e.student_name} ${e.ref} ${e.course_title} ${e.student_phone ?? ''}`).includes(q)
    })
  }, [items, filter, query])

  const toggle = (f: Filter) => setFilter((cur) => (cur === f ? 'all' : f))

  return (
    <>
      <Navbar />
      <main className="admin">
        <div className="container">
          <header className="admin__head">
            <h1>
              Gestion des inscriptions <span className="admin__badge">Administration</span>
            </h1>
            <p>
              Validez ou rejetez les demandes en attente et confirmez le paiement après
              vérification manuelle du reçu WhatsApp ou Telegram.
            </p>
          </header>

          <section className="admin__stats" aria-label="Statistiques">
            <StatCard
              index={0}
              label="EN ATTENTE"
              value={count('en_attente')}
              hint="Demandes à traiter"
              tone="yellow"
              icon={<Clock size={20} />}
              active={filter === 'en_attente'}
              onClick={() => toggle('en_attente')}
            />
            <StatCard
              index={1}
              label="CONFIRMÉES"
              value={count('confirme')}
              hint="Reçu à vérifier"
              tone="blue"
              icon={<Receipt size={20} />}
              active={filter === 'confirme'}
              onClick={() => toggle('confirme')}
            />
            <StatCard
              index={2}
              label="PAYÉES"
              value={count('paye')}
              hint="Accès activés"
              tone="navy"
              icon={<BadgeCheck size={20} />}
              active={filter === 'paye'}
              onClick={() => toggle('paye')}
            />
          </section>

          <section className="admin__toolbar">
            <div className="admin__tabs" role="tablist" aria-label="Filtrer par statut">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === t.key}
                  className={`admin__tab ${filter === t.key ? 'is-active' : ''}`}
                  onClick={() => setFilter(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="search admin__search">
              <Search size={15} />
              <input
                type="search"
                value={query}
                placeholder="Rechercher étudiant ou réf…"
                aria-label="Rechercher étudiant ou référence"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </section>

          {error && (
            <p className="admin__error" role="alert">
              {error}
            </p>
          )}

          <section className="admin__list" aria-live="polite">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <div key={i} className="request request--skeleton" />)
            ) : visible.length === 0 ? (
              <p className="catalog__empty">Aucune demande ne correspond à ce filtre.</p>
            ) : (
              visible.map((e, i) => (
                <EnrollmentCard
                  key={e.id}
                  enrollment={e}
                  index={i}
                  busy={busyId === e.id}
                  onChange={setStatus}
                />
              ))
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
