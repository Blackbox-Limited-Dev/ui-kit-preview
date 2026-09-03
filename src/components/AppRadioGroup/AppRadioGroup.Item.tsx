'use client'

import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import cn from 'classnames'

import s from './AppRadioGroup.Item.module.scss'

import type { AppRadioGroupItemProps } from './AppRadioGroup.types'

// The label sits beside the control and targets it via `htmlFor` — wrapping
// the Radix button in an implicit <label> breaks tap activation on iOS
// Safari and Android Chrome.
export const AppRadioGroupItem = ({
  id,
  label,
  disabled,
  className,
  ...rest
}: AppRadioGroupItemProps) => (
  <div className={cn(s.row, { [s.disabled]: disabled }, className)}>
    <RadioGroup.Item
      id={id}
      className={s.control}
      disabled={disabled}
      {...rest}
    />
    {label && (
      <label htmlFor={id} className={s.text}>
        {label}
      </label>
    )}
  </div>
)
