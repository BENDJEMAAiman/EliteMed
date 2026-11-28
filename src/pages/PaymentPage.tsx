import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import {
  ArrowLeft,
  Clock,
  CreditCard,
  MessageSquare,
  Send,
} from '../components/ui/Icons'
import { PAYMENT_INFO, findCourseById } from '../data/formations'
import {
  STATUS_LABELS,
  fetchEnrollmentById,
  formatDate,
  formatPrice,
  type Enrollment,
} from '../lib/enrollments'
import '../styles/home.css'
import './PaymentPage.css'

export default function PaymentPage() {
  const { enrollmentId } = useParams()
  const location = useLocation()
  const stateEnrollment = (location.state as { enrollment?: Enrollment } | null)?.enrollment

  const [enrollment, setEnrollment] = useState<Enrollment | null>(stateEnrollment ?? null)
  const [loading, setLoading] = useState(!stateEnrollment && Boolean(enrollmentId))
  const [highlighted, setHighlighted] = useState(false)
  const sideRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = 'Finaliser votre inscription — EliteMed'
  }, [])

  useEffect(() => {
    if (stateEnrollment || !enrollmentId || enrollmentId.startsWith('demo-')) {
      return
    }

    let active = true
    fetchEnrollmentById(enrollmentId).then(({ data }) => {
      if (!active) return
      setEnrollment(data)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [enrollmentId, stateEnrollment])

  // Fallback si l'utilisateur ouvre la page avec un identifiant démo ou sans état routeur
  const fallbackCourse = findCourseById(enrollmentId?.replace(/^demo-/, '') || 'anatomie-osteologie')
  const activeEnrollment: Enrollment | null =
    enrollment ??
    (fallbackCourse
      ? {
          id: enrollmentId ?? 'demo',
          ref: 'REF-EM-2026-0418',
          created_at: new Date().toISOString(),
          course_title: fallbackCourse.course.title,
          level_label: `${fallbackCourse.course.yearLabel} · ${fallbackCourse.faculty.name}`,
          price: fallbackCourse.price,
          student_name: 'Étudiant EliteMed',
          student_phone: null,
          receipt_channel: null,
          status: 'en_attente',
        }
      : null)

  const courseInfo = activeEnrollment
    ? findCourseById(
        activeEnrollment.course_id ?? activeEnrollment.id.replace(/^demo-/, ''),
      ) ?? findCourseById('anatomie-osteologie')
    : null

  function handlePayClick() {
    setHighlighted(true)
    sideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const receiptMsg = activeEnrollment
    ? encodeURIComponent(
        `Bonjour EliteMed, voici mon reçu de paiement pour ${activeEnrollment.course_title} (Réf: ${activeEnrollment.ref}, Montant: ${formatPrice(activeEnrollment.price)}).`,
      )
    : ''

  return (
    <>
      <Navbar />
      <main className="payment-page">
        <div className="container">
          <Link to="/dashboard" className="payment-page__back">
            <ArrowLeft size={16} />
            Retour au Tableau de bord
          </Link>

          <header className="payment-page__head">
            <h1>Finaliser votre inscription</h1>
            <p>
              Votre place est réservée. Effectuez le paiement puis envoyez votre reçu via WhatsApp
              ou Telegram.
            </p>
          </header>

          {loading || !activeEnrollment ? (
            <div className="payment-card payment-card--skeleton" aria-busy="true" />
          ) : (
            <div className="payment-page__grid">
              {/* Carte de gauche : récapitulatif de la demande */}
              <section className="payment-card">
                <div className="payment-card__top">
                  <div className="payment-card__pills">
                    <span className={`payment-status payment-status--${activeEnrollment.status}`}>
                      <Clock size={13} />
                      {STATUS_LABELS[activeEnrollment.status]}
                    </span>
                    <span className="payment-level">
                      {activeEnrollment.level_label.toUpperCase()}
                    </span>
                  </div>
                  <span className="payment-card__ref">{activeEnrollment.ref}</span>
                </div>

                <h2>{activeEnrollment.course_title}</h2>
                <p className="payment-card__desc">
                  {courseInfo?.overview ??
                    'Accès complet aux cours vidéo HD, banques de QCM corrigés et fiches synoptiques.'}
                </p>

                <div className="payment-card__meta">
                  <div>
                    <span>Étudiant</span>
                    <strong>{activeEnrollment.student_name}</strong>
                  </div>
                  <div>
                    <span>Date de demande</span>
                    <strong>{formatDate(activeEnrollment.created_at)}</strong>
                  </div>
                  <div>
                    <span>Montant à régler</span>
                    <strong className="payment-card__price">
                      {formatPrice(activeEnrollment.price)}
                    </strong>
                  </div>
                </div>

                <div className="payment-card__foot">
                  <span>Cliquez sur le bouton pour choisir où envoyer votre reçu.</span>
                  <button
                    type="button"
                    className="payment-card__btn"
                    onClick={handlePayClick}
                  >
                    <CreditCard size={16} />
                    Effectuer le paiement
                  </button>
                </div>
              </section>

              {/* Carte de droite : instructions CCP / BaridiMob et envoi du reçu */}
              <aside
                ref={sideRef}
                className={`payment-side ${highlighted ? 'is-highlighted' : ''}`}
              >
                <span className="payment-side__eyebrow">ÉTAPE SUIVANTE</span>
                <h3>Envoyer votre reçu de paiement</h3>
                <p>
                  Effectuez le virement CCP / BaridiMob puis envoyez la capture du reçu sur WhatsApp
                  ou Telegram avec votre référence.
                </p>

                <div className="payment-side__details">
                  <div>
                    <span>RIP BaridiMob</span>
                    <strong>{PAYMENT_INFO.rip}</strong>
                  </div>
                  <div>
                    <span>Compte CCP</span>
                    <strong>{PAYMENT_INFO.ccp}</strong>
                  </div>
                  <div>
                    <span>Titulaire</span>
                    <strong>{PAYMENT_INFO.holder}</strong>
                  </div>
                </div>

                <div className="payment-side__actions">
                  <a
                    href={`https://wa.me/${PAYMENT_INFO.whatsappPhone}?text=${receiptMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="payment-side__btn payment-side__btn--navy"
                  >
                    <MessageSquare size={16} />
                    Envoyer le reçu sur WhatsApp
                  </a>
                  <a
                    href={`https://t.me/${PAYMENT_INFO.telegramHandle}?text=${receiptMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="payment-side__btn payment-side__btn--blue"
                  >
                    <Send size={16} />
                    Envoyer le reçu sur Telegram
                  </a>
                </div>

                <p className="payment-side__note">
                  Validation rapide sous 24h. Dès vérification, votre statut passera automatiquement à
                  Payé.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
