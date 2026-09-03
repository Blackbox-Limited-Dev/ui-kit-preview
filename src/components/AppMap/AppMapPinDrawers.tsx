'use client'

import React, { useState } from 'react'
import cn from 'classnames'

import { AppButton } from '~components/AppButton'
import { AppDrawer } from '~components/AppDrawer'
import { AppIcon } from '~components/AppIcon'
import { AppText } from '~components/AppText'
import type { MapLayerDefinition, MapLayerKey } from '~data/map/layers'
import type { MapPinFeature } from '~data/map/pins'
import MapPinIcon from '~icons/map-pin.svg'
import ClockIcon from '~icons/watch-bracelet.svg'

import s from './AppMap.module.scss'

export type SummerPanelView = { kind: 'list' } | { kind: 'pin'; id: string }

type PinDetailBodyProps = {
  pin: MapPinFeature
}

const PinDetailBody = ({ pin }: PinDetailBodyProps) => {
  const [overviewOpen, setOverviewOpen] = useState(false)
  const overview =
    pin.properties.description ??
    'Bukovel venue mock until the places API lands. Hours, contacts and gallery rotate per pin in production.'

  return (
    <div className={s.pinDetail}>
      <p className={s.pinMeta}>
        <span>{pin.properties.categoryLabel}</span>
        <span className={s.pinMetaDot} />
        <span>{pin.properties.subcategory}</span>
      </p>
      <p className={s.statusRow}>
        <span className={s.statusOpen}>Open</span>
        <span className={s.pinMetaDot} />
        <span>Closes at 22:00</span>
      </p>
      <div className={s.contactRow}>
        <AppButton
          variant="secondary"
          size="small"
          href="tel:+380671234567"
          external
        >
          Call
        </AppButton>
        {pin.properties.website ? (
          <AppButton
            variant="secondary"
            size="small"
            href={pin.properties.website}
            external
          >
            Website
          </AppButton>
        ) : null}
        {pin.properties.googleMaps ? (
          <AppButton
            variant="secondary"
            size="small"
            href={pin.properties.googleMaps}
            external
          >
            Maps
          </AppButton>
        ) : null}
      </div>
      <div className={s.infoBlock}>
        <div className={s.infoRow}>
          <AppIcon icon={ClockIcon} size={24} />
          <div>
            <AppText as="p" variant="caption-regular">
              Hours
            </AppText>
            <AppText as="p" variant="body-1-medium">
              {pin.properties.hours ?? '07:30 – 22:00'}
            </AppText>
          </div>
        </div>
        <div className={s.infoRow}>
          <AppIcon icon={MapPinIcon} size={24} />
          <div>
            <AppText as="p" variant="caption-regular">
              Address
            </AppText>
            <AppText as="p" variant="body-1-medium">
              Bukovel, Ivano-Frankivsk region
            </AppText>
          </div>
        </div>
      </div>
      <div>
        <AppText as="h3" variant="title-3">
          Overview
        </AppText>
        <p
          className={cn(s.overviewBody, {
            [s.overviewBody_clamp]: !overviewOpen,
          })}
        >
          {overview}
        </p>
        <AppButton
          variant="outlined"
          size="small"
          onClick={() => setOverviewOpen((open) => !open)}
        >
          {overviewOpen ? 'Show less' : 'Show more'}
        </AppButton>
      </div>
    </div>
  )
}

type AppMapPinDrawersProps = {
  layers: MapLayerDefinition[]
  layerKey: MapLayerKey
  pins: MapPinFeature[]
  view: SummerPanelView
  contentOpen: boolean
  settingsOpen: boolean
  onCloseContent: () => void
  onCloseSettings: () => void
  onBack: () => void
  onSelectPin: (id: string) => void
  onSelectLayer: (key: MapLayerKey) => void
}

export const AppMapPinDrawers = ({
  layers,
  layerKey,
  pins,
  view,
  contentOpen,
  settingsOpen,
  onCloseContent,
  onCloseSettings,
  onBack,
  onSelectPin,
  onSelectLayer,
}: AppMapPinDrawersProps) => {
  const layer = layers.find((item) => item.key === layerKey)
  const selected =
    view.kind === 'pin'
      ? pins.find((pin) => pin.properties.id === view.id)
      : undefined
  const title =
    view.kind === 'pin' && selected
      ? selected.properties.name
      : (layer?.label ?? 'Places')

  return (
    <>
      <AppDrawer
        open={contentOpen}
        onOpenChange={(open) => {
          if (!open) onCloseContent()
        }}
        direction="right"
        offset="screen"
        showOverlay={false}
        dismissible={false}
        className={s.mapDrawer}
      >
        <AppDrawer.Header
          className={s.mapDrawerHeader}
          closeLabel="Close"
          onClose={onCloseContent}
        >
          {view.kind === 'list' ? (
            title
          ) : (
            <span className={s.headerRow}>
              <AppButton
                iconOnly
                variant="outlined"
                size="small"
                aria-label="Back"
                className={s.headerBack}
                onClick={onBack}
              >
                <AppIcon name="NavArrowLeft" size={20} />
              </AppButton>
              <span className={s.headerTitle}>{title}</span>
            </span>
          )}
        </AppDrawer.Header>
        <AppDrawer.Body className={s.mapDrawerBody}>
          {view.kind === 'pin' && selected ? (
            <PinDetailBody pin={selected} />
          ) : pins.length === 0 ? (
            <p className={s.empty}>No pins in this layer</p>
          ) : (
            <div className={s.list}>
              {pins.map((pin, index) => (
                <button
                  key={pin.properties.id}
                  type="button"
                  className={cn(s.placeRow, {
                    [s.placeRow_divider]: index > 0,
                  })}
                  onClick={() => onSelectPin(pin.properties.id)}
                >
                  <span className={s.placeName}>{pin.properties.name}</span>
                  <span className={s.placeTag}>
                    {pin.properties.subcategory}
                  </span>
                </button>
              ))}
            </div>
          )}
        </AppDrawer.Body>
      </AppDrawer>

      <AppDrawer
        open={settingsOpen}
        onOpenChange={(open) => {
          if (!open) onCloseSettings()
        }}
        direction="right"
        offset="screen"
        showOverlay={false}
        className={s.mapDrawer}
      >
        <AppDrawer.Header
          className={s.mapDrawerHeader}
          closeLabel="Close"
          onClose={onCloseSettings}
        >
          Layers
        </AppDrawer.Header>
        <AppDrawer.Body className={s.mapDrawerBody}>
          <div className={s.settings}>
            <p className={s.settingsHint}>
              Summer Storybook default is Dining so clusters show at zoom 13.
              Switch layers to see other pin sets.
            </p>
            {layers.map((item) => (
              <button
                key={item.key}
                type="button"
                className={cn(s.layerRow, {
                  [s.layerRow_active]: item.key === layerKey,
                })}
                onClick={() => onSelectLayer(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </AppDrawer.Body>
      </AppDrawer>
    </>
  )
}
