import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

import type { AppMegaTabsItem } from '../AppMegaTabs/AppMegaTabs.types'

export type AppProductPurchaseCardProps = {
  image: StaticImageData | string
  imageAlt: string
  title: ReactNode
  /** Dot-separated meta under the title. */
  meta?: ReactNode[]
  /** Tariff tabs; omitted on products that have a single price. */
  tariffs?: AppMegaTabsItem[]
  tariff?: string
  onTariffChange?: (value: string) => void
  tariffsLabel?: string
  ctaLabel: string
  ctaPrice: string
  onCta?: () => void
  /** Renders the favourite toggle when supplied with `favouriteLabel`. */
  liked?: boolean
  onLikedChange?: (next: boolean) => void
  favouriteLabel?: string
  className?: string
}
