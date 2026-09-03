import React from 'react'
import cn from 'classnames'

import { iconoirIcons } from './AppIcon.iconoir'

import styles from './AppIcon.module.scss'

import type { AppIconProps, AppIconSize } from './AppIcon.types'

const sizeToPx = (size: AppIconSize | undefined): number => {
  if (typeof size === 'number') return size
  switch (size) {
    case 'small':
      return 16
    case 'large':
      return 24
    case 'medium':
    default:
      return 20
  }
}

export const AppIcon = ({
  name,
  icon,
  size,
  color,
  strokeWidth,
  className,
  label,
}: AppIconProps) => {
  const Component = icon ?? (name ? iconoirIcons[name] : undefined)

  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[AppIcon] Unknown icon "${name}"`)
    }
    return null
  }

  const px = sizeToPx(size)

  return (
    <Component
      className={cn(styles.root, className)}
      width={px}
      height={px}
      color={color}
      strokeWidth={strokeWidth}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable={false}
    />
  )
}
