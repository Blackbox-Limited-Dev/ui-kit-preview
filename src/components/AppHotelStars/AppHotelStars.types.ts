import type { HTMLAttributes } from 'react'

export type AppHotelStarsProps = {
  /** Number of stars to render, 1–5. */
  count: number
  /** Announced to assistive tech; omit to render as decorative. */
  label?: string
  className?: string
} & HTMLAttributes<HTMLSpanElement>
