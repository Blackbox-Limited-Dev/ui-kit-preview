'use client'

import React, { useId } from 'react'
import * as Select from '@radix-ui/react-select'
import cn from 'classnames'

import CaretDownIcon from '~icons/caret-down.svg'

import { AppIcon } from '../AppIcon'

import s from './AppSelector.module.scss'

import type { AppSelectorProps } from './AppSelector.types'

export const AppSelector = ({
  items,
  value,
  onChange,
  label,
  placeholder,
  fullWidth = false,
  className,
}: AppSelectorProps) => {
  const labelId = useId()

  return (
    <div className={cn(s.root, className)}>
      <span className={s.label} id={labelId}>
        {label}
      </span>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className={s.trigger} aria-labelledby={labelId}>
          <span className={s.trigger_value}>
            <Select.Value placeholder={placeholder} />
          </span>
          <Select.Icon asChild>
            <AppIcon
              icon={CaretDownIcon}
              size={24}
              className={s.trigger_icon}
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={8}
            className={cn(s.menu, { [s.full]: fullWidth })}
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className={s.menu_item}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export type { AppSelectorItem, AppSelectorProps } from './AppSelector.types'
