export type {
  MapPinCollection,
  MapPinFeature,
  MapPinIconKey,
  MapPinProperties,
} from './mapPins.types'

export {
  MAP_ARTWORK_SPIDER_LINE_LAYER_ID,
  MAP_ARTWORK_SPIDER_SOURCE_LINES_ID,
  MAP_PIN_CLUSTER_MAX_ZOOM,
  MAP_PIN_CLUSTER_RADIUS,
  MAP_SPIDER_LINE_COLOR,
  MAP_SPIDER_LINE_OPACITY,
  MAP_SPIDER_LINE_WIDTH,
} from './mapPins.mapStyle'

export {
  getMapPinLayerConfig,
  type MapPinLayerConfig,
} from './mapPins.layerConfig'
export { prepareMapPinFeatures } from './mapPins.prepare'
export {
  artworkClusterExpansionZoom,
  clusterArtworkPins,
  pinDeclusterZoom,
  type ArtworkCluster,
} from './mapPins.clusterVisibility'
export { getMapPinsForLayer, MAP_PINS_BY_LAYER } from './mapPins.registry'
export {
  getMapCategoryPinStyle,
  MAP_CATEGORY_ICON_COLOR,
  MAP_CATEGORY_PIN_STYLES,
  type MapCategoryPinStyle,
} from './mapPins.categories'
export { useMapPinsGeoJson } from './useMapPinsGeoJson'
export { fanOffsets, projectFanLegs, type FanLeg } from './mapPins.spiderfy'
