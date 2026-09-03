import type { ReactNode } from 'react'

export type AppRadioGroupProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
  children: ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export type AppRadioGroupItemProps = {
  /** Also the label's `htmlFor` target — keep it unique per page. */
  id: string
  value: string
  disabled?: boolean
  /** Rendered as the item's `<label>` — clicking it selects the item. */
  label?: ReactNode
  className?: string
}
