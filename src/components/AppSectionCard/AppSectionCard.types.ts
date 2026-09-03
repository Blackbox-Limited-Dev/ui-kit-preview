import type { ReactNode } from 'react'

export type AppSectionCardTitlePlacement = 'inside' | 'outside'

export type AppSectionCardProps = {
  title?: ReactNode
  /** `inside` keeps the title within the card; `outside` lifts it above. */
  titlePlacement?: AppSectionCardTitlePlacement
  /** `false` drops the padding, radius and background — the card sits flush. */
  padded?: boolean
  children: ReactNode
  className?: string
}
