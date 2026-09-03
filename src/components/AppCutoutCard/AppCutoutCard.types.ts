import type { ReactNode } from 'react'

export type AppCutoutCardNotch = 'top' | 'middle' | 'bottom'

export type AppCutoutCardProps = {
  /** Notch height: 25% / 50% of the card, or 72px above its bottom edge. */
  notch?: AppCutoutCardNotch
  children: ReactNode
  className?: string
}
