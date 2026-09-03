export type AppSelectorItem = {
  value: string
  label: string
}

export type AppSelectorProps = {
  items: AppSelectorItem[]
  value?: string
  onChange?: (value: string) => void
  /** Visible label above the trigger, mirroring the `AppInput` label. */
  label: string
  /** Shown inside the trigger while no value is selected. */
  placeholder?: string
  /** Dropdown panel matches the trigger width. */
  fullWidth?: boolean
  className?: string
}
