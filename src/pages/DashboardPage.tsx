import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import './DashboardPage.css'
import {
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  ArrowRight,
  GradCap,
  Zap,
  Calendar,
  AlertCircle,
  Download,
  ChevronRight,
} from '../components/ui/Icons'
import './DashboardPage.css'

// ─── Mock data ───────────────────────────────────────────────────────────────

const STATS = [
  {
    id: 'courses',
    label: 'Cours suivis',
    value: '8',
    sub: '+2 ce mois',
    icon: BookOpen,
    color: 'navy',
  },
  {
    id: 'resources',
    label: 'Ressources achetées',
    value: '24',
    sub: '6 récentes',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 'progress',
    label: 'Progression globale',
    value: '67%',
    sub: 'Semestre 1 · An 3',
    icon: TrendingUp,
    color: 'yellow',
  },
  {
    id: 'hours',
    label: 'Heures d\'étude',
    value: '142h',
    sub: 'Cette année',
    icon: Clock,
    color: 'teal',
  },
]

const CURRENT_COURSES = [
  {
    id: 1,
    title: 'Anatomie — Système cardiovasculaire',
    module: 'Anatomie',
    year: '3ème année',
    progress: 78,
    lastAccess: 'Il y a 2h',
    type: 'Cours',
    locked: false,
  },
  {
    id: 2,
    title: 'Physiologie — Système nerveux',
    module: 'Physiologie',
    year: '3ème année',
    progress: 45,
    lastAccess: 'Hier',
    type: 'Cours',
    locked: false,
  },
  {
    id: 3,
    title: 'Sémiologie médicale',
    module: 'Sémiologie',
    year: '3ème année',
    progress: 20,
    lastAccess: 'Il y a 3 jours',
    type: 'Cours',
    locked: false,
  },
  {
    id: 4,
    title: 'Biochimie clinique — Enzymologie',
    module: 'Biochimie',
    year: '3ème année',
    progress: 0,
    lastAccess: 'Non commencé',
    type: 'Cours',
    locked: true,
  },
]

const RECENT_RESOURCES = [
  {
    id: 1,
    title: 'QCM — Cardio S1 2023/24',
    type: 'QCM',
    subject: 'Cardiologie',
    date: '27 Nov 2026',
    free: false,
    downloaded: true,
  },
  {
    id: 2,
    title: 'Cours PDF — Neurologie complète',
    type: 'Cours PDF',
    subject: 'Neurologie',
    date: '24 Nov 2026',
    free: false,
    downloaded: false,
  },
  {
    id: 3,
    title: 'Annales — Examen final 2022',
    type: 'Annale',
    subject: 'Médecine interne',
    date: '20 Nov 2026',
    free: true,
    downloaded: true,
  },
]

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Examen — Anatomie S1',
    date: '15 Déc 2026',
    daysLeft: 18,
    urgent: false,
  },
  {
    id: 2,
    title: 'TD — Physiologie groupe B',
    date: '30 Nov 2026',
    daysLeft: 3,
    urgent: true,
  },
  {
    id: 3,
    title: 'Rendu — Rapport de stage',
    date: '5 Déc 2026',
    daysLeft: 8,
    urgent: false,
  },
]

