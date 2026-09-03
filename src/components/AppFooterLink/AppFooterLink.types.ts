import type { AnchorHTMLAttributes, ReactNode } from 'react'

export type AppFooterLinkProps = {
  href: string
  /** Render a plain `<a target="_blank">` instead of `next/link`. */
  external?: boolean
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
