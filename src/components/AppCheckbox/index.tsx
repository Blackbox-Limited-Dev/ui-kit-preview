'use client'

import React from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import cn from 'classnames'

import s from './AppCheckbox.module.scss'

import type { AppCheckboxProps } from './AppCheckbox.types'

// The label sits beside the control and targets it via `htmlFor` — wrapping
// the Radix button in an implicit <label> breaks tap activation on iOS
// Safari and Android Chrome.
export const AppCheckbox = ({
  id,
  label,
  disabled,
  onCheckedChange,
  className,
  ...rest
}: AppCheckboxProps) => (
  <div className={cn(s.row, { [s.disabled]: disabled }, className)}>
    <Checkbox.Root
      id={id}
      className={s.control}
      disabled={disabled}
      onCheckedChange={(state) => onCheckedChange?.(state === true)}
      {...rest}
    >
      <Checkbox.Indicator className={s.indicator}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M 17.5 8 L 10.5 15 L 7 11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox.Indicator>
    </Checkbox.Root>
    {label && (
      <label htmlFor={id} className={s.text}>
        {label}
      </label>
    )}
  </div>
)

export type { AppCheckboxProps } from './AppCheckbox.types'
