import type { HTMLAttributes } from 'react'

export type AppBreadcrumbItem = {
  label: string
  /** Omit on the current (last) crumb — it renders as plain text. */
  href?: string
}

export type AppBreadcrumbsProps = {
  items: AppBreadcrumbItem[]
  /** Landmark name for the `<nav>` — translated by the caller. */
  ariaLabel: string
  className?: string
} & HTMLAttributes<HTMLElement>
