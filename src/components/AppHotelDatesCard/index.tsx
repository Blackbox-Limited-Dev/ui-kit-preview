'use client'

import React from 'react'
import cn from 'classnames'

import MapPinIcon from '~icons/map-pin.svg'
import MonobankIcon from '~icons/monobank.svg'

import { AppButton } from '../AppButton'
import { AppHotelGallery } from '../AppHotelGallery'
import { AppHotelStars } from '../AppHotelStars'
import { AppIcon } from '../AppIcon'

import s from './AppHotelDatesCard.module.scss'

import type { AppHotelDatesCardProps } from './AppHotelDatesCard.types'

export const AppHotelDatesCard = ({
  name,
  stars,
  distanceLabel,
  monobank,
  discount,
  photos,
  offers,
  onSelect,
  selectLabel,
  installmentsLabel,
  starsLabel,
  galleryLabels,
  className,
}: AppHotelDatesCardProps) => (
  <article className={cn(s.dates, className)}>
    <AppHotelGallery
      photos={photos}
      labels={galleryLabels}
      statusLabel={discount}
      className={s.dates_gallery}
      sizes="(max-width: 1023px) 100vw, 316px"
    />
    <div className={s.dates_content}>
      <div className={s.dates_header}>
        <div>
          <AppHotelStars count={stars} label={starsLabel} />
          <h3 className={s.dates_title}>{name}</h3>
          {!!distanceLabel && (
            <span className={s.dates_distance}>
              <AppIcon icon={MapPinIcon} size={16} />
              {distanceLabel}
            </span>
          )}
        </div>
        {monobank && !!installmentsLabel && (
          <div className={s.dates_installments}>
            <span className={s.dates_installments_caption}>
              {installmentsLabel}
            </span>
            <AppIcon
              icon={MonobankIcon}
              size={24}
              className={s.dates_installments_icon}
            />
          </div>
        )}
      </div>
      <div className={s.dates_offers}>
        {offers.map((offer) => (
          <div key={offer.dates} className={s.dates_offer}>
            <div className={s.dates_offer_content}>
              <div className={s.dates_offer_text}>
                <span className={s.dates_offer_dates}>{offer.dates}</span>
                <span className={s.dates_offer_board}>{offer.board}</span>
              </div>
              <div className={s.dates_offer_price}>
                <span className={s.dates_offer_price_value}>
                  {offer.priceLabel}
                </span>
                <span className={s.dates_offer_price_nights}>
                  {offer.nightsLabel}
                </span>
              </div>
              <AppButton size="small" onClick={() => onSelect?.(offer)}>
                {selectLabel}
              </AppButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  </article>
)

export type {
  AppHotelDatesCardProps,
  HotelRoomOffer,
} from './AppHotelDatesCard.types'
