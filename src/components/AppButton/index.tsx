import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import s from './AppButton.module.scss'

import type { AppButtonProps } from './AppButton.types'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export const AppButton = ({
  variant = 'primary',
  size = 'big',
  iconOnly = false,
  href,
  external = false,
  className,
  children,
  ...rest
}: AppButtonProps) => {
  const classes = cn(
    s.root,
    s[variant],
    s[size],
    { [s.iconOnly]: iconOnly },
    className
  )

  if (href === undefined) {
    return (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...anchorProps}>
      {children}
    </Link>
  )
}
