import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Base>
)
export const ChevronRight = (p: IconProps) => (
  <Base {...p}><path d="m9 18 6-6-6-6" /></Base>
)
export const HomeIcon = (p: IconProps) => (
  <Base {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></Base>
)
export const Stethoscope = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </Base>
)
export const Clipboard = (p: IconProps) => (
  <Base {...p}>
    <rect width="8" height="4" x="8" y="2" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </Base>
)
export const Bookmark = (p: IconProps) => (
  <Base {...p}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Base>
)
export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Base>
)
export const CheckCircle = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></Base>
)
export const GradCap = (p: IconProps) => (
  <Base {...p}><path d="M22 10v6" /><path d="m2 10 10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></Base>
)
export const Users = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Base>
)
export const Headset = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </Base>
)
export const Award = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></Base>
)
export const MenuIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Base>
)
export const CloseIcon = (p: IconProps) => (
  <Base {...p}><path d="M18 6 6 18M6 6l12 12" /></Base>
)
export const Facebook = (p: IconProps) => (
  <Base {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Base>
)
export const XIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M18.2 2.5h3.1l-6.8 7.8 8 11.2h-6.2l-4.9-6.4-5.6 6.4H2.700l7.300-8.300L2.200 2.500h6.400l4.400 5.800zm-1.100 17.200h1.700L7.700 4.200H5.900z" />
  </svg>
)
export const Linkedin = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Base>
)
export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </Base>
)
export const Star = ({ size = 20, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
)
