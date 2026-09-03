import type { AppButtonElementProps } from '../AppButton/AppButton.types'
import type { IconoirIconName } from '../AppIcon/AppIcon.iconoir'
import type { AppIconComponent } from '../AppIcon/AppIcon.types'

/** The icon comes either from the AppIcon registry (`name`) or as an SVGR
 *  component (`icon`) — exactly one of the two. */
type AppNavLinkItemIconProps =
  | {
      name: IconoirIconName
      icon?: never
    }
  | {
      name?: never
      icon: AppIconComponent
    }

export type AppNavLinkItemProps = {
  /** Accessible name — the item renders icon-only. */
  label: string
  /** Count indicator in the top-right corner. Hidden when zero. */
  count?: number
  className?: string
} & AppNavLinkItemIconProps &
  AppButtonElementProps
