export type AppSeason = 'winter' | 'summer'

export type AppSeasonSelectorProps = {
  /** Season currently shown; clicking requests the other one. */
  season: AppSeason
  onSeasonChange: (season: AppSeason) => void
  labels?: Record<AppSeason, string>
  className?: string
}
