'use client'

import React from 'react'
import cn from 'classnames'

import { AppQtySelector } from '../AppQtySelector'

import s from './AppGuestsPicker.module.scss'

import type { AppGuestsPickerProps } from './AppGuestsPicker.types'

const MIN_ADULTS = 1
const MIN_CHILDREN = 0

export const AppGuestsPicker = ({
  value,
  onChange,
  adultsLabel,
  adultsHint,
  childrenLabel,
  childrenHint,
  adultsDecreaseLabel,
  adultsIncreaseLabel,
  childrenDecreaseLabel,
  childrenIncreaseLabel,
  maxAdults = 10,
  maxChildren = 10,
  className,
}: AppGuestsPickerProps) => {
  const rows = [
    {
      key: 'adults' as const,
      label: adultsLabel,
      hint: adultsHint,
      count: value.adults,
      min: MIN_ADULTS,
      max: maxAdults,
      decreaseLabel: adultsDecreaseLabel,
      increaseLabel: adultsIncreaseLabel,
    },
    {
      key: 'children' as const,
      label: childrenLabel,
      hint: childrenHint,
      count: value.children,
      min: MIN_CHILDREN,
      max: maxChildren,
      decreaseLabel: childrenDecreaseLabel,
      increaseLabel: childrenIncreaseLabel,
    },
  ]

  return (
    <div className={cn(s.picker, className)}>
      {rows.map((row) => (
        <div key={row.key} className={s.picker_row}>
          <div className={s.picker_labels}>
            <span className={s.picker_label}>{row.label}</span>
            <span className={s.picker_hint}>{row.hint}</span>
          </div>
          <AppQtySelector
            className={s.picker_stepper}
            value={row.count}
            min={row.min}
            max={row.max}
            onChange={(next) => onChange({ ...value, [row.key]: next })}
            decreaseLabel={row.decreaseLabel}
            increaseLabel={row.increaseLabel}
          />
        </div>
      ))}
    </div>
  )
}

export type {
  AppGuestsPickerProps,
  AppGuestsValue,
} from './AppGuestsPicker.types'
