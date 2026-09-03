import type { HTMLAttributes } from 'react'

export type AppInteractiveBannerProps = {
  title: string
  description: string
  /** Status pill content, e.g. «до -20%». */
  label?: string
  className?: string
} & HTMLAttributes<HTMLDivElement>
