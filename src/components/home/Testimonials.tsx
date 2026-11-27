import { TESTIMONIALS } from '../../data/home'
import Reveal from '../ui/Reveal'
import { Star } from '../ui/Icons'

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Rigueur académique et retours d'expérience</h2>
          <p className="section-sub">Témoignages et métriques réelles d'étudiants</p>
        </Reveal>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="testimonial">
              <div className="testimonial__stars" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={20} style={{ animationDelay: `${i * 120 + s * 70}ms` }} />
                ))}
              </div>
              <blockquote>« {t.quote} »</blockquote>
              <strong>{t.name}</strong>
              <span>{t.role.trim()}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
