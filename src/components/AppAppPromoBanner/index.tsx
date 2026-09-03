import React from 'react'
import Image from 'next/image'
import cn from 'classnames'

import PromoPattern from '~img/ski-pass/promo-pattern.svg'
import AppStoreBadge from '~img/store-app-store.svg'
import GooglePlayBadge from '~img/store-google-play.svg'
import promoPhoto from '~img/ski-pass/promo-phone.png'

import s from './AppAppPromoBanner.module.scss'

import type { AppAppPromoBannerProps } from './AppAppPromoBanner.types'

export const AppAppPromoBanner = ({
  title,
  body,
  appStoreHref,
  appStoreLabel,
  googlePlayHref,
  googlePlayLabel,
  photoAlt,
  className,
}: AppAppPromoBannerProps) => (
  <section className={cn(s.root, className)}>
    <div className={s.root_pattern} aria-hidden>
      <PromoPattern />
    </div>
    <div className={s.root_content}>
      <h2 className={s.root_title}>{title}</h2>
      <p className={s.root_body}>{body}</p>
      <div className={s.root_stores}>
        <a
          className={s.root_badge}
          href={appStoreHref}
          target="_blank"
          rel="noreferrer"
          aria-label={appStoreLabel}
        >
          <AppStoreBadge />
        </a>
        <a
          className={s.root_badge}
          href={googlePlayHref}
          target="_blank"
          rel="noreferrer"
          aria-label={googlePlayLabel}
        >
          <GooglePlayBadge />
        </a>
      </div>
    </div>
    <Image
      className={s.root_photo}
      src={promoPhoto}
      alt={photoAlt}
      sizes="(max-width: 1023px) 100vw, 595px"
    />
  </section>
)

export type { AppAppPromoBannerProps } from './AppAppPromoBanner.types'
