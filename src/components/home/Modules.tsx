import { Link } from 'react-router-dom'
import { MODULES } from '../../data/home'
import Reveal from '../ui/Reveal'
import { ArrowRight, ChevronRight } from '../ui/Icons'

export default function Modules() {
  return (
    <section className="modules" id="modules">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <h2 className="section-title">Parcourez les modules par année universitaire</h2>
            <p className="section-sub">
              Des premières sciences fondamentales jusqu'aux exigences du concours de
              Résidanat.
            </p>
          </div>
          <Link to="/formations" className="link-arrow">
            Voir l'ensemble des programmes <ChevronRight size={18} />
          </Link>
        </Reveal>

        <div className="modules__grid">
          {MODULES.map((m, i) => (
            <Reveal
              key={m.title}
              delay={(i % 3) * 100}
              className={`module ${'featured' in m && m.featured ? 'module--featured' : ''}`}
            >
              <span className={`pill ${'badgeTone' in m ? 'pill--dark' : ''}`}>{m.badge}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <div className="module__tags">
                {m.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="module__footer">
                <Link to={m.to} className="module__link">
                  Accéder aux cours <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
