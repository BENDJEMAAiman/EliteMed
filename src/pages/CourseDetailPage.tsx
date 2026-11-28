import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  CheckSquare,
  Clipboard,
  Clock,
  PlayCircle,
  User,
} from '../components/ui/Icons'
import { LEVEL_BADGES, findCourse } from '../data/formations'
import { formatPrice } from '../lib/enrollments'
import '../styles/home.css'
import './CourseDetailPage.css'

export default function CourseDetailPage() {
  const { faculty: facultyKey, courseId } = useParams()
  const resolved = findCourse(facultyKey, courseId)
  const [paymentMode, setPaymentMode] = useState('baridimob')

  useEffect(() => {
    document.title = resolved
      ? `${resolved.course.title} — EliteMed`
      : 'Formation introuvable — EliteMed'
  }, [resolved])

  if (!resolved) {
    return (
      <>
        <Navbar />
        <main className="coming-soon">
          <h1 className="section-title section-title--xl">Formation introuvable</h1>
          <p className="section-sub">Ce module n&apos;existe pas ou a été déplacé.</p>
          <Link to="/medecine" className="link-arrow">← Retour aux formations</Link>
        </main>
        <Footer />
      </>
    )
  }

  const {
    faculty,
    course,
    price,
    duration,
    qcmCount,
    resourcesLabel,
    instructor,
    lessonSummary,
    overview,
    outcomes,
    chapters,
  } = resolved

  const joinPath = `/${faculty.key}/${course.id}/rejoindre`

  return (
    <>
      <Navbar />
      <main className="course-detail">
        <div className="container">
          <Link to={`/${faculty.key}`} className="course-detail__back">
            <ArrowLeft size={16} />
            Retour aux formations
          </Link>

          <div className="course-detail__grid">
            {/* Colonne principale : description, métriques, acquis et programme */}
            <div className="course-detail__main">
              <div className="course-detail__badges">
                <span className="course-detail__pill">
                  {course.yearLabel.toUpperCase()} • {faculty.name.toUpperCase()}
                </span>
                <span className="course-detail__level">{LEVEL_BADGES[course.level]}</span>
              </div>

              <h1>{course.title}</h1>
              <p className="course-detail__overview">{overview}</p>

              <div className="course-detail__metrics">
                <div className="metric-box">
                  <Clock size={16} />
                  <span>Durée totale</span>
                  <strong>{duration}</strong>
                </div>
                <div className="metric-box">
                  <Clipboard size={16} />
                  <span>Banque QCM</span>
                  <strong>{qcmCount}</strong>
                </div>
                <div className="metric-box">
                  <BookOpen size={16} />
                  <span>Ressources</span>
                  <strong>{resourcesLabel}</strong>
                </div>
                <div className="metric-box">
                  <User size={16} />
                  <span>Formateur</span>
                  <strong>{instructor}</strong>
                </div>
              </div>

              <section className="detail-card">
                <h2>Ce que vous allez maîtriser</h2>
                <ul className="outcomes-grid">
                  {outcomes.map((item) => (
                    <li key={item}>
                      <CheckCircle size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="detail-card">
                <div className="detail-card__head">
                  <h2>Programme du module</h2>
                  <span className="detail-card__summary">{lessonSummary}</span>
                </div>

                <ul className="syllabus-list">
                  {chapters.map((ch) => (
                    <li key={ch.title} className="syllabus-item">
                      <div className="syllabus-item__left">
                        {ch.isExam ? <CheckSquare size={18} /> : <PlayCircle size={18} />}
                        <div>
                          <strong>{ch.title}</strong>
                          <p>{ch.subtitle}</p>
                        </div>
                      </div>
                      <span className="syllabus-item__meta">{ch.meta}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Colonne droite : carte tarifaire fixe au scroll */}
            <aside className="course-detail__aside">
              <div className="pricing-card">
                <span className="pricing-card__badge">Tarif étudiant</span>
                <div className="pricing-card__price">{formatPrice(price)}</div>
                <p className="pricing-card__period">
                  Accès complet pendant toute l&apos;année universitaire (12 mois)
                </p>

                <ul className="pricing-card__features">
                  <li>
                    <Check size={16} />
                    <span>28 cours vidéo HD à la demande</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>{qcmCount} chronométrés et corrigés</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>Fiches de révision PDF téléchargeables</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>Accès forum &amp; questions aux tuteurs</span>
                  </li>
                </ul>

                <div className="pricing-card__field">
                  <label htmlFor="payment-mode">Mode de paiement</label>
                  <select
                    id="payment-mode"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  >
                    <option value="baridimob">BaridiMob / CCP</option>
                    <option value="ccp">Virement CCP</option>
                  </select>
                </div>

                <Link
                  to={joinPath}
                  state={{ paymentMode }}
                  className="pricing-card__cta"
                >
                  S&apos;inscrire à cette formation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Bandeau d'appel à l'action en bas de page */}
        <section className="course-detail__banner">
          <div className="container course-detail__banner-inner">
            <h2>Prêt à commencer votre parcours d&apos;apprentissage ?</h2>
            <p>
              Rejoignez des milliers d&apos;étudiants en sciences de la santé qui ont déjà
              renforcé leurs connaissances médicales avec nos formations conçues par des experts.
            </p>
            <div className="course-detail__banner-actions">
              <Link to={joinPath} state={{ paymentMode }} className="btn btn--light">
                S&apos;inscrire à cette Formation
                <ArrowRight size={16} />
              </Link>
              <Link to={`/${faculty.key}`} className="btn btn--outline">
                Parcourir d&apos;Autres Formations
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
