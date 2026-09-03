export type AppTabsPillSize = 'xl' | 'md'

export type AppTabsPillTone = 'on-surface' | 'on-card'

export type AppTabsPillItem = {
  value: string
  label: string
  disabled?: boolean
}

export type AppTabsPillProps = {
  items: AppTabsPillItem[]
  value: string
  onChange: (value: string) => void
  size?: AppTabsPillSize
  /** Container/active-item colours. Defaults to `on-surface`. */
  tone?: AppTabsPillTone
  /** Fill the parent width and split it equally between items. */
  stretch?: boolean
  /** Accessible name for the group. */
  'aria-label'?: string
  className?: string
}
