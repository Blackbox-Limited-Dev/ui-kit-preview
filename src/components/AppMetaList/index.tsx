import React from 'react'
import cn from 'classnames'

import s from './AppMetaList.module.scss'

import type { AppMetaListProps } from './AppMetaList.types'

export const AppMetaList = ({
  items,
  gap = 8,
  tone = 'subtle',
  className,
}: AppMetaListProps) => (
  <div
    className={cn(s.root, s[tone], className)}
    style={{ '--meta-gap': `${gap}px` } as React.CSSProperties}
  >
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className={s.root_dot} aria-hidden />}
        <span className={s.root_item}>{item}</span>
      </React.Fragment>
    ))}
  </div>
)

export type { AppMetaListProps, AppMetaListTone } from './AppMetaList.types'
