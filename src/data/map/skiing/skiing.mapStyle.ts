import type { Map as MapboxMap } from 'mapbox-gl'

import type {
  SkiLiftStatus,
  SkiRunDifficulty,
  SkiRunStatus,
} from './skiing.types'

export const MAPBOX_SKI_RUN_LAYER_ID = 'ski-run'

export const SKI_LIFTS_SOURCE_ID = 'bukovel-ski-lifts'
export const SKI_LIFTS_LAYER_ID = 'bukovel-ski-lifts-line'
export const SKI_LIFTS_LABEL_LAYER_ID = 'bukovel-ski-lifts-labels'

export const SKI_RUNS_SOURCE_ID = 'bukovel-ski-runs'
export const SKI_RUNS_LAYER_ID = 'bukovel-ski-runs-line'

export const SKI_RUN_LABELS_SOURCE_ID = 'bukovel-ski-run-labels'
export const SKI_RUN_LABELS_CIRCLE_LAYER_ID = 'bukovel-ski-run-labels-circle'
export const SKI_RUN_LABELS_TEXT_LAYER_ID = 'bukovel-ski-run-labels-text'
export const SKI_RUN_LABEL_MIN_ZOOM = 13

export const SKI_ROUTE_ACTIVE_SOURCE_ID = 'bukovel-ski-route-active'
export const SKI_ROUTE_ACTIVE_LAYER_ID = 'bukovel-ski-route-active-line'
export const SKI_ROUTE_ACTIVE_LIFT_LAYER_ID =
  'bukovel-ski-route-active-lift-line'

export const MAP_ROUTE_ARROW_SOURCE_ID = 'bukovel-route-arrows'
export const MAP_ROUTE_ARROW_LAYER_ID = 'bukovel-route-arrows-symbol'
export const MAP_ROUTE_ARROW_COLOR = '#FFFFFF'
export const MAP_ROUTE_ARROW_HALO_COLOR = '#008C95'

export const SKI_LIFT_LABEL_TEXT_COLOR = '#2E2E2E'
export const SKI_LIFT_LABEL_HALO_COLOR = '#FFFFFF'
export const SKI_LIFT_LABEL_HALO_WIDTH = 1
export const SKI_LIFT_LABEL_HALO_BLUR = 0.5
export const SKI_LIFT_LABEL_MIN_ZOOM = 12
export const SKI_LIFT_LABEL_FONT = [
  'Roboto Bold',
  'Arial Unicode MS Regular',
] as const

export const SKI_RUN_DIFFICULTY_COLORS: Record<SkiRunDifficulty, string> = {
  green: '#3E9A36',
  blue: '#2F6BFF',
  red: '#E53935',
  black: '#1A1A1A',
}

export const SKI_RUN_DISABLED_COLORS: Record<SkiRunDifficulty, string> = {
  green: '#A6D6A0',
  blue: '#B0C5F4',
  red: '#F0A1A2',
  black: '#999999',
}

export type SkiRunStatusStyle = {
  opacity: number
  widthFactor: number
  colorOverride?: string
  dashArray?: number[]
}

export const SKI_RUN_STATUS_STYLES: Record<SkiRunStatus, SkiRunStatusStyle> = {
  open: { opacity: 1, widthFactor: 1 },
  limited: { opacity: 0.85, widthFactor: 1, dashArray: [1.5, 1.5] },
  hold: {
    opacity: 0.45,
    widthFactor: 0.9,
    colorOverride: '#F5A623',
    dashArray: [2, 2],
  },
  closed: {
    opacity: 0.22,
    widthFactor: 0.75,
    colorOverride: '#9E9E9E',
  },
}

export type SkiLiftStatusStyle = {
  opacity: number
  width: number
  color: string
}

export const SKI_LIFT_DASH_ARRAY = [2, 2]

export const SKI_LIFT_STATUS_STYLES: Record<SkiLiftStatus, SkiLiftStatusStyle> =
  {
    open: { opacity: 1, width: 5, color: '#008C95' },
    hold: { opacity: 0.55, width: 3, color: '#F5A623' },
    maintenance: { opacity: 0.4, width: 2.5, color: '#9E9E9E' },
    closed: { opacity: 0.2, width: 2, color: '#9E9E9E' },
  }

export const SKI_LINE_CAP = 'round' as const
export const SKI_LINE_JOIN = 'round' as const

export const MAP_ROUTE_DIM_OPACITY = 0.15

export const SKI_RUN_BASE_WIDTH: Record<SkiRunDifficulty, number> = {
  green: 3,
  blue: 4,
  red: 4.5,
  black: 5,
}

export const SKI_QUEUE_WARN_MIN = 10
export const SKI_QUEUE_ERROR_MIN = 30

export type SkiQueueLevel = 'normal' | 'warning' | 'error'

export const skiQueueLevel = (minutes: number): SkiQueueLevel => {
  if (minutes > SKI_QUEUE_ERROR_MIN) return 'error'
  if (minutes > SKI_QUEUE_WARN_MIN) return 'warning'
  return 'normal'
}

export const MAPBOX_OUTDOORS_WINTER =
  'mapbox://styles/mapbox-map-design/cmh0wje0n00bx01smbs4p3iz8'

export const BUKOVEL_CENTER: [number, number] = [24.4076, 48.3585]

export const BUKOVEL_MAX_BOUNDS: [[number, number], [number, number]] = [
  [24.36, 48.32],
  [24.46, 48.4],
]

export const WINTER_HIDDEN_LINE_LAYER_IDS = [
  'ski-run',
  'piste',
  'road-piste',
  'aerialway',
  'road-aerialway',
]

export const hideBasemapPoiLayers = (map: MapboxMap) => {
  map.getStyle()?.layers?.forEach((layer) => {
    const id = layer.id.toLowerCase()
    const sourceLayer =
      'source-layer' in layer && typeof layer['source-layer'] === 'string'
        ? layer['source-layer'].toLowerCase()
        : ''
    if (!id.includes('poi') && !sourceLayer.includes('poi')) return
    map.setLayoutProperty(layer.id, 'visibility', 'none')
  })
}
