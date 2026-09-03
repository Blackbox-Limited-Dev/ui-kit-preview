'use client'

import React, { useState } from 'react'
import cn from 'classnames'

import DeleteIcon from '~icons/delete.svg'
import MinusIcon from '~icons/minus.svg'
import PlusIcon from '~icons/plus.svg'

import { AppIcon } from '../AppIcon'

import s from './AppQtySelector.module.scss'

import type { AppQtySelectorProps } from './AppQtySelector.types'

export const AppQtySelector = ({
  value,
  defaultValue,
  onChange,
  onDelete,
  min = 1,
  max,
  step = 1,
  disabled = false,
  decreaseLabel,
  increaseLabel,
  deleteLabel,
  className,
}: AppQtySelectorProps) => {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? min)
  const current = isControlled ? value : internal

  const setNext = (next: number) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const atMin = current <= min
  const atMax = max !== undefined && current >= max
  const showDelete = atMin && onDelete !== undefined

  const handleLeft = () => {
    if (atMin) {
      onDelete?.()
      return
    }
    setNext(Math.max(min, current - step))
  }

  const handleRight = () => {
    setNext(max !== undefined ? Math.min(max, current + step) : current + step)
  }

  return (
    <div className={cn(s.qty, { [s.qty_disabled]: disabled }, className)}>
      <button
        type="button"
        className={s.qty_button}
        aria-label={showDelete ? deleteLabel : decreaseLabel}
        disabled={disabled || (atMin && onDelete === undefined)}
        onClick={handleLeft}
      >
        <AppIcon icon={showDelete ? DeleteIcon : MinusIcon} size={16} />
      </button>
      <span className={s.qty_count} aria-live="polite">
        {current}
      </span>
      <button
        type="button"
        className={s.qty_button}
        aria-label={increaseLabel}
        disabled={disabled || atMax}
        onClick={handleRight}
      >
        <AppIcon icon={PlusIcon} size={16} />
      </button>
    </div>
  )
}

export type { AppQtySelectorProps } from './AppQtySelector.types'
