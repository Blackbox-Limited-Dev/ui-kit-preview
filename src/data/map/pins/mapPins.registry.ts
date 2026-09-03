import type { MapLayerKey } from '../layers/mapLayers.types'
import type { MapPinCollection } from './mapPins.types'
import accommodation from './geojson/accommodation.json'
import cameras from './geojson/cameras.json'
import cycling from './geojson/cycling.json'
import dining from './geojson/dining.json'
import entertainment from './geojson/entertainment.json'
import information from './geojson/information.json'
import infrastructure from './geojson/infrastructure.json'
import parking from './geojson/parking.json'
import safety from './geojson/safety.json'
import shops from './geojson/shops.json'
import tourism from './geojson/tourism.json'
import transport from './geojson/transport.json'
import wellnessSpa from './geojson/wellness-spa.json'
import withChildren from './geojson/with-children.json'

const EMPTY_COLLECTION: MapPinCollection = {
  type: 'FeatureCollection',
  features: [],
}

export const MAP_PINS_BY_LAYER: Record<MapLayerKey, MapPinCollection> = {
  accommodation: accommodation as MapPinCollection,
  cameras: cameras as MapPinCollection,
  cycling: cycling as MapPinCollection,
  dining: dining as MapPinCollection,
  entertainment: entertainment as MapPinCollection,
  information: information as MapPinCollection,
  infrastructure: infrastructure as MapPinCollection,
  parking: parking as MapPinCollection,
  safety: safety as MapPinCollection,
  shops: shops as MapPinCollection,
  skiing: EMPTY_COLLECTION,
  tourism: tourism as MapPinCollection,
  transport: transport as MapPinCollection,
  'wellness-spa': wellnessSpa as MapPinCollection,
  'with-children': withChildren as MapPinCollection,
}

export function getMapPinsForLayer(layerKey: MapLayerKey): MapPinCollection {
  return MAP_PINS_BY_LAYER[layerKey] ?? EMPTY_COLLECTION
}
