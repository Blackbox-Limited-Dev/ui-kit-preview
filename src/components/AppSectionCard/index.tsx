import React from 'react'
import cn from 'classnames'

import s from './AppSectionCard.module.scss'

import type { AppSectionCardProps } from './AppSectionCard.types'

export const AppSectionCard = ({
  title,
  titlePlacement = 'inside',
  padded = true,
  children,
  className,
}: AppSectionCardProps) => {
  const heading = title ? <h2 className={s.root_title}>{title}</h2> : null
  const card = (
    <div className={cn(s.root_card, { [s.root_card__flush]: !padded })}>
      {titlePlacement === 'inside' && heading}
      <div className={s.root_slot}>{children}</div>
    </div>
  )

  return (
    <section className={cn(s.root, s[titlePlacement], className)}>
      {titlePlacement === 'outside' && heading}
      {card}
    </section>
  )
}

export type {
  AppSectionCardProps,
  AppSectionCardTitlePlacement,
} from './AppSectionCard.types'
