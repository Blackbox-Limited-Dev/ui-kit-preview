import type { Map as MapboxMap } from 'mapbox-gl'

import type { MapPinFeature } from './mapPins.types'

const CIRCLE_FOOT_SEPARATION = 44
const CIRCLE_MIN_RADIUS = 68
const CIRCLE_MAX_MEMBERS = 9
const SPIRAL_FOOT_SEPARATION = 58
const SPIRAL_LENGTH_START = 40
const SPIRAL_LENGTH_FACTOR = 9 * 2 * Math.PI

function circleOffsets(count: number): [number, number][] {
  const circumference = CIRCLE_FOOT_SEPARATION * (2 + count)
  const radius = Math.max(circumference / (2 * Math.PI), CIRCLE_MIN_RADIUS)
  const angleStep = (2 * Math.PI) / count
  const out: [number, number][] = []
  for (let i = 0; i < count; i += 1) {
    const angle = i * angleStep
    out.push([radius * Math.cos(angle), radius * Math.sin(angle)])
  }
  return out
}

function spiralOffsets(count: number): [number, number][] {
  let angle = 0
  let legLength = SPIRAL_LENGTH_START
  const out: [number, number][] = []
  for (let i = 0; i < count; i += 1) {
    angle += SPIRAL_FOOT_SEPARATION / legLength + i * 0.0005
    out.push([legLength * Math.cos(angle), legLength * Math.sin(angle)])
    legLength += SPIRAL_LENGTH_FACTOR / angle
  }
  return out
}

export function fanOffsets(count: number): [number, number][] {
  return count > CIRCLE_MAX_MEMBERS
    ? spiralOffsets(count)
    : circleOffsets(count)
}

export type FanLeg = {
  coord: [number, number]
  feature: MapPinFeature
}

export function projectFanLegs(
  map: MapboxMap,
  center: [number, number],
  members: MapPinFeature[]
): FanLeg[] {
  const point = map.project(center)
  const offsets = fanOffsets(members.length)
  const legs: FanLeg[] = []
  for (let i = 0; i < members.length; i += 1) {
    const offset = offsets[i]
    const member = members[i]
    if (!offset || !member) continue
    const lngLat = map.unproject([point.x + offset[0], point.y + offset[1]])
    legs.push({ coord: [lngLat.lng, lngLat.lat], feature: member })
  }
  return legs
}
