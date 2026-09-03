import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import s from './AppNavAction.module.scss'

import type { AppNavActionProps } from './AppNavAction.types'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

const ILLUSTRATION_SIZE = 32

export const AppNavAction = ({
  illustration: Illustration,
  showDot = false,
  href,
  external = false,
  className,
  children,
  ...rest
}: AppNavActionProps) => {
  const classes = cn(s.root, className)

  const content = (
    <>
      {!!Illustration && (
        <Illustration
          className={s.illustration}
          width={ILLUSTRATION_SIZE}
          height={ILLUSTRATION_SIZE}
          aria-hidden
          focusable={false}
        />
      )}
      {children}
      {showDot && <span className={s.dot} aria-hidden />}
    </>
  )

  if (href === undefined) {
    return (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
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
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...anchorProps}>
      {content}
    </Link>
  )
}

export type { AppNavActionProps } from './AppNavAction.types'
