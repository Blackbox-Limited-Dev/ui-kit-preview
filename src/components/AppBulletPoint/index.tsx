import React from 'react'
import cn from 'classnames'

import { AppIcon } from '../AppIcon'

import s from './AppBulletPoint.module.scss'

import type {
  AppBulletPointProps,
  AppBulletPointType,
} from './AppBulletPoint.types'
import type { IconoirIconName } from '../AppIcon/AppIcon.iconoir'

const MARKER_ICON: Record<AppBulletPointType, IconoirIconName> = {
  check: 'Check',
  attention: 'WarningTriangle',
  info: 'InfoCircle',
}

export const AppBulletPoint = ({
  type = 'check',
  children,
  className,
}: AppBulletPointProps) => (
  <div className={cn(s.root, s[type], className)}>
    <span className={s.root_marker}>
      <AppIcon name={MARKER_ICON[type]} size="small" />
    </span>
    <span className={s.root_text}>{children}</span>
  </div>
)

export type {
  AppBulletPointProps,
  AppBulletPointType,
} from './AppBulletPoint.types'
