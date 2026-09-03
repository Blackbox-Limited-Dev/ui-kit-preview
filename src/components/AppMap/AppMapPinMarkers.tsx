'use client'

import React from 'react'
import { Layer, Marker, Source } from 'react-map-gl/mapbox'
import type { FeatureCollection } from 'geojson'
import cn from 'classnames'

import { AppIcon } from '~components/AppIcon'
import type { MapLayerKey } from '~data/map/layers'
import {
  getMapCategoryPinStyle,
  MAP_ARTWORK_SPIDER_LINE_LAYER_ID,
  MAP_ARTWORK_SPIDER_SOURCE_LINES_ID,
  MAP_CATEGORY_ICON_COLOR,
  MAP_SPIDER_LINE_COLOR,
  MAP_SPIDER_LINE_OPACITY,
  MAP_SPIDER_LINE_WIDTH,
  type ArtworkCluster,
  type FanLeg,
  type MapPinFeature,
} from '~data/map/pins'

import s from './AppMap.module.scss'

const CATEGORY_PIN_ICON_RATIO = 0.55

export type SpiderfyFan = {
  id: string
  center: [number, number]
  legs: FanLeg[]
  openedAtZoom: number
}

type PinBadgeProps = {
  category: MapLayerKey
  name: string
  iconSize: number
  isActive?: boolean
  extraCount?: number
  onClick: () => void
}

const PinBadge = ({
  category,
  name,
  iconSize,
  isActive = false,
  extraCount,
  onClick,
}: PinBadgeProps) => {
  const { color, icon } = getMapCategoryPinStyle(category)
  const glyph = Math.round(iconSize * CATEGORY_PIN_ICON_RATIO)

  return (
    <button
      type="button"
      className={cn(s.pin, { [s.pin_active]: isActive })}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
    >
      <span
        className={s.pin_badge}
        style={{
          width: iconSize,
          height: iconSize,
          backgroundColor: color,
        }}
      >
        <AppIcon icon={icon} size={glyph} color={MAP_CATEGORY_ICON_COLOR} />
        {extraCount != null && extraCount > 0 ? (
          <span className={s.pin_count}>{`+${extraCount}`}</span>
        ) : null}
      </span>
      {name ? <span className={s.pin_label}>{name}</span> : null}
    </button>
  )
}

type AppMapPinMarkersProps = {
  clusters: ArtworkCluster[]
  layerKey: MapLayerKey
  iconSize: number
  selectedId: string | null
  fan: SpiderfyFan | null
  onPinClick: (feature: MapPinFeature) => void
  onClusterClick: (cluster: ArtworkCluster) => void
}

export const AppMapPinMarkers = ({
  clusters,
  layerKey,
  iconSize,
  selectedId,
  fan,
  onPinClick,
  onClusterClick,
}: AppMapPinMarkersProps) => {
  const spiderLines: FeatureCollection = {
    type: 'FeatureCollection',
    features:
      fan?.legs.map((leg, index) => ({
        type: 'Feature' as const,
        id: `spider-${index}`,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: [fan.center, leg.coord],
        },
      })) ?? [],
  }

  return (
    <>
      {fan ? (
        <Source
          id={MAP_ARTWORK_SPIDER_SOURCE_LINES_ID}
          type="geojson"
          data={spiderLines}
        >
          <Layer
            id={MAP_ARTWORK_SPIDER_LINE_LAYER_ID}
            type="line"
            paint={{
              'line-color': MAP_SPIDER_LINE_COLOR,
              'line-width': MAP_SPIDER_LINE_WIDTH,
              'line-opacity': MAP_SPIDER_LINE_OPACITY,
            }}
          />
        </Source>
      ) : null}

      {clusters.map((cluster) => {
        if (fan && fan.id === cluster.id) return null
        const [lng, lat] = cluster.coord
        const isGroup = cluster.members.length > 1
        const lead = cluster.members[0]
        return (
          <Marker
            key={cluster.id}
            longitude={lng}
            latitude={lat}
            anchor="center"
            style={{ zIndex: selectedId === lead.properties.id ? 2 : 1 }}
          >
            <PinBadge
              category={layerKey}
              name={isGroup ? '' : lead.properties.name}
              iconSize={iconSize}
              isActive={!isGroup && selectedId === lead.properties.id}
              extraCount={isGroup ? cluster.members.length - 1 : undefined}
              onClick={() =>
                isGroup ? onClusterClick(cluster) : onPinClick(lead)
              }
            />
          </Marker>
        )
      })}

      {fan?.legs.map((leg) => {
        const id = leg.feature.properties.id
        return (
          <Marker
            key={`fan-${id}`}
            longitude={leg.coord[0]}
            latitude={leg.coord[1]}
            anchor="center"
            style={{ zIndex: selectedId === id ? 3 : 2 }}
          >
            <PinBadge
              category={layerKey}
              name={leg.feature.properties.name}
              iconSize={iconSize}
              isActive={selectedId === id}
              onClick={() => onPinClick(leg.feature)}
            />
          </Marker>
        )
      })}
    </>
  )
}
