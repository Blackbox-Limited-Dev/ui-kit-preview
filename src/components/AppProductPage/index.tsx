import React from 'react'
import cn from 'classnames'

import { AppProductPageChecklist } from './AppProductPageChecklist'
import { AppProductPageFaq } from './AppProductPageFaq'
import { AppProductPageHeader } from './AppProductPageHeader'
import { AppProductPageLocation } from './AppProductPageLocation'
import { AppProductPageTextSection } from './AppProductPageTextSection'

import s from './AppProductPage.module.scss'

import type { AppProductPageProps } from './AppProductPage.types'

export const AppProductPage = ({
  breadcrumbs,
  aside,
  children,
  className,
}: AppProductPageProps) => (
  <div className={cn(s.root, className)}>
    {breadcrumbs}
    <div className={s.root_body}>
      <div className={s.root_main}>{children}</div>
      {aside && <aside className={s.root_aside}>{aside}</aside>}
    </div>
  </div>
)

AppProductPage.Header = AppProductPageHeader
AppProductPage.TextSection = AppProductPageTextSection
AppProductPage.Checklist = AppProductPageChecklist
AppProductPage.Faq = AppProductPageFaq
AppProductPage.Location = AppProductPageLocation

export type {
  AppProductPageChecklistProps,
  AppProductPageChecklistStep,
  AppProductPageChecklistType,
  AppProductPageFaqItem,
  AppProductPageFaqProps,
  AppProductPageHeaderProps,
  AppProductPageLocation as AppProductPageLocationValue,
  AppProductPageLocationProps,
  AppProductPageProps,
  AppProductPageSpec,
  AppProductPageTextSectionProps,
} from './AppProductPage.types'
