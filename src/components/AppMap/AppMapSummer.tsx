'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Map, { type MapRef } from 'react-map-gl/mapbox'
import cn from 'classnames'
import type { Map as MapboxMap } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { AppIcon } from '~components/AppIcon'
import FilterMapIcon from '~icons/filter-map.svg'
import {
  getLayersForSeason,
  SUMMER_STORY_LAYER,
  type MapLayerKey,
} from '~data/map/layers'
import {
  artworkClusterExpansionZoom,
  clusterArtworkPins,
  getMapPinLayerConfig,
  MAP_PIN_CLUSTER_MAX_ZOOM,
  MAP_PIN_CLUSTER_RADIUS,
  pinDeclusterZoom,
  projectFanLegs,
  useMapPinsGeoJson,
  type ArtworkCluster,
  type MapPinFeature,
} from '~data/map/pins'
import {
  BUKOVEL_CENTER,
  BUKOVEL_MAX_BOUNDS,
  hideBasemapPoiLayers,
} from '~data/map/skiing'

import s from './AppMap.module.scss'
import { AppMapPinDrawers, type SummerPanelView } from './AppMapPinDrawers'
import { AppMapPinMarkers, type SpiderfyFan } from './AppMapPinMarkers'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const MAPBOX_OUTDOORS_V12 = 'mapbox://styles/mapbox/outdoors-v12'

const DRAWER_FIT_PADDING = {
  top: 80,
  left: 80,
  bottom: 80,
  right: 450 + 32 + 16,
}

const DECLUSTER_ZOOM_BUFFER = 1
const CLUSTER_THROTTLE_MS = 120
const DRAWER_CLOSE_MS = 500
const SAME_CENTER_EPS = 1e-5

type DrawerMode = 'content' | 'settings' | 'hidden'

type MapZoomEvent = { viewState: { zoom: number }; target: MapboxMap }

const setTerrain3d = (map: MapboxMap, enabled: boolean) => {
  if (enabled) {
    if (!map.getSource('mapbox-dem')) {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 514,
        maxzoom: 14,
      })
    }
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
    map.easeTo({ pitch: 45, duration: 400 })
    return
  }
  map.setTerrain(null)
  map.easeTo({ pitch: 0, duration: 400 })
}

const cameraNear = (
  map: MapRef,
  coord: [number, number],
  zoom: number
): boolean => {
  const center = map.getCenter()
  return (
    Math.abs(map.getZoom() - zoom) < 0.05 &&
    Math.abs(center.lng - coord[0]) < SAME_CENTER_EPS &&
    Math.abs(center.lat - coord[1]) < SAME_CENTER_EPS
  )
}

