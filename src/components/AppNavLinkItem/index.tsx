import React from 'react'
import cn from 'classnames'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'

import s from './AppNavLinkItem.module.scss'

import type { AppNavLinkItemProps } from './AppNavLinkItem.types'

export const AppNavLinkItem = ({
  label,
  name,
  icon,
  count,
  className,
  ...rest
}: AppNavLinkItemProps) => {
  const iconNode = icon ? (
    <AppIcon icon={icon} size="large" strokeWidth={1.5} />
  ) : name ? (
    <AppIcon name={name} size="large" strokeWidth={1.5} />
  ) : null

  const hasCount = count !== undefined && count > 0

  const button = (
    <AppButton
      variant="tertiary"
      iconOnly
      aria-label={hasCount ? `${label}, ${count}` : label}
      className={cn(s.root, !hasCount && className)}
      {...rest}
    >
      {iconNode}
    </AppButton>
  )

  if (!hasCount) return button

  return (
    <span className={cn(s.wrap, className)}>
      {button}
      <span className={s.count} aria-hidden>
        {count > 99 ? '99+' : count}
      </span>
    </span>
  )
}

export type { AppNavLinkItemProps } from './AppNavLinkItem.types'
