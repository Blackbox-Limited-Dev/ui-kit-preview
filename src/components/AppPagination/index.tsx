'use client'

import React from 'react'
import cn from 'classnames'

import CaretLeftIcon from '~icons/caret-left.svg'
import CaretRightIcon from '~icons/caret-right.svg'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'
import { useIsDesktop } from '~hooks/useMediaQuery'

import s from './AppPagination.module.scss'

import type { AppPaginationProps } from './AppPagination.types'

export const AppPagination = ({
  page,
  total,
  onPage,
  onShowMore,
  showMoreLabel,
  prevPageLabel,
  nextPageLabel,
  className,
}: AppPaginationProps) => {
  const isDesktop = useIsDesktop()
  const size = isDesktop ? 'big' : 'small'

  if (total <= 1) return null

  return (
    <div className={cn(s.pagination, className)}>
      {onShowMore && page < total && (
        <AppButton
          variant="outlined"
          size="big"
          className={s.pagination_more}
          onClick={onShowMore}
        >
          {showMoreLabel}
        </AppButton>
      )}

      <div className={s.pagination_pages}>
        <AppButton
          iconOnly
          variant="outlined"
          size={size}
          aria-label={prevPageLabel}
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <AppIcon icon={CaretLeftIcon} size={20} />
        </AppButton>

        {Array.from({ length: total }, (_, i) => i + 1).map((number) => (
          <AppButton
            key={number}
            variant="outlined"
            size={size}
            className={cn(s.pagination_number, {
              [s.pagination_active]: number === page,
            })}
            aria-current={number === page ? 'page' : undefined}
            onClick={() => onPage(number)}
          >
            {number}
          </AppButton>
        ))}

        <AppButton
          iconOnly
          variant="outlined"
          size={size}
          aria-label={nextPageLabel}
          disabled={page >= total}
          onClick={() => onPage(page + 1)}
        >
          <AppIcon icon={CaretRightIcon} size={20} />
        </AppButton>
      </div>
    </div>
  )
}

export type { AppPaginationProps } from './AppPagination.types'
