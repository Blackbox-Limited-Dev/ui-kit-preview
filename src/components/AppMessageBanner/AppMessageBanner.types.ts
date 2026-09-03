import type { ReactNode } from 'react'

export type AppMessageBannerVariant = 'secondary' | 'info' | 'white' | 'danger'

export type AppMessageBannerSize = 'sm' | 'md' | 'md-condensed'

export type AppMessageBannerAlign = 'start' | 'center'

export type AppMessageBannerProps = {
  variant?: AppMessageBannerVariant
  /** `sm` = 14/140%, `md` = 16/150%, `md-condensed` = 16/110%. */
  size?: AppMessageBannerSize
  /** Defaults to `center` for `secondary`, `start` for every other variant. */
  align?: AppMessageBannerAlign
  /** Trailing press target, e.g. the retry link on an error banner. */
  action?: ReactNode
  children: ReactNode
  className?: string
}
