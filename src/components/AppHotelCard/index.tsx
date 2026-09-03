'use client'

import React from 'react'
import cn from 'classnames'
import { useLocale } from 'next-intl'

import MapPinIcon from '~icons/map-pin.svg'
import MonobankIcon from '~icons/monobank.svg'

import { AppButton } from '../AppButton'
import { AppHotelGallery } from '../AppHotelGallery'
import { AppHotelStars } from '../AppHotelStars'
import { AppIcon } from '../AppIcon'
import { localeToLangTag } from '~i18n/config'

import { HotelLabelsRow } from './AppHotelCard.labels'

import s from './AppHotelCard.module.scss'

import type { AppLanguage } from '~i18n/config'
import type { AppHotelCardProps, Hotel } from './AppHotelCard.types'

export const formatUah = (value: number, locale: AppLanguage) =>
  `${value.toLocaleString(localeToLangTag[locale] ?? localeToLangTag.ua)} ₴`

const Installments = ({ label }: { label: string }) => (
  <div className={s.card_installments}>
    <span className={s.card_installments_caption}>{label}</span>
    <AppIcon
      icon={MonobankIcon}
      size={24}
      className={s.card_installments_icon}
    />
  </div>
)

const Price = ({ hotel, locale }: { hotel: Hotel; locale: AppLanguage }) => (
  <div className={s.card_price}>
    <span className={s.card_price_caption}>{hotel.nightsLabel}</span>
    <span className={s.card_price_row}>
      <span className={s.card_price_value}>
        {formatUah(hotel.priceFrom, locale)}
      </span>
      {hotel.oldPrice && (
        <s className={s.card_price_old}>{formatUah(hotel.oldPrice, locale)}</s>
      )}
    </span>
  </div>
)

export const AppHotelCard = ({
  layout,
  hotel,
  onSelect,
  selectLabel,
  installmentsLabel,
  roomTypesCountLabel,
  starsLabel,
  galleryLabels,
  className,
}: AppHotelCardProps) => {
  const locale = useLocale() as AppLanguage

  const header = (
    <div>
      <AppHotelStars count={hotel.stars} label={starsLabel} />
      <h3 className={s.card_title}>{hotel.name}</h3>
    </div>
  )

  const distance = (
    <span className={s.card_distance}>
      <AppIcon icon={MapPinIcon} size={16} className={s.card_distance_icon} />
      {hotel.distanceLabel}
    </span>
  )

  const room = (
    <div className={s.card_room}>
      <span className={s.card_room_type}>{hotel.roomType}</span>
      <span className={s.card_room_count}>{roomTypesCountLabel}</span>
    </div>
  )

  const labelsRow = (
    <HotelLabelsRow labels={hotel.labels} className={s.card_labels} />
  )

  const gallery = (
    <AppHotelGallery
      photos={hotel.photos}
      labels={galleryLabels}
      statusLabel={hotel.discount}
      className={s.card_gallery}
      sizes={
        layout === 'responsive'
          ? '(max-width: 1023px) 100vw, 316px'
          : '(max-width: 1023px) 100vw, 373px'
      }
    />
  )

  return (
    <article className={cn(s.card, s[layout], className)}>
      {gallery}
      <div className={s.card_body}>
        {header}
        {distance}
        {room}
        {labelsRow}
      </div>
      <div className={s.card_side}>
        {hotel.monobank && <Installments label={installmentsLabel} />}
        <Price hotel={hotel} locale={locale} />
        <AppButton size="small" className={s.card_select} onClick={onSelect}>
          {selectLabel}
        </AppButton>
      </div>
    </article>
  )
}

export { HotelLabelsRow } from './AppHotelCard.labels'

export type {
  AppHotelCardLayout,
  AppHotelCardProps,
  Hotel,
  HotelLabel,
} from './AppHotelCard.types'
