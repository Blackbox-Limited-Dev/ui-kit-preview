import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type AppBadgeVariant = 'neutral' | 'success' | 'warning' | 'outline'

export type AppBadgeProps = {
  variant?: AppBadgeVariant
  /** Rendered element — `li` inside a list, `span` inline. */
  as?: ElementType
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>
