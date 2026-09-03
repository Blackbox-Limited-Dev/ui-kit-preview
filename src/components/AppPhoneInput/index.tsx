'use client'

import React, { useId } from 'react'
import * as Select from '@radix-ui/react-select'
import cn from 'classnames'

import { AppIcon } from '../AppIcon'
import { AppInput } from '../AppInput'

import { countries, countriesByIso } from './AppPhoneInput.countries'
import { applyMask, toDigits } from './AppPhoneInput.utils'

import s from './AppPhoneInput.module.scss'

import type { ChangeEvent } from 'react'
import type {
  AppPhoneCountryIso,
  AppPhoneInputProps,
} from './AppPhoneInput.types'

export const AppPhoneInput = ({
  value,
  onChange,
  country,
  onCountryChange,
  label,
  required,
  description,
  error,
  disabled,
  id,
  name,
  className,
}: AppPhoneInputProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const selected = countriesByIso[country]
  const hasError = !!error
  const message = error ?? description
  const messageId = message ? `${inputId}-message` : undefined

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(toDigits(event.target.value, selected.mask))
  }

  return (
    <div className={cn(s.root, className)}>
      {label && (
        <label className={s.label} htmlFor={inputId}>
          {label}
          {required && (
            <span className={s.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={s.row}>
        <Select.Root
          value={country}
          onValueChange={(next) => onCountryChange(next as AppPhoneCountryIso)}
          disabled={disabled}
        >
          <Select.Trigger
            className={cn(s.trigger, { [s.trigger_error]: hasError })}
            aria-label="Country calling code"
          >
            <span className={s.flag}>
              <selected.Flag />
            </span>
            <span className={s.dial}>{selected.dial}</span>
            <Select.Icon className={s.caret}>
              <AppIcon name="NavArrowDown" size={24} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className={s.content}
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport>
                {countries.map((option) => (
                  <Select.Item
                    key={option.iso}
                    value={option.iso}
                    className={s.item}
                  >
                    <span className={s.flag}>
                      <option.Flag />
                    </span>
                    <Select.ItemText>{option.name}</Select.ItemText>
                    <span className={s.item_dial}>{option.dial}</span>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <AppInput
          id={inputId}
          name={name}
          className={s.number}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={selected.placeholder}
          value={applyMask(value, selected.mask)}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={messageId}
        />
      </div>

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

export type {
  AppPhoneCountry,
  AppPhoneCountryIso,
  AppPhoneInputProps,
} from './AppPhoneInput.types'
