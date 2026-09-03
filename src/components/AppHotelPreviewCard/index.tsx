'use client'

import React, { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { useLocale } from 'next-intl'

import HeartIcon from '~icons/heart.svg'

import { formatUah, HotelLabelsRow } from '../AppHotelCard'
import { AppHotelStars } from '../AppHotelStars'
import { AppIcon } from '../AppIcon'
import { AppStatusLabel } from '../AppStatusLabel'

import s from './AppHotelPreviewCard.module.scss'

import type { AppLanguage } from '~i18n/config'
import type { AppHotelPreviewCardProps } from './AppHotelPreviewCard.types'

export const AppHotelPreviewCard = ({
  name,
  stars,
  datesLabel,
  price,
  nightsLabel,
  oldPrice,
  discount,
  labels,
  photo,
  starsLabel,
  favouriteLabel,
  className,
}: AppHotelPreviewCardProps) => {
  const locale = useLocale() as AppLanguage
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article className={cn(s.preview, className)}>
      <div className={s.preview_photo}>
        <Image src={photo.src} alt={photo.alt} fill sizes="102px" />
        {discount && (
          <AppStatusLabel className={s.preview_status}>
            {discount}
          </AppStatusLabel>
        )}
      </div>
      <div className={s.preview_content}>
        <div className={s.preview_top}>
          <div className={s.preview_text}>
            <AppHotelStars count={stars} label={starsLabel} />
            <span className={s.preview_name}>{name}</span>
            <span className={s.preview_dates}>{datesLabel}</span>
          </div>
          <button
            type="button"
            className={s.preview_heart}
            aria-label={favouriteLabel}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            <AppIcon icon={HeartIcon} size={20} />
          </button>
        </div>
        {labels && labels.length > 0 && (
          <HotelLabelsRow labels={labels} className={s.preview_labels} />
        )}
        <div className={s.preview_price}>
          <span className={s.preview_price_value}>
            {formatUah(price, locale)}
          </span>
          <span className={s.preview_price_nights}>{nightsLabel}</span>
          {oldPrice && (
            <s className={s.preview_price_old}>{formatUah(oldPrice, locale)}</s>
          )}
        </div>
      </div>
    </article>
  )
}

export type { AppHotelPreviewCardProps } from './AppHotelPreviewCard.types'
