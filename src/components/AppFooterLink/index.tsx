import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import s from './AppFooterLink.module.scss'

import type { AppFooterLinkProps } from './AppFooterLink.types'

export const AppFooterLink = ({
  href,
  external = false,
  className,
  children,
  ...rest
}: AppFooterLinkProps) => {
  const classes = cn(s.root, className)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

export type { AppFooterLinkProps } from './AppFooterLink.types'
