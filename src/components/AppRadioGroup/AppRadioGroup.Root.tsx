'use client'

import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import cn from 'classnames'

import s from './AppRadioGroup.module.scss'

import type { AppRadioGroupProps } from './AppRadioGroup.types'

export const AppRadioGroupRoot = ({
  className,
  children,
  ...rest
}: AppRadioGroupProps) => (
  <RadioGroup.Root className={cn(s.root, className)} {...rest}>
    {children}
  </RadioGroup.Root>
)