export const AppMapSummer = () => {
  const mapRef = useRef<MapRef>(null)
  const layers = useMemo(() => getLayersForSeason('summer'), [])
  const [layerKey, setLayerKey] = useState<MapLayerKey>(SUMMER_STORY_LAYER)
  const pins = useMapPinsGeoJson(layerKey)
  const { iconSize } = getMapPinLayerConfig(layerKey)
  const [zoom, setZoom] = useState(13)
  const pendingZoomRef = useRef(13)
  const lastZoomCommitRef = useRef(0)
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [camera3d, setCamera3d] = useState(false)
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('content')
  const [view, setView] = useState<SummerPanelView>({ kind: 'list' })
  const [fan, setFan] = useState<SpiderfyFan | null>(null)
  const pendingSpiderPinIdRef = useRef<string | null>(null)
  const resetViewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const commitZoom = useCallback((next: number) => {
    lastZoomCommitRef.current = Date.now()
    setZoom((prev) => (Math.abs(prev - next) < 1e-6 ? prev : next))
  }, [])

  const pruneFan = useCallback((native: MapboxMap, nextZoom: number) => {
    setFan((current) => {
      if (!current) return current
      if (nextZoom < current.openedAtZoom - 1e-3) return null
      const bounds = native.getBounds()
      if (!bounds || !bounds.contains(current.center)) return null
      return current
    })
  }, [])

  const applyPendingSpider = useCallback(
    (native: MapboxMap) => {
      const pinId = pendingSpiderPinIdRef.current
      if (!pinId) return
      pendingSpiderPinIdRef.current = null
      const groups = clusterArtworkPins(
        pins,
        native.getZoom(),
        MAP_PIN_CLUSTER_RADIUS,
        MAP_PIN_CLUSTER_MAX_ZOOM
      )
      const cluster = groups.find((item) =>
        item.members.some((member) => member.properties.id === pinId)
      )
      if (!cluster || cluster.members.length < 2) return
      setFan({
        id: cluster.id,
        center: cluster.coord,
        legs: projectFanLegs(native, cluster.coord, cluster.members),
        openedAtZoom: native.getZoom(),
      })
    },
    [pins]
  )

  const onMove = useCallback(
    (event: MapZoomEvent) => {
      const next = event.viewState.zoom
      pendingZoomRef.current = next
      pruneFan(event.target, next)
      const wait =
        CLUSTER_THROTTLE_MS - (Date.now() - lastZoomCommitRef.current)
      if (wait <= 0) {
        commitZoom(next)
        return
      }
      if (zoomTimerRef.current != null) return
      zoomTimerRef.current = setTimeout(() => {
        zoomTimerRef.current = null
        commitZoom(pendingZoomRef.current)
      }, wait)
    },
    [commitZoom, pruneFan]
  )

  const onMoveEnd = useCallback(
    (event: MapZoomEvent) => {
      if (zoomTimerRef.current != null) {
        clearTimeout(zoomTimerRef.current)
        zoomTimerRef.current = null
      }
      commitZoom(event.viewState.zoom)
      pruneFan(event.target, event.viewState.zoom)
      applyPendingSpider(event.target)
    },
    [applyPendingSpider, commitZoom, pruneFan]
  )

  const clearResetViewTimer = useCallback(() => {
    if (resetViewTimerRef.current == null) return
    clearTimeout(resetViewTimerRef.current)
    resetViewTimerRef.current = null
  }, [])

  const resetViewToList = useCallback(() => {
    setView((current) => (current.kind === 'list' ? current : { kind: 'list' }))
  }, [])

  useEffect(
    () => () => {
      if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current)
      clearResetViewTimer()
    },
    [clearResetViewTimer]
  )

  const selectedId = view.kind === 'pin' ? view.id : null
  const clusters = useMemo(
    () =>
      clusterArtworkPins(
        pins,
        zoom,
        MAP_PIN_CLUSTER_RADIUS,
        MAP_PIN_CLUSTER_MAX_ZOOM
      ),
    [pins, zoom]
  )

  const cameraPadding = drawerMode === 'hidden' ? undefined : DRAWER_FIT_PADDING

  const flyToPin = useCallback(
    (coord: [number, number], nextZoom?: number) => {
      const map = mapRef.current
      if (!map) return
      map.flyTo({
        center: coord,
        zoom: nextZoom ?? Math.max(map.getZoom(), 16),
        padding: cameraPadding,
        duration: 600,
      })
    },
    [cameraPadding]
  )

  const showList = useCallback(() => {
    clearResetViewTimer()
    resetViewToList()
    pendingSpiderPinIdRef.current = null
    setFan(null)
    document.body.style.removeProperty('pointer-events')
    setDrawerMode('content')
  }, [clearResetViewTimer, resetViewToList])

  const hideDrawers = useCallback(() => {
    setDrawerMode('hidden')
    pendingSpiderPinIdRef.current = null
    setFan(null)
    clearResetViewTimer()
    resetViewTimerRef.current = setTimeout(() => {
      resetViewToList()
      resetViewTimerRef.current = null
    }, DRAWER_CLOSE_MS)
  }, [clearResetViewTimer, resetViewToList])

  const onCloseContent = useCallback(() => {
    if (drawerMode !== 'content') return
    hideDrawers()
  }, [drawerMode, hideDrawers])

  const onCloseSettings = useCallback(() => {
    if (drawerMode !== 'settings') return
    hideDrawers()
  }, [drawerMode, hideDrawers])

  const selectPin = useCallback(
    (feature: MapPinFeature) => {
      clearResetViewTimer()
      pendingSpiderPinIdRef.current = null
      const coord: [number, number] = [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ]
      setView({ kind: 'pin', id: feature.properties.id })
      setDrawerMode('content')
      flyToPin(coord)
    },
    [clearResetViewTimer, flyToPin]
  )

  const selectPinFromList = useCallback(
    (id: string) => {
      const feature = pins.find((pin) => pin.properties.id === id)
      if (!feature) return
      clearResetViewTimer()
      pendingSpiderPinIdRef.current = null
      setFan(null)
      setView({ kind: 'pin', id })
      setDrawerMode('content')

      const coord: [number, number] = [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ]
      const cluster = clusters.find((item) =>
        item.members.some((member) => member.properties.id === id)
      )
      const map = mapRef.current

      if (cluster && cluster.members.length > 1 && map) {
        const soloZoom = pinDeclusterZoom(
          pins,
          id,
          MAP_PIN_CLUSTER_RADIUS,
          MAP_PIN_CLUSTER_MAX_ZOOM
        )
        const targetZoom =
          soloZoom <= MAP_PIN_CLUSTER_MAX_ZOOM
            ? soloZoom + DECLUSTER_ZOOM_BUFFER
            : Math.max(map.getZoom(), MAP_PIN_CLUSTER_MAX_ZOOM)
        if (soloZoom > MAP_PIN_CLUSTER_MAX_ZOOM) {
          pendingSpiderPinIdRef.current = id
        }
        flyToPin(cluster.coord, targetZoom)
        if (cameraNear(map, cluster.coord, targetZoom)) {
          applyPendingSpider(map.getMap())
        }
        return
      }

      flyToPin(coord)
    },
    [applyPendingSpider, clearResetViewTimer, clusters, flyToPin, pins]
  )

  const onClusterClick = useCallback(
    (cluster: ArtworkCluster) => {
      const expansion = artworkClusterExpansionZoom(
        cluster.members,
        MAP_PIN_CLUSTER_RADIUS,
        MAP_PIN_CLUSTER_MAX_ZOOM
      )
      const map = mapRef.current
      if (expansion != null && map) {
        pendingSpiderPinIdRef.current = null
        setFan(null)
        map.flyTo({
          center: cluster.coord,
          zoom: expansion + DECLUSTER_ZOOM_BUFFER,
          padding: cameraPadding,
          duration: 600,
        })
        return
      }
      const native = map?.getMap()
      if (!native) return
      setFan({
        id: cluster.id,
        center: cluster.coord,
        legs: projectFanLegs(native, cluster.coord, cluster.members),
        openedAtZoom: native.getZoom(),
      })
    },
    [cameraPadding]
  )

  const onLocate = useCallback(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((position) => {
      mapRef.current?.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 15,
        padding: cameraPadding,
        duration: 800,
      })
    })
  }, [cameraPadding])

  const toggleCamera = useCallback(() => {
    setCamera3d((prev) => {
      const next = !prev
      const map = mapRef.current?.getMap()
      if (map) setTerrain3d(map, next)
      return next
    })
  }, [])

  const onSelectLayer = useCallback((key: MapLayerKey) => {
    setLayerKey(key)
    setView({ kind: 'list' })
    pendingSpiderPinIdRef.current = null
    setFan(null)
    setDrawerMode('content')
  }, [])

  if (!MAPBOX_TOKEN) {
    return (
      <div className={s.map}>
        <div className={s.missingToken}>
          <p>
            Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local, then restart Storybook.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={s.map}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_OUTDOORS_V12}
        initialViewState={{
          longitude: BUKOVEL_CENTER[0],
          latitude: BUKOVEL_CENTER[1],
          zoom: 13,
        }}
        maxBounds={BUKOVEL_MAX_BOUNDS}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        onLoad={(event) => hideBasemapPoiLayers(event.target)}
        onClick={() => showList()}
        style={{ width: '100%', height: '100%' }}
      >
        <AppMapPinMarkers
          clusters={clusters}
          layerKey={layerKey}
          iconSize={iconSize}
          selectedId={selectedId}
          fan={fan}
          onPinClick={selectPin}
          onClusterClick={onClusterClick}
        />
      </Map>

      <div className={cn(s.controls, s.controls_left)}>
        <button
          type="button"
          className={s.controlBtn}
          aria-label="Map layers"
          onClick={() => {
            clearResetViewTimer()
            setDrawerMode('settings')
          }}
        >
          <AppIcon icon={FilterMapIcon} size={24} />
        </button>
        <button
          type="button"
          className={s.controlBtn}
          aria-label={camera3d ? 'Switch to 2D' : 'Switch to 3D'}
          onClick={toggleCamera}
        >
          <span className={s.modeLabel}>{camera3d ? '2D' : '3D'}</span>
        </button>
        <button
          type="button"
          className={s.controlBtn}
          aria-label="My location"
          onClick={onLocate}
        >
          <span className={s.locateDot}>
            <span className={s.locateInner} />
          </span>
        </button>
      </div>

      {drawerMode === 'hidden' ? (
        <button
          type="button"
          className={s.drawerTab}
          aria-label="Show places"
          onClick={showList}
        >
          <AppIcon name="NavArrowLeft" size={20} />
        </button>
      ) : null}

      <AppMapPinDrawers
        layers={layers}
        layerKey={layerKey}
        pins={pins}
        view={view}
        contentOpen={drawerMode === 'content'}
        settingsOpen={drawerMode === 'settings'}
        onCloseContent={onCloseContent}
        onCloseSettings={onCloseSettings}
        onBack={showList}
        onSelectPin={selectPinFromList}
        onSelectLayer={onSelectLayer}
      />
    </div>
  )
}
