export type AppMegaTabsItem = {
  value: string
  /** Top line — what the tab is. */
  caption: string
  /** Bottom line — the tab's headline figure. */
  price: string
}

export type AppMegaTabsProps = {
  items: AppMegaTabsItem[]
  value: string
  onChange: (value: string) => void
  /** Accessible name for the group. */
  'aria-label'?: string
  className?: string
}
