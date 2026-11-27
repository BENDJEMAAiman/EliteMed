import { useEffect, useState } from 'react'

/** `true` dès que la page a défilé de plus de `offset` pixels. */
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > offset : false,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
