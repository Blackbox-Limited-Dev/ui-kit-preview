import React from 'react'
import cn from 'classnames'

import FacebookIcon from './assets/facebook.svg'
import InstagramIcon from './assets/instagram.svg'
import TelegramIcon from './assets/telegram.svg'

import s from './AppSocialButton.module.scss'

import type {
  AppSocialBrand,
  AppSocialButtonProps,
} from './AppSocialButton.types'
import type { ComponentType, SVGProps } from 'react'

const BRAND_ICONS: Record<
  AppSocialBrand,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
}

const BRAND_LABELS: Record<AppSocialBrand, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  telegram: 'Telegram',
}

export const AppSocialButton = ({
  brand,
  href,
  label,
  className,
  ...rest
}: AppSocialButtonProps) => {
  const Icon = BRAND_ICONS[brand]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? BRAND_LABELS[brand]}
      className={cn(s.root, className)}
      {...rest}
    >
      <Icon width={20} height={20} aria-hidden />
    </a>
  )
}

export type {
  AppSocialBrand,
  AppSocialButtonProps,
} from './AppSocialButton.types'
