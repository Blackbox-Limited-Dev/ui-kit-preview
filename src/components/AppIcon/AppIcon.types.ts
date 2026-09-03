import type { ComponentType, CSSProperties, SVGProps } from 'react'

import type { IconoirIconName } from './AppIcon.iconoir'

export type AppIconSize = number | 'small' | 'medium' | 'large'

export type AppIconComponent = ComponentType<SVGProps<SVGSVGElement>>

type AppIconCommonProps = {
  size?: AppIconSize
  color?: CSSProperties['color']
  /** In the icon's own viewBox units, not rendered pixels. iconoir draws in a
   *  24-unit box, so `2.25` renders as 1.5px at `size="small"`. */
  strokeWidth?: number
  className?: string
  /** When provided, the icon is announced to assistive tech.
   *  When omitted, the icon is treated as decorative (`aria-hidden`). */
  label?: string
}

type RegistryVariant = AppIconCommonProps & {
  name: IconoirIconName
  icon?: never
}

type ComponentVariant = AppIconCommonProps & {
  /** SVGR component — `import Icon from '~icons/mountain.svg'`. Imported per use
   *  site so a route only bundles the icons it actually renders. */
  icon: AppIconComponent
  name?: never
}

export type AppIconProps = RegistryVariant | ComponentVariant
