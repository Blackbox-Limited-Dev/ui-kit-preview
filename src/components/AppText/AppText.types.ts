import type { ElementType, HTMLAttributes, ReactNode } from 'react'

/** One entry per Figma text style — see `src/styles/text-styles.scss`. */
export type AppTextVariant =
  | 'hero'
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'body-xlarge-regular'
  | 'body-xlarge-medium'
  | 'body-xlarge-semibold'
  | 'body-large-regular'
  | 'body-large-medium'
  | 'body-large-semibold'
  | 'body-1-regular'
  | 'body-1-medium'
  | 'body-1-semibold'
  | 'body-2-regular'
  | 'body-2-medium'
  | 'body-2-semibold'
  | 'caption-regular'
  | 'caption-medium'
  | 'caption-semibold'
  | 'overline'
  | 'date-number'

export type AppTextProps = {
  variant?: AppTextVariant
  /** Rendered element — the variant carries no semantics of its own. */
  as?: ElementType
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>
