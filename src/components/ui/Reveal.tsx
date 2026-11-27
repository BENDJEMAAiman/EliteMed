import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** délai en ms (pour décaler les éléments d'une même rangée) */
  delay?: number
  /** animation d'entrée */
  variant?: 'up' | 'left' | 'right' | 'fade' | 'scale'
  as?: ElementType
  className?: string
}

/** Fait apparaître son contenu au scroll, une seule fois. */
export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal reveal--${variant} ${inView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
