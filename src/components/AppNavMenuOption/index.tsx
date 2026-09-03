import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'

import s from './AppNavMenuOption.module.scss'

import type { AppNavMenuOptionProps } from './AppNavMenuOption.types'

const DEFAULT_SIZES = '(max-width: 1023px) 100vw, 450px'

export const AppNavMenuOption = ({
  image,
  alt,
  title,
  description,
  href,
  sizes = DEFAULT_SIZES,
  className,
}: AppNavMenuOptionProps) => (
  <Link href={href} className={cn(s.root, className)}>
    <Image src={image} alt={alt} fill sizes={sizes} className={s.image} />
    <span className={s.content}>
      <span className={s.title}>{title}</span>
      {!!description && <span className={s.description}>{description}</span>}
    </span>
  </Link>
)

export type { AppNavMenuOptionProps } from './AppNavMenuOption.types'
