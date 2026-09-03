export type AppSwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  className?: string
  /** The switch renders no label of its own, so every instance must carry an
   *  accessible name through one of these. */
  'aria-label'?: string
  'aria-labelledby'?: string
}
