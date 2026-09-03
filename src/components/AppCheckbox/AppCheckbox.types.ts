import type { ReactNode } from 'react'

export type AppCheckboxProps = {
  /** Also the label's `htmlFor` target — keep it unique per page. */
  id: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  /** Rendered as the control's `<label>` — clicking it toggles the control. */
  label?: ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}
