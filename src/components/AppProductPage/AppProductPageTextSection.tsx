import React from 'react'
import cn from 'classnames'

import { AppSectionCard } from '../AppSectionCard'

import s from './AppProductPage.module.scss'

import type { AppProductPageTextSectionProps } from './AppProductPage.types'
import type { ReactNode } from 'react'

const BOLD_RUN = /(\*\*[^*]+\*\*)/g

/** Renders `**inline bold**` runs; everything else passes through as text. */
export const renderInlineBold = (text: string): ReactNode[] =>
  text.split(BOLD_RUN).map((chunk, index) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? (
      <strong key={index} className={s.textSection_strong}>
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{chunk}</React.Fragment>
    )
  )

export const AppProductPageTextSection = ({
  title,
  paragraphs,
  titlePlacement = 'inside',
  className,
}: AppProductPageTextSectionProps) => (
  <AppSectionCard
    title={title}
    titlePlacement={titlePlacement}
    padded={false}
    className={cn(s.textSection, className)}
  >
    {paragraphs.map((paragraph) => (
      <p key={paragraph} className={s.textSection_paragraph}>
        {renderInlineBold(paragraph)}
      </p>
    ))}
  </AppSectionCard>
)
