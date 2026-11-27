import type { CSSProperties } from 'react'
import {
  STATUS_LABELS,
  formatDate,
  formatPrice,
  receiptText,
  type Enrollment,
  type EnrollmentStatus,
} from '../../lib/enrollments'
import { BadgeCheck, Check, CloseIcon, Undo } from '../ui/Icons'

interface Props {
  enrollment: Enrollment
  index: number
  busy: boolean
  onChange: (id: string, status: EnrollmentStatus) => void
}

export default function EnrollmentCard({ enrollment: e, index, busy, onChange }: Props) {
  const reject = () => {
    if (window.confirm(`Rejeter la demande de ${e.student_name} ?`)) onChange(e.id, 'rejete')
  }

  return (
    <article
      className={`request ${busy ? 'is-busy' : ''}`}
      style={{ '--i': index } as CSSProperties}
    >
      <div className="request__info">
        <div className="request__head">
          <span className={`status status--${e.status}`}>{STATUS_LABELS[e.status]}</span>
          <span className="request__ref">{e.ref}</span>
          <span className="request__date">· {formatDate(e.created_at)}</span>
        </div>
        <h3>
          {e.course_title} — {e.level_label}
        </h3>
        <p>
          Étudiant : {e.student_name}
          {e.student_phone && <> · {e.student_phone}</>} · {receiptText(e.receipt_channel)}
        </p>
      </div>

      <div className="request__side">
        <span className="request__price">{formatPrice(e.price)}</span>

        <div className="request__actions">
          {e.status === 'en_attente' && (
            <button type="button" className="abtn abtn--outline" disabled={busy} onClick={() => onChange(e.id, 'confirme')}>
              <Check size={14} /> Confirmer
            </button>
          )}
          {(e.status === 'en_attente' || e.status === 'confirme') && (
            <>
              <button type="button" className="abtn abtn--danger" disabled={busy} onClick={reject}>
                <CloseIcon size={14} /> Rejeter
              </button>
              <button type="button" className="abtn abtn--solid" disabled={busy} onClick={() => onChange(e.id, 'paye')}>
                <BadgeCheck size={15} /> Confirmer paiement
              </button>
            </>
          )}
          {e.status === 'paye' && (
            <span className="request__done">
              <BadgeCheck size={16} /> Accès activé
            </span>
          )}
          {e.status === 'rejete' && (
            <button type="button" className="abtn abtn--outline" disabled={busy} onClick={() => onChange(e.id, 'en_attente')}>
              <Undo size={14} /> Remettre en attente
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
