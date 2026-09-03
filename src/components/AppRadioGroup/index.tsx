import React from 'react'

import { AppRadioGroupItem } from './AppRadioGroup.Item'
import { AppRadioGroupRoot } from './AppRadioGroup.Root'

import type { AppRadioGroupProps } from './AppRadioGroup.types'

// The compound API is assembled here, on a module with no `'use client'`
// directive: static properties hung on a client component are lost across the
// server→client module reference, so `AppRadioGroup.Item` would read as
// `undefined` in any server component. The root itself stays a client
// component in `AppRadioGroup.Root.tsx`.
const AppRadioGroupBase = (props: AppRadioGroupProps) => (
  <AppRadioGroupRoot {...props} />
)

type AppRadioGroupCompound = typeof AppRadioGroupBase & {
  Item: typeof AppRadioGroupItem
}

export const AppRadioGroup = AppRadioGroupBase as AppRadioGroupCompound
AppRadioGroup.Item = AppRadioGroupItem

export type {
  AppRadioGroupItemProps,
  AppRadioGroupProps,
} from './AppRadioGroup.types'
