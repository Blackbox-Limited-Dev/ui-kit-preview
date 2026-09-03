import type { ReactNode } from 'react'

import type { AppIconComponent } from '../AppIcon/AppIcon.types'

export type AppPhoneCountryIso = 'UA' | 'PL' | 'RO'

export type AppPhoneCountry = {
  iso: AppPhoneCountryIso
  name: string
  /** International calling code, rendered in the trigger — `'+380'`. */
  dial: string
  /** Every `0-9` is a digit placeholder, every other character a literal. */
  mask: string
  placeholder: string
  Flag: AppIconComponent
}

export type AppPhoneInputProps = {
  /** National digits without the calling code — `'501234567'`. */
  value: string
  onChange: (value: string) => void
  country: AppPhoneCountryIso
  onCountryChange: (country: AppPhoneCountryIso) => void
  label?: ReactNode
  required?: boolean
  description?: ReactNode
  /** Replaces `description` and paints the error styles on both boxes. */
  error?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}
