import type { HTMLAttributes, ReactNode } from 'react'

export type AppStatusLabelLevel = 'green' | 'blue' | 'purple' | 'red'

export type AppStatusLabelProps = {
  children: ReactNode
  /** Pill background. Defaults to `red`. */
  level?: AppStatusLabelLevel
  className?: string
} & HTMLAttributes<HTMLSpanElement>
