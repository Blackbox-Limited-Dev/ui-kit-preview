'use client'

import React from 'react'
import * as Switch from '@radix-ui/react-switch'
import cn from 'classnames'

import s from './AppSwitch.module.scss'

import type { AppSwitchProps } from './AppSwitch.types'

export const AppSwitch = ({ className, ...rest }: AppSwitchProps) => (
  <Switch.Root className={cn(s.root, className)} {...rest}>
    <Switch.Thumb className={s.thumb} />
  </Switch.Root>
)

export type { AppSwitchProps } from './AppSwitch.types'
