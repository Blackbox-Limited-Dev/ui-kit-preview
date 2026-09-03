import React from 'react'
import cn from 'classnames'

import CutoutCap from './assets/cutout-cap.svg'

import s from './AppCutoutCard.module.scss'

import type { AppCutoutCardProps } from './AppCutoutCard.types'

export const AppCutoutCard = ({
  notch = 'bottom',
  children,
  className,
}: AppCutoutCardProps) => (
  <div className={cn(s.root, s[notch], className)}>
    <span className={s.root_bg} aria-hidden>
      <span className={s.root_bg_top} />
      <span className={s.root_bg_middle}>
        <CutoutCap className={s.root_bg_cap} />
        <span className={s.root_bg_center} />
        <CutoutCap className={cn(s.root_bg_cap, s.root_bg_cap_right)} />
      </span>
      <span className={s.root_bg_bottom} />
    </span>
    <div className={s.root_slot}>{children}</div>
  </div>
)

export type {
  AppCutoutCardNotch,
  AppCutoutCardProps,
} from './AppCutoutCard.types'
