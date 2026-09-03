'use client'

import React from 'react'
import cn from 'classnames'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import s from './AppMegaTabs.module.scss'

import type { AppMegaTabsProps } from './AppMegaTabs.types'

export const AppMegaTabs = ({
  items,
  value,
  onChange,
  'aria-label': ariaLabel,
  className,
}: AppMegaTabsProps) => (
  <ToggleGroup.Root
    type="single"
    value={value}
    // Radix emits '' when the active item is re-activated; this group never
    // deselects.
    onValueChange={(next) => {
      if (next) onChange(next)
    }}
    aria-label={ariaLabel}
    className={cn(s.tabs, className)}
  >
    {items.map((item) => (
      <ToggleGroup.Item
        key={item.value}
        value={item.value}
        className={s.tabs_item}
      >
        <span className={s.tabs_caption}>{item.caption}</span>
        <span className={s.tabs_price}>{item.price}</span>
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
)

export type { AppMegaTabsItem, AppMegaTabsProps } from './AppMegaTabs.types'
