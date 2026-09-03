import type { ReactNode } from 'react'

import type { AppButtonElementProps } from '../AppButton/AppButton.types'
import type { AppIconComponent } from '../AppIcon/AppIcon.types'

export type AppNavActionProps = {
  /** 32 × 32 multicolour illustration — `import Rent from '~assets/illustrations/cta/rent.svg'`.
   *  Optional: some actions have no illustration in the design yet. */
  illustration?: AppIconComponent
  /** Red attention dot pinned to the pill's top-right corner. */
  showDot?: boolean
  /** Action label. */
  children: ReactNode
  className?: string
} & AppButtonElementProps
