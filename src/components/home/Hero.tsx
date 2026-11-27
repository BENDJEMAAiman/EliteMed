import { Link } from 'react-router-dom'
import { HERO_BADGES } from '../../data/home'
import AlgeriaMap from '../ui/AlgeriaMap'
import { ArrowRight, CheckCircle, GradCap, Users } from '../ui/Icons'

const BADGE_ICONS = { check: CheckCircle, cap: GradCap, users: Users }

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__line" style={{ animationDelay: '0.1s' }}>
              L'excellence pédagogique
            </span>
            <span className="hero__line" style={{ animationDelay: '0.2s' }}>
              au service de vos
            </span>
            <span className="hero__line hero__accent" style={{ animationDelay: '0.3s' }}>
              études de médecine
            </span>
          </h1>

          <p className="hero__text">
            Banques de QCM détaillés, cours magistraux enregistrés, fiches de révision
            modulaires et annales classées par année d'étude. Conçus par des formateurs
            majors et validés cliniquement.
          </p>

          <ul className="hero__badges">
            {HERO_BADGES.map(({ icon, label }) => {
              const Icon = BADGE_ICONS[icon]
              return (
                <li key={label}>
                  <Icon size={18} /> {label}
                </li>
              )
            })}
          </ul>

          <Link to="/#modules" className="btn btn--outline btn--lg hero__cta">
            Explorer les ressources <ArrowRight size={20} />
          </Link>
        </div>

        <div className="hero__visual">
          <AlgeriaMap />
        </div>
      </div>
    </section>
  )
}
