import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CheckSquare,
  ExternalLink,
  FolderOpen,
  HelpCircle,
} from '../components/ui/Icons'
import { findCourseById } from '../data/formations'
import type { Enrollment } from '../lib/enrollments'
import '../styles/home.css'
import './FormationContentPage.css'

/** Nettoie "Chapitre X : ..." pour afficher "1. ..." comme sur la maquette. */
const shortChapterTitle = (title: string) => title.replace(/^Chapitre\s+\d+\s*:\s*/i, '')

export default function FormationContentPage() {
  const { courseId } = useParams()
  const location = useLocation()
  const enrollment = (location.state as { enrollment?: Enrollment } | null)?.enrollment
  const resolved = findCourseById(courseId)

  useEffect(() => {
    document.title = resolved
      ? `${resolved.course.title} — Contenu — EliteMed`
      : 'Contenu de la formation — EliteMed'
  }, [resolved])

  if (!resolved) {
    return (
      <>
        <Navbar />
        <main className="coming-soon">
          <h1 className="section-title section-title--xl">Formation introuvable</h1>
          <Link to="/dashboard" className="link-arrow">← Retour au Tableau de bord</Link>
        </main>
        <Footer />
      </>
    )
  }

  const { faculty, course, qcmCount, chapters, driveUrl, qcmDriveUrl } = resolved
  const refCode = enrollment?.ref ?? 'REF-EM-2026-0418'

  return (
    <>
      <Navbar />
      <main className="content-page">
        <div className="container">
          <Link to="/dashboard" className="content-page__back">
            <ArrowLeft size={16} />
            Retour au Tableau de bord
          </Link>

          <header className="content-page__head">
            <div className="content-page__badges">
              <span className="content-badge content-badge--paid">
                <BadgeCheck size={14} />
                Payé • Accès activé
              </span>
              <span className="content-badge content-badge--level">
                {course.yearLabel.toUpperCase()} • {faculty.name.toUpperCase()}
              </span>
              <span className="content-page__ref">{refCode}</span>
            </div>

            <h1>{course.title}</h1>
            <p>
              Votre paiement a été confirmé. Accédez ci-dessous au Drive complet de vos supports PDF
              ainsi qu&apos;à votre espace QCM et exercices corrigés.
            </p>
          </header>

          {/* Deux cartes principales : Drive PDF et Banque de QCM */}
          <div className="content-page__grid">
            <article className="access-card access-card--featured">
              <div className="access-card__icon access-card__icon--navy">
                <FolderOpen size={22} />
              </div>
              <span className="access-card__eyebrow">SUPPORTS DE COURS</span>
              <h2>Drive — Cours &amp; Fiches PDF</h2>
              <p>
                Ouvrez le dossier Drive dédié pour consulter et télécharger l&apos;ensemble des
                polycopiés, planches anatomiques annotées et fiches de révision PDF.
              </p>
              <div className="access-card__tags">
                <span>28 fichiers PDF</span>
                <span>Planches HD</span>
                <span>Fiches Synoptiques</span>
              </div>
              <a
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="access-card__btn access-card__btn--navy"
              >
                Ouvrir le Drive PDF
                <ExternalLink size={15} />
              </a>
            </article>

            <article className="access-card">
              <div className="access-card__icon access-card__icon--blue">
                <HelpCircle size={22} />
              </div>
              <span className="access-card__eyebrow">ENTRAÎNEMENT INTERACTIF</span>
              <h2>Banque de QCM &amp; Exercices</h2>
              <p>
                Accédez à la plateforme d&apos;exercices et QCM corrigés pour tester vos
                connaissances chapitre par chapitre et préparer vos examens.
              </p>
              <div className="access-card__tags">
                <span>{qcmCount}</span>
                <span>Annales Corrigées</span>
                <span>Mode Examen</span>
              </div>
              <a
                href={qcmDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="access-card__btn access-card__btn--blue"
              >
                Accéder aux QCM &amp; Exercices
                <ExternalLink size={15} />
              </a>
            </article>
          </div>

          {/* Liste des chapitres inclus */}
          <section className="content-chapters">
            <div className="content-chapters__head">
              <h3>Contenu inclus dans votre accès</h3>
              <span>{chapters.length} chapitres disponibles</span>
            </div>

            <ul className="content-chapters__grid">
              {chapters.map((ch, idx) => (
                <li key={ch.title}>
                  {ch.isExam ? <CheckSquare size={16} /> : <BookOpen size={16} />}
                  <span>
                    {idx + 1}. {shortChapterTitle(ch.title)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
