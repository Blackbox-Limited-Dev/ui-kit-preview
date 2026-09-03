import type { AppInputProps } from '../AppInput/AppInput.types'

export type AppPasswordInputProps = Omit<
  AppInputProps,
  'type' | 'slotRight'
> & {
  /** Accessible name of the toggle while the value is hidden. */
  showLabel?: string
  /** Accessible name of the toggle while the value is visible. */
  hideLabel?: string
}
