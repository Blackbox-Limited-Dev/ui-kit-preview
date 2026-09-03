import type { MapPinFeature } from './mapPins.types'

const PIN_ICON_SPREAD_LNG = 0.00015

export function spreadColocatedIconPin(feature: MapPinFeature): MapPinFeature {
  const offsetX = feature.properties.pinIconOffset?.[0] ?? 0
  if (offsetX === 0) return feature

  const [lng, lat] = feature.geometry.coordinates
  if (lng == null || lat == null) return feature

  return {
    ...feature,
    geometry: {
      type: 'Point',
      coordinates: [lng + offsetX * PIN_ICON_SPREAD_LNG, lat],
    },
  }
}
