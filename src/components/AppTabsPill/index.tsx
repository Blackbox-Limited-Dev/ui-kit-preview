'use client'

import React from 'react'
import cn from 'classnames'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import s from './AppTabsPill.module.scss'

import type { AppTabsPillProps } from './AppTabsPill.types'

export const AppTabsPill = ({
  items,
  value,
  onChange,
  size = 'xl',
  tone = 'on-surface',
  stretch = false,
  'aria-label': ariaLabel,
  className,
}: AppTabsPillProps) => (
  <ToggleGroup.Root
    type="single"
    value={value}
    // Radix emits '' when the active item is re-activated; this group never
    // deselects, and an aria-disabled item must not become the value.
    onValueChange={(next) => {
      if (!next) return
      if (items.find((item) => item.value === next)?.disabled) return
      onChange(next)
    }}
    aria-label={ariaLabel}
    className={cn(
      s.tabs,
      s[size],
      tone === 'on-card' ? s.toneOnCard : s.toneOnSurface,
      { [s.stretch]: stretch },
      className
    )}
  >
    {items.map((item) => (
      <ToggleGroup.Item
        key={item.value}
        value={item.value}
        // `aria-disabled` without `disabled`: Radix drops a disabled item out of
        // the roving tab order, hiding it from keyboard users entirely.
        aria-disabled={item.disabled || undefined}
        className={s.tabs_item}
      >
        {item.label}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
)

export type {
  AppTabsPillItem,
  AppTabsPillProps,
  AppTabsPillSize,
  AppTabsPillTone,
} from './AppTabsPill.types'
