import React from 'react'
import cn from 'classnames'

import s from './AppInfoLabel.module.scss'

import type { AppInfoLabelProps } from './AppInfoLabel.types'

export const AppInfoLabel = ({
  icon,
  className,
  children,
  ...rest
}: AppInfoLabelProps) => (
  <span className={cn(s.root, className)} {...rest}>
    {icon && <span className={s.icon}>{icon}</span>}
    {children}
  </span>
)

export type { AppInfoLabelProps } from './AppInfoLabel.types'
