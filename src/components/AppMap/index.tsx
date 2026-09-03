'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Map, { type MapMouseEvent, type MapRef } from 'react-map-gl/mapbox'
import cn from 'classnames'
import type { Feature } from 'geojson'
import type { Map as MapboxMap } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { AppIcon } from '~components/AppIcon'
import FilterMapIcon from '~icons/filter-map.svg'
import {
  BUKOVEL_CENTER,
  BUKOVEL_MAX_BOUNDS,
  MAPBOX_OUTDOORS_WINTER,
  WINTER_HIDDEN_LINE_LAYER_IDS,
  hideBasemapPoiLayers,
  buildSkiLiftVms,
  coordsBounds,
  findLiftFeature,
  findRunFeature,
  type SkiLiftStatusView,
  type SkiRunDifficulty,
  type SkiRunStatusView,
} from '~data/map/skiing'

import s from './AppMap.module.scss'
import { AppMapSkiDrawers, type MapPanelView } from './AppMapSkiDrawers'
import { AppMapSkiLayers, SKI_INTERACTIVE_LAYER_IDS } from './AppMapSkiLayers'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const MAPBOX_OUTDOORS_V12 = 'mapbox://styles/mapbox/outdoors-v12'

const ALL_DIFFICULTIES_ON: Record<SkiRunDifficulty, boolean> = {
  green: true,
  blue: true,
  red: true,
  black: true,
}

const DRAWER_FIT_PADDING = {
  top: 80,
  left: 80,
  bottom: 80,
  right: 450 + 32 + 16,
}

const DRAWER_CLOSE_MS = 500

type DrawerMode = 'content' | 'settings' | 'hidden'

const hideBasemapPistes = (map: MapboxMap) => {
  WINTER_HIDDEN_LINE_LAYER_IDS.forEach((id) => {
    if (map.getLayer(id)) map.setPaintProperty(id, 'line-opacity', 0)
  })
  hideBasemapPoiLayers(map)
}

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

const fitLine = (map: MapRef, feature: Feature) => {
  if (feature.geometry.type !== 'LineString') return
  const { ne, sw } = coordsBounds(feature.geometry.coordinates)
  map.fitBounds([sw, ne], { padding: DRAWER_FIT_PADDING, duration: 600 })
}

export const AppMap = () => {
  const mapRef = useRef<MapRef>(null)
  const lifts = useMemo(() => buildSkiLiftVms(), [])
  const [camera3d, setCamera3d] = useState(false)
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('content')
  const [view, setView] = useState<MapPanelView>({ kind: 'list' })
  const resetViewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [skiRunStatusView, setSkiRunStatusView] =
    useState<SkiRunStatusView>('live')
  const [skiLiftStatusView, setSkiLiftStatusView] =
    useState<SkiLiftStatusView>('live')
  const [runDifficultyVisibility, setRunDifficultyVisibility] =
    useState(ALL_DIFFICULTIES_ON)
  const [mapStyle, setMapStyle] = useState(MAPBOX_OUTDOORS_WINTER)

  const selectedRouteId = view.kind === 'list' ? null : view.id

  const clearResetViewTimer = useCallback(() => {
    if (resetViewTimerRef.current == null) return
    clearTimeout(resetViewTimerRef.current)
    resetViewTimerRef.current = null
  }, [])

  const resetViewToList = useCallback(() => {
    setView((current) => (current.kind === 'list' ? current : { kind: 'list' }))
  }, [])

  const showLiftsList = useCallback(() => {
    clearResetViewTimer()
    resetViewToList()
    document.body.style.removeProperty('pointer-events')
    setDrawerMode('content')
  }, [clearResetViewTimer, resetViewToList])

  const hideDrawers = useCallback(() => {
    setDrawerMode('hidden')
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

  useEffect(() => () => clearResetViewTimer(), [clearResetViewTimer])

  const selectLift = useCallback(
    (id: string) => {
      clearResetViewTimer()
      setView({ kind: 'lift', id })
      setDrawerMode('content')
      const feature = findLiftFeature(id)
      if (feature && mapRef.current) fitLine(mapRef.current, feature)
    },
    [clearResetViewTimer]
  )

  const selectRun = useCallback(
    (id: string) => {
      clearResetViewTimer()
      setView({ kind: 'run', id })
      setDrawerMode('content')
      const feature = findRunFeature(id)
      if (feature && mapRef.current) fitLine(mapRef.current, feature)
    },
    [clearResetViewTimer]
  )

  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      const feature = event.features?.[0]
      const id = feature?.properties?.id
      if (!feature || typeof id !== 'string') {
        showLiftsList()
        return
      }
      const isLift = typeof feature.properties?.type === 'string'
      if (isLift && feature.properties?.status !== 'open') return
      if (isLift) selectLift(id)
      else selectRun(id)
    },
    [selectLift, selectRun, showLiftsList]
  )

  const onLocate = useCallback(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((position) => {
      mapRef.current?.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 15,
        duration: 800,
      })
    })
  }, [])

  const toggleCamera = useCallback(() => {
    setCamera3d((prev) => {
      const next = !prev
      const map = mapRef.current?.getMap()
      if (map) setTerrain3d(map, next)
      return next
    })
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
        mapStyle={mapStyle}
        initialViewState={{
          longitude: BUKOVEL_CENTER[0],
          latitude: BUKOVEL_CENTER[1],
          zoom: 13,
        }}
        maxBounds={BUKOVEL_MAX_BOUNDS}
        interactiveLayerIds={SKI_INTERACTIVE_LAYER_IDS}
        onClick={onMapClick}
        onLoad={(event) => hideBasemapPistes(event.target)}
        onError={() => {
          if (mapStyle === MAPBOX_OUTDOORS_WINTER) {
            setMapStyle(MAPBOX_OUTDOORS_V12)
          }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <AppMapSkiLayers
          selectedRouteId={selectedRouteId}
          skiRunStatusView={skiRunStatusView}
          skiLiftStatusView={skiLiftStatusView}
          runDifficultyVisibility={runDifficultyVisibility}
        />
      </Map>

      <div className={cn(s.controls, s.controls_left)}>
        <button
          type="button"
          className={s.controlBtn}
          aria-label="Map settings"
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
          aria-label="Show lifts"
          onClick={showLiftsList}
        >
          <AppIcon name="NavArrowLeft" size={20} />
        </button>
      ) : null}

      <AppMapSkiDrawers
        lifts={lifts}
        view={view}
        contentOpen={drawerMode === 'content'}
        settingsOpen={drawerMode === 'settings'}
        onCloseContent={onCloseContent}
        onCloseSettings={onCloseSettings}
        onBack={showLiftsList}
        onSelectLift={selectLift}
        onSelectRun={selectRun}
        skiRunStatusView={skiRunStatusView}
        skiLiftStatusView={skiLiftStatusView}
        onRunStatusViewChange={setSkiRunStatusView}
        onLiftStatusViewChange={setSkiLiftStatusView}
        runDifficultyVisibility={runDifficultyVisibility}
        onToggleRunDifficulty={(difficulty) =>
          setRunDifficultyVisibility((prev) => ({
            ...prev,
            [difficulty]: !prev[difficulty],
          }))
        }
      />
    </div>
  )
}

export { AppMapSummer } from './AppMapSummer'
