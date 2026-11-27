import type { CSSProperties, ReactNode } from 'react'
import { useCountUp } from '../../hooks/useCountUp'

interface Props {
  label: string
  value: number
  hint: string
  tone: 'yellow' | 'blue' | 'navy'
  icon: ReactNode
  active?: boolean
  index: number
  onClick: () => void
}

export default function StatCard({ label, value, hint, tone, icon, active, index, onClick }: Props) {
  const shown = useCountUp(value)

  return (
    <button
      type="button"
      className={`stat ${active ? 'is-active' : ''}`}
      style={{ '--i': index } as CSSProperties}
      aria-pressed={active}
      onClick={onClick}
    >
      <div>
        <span className="stat__label">{label}</span>
        <strong className="stat__value">{shown}</strong>
        <span className="stat__hint">{hint}</span>
      </div>
      <span className={`stat__icon stat__icon--${tone}`}>{icon}</span>
    </button>
  )
}
