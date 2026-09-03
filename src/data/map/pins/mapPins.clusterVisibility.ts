import type { MapPinFeature } from './mapPins.types'

function lngLatToPixel(
  lng: number,
  lat: number,
  zoom: number
): [number, number] {
  const scale = 256 * 2 ** zoom
  const x = ((lng + 180) / 360) * scale
  const latRad = (lat * Math.PI) / 180
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    scale
  return [x, y]
}

export type ArtworkCluster = {
  id: string
  coord: [number, number]
  members: MapPinFeature[]
}

export function clusterArtworkPins(
  pins: MapPinFeature[],
  zoom: number,
  clusterRadiusPx: number,
  clusterMaxZoom: number
): ArtworkCluster[] {
  if (pins.length === 0) return []

  const noCluster = zoom > clusterMaxZoom
  const projected = pins.map((pin) => {
    const lng = pin.geometry.coordinates[0]
    const lat = pin.geometry.coordinates[1]
    const [x, y] = lngLatToPixel(lng, lat, zoom)
    return { pin, lng, lat, x, y }
  })

  const radiusSq = clusterRadiusPx * clusterRadiusPx
  const used = new Array<boolean>(projected.length).fill(false)
  const clusters: ArtworkCluster[] = []

  for (let i = 0; i < projected.length; i += 1) {
    if (used[i]) continue
    used[i] = true
    const base = projected[i]
    if (!base) continue
    const members: MapPinFeature[] = [base.pin]
    let sumLng = base.lng
    let sumLat = base.lat

    if (!noCluster) {
      for (let j = i + 1; j < projected.length; j += 1) {
        if (used[j]) continue
        const other = projected[j]
        if (!other) continue
        const dx = base.x - other.x
        const dy = base.y - other.y
        if (dx * dx + dy * dy <= radiusSq) {
          used[j] = true
          members.push(other.pin)
          sumLng += other.lng
          sumLat += other.lat
        }
      }
    }

    const coord: [number, number] =
      members.length === 1
        ? [base.lng, base.lat]
        : [sumLng / members.length, sumLat / members.length]
    clusters.push({ id: base.pin.properties.id, coord, members })
  }

  return clusters
}

export function artworkClusterExpansionZoom(
  members: MapPinFeature[],
  clusterRadiusPx: number,
  clusterMaxZoom: number
): number | null {
  for (let z = 1; z <= clusterMaxZoom; z += 1) {
    const groups = clusterArtworkPins(
      members,
      z,
      clusterRadiusPx,
      clusterMaxZoom
    )
    if (groups.length > 1) return z
  }
  return null
}

export function pinDeclusterZoom(
  pins: MapPinFeature[],
  id: string,
  clusterRadiusPx: number,
  clusterMaxZoom: number
): number {
  for (let z = 1; z <= clusterMaxZoom; z += 1) {
    const groups = clusterArtworkPins(pins, z, clusterRadiusPx, clusterMaxZoom)
    const group = groups.find((c) =>
      c.members.some((m) => m.properties.id === id)
    )
    if (group && group.members.length === 1) return z
  }
  return clusterMaxZoom + 1
}
