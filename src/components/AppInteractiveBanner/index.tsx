import React from 'react'
import cn from 'classnames'

import { AppStatusLabel } from '../AppStatusLabel'

import s from './AppInteractiveBanner.module.scss'

import type { AppInteractiveBannerProps } from './AppInteractiveBanner.types'

export const AppInteractiveBanner = ({
  title,
  description,
  label,
  className,
  ...rest
}: AppInteractiveBannerProps) => (
  <div className={cn(s.banner, className)} {...rest}>
    <div className={s.banner_text}>
      <span className={s.banner_title}>{title}</span>
      <span className={s.banner_description}>{description}</span>
    </div>
    {label && (
      <AppStatusLabel className={s.banner_label}>{label}</AppStatusLabel>
    )}
  </div>
)

export type { AppInteractiveBannerProps } from './AppInteractiveBanner.types'