const MODULES = [
  { id: 1, name: 'Anatomie', progress: 78, total: 12, done: 9 },
  { id: 2, name: 'Physiologie', progress: 55, total: 10, done: 5 },
  { id: 3, name: 'Biochimie', progress: 30, total: 8, done: 2 },
  { id: 4, name: 'Sémiologie', progress: 20, total: 6, done: 1 },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ResourceTypePill({ type }: { type: string }) {
  const map: Record<string, string> = {
    QCM: 'pill--qcm',
    'Cours PDF': 'pill--cours',
    Annale: 'pill--annale',
    Résumé: 'pill--resume',
  }
  return <span className={`db-pill ${map[type] ?? ''}`}>{type}</span>
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/connexion" replace />

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    'Étudiant'

  const now = new Date()
  const hour = now.getHours()
  const greeting =
    hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <DashboardLayout>
      <div className="db-page">

        {/* ── Welcome banner ── */}
        <section className="db-welcome">
          <div className="db-welcome__text">
            <h1 className="db-welcome__title">
              {greeting}, <span className="db-welcome__name">{firstName}</span> 👋
            </h1>
            <p className="db-welcome__sub">
              Bienvenue dans votre espace académique. Voici un résumé de votre activité.
            </p>
          </div>
          <div className="db-welcome__meta">
            <span className="db-welcome__year">
              <GradCap size={16} />
              3ème année — Médecine
            </span>
            <span className="db-welcome__semester">Semestre 1 · 2026–2027</span>
          </div>
        </section>

        {/* ── Stat cards ── */}
        <section className="db-stats" aria-label="Statistiques">
          {STATS.map(({ id, label, value, sub, icon: Icon, color }) => (
            <div key={id} className={`db-stat db-stat--${color}`}>
              <div className="db-stat__icon">
                <Icon size={22} />
              </div>
              <div className="db-stat__body">
                <span className="db-stat__value">{value}</span>
                <span className="db-stat__label">{label}</span>
                <span className="db-stat__sub">{sub}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ── Main grid ── */}
        <div className="db-grid">

          {/* Left column */}
          <div className="db-grid__left">

            {/* Current courses */}
            <section className="db-card">
              <div className="db-card__head">
                <h2 className="db-card__title">
                  <BookOpen size={18} />
                  Mes cours en cours
                </h2>
                <Link to="/dashboard/cours" className="db-card__link">
                  Voir tout <ChevronRight size={15} />
                </Link>
              </div>

              <div className="db-courses-list">
                {CURRENT_COURSES.map((course) => (
                  <div key={course.id} className={`db-course ${course.locked ? 'db-course--locked' : ''}`}>
                    <div className="db-course__icon">
                      {course.locked ? <Lock size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="db-course__body">
                      <div className="db-course__top">
                        <span className="db-course__title">{course.title}</span>
                        <span className="db-course__badge">{course.type}</span>
                      </div>
                      <div className="db-course__meta">
                        <span>{course.module}</span>
                        <span>·</span>
                        <span>{course.year}</span>
                        <span>·</span>
                        <span className="db-course__access">
                          <Clock size={12} /> {course.lastAccess}
                        </span>
                      </div>
                      {!course.locked ? (
                        <div className="db-course__progress-wrap">
                          <div className="db-course__progress-bar">
                            <div
                              className="db-course__progress-fill"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="db-course__progress-pct">{course.progress}%</span>
                        </div>
                      ) : (
                        <span className="db-course__locked-msg">
                          <AlertCircle size={12} /> Accès non activé — achetez pour débloquer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent resources */}
            <section className="db-card">
              <div className="db-card__head">
                <h2 className="db-card__title">
                  <FileText size={18} />
                  Ressources récentes
                </h2>
                <Link to="/dashboard/ressources" className="db-card__link">
                  Voir tout <ChevronRight size={15} />
                </Link>
              </div>

              <table className="db-table">
                <thead>
                  <tr>
                    <th>Ressource</th>
                    <th>Matière</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RESOURCES.map((res) => (
                    <tr key={res.id}>
                      <td>
                        <div className="db-table__resource">
                          <ResourceTypePill type={res.type} />
                          <span className="db-table__resource-title">{res.title}</span>
                        </div>
                      </td>
                      <td className="db-table__subject">{res.subject}</td>
                      <td className="db-table__date">{res.date}</td>
                      <td>
                        {res.free ? (
                          <span className="db-badge db-badge--free">Gratuit</span>
                        ) : (
                          <span className="db-badge db-badge--paid">Payant</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="db-action-btn"
                          title={res.downloaded ? 'Téléchargé' : 'Télécharger'}
                        >
                          {res.downloaded ? (
                            <CheckCircle size={16} className="db-action-btn--done" />
                          ) : (
                            <Download size={16} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Right column */}
          <div className="db-grid__right">

            {/* Upcoming events */}
            <section className="db-card">
              <div className="db-card__head">
                <h2 className="db-card__title">
                  <Calendar size={18} />
                  Échéances à venir
                </h2>
              </div>

              <div className="db-events">
                {UPCOMING_EVENTS.map((ev) => (
                  <div key={ev.id} className={`db-event ${ev.urgent ? 'db-event--urgent' : ''}`}>
                    <div className="db-event__countdown">
                      <span className="db-event__days">{ev.daysLeft}</span>
                      <span className="db-event__days-label">jours</span>
                    </div>
                    <div className="db-event__info">
                      <span className="db-event__title">{ev.title}</span>
                      <span className="db-event__date">{ev.date}</span>
                    </div>
                    {ev.urgent && (
                      <div className="db-event__urgency" title="Urgent">
                        <AlertCircle size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Module progress */}
            <section className="db-card">
              <div className="db-card__head">
                <h2 className="db-card__title">
                  <TrendingUp size={18} />
                  Progression par module
                </h2>
                <Link to="/dashboard/progression" className="db-card__link">
                  Détails <ChevronRight size={15} />
                </Link>
              </div>

              <div className="db-modules-progress">
                {MODULES.map((mod) => (
                  <div key={mod.id} className="db-module-row">
                    <div className="db-module-row__header">
                      <span className="db-module-row__name">{mod.name}</span>
                      <span className="db-module-row__count">{mod.done}/{mod.total} chapitres</span>
                    </div>
                    <div className="db-module-row__bar">
                      <div
                        className="db-module-row__fill"
                        style={{ width: `${mod.progress}%` }}
                      />
                    </div>
                    <span className="db-module-row__pct">{mod.progress}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="db-card db-quick-actions">
              <div className="db-card__head">
                <h2 className="db-card__title">
                  <Zap size={18} />
                  Accès rapide
                </h2>
              </div>
              <div className="db-quick-grid">
                <Link to="/dashboard/ressources" className="db-quick-btn">
                  <FileText size={20} />
                  <span>Catalogue</span>
                </Link>
                <Link to="/dashboard/paiements" className="db-quick-btn">
                  <CheckCircle size={20} />
                  <span>Mes achats</span>
                </Link>
                <Link to="/dashboard/progression" className="db-quick-btn">
                  <TrendingUp size={20} />
                  <span>Progression</span>
                </Link>
                <Link to="/dashboard/aide" className="db-quick-btn">
                  <ArrowRight size={20} />
                  <span>Support</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
