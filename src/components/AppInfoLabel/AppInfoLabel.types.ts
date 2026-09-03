import type { HTMLAttributes, ReactNode } from 'react'

export type AppInfoLabelProps = {
  /** Optional 16px leading slot — an `AppIcon`, a brand mark, a flag. */
  icon?: ReactNode
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLSpanElement>
