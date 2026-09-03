import React from 'react'
import cn from 'classnames'

import s from './AppBadge.module.scss'

import type { AppBadgeProps } from './AppBadge.types'

export const AppBadge = ({
  variant = 'neutral',
  as: Tag = 'span',
  className,
  children,
  ...rest
}: AppBadgeProps) => (
  <Tag className={cn(s.root, s[variant], className)} {...rest}>
    {children}
  </Tag>
)

export type { AppBadgeProps, AppBadgeVariant } from './AppBadge.types'
