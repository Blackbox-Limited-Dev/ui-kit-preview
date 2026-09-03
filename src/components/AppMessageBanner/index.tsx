import React from 'react'
import cn from 'classnames'

import { AppIcon } from '../AppIcon'

import s from './AppMessageBanner.module.scss'

import type { AppMessageBannerProps } from './AppMessageBanner.types'

const SIZE_CLASS = {
  sm: 'sizeSm',
  md: 'sizeMd',
  'md-condensed': 'sizeMdCondensed',
} as const

export const AppMessageBanner = ({
  variant = 'info',
  size = 'sm',
  align,
  action,
  children,
  className,
}: AppMessageBannerProps) => {
  const resolvedAlign = align ?? (variant === 'secondary' ? 'center' : 'start')

  return (
    <div
      className={cn(
        s.root,
        s[variant],
        s[SIZE_CLASS[size]],
        s[resolvedAlign],
        className
      )}
    >
      {variant !== 'secondary' && (
        <AppIcon name="InfoCircle" size="small" className={s.root_icon} />
      )}
      <p className={s.root_text}>{children}</p>
      {action && <div className={s.root_action}>{action}</div>}
    </div>
  )
}

export type {
  AppMessageBannerAlign,
  AppMessageBannerProps,
  AppMessageBannerSize,
  AppMessageBannerVariant,
} from './AppMessageBanner.types'
