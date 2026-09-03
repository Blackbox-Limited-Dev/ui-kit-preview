import React from 'react'
import cn from 'classnames'

import s from './AppText.module.scss'

import type { AppTextProps } from './AppText.types'

export const AppText = ({
  variant = 'body-1-regular',
  as: Tag = 'p',
  className,
  children,
  ...rest
}: AppTextProps) => (
  <Tag className={cn(s[variant], className)} {...rest}>
    {children}
  </Tag>
)
