import { FEATURES } from '../../data/home'
import Reveal from '../ui/Reveal'
import { Award, Headset, Users } from '../ui/Icons'

const ICONS = { users: Users, headset: Headset, award: Award }

export default function Features() {
  return (
    <section className="features">
      <div className="container features__inner">
        <Reveal variant="left" className="features__intro">
          <h2 className="section-title section-title--xl">
            Une expérience d'apprentissage complète conçue pour votre succès
          </h2>
          <p>
            Chez EliteMed, vous n'apprenez pas simplement vos cours de médecine, vous
            maîtrisez la clinique et les concours grâce à des méthodes immersives.
          </p>
        </Reveal>

        <div className="features__cards">
          {FEATURES.map(({ icon, title, text, tone }, i) => {
            const Icon = ICONS[icon]
            return (
              <Reveal key={title} delay={i * 120} className={`feature feature--${tone}`}>
                <span className="feature__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
