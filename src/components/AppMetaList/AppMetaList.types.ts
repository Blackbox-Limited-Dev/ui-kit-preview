import type { ReactNode } from 'react'

export type AppMetaListTone = 'subtle' | 'disabled'

export type AppMetaListProps = {
  /** Nodes, not strings, so a single item can carry its own emphasis. */
  items: ReactNode[]
  /** Space around each divider dot, in px. */
  gap?: number
  /** Divider colour. `subtle` on page backgrounds, `disabled` inside cards. */
  tone?: AppMetaListTone
  className?: string
}
