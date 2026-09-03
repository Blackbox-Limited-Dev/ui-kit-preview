import React from 'react'
import Image from 'next/image'
import cn from 'classnames'

import s from './AppMediaTile.module.scss'

import type { AppMediaTileProps } from './AppMediaTile.types'

export const AppMediaTile = ({
  image,
  alt,
  caption,
  sizes = '100vw',
  media,
  className,
}: AppMediaTileProps) => (
  <div className={cn(s.root, className)}>
    <Image src={image} alt={alt} fill sizes={sizes} className={s.root_image} />
    {media}
    <span className={s.root_overlay} aria-hidden />
    <span className={s.root_fade} aria-hidden />
    <span className={s.root_caption}>{caption}</span>
  </div>
)

export type { AppMediaTileProps } from './AppMediaTile.types'
