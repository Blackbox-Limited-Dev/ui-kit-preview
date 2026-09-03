import type { ReactNode } from 'react'

export type AppLinkCardProps = {
  title: ReactNode
  /** 48×48 decorative illustration; rendered `aria-hidden`. */
  artwork?: ReactNode
  /** Renders the card as a link. */
  href?: string
  className?: string
}
