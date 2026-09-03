import type { ReactNode } from 'react'

export type AppBulletPointType = 'check' | 'attention' | 'info'

export type AppBulletPointProps = {
  type?: AppBulletPointType
  children: ReactNode
  className?: string
}
