import type { AnchorHTMLAttributes } from 'react'

export type AppSocialBrand = 'instagram' | 'facebook' | 'telegram'

export type AppSocialButtonProps = {
  brand: AppSocialBrand
  href: string
  /** Accessible name — defaults to the capitalized brand name. */
  label?: string
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
