import { useState, useEffect, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CloseIcon,
  Mail,
  MessageSquare,
  Phone,
  User,
  UserPlus,
} from '../components/ui/Icons'
import { useAuth } from '../hooks/useAuth'
import { findCourse } from '../data/formations'
import { createEnrollment, formatPrice, type Enrollment } from '../lib/enrollments'
import '../styles/home.css'
import './JoinFormationPage.css'

export default function JoinFormationPage() {
  const { faculty: facultyKey, courseId } = useParams()
  const resolved = findCourse(facultyKey, courseId)
  const { user } = useAuth()

  // Pré-remplissage depuis le profil connecté si disponible
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? ''
  const [defaultFirst, ...restName] = fullName.trim().split(/\s+/)

  const [firstName, setFirstName] = useState(defaultFirst ?? '')
  const [lastName, setLastName] = useState(restName.join(' '))
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState((user?.user_metadata?.phone as string | undefined) ?? '')
  const [motivation, setMotivation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState<Enrollment | null>(null)
  const [showNotice, setShowNotice] = useState(true)

  useEffect(() => {
    document.title = resolved
      ? `Inscription — ${resolved.course.title} — EliteMed`
      : 'Inscription à la formation — EliteMed'
  }, [resolved])

  if (!resolved) {
    return (
      <>
        <Navbar />
        <main className="coming-soon">
          <h1 className="section-title section-title--xl">Formation introuvable</h1>
          <Link to="/medecine" className="link-arrow">← Retour aux formations</Link>
        </main>
        <Footer />
      </>
    )
  }

  const { faculty, course, price, startDate } = resolved
  const levelLabel = `${course.yearLabel} ${faculty.name}`

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (motivation.trim().length < 10) {
      setError('Votre motivation doit contenir au moins 10 caractères.')
      return
    }

    setSubmitting(true)
    const studentName = `${firstName.trim()} ${lastName.trim()}`.trim()

    if (user) {
      const { data, error: insertError } = await createEnrollment({
        user_id: user.id,
        course_id: course.id,
        course_title: course.title,
        level_label: levelLabel,
        price,
        student_name: studentName,
        student_phone: phone.trim(),
      })

      if (insertError) {
        setError(insertError.message)
        setSubmitting(false)
        return
      }
      if (data) {
        setCreated(data)
        setShowNotice(true)
      }
    } else {
      // Aperçu frontend lorsque l'utilisateur teste sans session Supabase
      setCreated({
        id: `demo-${course.id}`,
        ref: 'REF-EM-2026-0421',
        created_at: new Date().toISOString(),
        course_title: course.title,
        level_label: levelLabel,
        price,
        student_name: studentName,
        student_phone: phone.trim(),
        receipt_channel: null,
        status: 'en_attente',
      })
      setShowNotice(true)
    }

    setSubmitting(false)
  }

  return (
    <>
      <Navbar />
      <main className="join-page">
        {/* Bandeau supérieur bleu nuit */}
        <section className="join-hero">
          <div className="container join-hero__inner">
            <Link to={`/${faculty.key}/${course.id}`} className="join-hero__back">
              <ArrowLeft size={14} />
              Retour aux Détails de la Formation
            </Link>

            <span className="join-hero__tag">
              <UserPlus size={14} />
              Inscription à la Formation
            </span>

            <h1>Rejoindre EliteMed Formations</h1>
            <p>
              Complétez votre inscription pour <strong>{course.title}</strong> et commencez votre
              parcours médical aujourd&apos;hui
            </p>
          </div>
        </section>

        {/* Formulaire centré chevauchant la bordure dorée */}
        <div className="container join-main">
          {created && showNotice && (
            <div className="join-success" role="status">
              <div className="join-success__icon" aria-hidden="true">
                <Check size={18} />
              </div>
              <div className="join-success__body">
                <div className="join-success__top">
                  <strong>Inscription réussie !</strong>
                  <button
                    type="button"
                    className="join-success__close"
                    aria-label="Fermer"
                    onClick={() => setShowNotice(false)}
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>
                <p>
                  Votre inscription à <strong>{course.title}</strong> a bien été enregistrée. Nous
                  vous contacterons sous 24h pour la confirmation.
                </p>
                <div className="join-success__foot">
                  <span className="join-success__pill">
                    En Attente · {formatPrice(price)}
                  </span>
                  <div className="join-success__links">
                    <Link to={`/paiement/${created.id}`} state={{ enrollment: created }}>
                      Finaliser le paiement <ArrowRight size={15} />
                    </Link>
                    <Link to="/dashboard">
                      Voir mes inscriptions <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className="join-card">
            <div className="join-card__badge" aria-hidden="true">
              <UserPlus size={22} />
            </div>
            <h2>Complétez Votre Inscription</h2>
            <p className="join-card__sub">
              Vous vous inscrivez à : <span>{course.title}</span>
            </p>

            {/* Résumé de la formation */}
            <div className="join-summary">
              <h3>Résumé de la Formation</h3>
              <div className="join-summary__grid">
                <div>
                  <span>Date de Début :</span>
                  <strong>{startDate}</strong>
                </div>
                <div>
                  <span>Niveau :</span>
                  <strong>
                    {course.yearLabel.toUpperCase()} • {faculty.name.toUpperCase()}
                  </strong>
                </div>
                <div>
                  <span>Prix :</span>
                  <strong className="join-summary__price">{formatPrice(price)}</strong>
                </div>
              </div>
            </div>

            <form className="join-form" onSubmit={handleSubmit}>
              <h3 className="join-form__title">
                <User size={16} />
                Informations Personnelles
              </h3>

              <div className="join-form__row">
                <div className="join-field">
                  <label htmlFor="join-firstname">Prénom *</label>
                  <input
                    id="join-firstname"
                    type="text"
                    placeholder="Yasmine"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="join-field">
                  <label htmlFor="join-lastname">Nom *</label>
                  <input
                    id="join-lastname"
                    type="text"
                    placeholder="Benali"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="join-field">
                <label htmlFor="join-email">
                  <Mail size={14} /> Adresse Email *
                </label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="yasmine.benali@elitemed.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="join-field">
                <label htmlFor="join-phone">
                  <Phone size={14} /> Numéro de Téléphone *
                </label>
                <input
                  id="join-phone"
                  type="tel"
                  placeholder="+213 558 541 694"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="join-field">
                <label htmlFor="join-motivation">
                  <MessageSquare size={14} /> Motivation *
                </label>
                <textarea
                  id="join-motivation"
                  rows={4}
                  minLength={10}
                  maxLength={1000}
                  placeholder="Dites-nous pourquoi vous voulez vous inscrire à cette formation et ce que vous espérez accomplir..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  required
                />
                <span className="join-field__hint">
                  Minimum 10 caractères, maximum 1000 caractères
                </span>
              </div>

              {error && <p className="join-form__error">{error}</p>}

              <button type="submit" className="join-form__submit" disabled={submitting}>
                <UserPlus size={18} />
                {submitting ? 'Enregistrement...' : "Compléter l'Inscription"}
              </button>

              <p className="join-form__note">
                En vous inscrivant, vous acceptez nos conditions générales. Nous vous contacterons
                dans les 24 heures pour confirmer votre inscription.
              </p>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
