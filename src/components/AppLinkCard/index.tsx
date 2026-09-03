import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import s from './AppLinkCard.module.scss'

import type { AppLinkCardProps } from './AppLinkCard.types'

export const AppLinkCard = ({
  title,
  artwork,
  href,
  className,
}: AppLinkCardProps) => {
  const content = (
    <>
      <span className={s.root_title}>{title}</span>
      {artwork && (
        <span className={s.root_artwork} aria-hidden>
          {artwork}
        </span>
      )}
    </>
  )

  return href ? (
    <Link href={href} className={cn(s.root, className)}>
      {content}
    </Link>
  ) : (
    <div className={cn(s.root, className)}>{content}</div>
  )
}

export type { AppLinkCardProps } from './AppLinkCard.types'
