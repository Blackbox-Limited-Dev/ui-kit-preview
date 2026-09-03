import type { ReactNode } from 'react'

export type AppAppPromoBannerProps = {
  title: ReactNode
  body: ReactNode
  appStoreHref: string
  appStoreLabel: string
  googlePlayHref: string
  googlePlayLabel: string
  /** Alt text for the phone photo. */
  photoAlt: string
  className?: string
}
