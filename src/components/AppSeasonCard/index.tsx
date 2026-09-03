import React from 'react'
import cn from 'classnames'

import DecorHigh from './assets/decor-high.svg'
import DecorHoliday from './assets/decor-holiday.svg'
import DecorLow from './assets/decor-low.svg'
import DecorNeutral from './assets/decor-neutral.svg'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'

import s from './AppSeasonCard.module.scss'

import type {
  AppSeasonCardProps,
  AppSeasonCardVariant,
} from './AppSeasonCard.types'
import type { AppIconComponent } from '../AppIcon/AppIcon.types'

const DECOR_SIZE = 174

const decorByVariant: Record<AppSeasonCardVariant, AppIconComponent> = {
  neutral: DecorNeutral,
  low: DecorLow,
  high: DecorHigh,
  holiday: DecorHoliday,
}

/** Size of the mirrored pattern pair flanking the centered copy; the pair is
 *  omitted where the variant has none. Positions live in the SCSS. */
const satelliteSizeByVariant: Partial<Record<AppSeasonCardVariant, number>> = {
  low: 60,
  high: DECOR_SIZE,
  holiday: DECOR_SIZE,
}

export const AppSeasonCard = ({
  variant,
  title,
  badge,
  dates = [],
  priceLabel,
  price,
  priceUnit,
  href,
  actionLabel,
  className,
}: AppSeasonCardProps) => {
  const Decor = decorByVariant[variant]
  const satelliteSize = satelliteSizeByVariant[variant]

  return (
    <div className={cn(s.root, s[variant], className)}>
      <div className={s.decor} aria-hidden>
        <Decor
          className={s.decorMain}
          width={DECOR_SIZE}
          height={DECOR_SIZE}
          focusable={false}
        />
        {!!satelliteSize && (
          <>
            <Decor
              className={s.decorSatellite}
              width={satelliteSize}
              height={satelliteSize}
              focusable={false}
            />
            <Decor
              className={s.decorSatelliteAlt}
              width={satelliteSize}
              height={satelliteSize}
              focusable={false}
            />
          </>
        )}
      </div>

      <div className={s.header}>
        <div className={s.titleRow}>
          <span className={s.title}>{title}</span>
          {!!badge && <span className={s.badge}>{badge}</span>}
        </div>
        {dates.length > 0 && (
          <p className={s.dates}>
            {dates.map((date, index) => (
              <React.Fragment key={date}>
                {index > 0 && <span className={s.datesSeparator} aria-hidden />}
                <span>{date}</span>
              </React.Fragment>
            ))}
          </p>
        )}
      </div>

      <div className={s.footer}>
        <div className={s.price}>
          {!!priceLabel && <span className={s.priceLabel}>{priceLabel}</span>}
          <span className={s.priceValue}>
            <span className={s.priceAmount}>{price}</span>
            <span className={s.priceUnit}>{priceUnit}</span>
          </span>
        </div>
        <AppButton
          iconOnly
          variant="tertiary"
          size="small"
          href={href}
          aria-label={actionLabel}
        >
          <AppIcon name="ArrowRight" size="large" strokeWidth={1.5} />
        </AppButton>
      </div>
    </div>
  )
}

export type {
  AppSeasonCardProps,
  AppSeasonCardVariant,
} from './AppSeasonCard.types'
