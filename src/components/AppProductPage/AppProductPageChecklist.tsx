import React from 'react'
import cn from 'classnames'

import { AppBulletPoint } from '../AppBulletPoint'
import { AppMessageBanner } from '../AppMessageBanner'
import { AppSectionCard } from '../AppSectionCard'

import s from './AppProductPage.module.scss'

import type {
  AppProductPageChecklistProps,
  AppProductPageChecklistStep,
} from './AppProductPage.types'

const normalise = (step: AppProductPageChecklistStep) =>
  typeof step === 'string' ? { text: step, type: 'check' as const } : step

export const AppProductPageChecklist = ({
  title,
  steps,
  note,
  titlePlacement = 'inside',
  className,
}: AppProductPageChecklistProps) => (
  <AppSectionCard
    title={title}
    titlePlacement={titlePlacement}
    padded={false}
    className={cn(s.checklist, className)}
  >
    <div className={s.checklist_list}>
      {steps.map((step) => {
        const { text, type } = normalise(step)

        return (
          <AppBulletPoint key={text} type={type}>
            {text}
          </AppBulletPoint>
        )
      })}
    </div>
    {note && (
      <AppMessageBanner variant="secondary" size="md" align="start">
        {note}
      </AppMessageBanner>
    )}
  </AppSectionCard>
)
