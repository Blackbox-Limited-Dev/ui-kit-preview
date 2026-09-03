import type {
  MapLayerDefinition,
  MapLayerKey,
  MapSeasonMode,
} from './mapLayers.types'

const ALL_SEASON_LAYERS: MapLayerDefinition[] = [
  { key: 'dining', label: 'Dining', availability: 'all' },
  { key: 'entertainment', label: 'Entertainment', availability: 'all' },
  { key: 'wellness-spa', label: 'SPA and wellness', availability: 'all' },
  { key: 'shops', label: 'Shops', availability: 'all' },
  { key: 'tourism', label: 'Tourism', availability: 'all' },
  { key: 'transport', label: 'Transport', availability: 'all' },
  { key: 'parking', label: 'Parking', availability: 'all' },
  { key: 'accommodation', label: 'Stay', availability: 'all' },
  { key: 'infrastructure', label: 'Infrastructure', availability: 'all' },
  { key: 'information', label: 'Information', availability: 'all' },
  { key: 'with-children', label: 'With children', availability: 'all' },
  { key: 'safety', label: 'Safety', availability: 'all' },
  { key: 'cameras', label: 'Webcams', availability: 'all' },
]

const WINTER_ONLY_LAYERS: MapLayerDefinition[] = [
  {
    key: 'skiing',
    label: 'Skiing',
    availability: 'winter',
    showSkiOverlay: true,
  },
]

const SUMMER_ONLY_LAYERS: MapLayerDefinition[] = [
  { key: 'cycling', label: 'Cycling', availability: 'summer' },
]

export const MAP_LAYER_REGISTRY: Record<MapLayerKey, MapLayerDefinition> =
  Object.fromEntries(
    [...WINTER_ONLY_LAYERS, ...SUMMER_ONLY_LAYERS, ...ALL_SEASON_LAYERS].map(
      (layer) => [layer.key, layer]
    )
  ) as Record<MapLayerKey, MapLayerDefinition>

/** Dining has enough pins to show clusters at the default Storybook zoom. */
export const SUMMER_STORY_LAYER: MapLayerKey = 'dining'

export function getLayersForSeason(
  season: MapSeasonMode
): MapLayerDefinition[] {
  if (season === 'winter') return [...WINTER_ONLY_LAYERS, ...ALL_SEASON_LAYERS]
  return [...SUMMER_ONLY_LAYERS, ...ALL_SEASON_LAYERS]
}
