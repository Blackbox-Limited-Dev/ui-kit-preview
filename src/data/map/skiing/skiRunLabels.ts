import type {
  Feature,
  FeatureCollection,
  LineString,
  Point,
  Position,
} from 'geojson'

import { lineLengthM, lineMidpoint } from './skiing.geometry'
import { SKI_RUN_DIFFICULTY_COLORS } from './skiing.mapStyle'
import type { SkiRunDifficulty, SkiRunFeatureProperties } from './skiing.types'

export type SkiRunLabelProps = {
  id: string
  label: string
  difficulty: SkiRunDifficulty
  color: string
}

const CLOSED_COLOR = '#9E9E9E'

const hasShortCode = (name: string): boolean =>
  name.length > 0 && name.length <= 5 && !name.includes(' ')

export const buildSkiRunLabelPoints = (
  runs: FeatureCollection<LineString, SkiRunFeatureProperties>
): FeatureCollection<Point, SkiRunLabelProps> => {
  const longest = new Map<
    string,
    { coords: Position[]; len: number; props: SkiRunFeatureProperties }
  >()
  runs.features.forEach((feature) => {
    const len = lineLengthM(feature.geometry.coordinates)
    const prev = longest.get(feature.properties.id)
    if (!prev || len > prev.len) {
      longest.set(feature.properties.id, {
        coords: feature.geometry.coordinates,
        len,
        props: feature.properties,
      })
    }
  })

  const features: Feature<Point, SkiRunLabelProps>[] = []
  longest.forEach(({ coords, props }) => {
    if (!hasShortCode(props.name)) return
    const color =
      props.status === 'open'
        ? SKI_RUN_DIFFICULTY_COLORS[props.difficulty]
        : CLOSED_COLOR
    const center = lineMidpoint(coords)
    if (!center) return
    features.push({
      type: 'Feature',
      properties: {
        id: props.id,
        label: props.name,
        difficulty: props.difficulty,
        color,
      },
      geometry: { type: 'Point', coordinates: center },
    })
  })

  return { type: 'FeatureCollection', features }
}
