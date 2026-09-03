import React from 'react'
import cn from 'classnames'

import LogoIcon from './assets/logo-icon.svg'
import LogoText from './assets/logo-text.svg'

import s from './AppLogo.module.scss'

import type { AppLogoProps } from './AppLogo.types'

export const AppLogo = ({
  size = 'big',
  label = 'Logo',
  className,
}: AppLogoProps) => {
  const Mark = size === 'big' ? LogoText : LogoIcon

  return (
    <Mark
      className={cn(s.root, s[size], className)}
      role="img"
      aria-label={label}
      focusable={false}
    />
  )
}

export type { AppLogoProps, AppLogoSize } from './AppLogo.types'
