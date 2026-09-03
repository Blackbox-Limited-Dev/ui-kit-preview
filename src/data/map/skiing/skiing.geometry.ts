import type { Feature, Point, Position } from 'geojson'

const EARTH_RADIUS_M = 6_371_000
const toRad = (deg: number) => (deg * Math.PI) / 180
const toDeg = (rad: number) => (rad * 180) / Math.PI

export type CoordBounds = {
  ne: [number, number]
  sw: [number, number]
}

export const coordsBounds = (coords: Position[]): CoordBounds => {
  let minLng = Infinity
  let minLat = Infinity
  let maxLng = -Infinity
  let maxLat = -Infinity

  coords.forEach((coord) => {
    const lng = coord[0]!
    const lat = coord[1]!
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  })

  return { ne: [maxLng, maxLat], sw: [minLng, minLat] }
}

const haversineM = (a: Position, b: Position): number => {
  const dLat = toRad(b[1]! - a[1]!)
  const dLng = toRad(b[0]! - a[0]!)
  const lat1 = toRad(a[1]!)
  const lat2 = toRad(b[1]!)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)))
}

export const lineLengthM = (coords: Position[]): number => {
  let total = 0
  for (let i = 0; i < coords.length - 1; i += 1) {
    total += haversineM(coords[i]!, coords[i + 1]!)
  }
  return total
}

export const lineMidpoint = (coords: Position[]): Position | null => {
  if (coords.length === 0) return null
  if (coords.length === 1) return coords[0]!
  const segLen: number[] = []
  let total = 0
  for (let i = 0; i < coords.length - 1; i += 1) {
    const len = haversineM(coords[i]!, coords[i + 1]!)
    segLen.push(len)
    total += len
  }
  if (total === 0) return coords[0]!

  const target = total / 2
  let acc = 0
  let seg = 0
  while (seg < segLen.length - 1 && acc + segLen[seg]! < target) {
    acc += segLen[seg]!
    seg += 1
  }
  const a = coords[seg]!
  const b = coords[seg + 1]!
  const f = segLen[seg]! > 0 ? (target - acc) / segLen[seg]! : 0
  return [a[0]! + (b[0]! - a[0]!) * f, a[1]! + (b[1]! - a[1]!) * f]
}

const bearingDeg = (a: Position, b: Position): number => {
  const lat1 = toRad(a[1]!)
  const lat2 = toRad(b[1]!)
  const dLng = toRad(b[0]! - a[0]!)
  const y = Math.sin(dLng) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

export type ArrowPointProps = { bearing: number }

export type LineMeasure = {
  coords: Position[]
  segStart: number[]
  segLen: number[]
  bearing: number[]
  total: number
}

export const measureLine = (coords: Position[]): LineMeasure => {
  const segStart: number[] = []
  const segLen: number[] = []
  const bearing: number[] = []
  let total = 0
  for (let i = 0; i < coords.length - 1; i += 1) {
    segStart.push(total)
    const len = haversineM(coords[i]!, coords[i + 1]!)
    segLen.push(len)
    bearing.push(bearingDeg(coords[i]!, coords[i + 1]!))
    total += len
  }
  return { coords, segStart, segLen, bearing, total }
}

export const arrowPointsFromMeasure = (
  measure: LineMeasure,
  phaseM: number,
  spacingM: number
): Feature<Point, ArrowPointProps>[] => {
  const { coords, segStart, segLen, bearing, total } = measure
  const features: Feature<Point, ArrowPointProps>[] = []
  if (coords.length < 2 || spacingM <= 0) return features

  let seg = 0
  let target = ((phaseM % spacingM) + spacingM) % spacingM
  while (target < total) {
    while (seg < segLen.length - 1 && target > segStart[seg]! + segLen[seg]!) {
      seg += 1
    }
    const a = coords[seg]!
    const b = coords[seg + 1]!
    const len = segLen[seg]!
    const f = len > 0 ? (target - segStart[seg]!) / len : 0
    features.push({
      type: 'Feature',
      properties: { bearing: bearing[seg]! },
      geometry: {
        type: 'Point',
        coordinates: [a[0]! + (b[0]! - a[0]!) * f, a[1]! + (b[1]! - a[1]!) * f],
      },
    })
    target += spacingM
  }

  return features
}
