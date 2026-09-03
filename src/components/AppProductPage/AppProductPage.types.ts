import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

import type { AppSectionCardTitlePlacement } from '../AppSectionCard/AppSectionCard.types'

export type AppProductPageProps = {
  /** Breadcrumb row above the body. */
  breadcrumbs?: ReactNode
  /** Sticky purchase column. Omit for a single full-width column. */
  aside?: ReactNode
  /** Body sections — the section kit below, in page order. */
  children: ReactNode
  className?: string
}

/** One label↔value row of the header's spec table. */
export type AppProductPageSpec = { label: string; value: string }

export type AppProductPageHeaderProps = {
  /** Product name, e.g. «Скі-пас на 5 днів». */
  title: string
  /** Dot-separated meta under the title, e.g. «Поспіль» · «2025-2026». */
  meta?: string[]
  /** Spec table under the title block. */
  specs?: AppProductPageSpec[]
  className?: string
}

export type AppProductPageTextSectionProps = {
  title: string
  /** Paragraphs. `**inline bold**` is supported. */
  paragraphs: string[]
  /** Defaults to `inside`. */
  titlePlacement?: AppSectionCardTitlePlacement
  className?: string
}

export type AppProductPageChecklistType = 'check' | 'attention' | 'info'

export type AppProductPageChecklistStep =
  | string
  | { text: string; type?: AppProductPageChecklistType }

export type AppProductPageChecklistProps = {
  title: string
  steps: AppProductPageChecklistStep[]
  /** Highlighted note banner under the list. */
  note?: string
  /** Defaults to `inside`. */
  titlePlacement?: AppSectionCardTitlePlacement
  className?: string
}

export type AppProductPageFaqItem = {
  key: string
  question: string
  answer: string
}

export type AppProductPageFaqProps = {
  title: string
  items: AppProductPageFaqItem[]
  /** Defaults to `outside`. */
  titlePlacement?: AppSectionCardTitlePlacement
  className?: string
}

/** «Локація» card content: opening hours, address and a pre-rendered map tile. */
export type AppProductPageLocation = {
  /** Drives the green/red status word; omit for a location with no hours row. */
  isOpen?: boolean
  openLabel?: string
  closedLabel?: string
  /** Collapsed status line, e.g. «З 8:00 до 22:00». */
  hours?: string
  /** Expanded week schedule. The hours row collapses only when this is set. */
  schedule?: { day: string; hours: string }[]
  address: string
  /** Pre-rendered map tile. */
  mapImage: StaticImageData | string
  mapAlt: string
}

export type AppProductPageLocationProps = {
  location: AppProductPageLocation
  /** Defaults to `outside`. */
  titlePlacement?: AppSectionCardTitlePlacement
  title: string
  routeLabel: string
  copyAddressLabel: string
  onRoute?: () => void
  onCopyAddress?: () => void
  className?: string
}
