'use client'

import React, { useRef, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import CaretLeftIcon from '~icons/caret-left.svg'
import CaretRightIcon from '~icons/caret-right.svg'
import HeartIcon from '~icons/heart.svg'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'
import { AppStatusLabel } from '../AppStatusLabel'

import 'swiper/css'

import s from './AppHotelGallery.module.scss'

import type { Swiper as SwiperClass } from 'swiper'
import type { AppHotelGalleryProps } from './AppHotelGallery.types'

export const AppHotelGallery = ({
  photos,
  labels,
  statusLabel,
  sizes = '(max-width: 1023px) 100vw, 373px',
  className,
  ...rest
}: AppHotelGalleryProps) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [active, setActive] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className={cn(s.gallery, className)} {...rest}>
      <Swiper
        modules={[A11y]}
        rewind
        spaceBetween={0}
        className={s.gallery_track}
        onSwiper={(sw) => {
          swiperRef.current = sw
        }}
        onSlideChange={(sw) => setActive(sw.activeIndex)}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className={s.gallery_slide}>
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div aria-hidden className={s.gallery_fade} />

      {photos.length > 1 && (
        <div aria-hidden className={s.gallery_dots}>
          {photos.map((_, index) => (
            <span
              key={index}
              className={cn(s.gallery_dot, {
                [s.gallery_dot_active]: index === active,
              })}
            />
          ))}
        </div>
      )}

      {statusLabel && (
        <AppStatusLabel className={s.gallery_status}>
          {statusLabel}
        </AppStatusLabel>
      )}

      <button
        type="button"
        className={s.gallery_heart}
        aria-label={labels.favourite}
        aria-pressed={isFavorite}
        onClick={() => setIsFavorite((prev) => !prev)}
      >
        <AppIcon icon={HeartIcon} size={24} />
      </button>

      {photos.length > 1 && (
        <>
          <AppButton
            iconOnly
            variant="tertiary"
            size="small"
            aria-label={labels.prevPhoto}
            className={cn(s.gallery_arrow, s.gallery_arrow_prev)}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <AppIcon icon={CaretLeftIcon} size={20} />
          </AppButton>
          <AppButton
            iconOnly
            variant="tertiary"
            size="small"
            aria-label={labels.nextPhoto}
            className={cn(s.gallery_arrow, s.gallery_arrow_next)}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <AppIcon icon={CaretRightIcon} size={20} />
          </AppButton>
        </>
      )}
    </div>
  )
}

export type {
  AppHotelGalleryLabels,
  AppHotelGalleryPhoto,
  AppHotelGalleryProps,
} from './AppHotelGallery.types'
