import { spreadColocatedIconPin } from './mapPins.spread'
import type { MapPinCollection, MapPinFeature } from './mapPins.types'

export function prepareMapPinFeatures(
  collection: MapPinCollection
): MapPinFeature[] {
  return collection.features
    .filter(
      (feature): feature is MapPinFeature =>
        feature.properties != null &&
        feature.geometry.coordinates[0] != null &&
        feature.geometry.coordinates[1] != null
    )
    .map((feature) =>
      feature.properties.pinIcon != null
        ? spreadColocatedIconPin(feature)
        : feature
    )
}
