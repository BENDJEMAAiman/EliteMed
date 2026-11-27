import { Link } from 'react-router-dom'
import logo from '../../assets/EliteMed_flat 3.svg'
import { CONTACT } from '../../data/home'
import Reveal from '../ui/Reveal'
import { Facebook, Instagram, Linkedin, XIcon } from '../ui/Icons'
import './Footer.css'

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'X', icon: XIcon, href: '#' },
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="" />
              <span>EliteMed</span>
            </Link>
            <p>
              Votre parcours vers l'excellence médicale commence ici. Rejoignez notre
              communauté d'étudiants en sciences de la santé.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} aria-label={label} className="footer__social">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3>Liens Rapides</h3>
            <ul>
              <li><Link to="/formations">Formations</Link></li>
              <li><Link to="/a-propos">À Propos</Link></li>
              <li><Link to="/connexion">Connexion</Link></li>
            </ul>
          </div>

          <div>
            <h3>Formations</h3>
            <ul>
              <li><Link to="/medecine">Médecine</Link></li>
              <li><Link to="/pharmacie">Pharmacie</Link></li>
              <li><Link to="/medecine-dentaire">Médecine Dentaire</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contactez-nous</h3>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></li>
              <li><span>{CONTACT.address}</span></li>
            </ul>
          </div>
        </Reveal>

        <p className="footer__copy">© {new Date().getFullYear()} EliteMed. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
