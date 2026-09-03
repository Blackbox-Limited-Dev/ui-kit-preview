'use client'

import React, { useState } from 'react'

import { AppIcon } from '../AppIcon'
import { AppInput } from '../AppInput'

import s from './AppPasswordInput.module.scss'

import type { AppPasswordInputProps } from './AppPasswordInput.types'

export const AppPasswordInput = ({
  showLabel = 'Show password',
  hideLabel = 'Hide password',
  autoComplete = 'current-password',
  disabled,
  ...rest
}: AppPasswordInputProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <AppInput
      {...rest}
      type={visible ? 'text' : 'password'}
      autoComplete={autoComplete}
      disabled={disabled}
      slotRight={
        <button
          type="button"
          className={s.toggle}
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
        >
          <AppIcon name={visible ? 'EyeClosed' : 'Eye'} size={24} />
        </button>
      }
    />
  )
}

export type { AppPasswordInputProps } from './AppPasswordInput.types'
