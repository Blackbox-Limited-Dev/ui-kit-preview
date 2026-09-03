import React from 'react'
import cn from 'classnames'

import MagnifyingGlass from '~icons/magnifying-glass-nav.svg'

import { AppIcon } from '../AppIcon'

import s from './AppSearch.module.scss'

import type { AppSearchProps } from './AppSearch.types'

export const AppSearch = ({ className, ...rest }: AppSearchProps) => (
  <label className={cn(s.root, className)}>
    <input type="search" className={s.input} {...rest} />
    <AppIcon
      icon={MagnifyingGlass}
      size="large"
      color="var(--color-icon-on-card)"
    />
  </label>
)

export type { AppSearchProps } from './AppSearch.types'
