export type AppLikeProps = {
  /** Liked state. Controlled — caller owns it. */
  isLiked: boolean
  /** Fires with the next value when the user toggles. */
  onChange: (next: boolean) => void
  disabled?: boolean
  /** Accessible name of the toggle, e.g. «Додати в обране». */
  label: string
  className?: string
}
