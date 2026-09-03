import React from 'react'
import cn from 'classnames'

import s from './AppStatusLabel.module.scss'

import type { AppStatusLabelProps } from './AppStatusLabel.types'

export const AppStatusLabel = ({
  className,
  children,
  level = 'red',
  ...rest
}: AppStatusLabelProps) => (
  <span className={cn(s.root, s[level], className)} {...rest}>
    {children}
  </span>
)

export type {
  AppStatusLabelProps,
  AppStatusLabelLevel,
} from './AppStatusLabel.types'
