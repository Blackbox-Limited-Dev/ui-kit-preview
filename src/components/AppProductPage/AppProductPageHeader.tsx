import React from 'react'
import cn from 'classnames'

import { AppMetaList } from '../AppMetaList'

import s from './AppProductPage.module.scss'

import type { AppProductPageHeaderProps } from './AppProductPage.types'

export const AppProductPageHeader = ({
  title,
  meta,
  specs,
  className,
}: AppProductPageHeaderProps) => (
  <header className={cn(s.header, className)}>
    <div className={s.header_titleBlock}>
      <h1 className={s.header_title}>{title}</h1>
      {meta && meta.length > 0 && (
        <AppMetaList items={meta} className={s.header_meta} />
      )}
    </div>
    {specs && specs.length > 0 && (
      <dl className={s.header_specs}>
        {specs.map((spec) => (
          <div key={spec.label} className={s.header_specs_row}>
            <dt className={s.header_specs_label}>{spec.label}</dt>
            <dd className={s.header_specs_value}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    )}
  </header>
)
