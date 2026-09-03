import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

import Separator from './assets/separator.svg'

import s from './AppBreadcrumbs.module.scss'

import type { AppBreadcrumbsProps } from './AppBreadcrumbs.types'

export const AppBreadcrumbs = ({
  items,
  ariaLabel,
  className,
  ...rest
}: AppBreadcrumbsProps) => (
  <nav aria-label={ariaLabel} className={cn(s.root, className)} {...rest}>
    <ol className={s.root_list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <li key={item.label} className={s.root_item}>
            {item.href && !isLast ? (
              <Link href={item.href} className={s.root_link}>
                {item.label}
              </Link>
            ) : (
              <span
                className={s.root_current}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <Separator aria-hidden className={s.root_separator} />}
          </li>
        )
      })}
    </ol>
  </nav>
)

export type {
  AppBreadcrumbItem,
  AppBreadcrumbsProps,
} from './AppBreadcrumbs.types'
