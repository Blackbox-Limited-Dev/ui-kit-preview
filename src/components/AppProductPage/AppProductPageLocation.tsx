'use client'

import React from 'react'
import Image from 'next/image'
import cn from 'classnames'
import * as Accordion from '@radix-ui/react-accordion'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'
import { AppSectionCard } from '../AppSectionCard'

import s from './AppProductPage.module.scss'

import type { AppProductPageLocationProps } from './AppProductPage.types'

export const AppProductPageLocation = ({
  location,
  title,
  titlePlacement = 'outside',
  routeLabel,
  copyAddressLabel,
  onRoute,
  onCopyAddress,
  className,
}: AppProductPageLocationProps) => {
  const {
    isOpen,
    openLabel,
    closedLabel,
    hours,
    schedule,
    address,
    mapImage,
    mapAlt,
  } = location
  const statusLabel = isOpen ? openLabel : closedLabel

  return (
    <AppSectionCard
      title={title}
      titlePlacement={titlePlacement}
      padded={false}
      className={cn(s.location, className)}
    >
      <Accordion.Root
        type="multiple"
        defaultValue={['address']}
        className={s.location_card}
      >
        {hours && (
          <Accordion.Item value="hours" className={s.location_row}>
            <Accordion.Header className={s.location_row_header}>
              <Accordion.Trigger
                className={s.location_row_trigger}
                disabled={!schedule}
              >
                <AppIcon
                  name="Clock"
                  size="small"
                  className={s.location_glyph}
                />
                <span className={s.location_row_text}>
                  {statusLabel && (
                    <span
                      className={cn(s.location_status, {
                        [s.location_status__open]: isOpen,
                      })}
                    >
                      {statusLabel}
                    </span>
                  )}
                  {statusLabel && (
                    <span className={s.location_dot} aria-hidden />
                  )}
                  <span>{hours}</span>
                </span>
                {schedule && (
                  <span className={s.location_chevron} aria-hidden>
                    <AppIcon name="NavArrowDown" size={20} />
                  </span>
                )}
              </Accordion.Trigger>
            </Accordion.Header>
            {schedule && (
              <Accordion.Content className={s.location_row_content}>
                <dl className={s.location_schedule}>
                  {schedule.map((day) => (
                    <div key={day.day} className={s.location_schedule_row}>
                      <dt>{day.day}</dt>
                      <dd>{day.hours}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion.Content>
            )}
          </Accordion.Item>
        )}
        <Accordion.Item value="address" className={s.location_row}>
          <Accordion.Header className={s.location_row_header}>
            <Accordion.Trigger className={s.location_row_trigger}>
              <AppIcon
                name="MapPin"
                size="small"
                className={s.location_glyph}
              />
              <span className={s.location_row_text}>{address}</span>
              <span className={s.location_chevron} aria-hidden>
                <AppIcon name="NavArrowDown" size={20} />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={s.location_row_content}>
            <div className={s.location_map}>
              <Image src={mapImage} alt={mapAlt} fill sizes="936px" />
              <span className={s.location_pin} aria-hidden />
            </div>
            <div className={s.location_actions}>
              <AppButton
                variant="secondary"
                size="big"
                className={s.location_actions_route}
                onClick={onRoute}
              >
                {routeLabel}
              </AppButton>
              <AppButton
                iconOnly
                variant="outlined"
                size="big"
                aria-label={copyAddressLabel}
                onClick={onCopyAddress}
              >
                <AppIcon name="Copy" size="large" />
              </AppButton>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </AppSectionCard>
  )
}
