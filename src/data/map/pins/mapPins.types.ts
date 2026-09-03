import type { Feature, FeatureCollection, Point } from 'geojson'

import type { MapLayerKey } from '../layers/mapLayers.types'

export type MapPinPrecision = 'exact' | 'approximate'

export type MapPinIconKey = 'aquapark' | 'voda' | 'chan' | 'oasis' | 'banya'

export type MapPinProperties = {
  id: string
  name: string
  pinIcon?: MapPinIconKey
  pinIconOffset?: [number, number]
  subcategory: string
  description: string | null
  services: string | null
  hours: string | null
  website: string | null
  googleMaps: string | null
  precision: MapPinPrecision
  source: string
  category: MapLayerKey
  categoryLabel: string
  seasons: string[]
}

export type MapPinFeature = Feature<Point, MapPinProperties>

export type MapPinCollection = FeatureCollection<Point, MapPinProperties>
