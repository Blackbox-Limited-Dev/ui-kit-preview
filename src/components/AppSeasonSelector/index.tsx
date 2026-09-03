'use client'

import React from 'react'
import cn from 'classnames'

import Flower from '~icons/flower.svg'
import Snowflake from '~icons/snowflake.svg'

import { AppIcon } from '../AppIcon'

import s from './AppSeasonSelector.module.scss'

import type { AppSeasonSelectorProps } from './AppSeasonSelector.types'

const defaultLabels = { winter: 'зима', summer: 'літо' }

export const AppSeasonSelector = ({
  season,
  onSeasonChange,
  labels = defaultLabels,
  className,
}: AppSeasonSelectorProps) => (
  <button
    type="button"
    className={cn(s.root, className)}
    onClick={() => onSeasonChange(season === 'winter' ? 'summer' : 'winter')}
  >
    <span>{labels[season]}</span>
    <AppIcon
      icon={season === 'winter' ? Snowflake : Flower}
      size="medium"
      color="var(--color-icon-on-card)"
    />
  </button>
)

export type {
  AppSeason,
  AppSeasonSelectorProps,
} from './AppSeasonSelector.types'
