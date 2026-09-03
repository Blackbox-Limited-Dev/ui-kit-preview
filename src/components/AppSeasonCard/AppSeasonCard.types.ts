export type AppSeasonCardVariant = 'neutral' | 'low' | 'high' | 'holiday'

export type AppSeasonCardProps = {
  variant: AppSeasonCardVariant
  title: string
  /** Status pill next to the title. */
  badge?: string
  /** Date ranges the season covers — rendered dot-separated. */
  dates?: string[]
  /** Caption above the price, e.g. «Ціна від». */
  priceLabel?: string
  /** Formatted price, without the unit. */
  price: string
  /** Price unit, e.g. «/ день». */
  priceUnit: string
  href: string
  /** Accessible name of the arrow button — it has no visible label. */
  actionLabel: string
  className?: string
}
