import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

export type AppMediaTileProps = {
  image: StaticImageData | string
  alt: string
  caption: ReactNode
  /** `sizes` for the fill image; defaults to the full viewport width. */
  sizes?: string
  /** Extra layer above the still — a looping background video, for instance. */
  media?: ReactNode
  className?: string
}
