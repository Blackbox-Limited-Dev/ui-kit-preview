'use client'

import React from 'react'
import Image from 'next/image'
import cn from 'classnames'

import { AppButton } from '../AppButton'
import { AppCutoutCard } from '../AppCutoutCard'
import { AppLike } from '../AppLike'
import { AppMegaTabs } from '../AppMegaTabs'
import { AppMetaList } from '../AppMetaList'

import s from './AppProductPurchaseCard.module.scss'

import type { AppProductPurchaseCardProps } from './AppProductPurchaseCard.types'

export const AppProductPurchaseCard = ({
  image,
  imageAlt,
  title,
  meta,
  tariffs,
  tariff,
  onTariffChange,
  tariffsLabel,
  ctaLabel,
  ctaPrice,
  onCta,
  liked = false,
  onLikedChange,
  favouriteLabel,
  className,
}: AppProductPurchaseCardProps) => (
  <AppCutoutCard notch="bottom" className={cn(s.root, className)}>
    <div className={s.root_thumb}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 1023px) 100vw, 302px"
      />
      {onLikedChange && favouriteLabel && (
        <AppLike
          isLiked={liked}
          onChange={onLikedChange}
          label={favouriteLabel}
          className={s.root_favourite}
        />
      )}
    </div>
    <div className={s.root_heading}>
      <h2 className={s.root_title}>{title}</h2>
      {meta && meta.length > 0 && (
        <AppMetaList items={meta} tone="disabled" className={s.root_meta} />
      )}
    </div>
    <AppCutoutCard notch="bottom" className={s.root_purchase}>
      {tariffs && tariff && onTariffChange && (
        <AppMegaTabs
          items={tariffs}
          value={tariff}
          onChange={onTariffChange}
          aria-label={tariffsLabel}
        />
      )}
      <AppButton
        variant="primary"
        size="big"
        className={s.root_cta}
        onClick={onCta}
      >
        {ctaLabel}
        <span className={s.root_cta_dot} aria-hidden />
        {ctaPrice}
      </AppButton>
    </AppCutoutCard>
  </AppCutoutCard>
)

export type { AppProductPurchaseCardProps } from './AppProductPurchaseCard.types'
