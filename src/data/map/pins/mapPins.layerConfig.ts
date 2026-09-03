import type { MapLayerKey } from '../layers/mapLayers.types'

export type MapPinLayerConfig = {
  iconSize: number
  labelSize: number
}

const DEFAULT_PIN_LAYER_CONFIG: MapPinLayerConfig = {
  iconSize: 38,
  labelSize: 12,
}

const PIN_LAYER_CONFIG_BY_KEY: Partial<Record<MapLayerKey, MapPinLayerConfig>> =
  {
    'wellness-spa': { iconSize: 48, labelSize: 12 },
  }

export function getMapPinLayerConfig(layerKey: MapLayerKey): MapPinLayerConfig {
  return PIN_LAYER_CONFIG_BY_KEY[layerKey] ?? DEFAULT_PIN_LAYER_CONFIG
}
