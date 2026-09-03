import React from 'react'

import { AppAccordion, AppAccordionItem } from '../AppAccordion'
import { AppSectionCard } from '../AppSectionCard'

import type { AppProductPageFaqProps } from './AppProductPage.types'

export const AppProductPageFaq = ({
  title,
  items,
  titlePlacement = 'outside',
  className,
}: AppProductPageFaqProps) => (
  <AppSectionCard
    title={title}
    titlePlacement={titlePlacement}
    padded={false}
    className={className}
  >
    <AppAccordion variant="card">
      {items.map((item) => (
        <AppAccordionItem key={item.key} value={item.key} title={item.question}>
          {item.answer}
        </AppAccordionItem>
      ))}
    </AppAccordion>
  </AppSectionCard>
)
