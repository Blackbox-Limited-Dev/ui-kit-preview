import { useMemo } from 'react'

import type { MapLayerKey } from '../layers/mapLayers.types'
import { prepareMapPinFeatures } from './mapPins.prepare'
import { getMapPinsForLayer } from './mapPins.registry'
import type { MapPinFeature } from './mapPins.types'

export function useMapPinsGeoJson(layerKey: MapLayerKey): MapPinFeature[] {
  return useMemo(
    () => prepareMapPinFeatures(getMapPinsForLayer(layerKey)),
    [layerKey]
  )
}
