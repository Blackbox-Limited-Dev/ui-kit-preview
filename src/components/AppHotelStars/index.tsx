import React from 'react'
import cn from 'classnames'

import StarIcon from '~icons/star.svg'

import s from './AppHotelStars.module.scss'

import type { AppHotelStarsProps } from './AppHotelStars.types'

export const AppHotelStars = ({
  count,
  label,
  className,
  ...rest
}: AppHotelStarsProps) => (
  <span
    className={cn(s.root, className)}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    {...rest}
  >
    {Array.from({ length: count }, (_, i) => (
      <StarIcon key={i} width={12} height={12} />
    ))}
  </span>
)

export type { AppHotelStarsProps } from './AppHotelStars.types'
