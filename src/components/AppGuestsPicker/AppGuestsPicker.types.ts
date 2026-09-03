export type AppGuestsValue = {
  adults: number
  children: number
}

export type AppGuestsPickerProps = {
  value: AppGuestsValue
  onChange: (value: AppGuestsValue) => void
  /** Row labels — pass translated strings from the host. */
  adultsLabel: string
  adultsHint: string
  childrenLabel: string
  childrenHint: string
  /** Stepper aria-labels, one pair per row. */
  adultsDecreaseLabel: string
  adultsIncreaseLabel: string
  childrenDecreaseLabel: string
  childrenIncreaseLabel: string
  maxAdults?: number
  maxChildren?: number
  className?: string
}
