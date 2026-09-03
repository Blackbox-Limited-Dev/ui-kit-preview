import React from 'react'
import cn from 'classnames'

import s from './AppInput.module.scss'

import type { AppInputProps } from './AppInput.types'

export const AppInput = ({
  label,
  required,
  description,
  error,
  slotLeft,
  slotRight,
  disabled,
  id,
  type = 'text',
  className,
  ...rest
}: AppInputProps) => {
  const hasError = !!error
  const message = error ?? description
  const messageId = id && message ? `${id}-message` : undefined

  return (
    <div className={cn(s.root, className)}>
      <label className={s.field} htmlFor={id}>
        {label && (
          <span className={s.label}>
            {label}
            {required && (
              <span className={s.required} aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
        <span className={cn(s.box, { [s.box_disabled]: disabled })}>
          {slotLeft && <span className={s.slot}>{slotLeft}</span>}
          <input
            id={id}
            type={type}
            className={s.input}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={messageId}
            {...rest}
          />
          {slotRight && <span className={s.slot}>{slotRight}</span>}
        </span>
      </label>
      {message && (
        <p
          id={messageId}
          className={cn(s.message, { [s.message_error]: hasError })}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export type { AppInputProps } from './AppInput.types'
