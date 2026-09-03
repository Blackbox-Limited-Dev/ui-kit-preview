'use client'

import React from 'react'
import cn from 'classnames'
import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp'

import s from './AppOtpInput.module.scss'

import type { AppOtpInputProps } from './AppOtpInput.types'

export const AppOtpInput = ({
  value,
  onChange,
  length = 4,
  onComplete,
  error,
  disabled,
  autoFocus,
  className,
  ...rest
}: AppOtpInputProps) => {
  const hasError = !!error

  return (
    <div className={cn(s.root, className)}>
      <OTPInput
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        maxLength={length}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        disabled={disabled}
        autoFocus={autoFocus}
        aria-invalid={hasError || undefined}
        containerClassName={s.row}
        render={({ slots }) => (
          <>
            {slots.map((slot, index) => (
              <div
                key={index}
                className={cn(s.cell, {
                  [s.cell_active]: slot.isActive,
                  [s.cell_error]: hasError,
                  [s.cell_disabled]: disabled,
                })}
              >
                {slot.char}
                {slot.hasFakeCaret && <span className={s.caret} />}
              </div>
            ))}
          </>
        )}
        {...rest}
      />
      {error && <p className={s.message}>{error}</p>}
    </div>
  )
}

export type { AppOtpInputProps } from './AppOtpInput.types'
