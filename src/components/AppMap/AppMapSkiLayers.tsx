'use client'

import React, { memo, useEffect, useMemo, useState } from 'react'
import { Layer, Source } from 'react-map-gl/mapbox'
import type { FeatureCollection, LineString, Position } from 'geojson'
import type { ExpressionSpecification, FilterSpecification } from 'mapbox-gl'

import {
  MAP_ROUTE_ARROW_COLOR,
  MAP_ROUTE_ARROW_HALO_COLOR,
  MAP_ROUTE_ARROW_LAYER_ID,
  MAP_ROUTE_ARROW_SOURCE_ID,
  MAP_ROUTE_DIM_OPACITY,
  SKI_LIFT_LABEL_FONT,
  SKI_LIFT_LABEL_HALO_BLUR,
  SKI_LIFT_LABEL_HALO_COLOR,
  SKI_LIFT_LABEL_HALO_WIDTH,
  SKI_LIFT_LABEL_MIN_ZOOM,
  SKI_LIFT_LABEL_TEXT_COLOR,
  SKI_LIFTS_LABEL_LAYER_ID,
  SKI_LIFTS_LAYER_ID,
  SKI_LIFTS_SOURCE_ID,
  SKI_LINE_CAP,
  SKI_LINE_JOIN,
  SKI_ROUTE_ACTIVE_LAYER_ID,
  SKI_ROUTE_ACTIVE_LIFT_LAYER_ID,
  SKI_ROUTE_ACTIVE_SOURCE_ID,
  SKI_RUN_DIFFICULTY_COLORS,
  SKI_RUN_LABEL_MIN_ZOOM,
  SKI_RUN_LABELS_CIRCLE_LAYER_ID,
  SKI_RUN_LABELS_SOURCE_ID,
  SKI_RUN_LABELS_TEXT_LAYER_ID,
  SKI_RUNS_LAYER_ID,
  SKI_RUNS_SOURCE_ID,
  arrowPointsFromMeasure,
  buildMapboxLiftLineColorExpression,
  buildMapboxLiftLineDashExpression,
  buildMapboxLiftLineOpacityExpression,
  buildMapboxLiftLineWidthExpression,
  buildMapboxSkiRunLineColorExpression,
  buildMapboxSkiRunLineDashExpression,
  buildMapboxSkiRunLineOpacityExpression,
  buildMapboxSkiRunLineWidthExpression,
  buildSkiRunLabelPoints,
  measureLine,
  skiLiftsCollection,
  skiRunsCollection,
  type SkiLiftStatusView,
  type SkiRunDifficulty,
  type SkiRunStatusView,
} from '~data/map/skiing'

const EMPTY_FC: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [],
}

const asExpr = (value: unknown) => value as ExpressionSpecification

const ARROW_SPACING_M = 480
const ARROW_STEP_M = 6
const ARROW_TICK_MS = 66

const ARROW_LAYOUT = {
  'text-field': '▲',
  'text-font': [...SKI_LIFT_LABEL_FONT],
  'text-size': 13,
  'text-rotate': ['get', 'bearing'] as ExpressionSpecification,
  'text-rotation-alignment': 'map' as const,
  'text-pitch-alignment': 'map' as const,
  'text-keep-upright': false,
  'text-allow-overlap': true,
  'text-ignore-placement': true,
}

type AppMapRouteDirectionLayerProps = {
  lines: Position[][]
  color?: string
}

const AppMapRouteDirectionLayerView = ({
  lines,
  color,
}: AppMapRouteDirectionLayerProps) => {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + ARROW_STEP_M) % ARROW_SPACING_M)
    }, ARROW_TICK_MS)
    return () => clearInterval(interval)
  }, [])

  const measures = useMemo(() => lines.map(measureLine), [lines])

  const shape = useMemo<FeatureCollection>(
    () => ({
      type: 'FeatureCollection',
      features: measures.flatMap((measure) =>
        arrowPointsFromMeasure(measure, phase, ARROW_SPACING_M)
      ),
    }),
    [measures, phase]
  )

  const paint = useMemo(
    () => ({
      'text-color': MAP_ROUTE_ARROW_COLOR,
      'text-halo-color': color ?? MAP_ROUTE_ARROW_HALO_COLOR,
      'text-halo-width': 1.5,
    }),
    [color]
  )

  return (
    <Source id={MAP_ROUTE_ARROW_SOURCE_ID} type="geojson" data={shape}>
      <Layer
        id={MAP_ROUTE_ARROW_LAYER_ID}
        type="symbol"
        layout={ARROW_LAYOUT}
        paint={paint}
      />
    </Source>
  )
}

const AppMapRouteDirectionLayer = memo(AppMapRouteDirectionLayerView)

export const SKI_INTERACTIVE_LAYER_IDS = [
  SKI_RUNS_LAYER_ID,
  SKI_LIFTS_LAYER_ID,
  SKI_RUN_LABELS_CIRCLE_LAYER_ID,
  SKI_RUN_LABELS_TEXT_LAYER_ID,
  SKI_ROUTE_ACTIVE_LAYER_ID,
  SKI_ROUTE_ACTIVE_LIFT_LAYER_ID,
]

type AppMapSkiLayersProps = {
  selectedRouteId?: string | null
  skiRunStatusView: SkiRunStatusView
  skiLiftStatusView: SkiLiftStatusView
  runDifficultyVisibility: Record<SkiRunDifficulty, boolean>
}

export const AppMapSkiLayers = ({
  selectedRouteId,
  skiRunStatusView,
  skiLiftStatusView,
  runDifficultyVisibility,
}: AppMapSkiLayersProps) => {
  const visibleDifficulties = (
    Object.keys(runDifficultyVisibility) as SkiRunDifficulty[]
  ).filter((difficulty) => runDifficultyVisibility[difficulty])

  const runDifficultyFilter: FilterSpecification =
    visibleDifficulties.length === 0
      ? ['==', ['get', 'difficulty'], '__none__']
      : ([
          'in',
          ['get', 'difficulty'],
          ['literal', visibleDifficulties],
        ] as FilterSpecification)

  const runDash = buildMapboxSkiRunLineDashExpression(skiRunStatusView)
  const runLabelPoints = useMemo(
    () => buildSkiRunLabelPoints(skiRunsCollection),
    []
  )

  const activeShape = useMemo<FeatureCollection<LineString>>(() => {
    if (selectedRouteId == null) return EMPTY_FC
    const features = [
      ...skiRunsCollection.features,
      ...skiLiftsCollection.features,
    ].filter((f) => f.properties.id === selectedRouteId)
    return { type: 'FeatureCollection', features }
  }, [selectedRouteId])

  const activeLines = useMemo(
    () => activeShape.features.map((f) => f.geometry.coordinates),
    [activeShape]
  )

  const activeArrowColor = useMemo(() => {
    if (selectedRouteId == null) return undefined
    const run = skiRunsCollection.features.find(
      (f) => f.properties.id === selectedRouteId
    )
    return run
      ? SKI_RUN_DIFFICULTY_COLORS[run.properties.difficulty]
      : undefined
  }, [selectedRouteId])

  const labelOpacity = selectedRouteId
    ? ([
        'case',
        ['==', ['get', 'id'], selectedRouteId],
        1,
        MAP_ROUTE_DIM_OPACITY,
      ] as ExpressionSpecification)
    : 1

  return (
    <>
      <Source id={SKI_RUNS_SOURCE_ID} type="geojson" data={skiRunsCollection}>
        <Layer
          id={SKI_RUNS_LAYER_ID}
          type="line"
          filter={runDifficultyFilter}
          layout={{
            'line-cap': SKI_LINE_CAP,
            'line-join': SKI_LINE_JOIN,
          }}
          paint={{
            'line-color': asExpr(
              buildMapboxSkiRunLineColorExpression(skiRunStatusView)
            ),
            'line-opacity': asExpr(
              buildMapboxSkiRunLineOpacityExpression(
                skiRunStatusView,
                selectedRouteId
              )
            ),
            'line-width': asExpr(
              buildMapboxSkiRunLineWidthExpression(skiRunStatusView)
            ),
            ...(runDash ? { 'line-dasharray': asExpr(runDash) } : {}),
          }}
        />
      </Source>
      <Source id={SKI_LIFTS_SOURCE_ID} type="geojson" data={skiLiftsCollection}>
        <Layer
          id={SKI_LIFTS_LAYER_ID}
          type="line"
          layout={{
            'line-cap': SKI_LINE_CAP,
            'line-join': SKI_LINE_JOIN,
          }}
          paint={{
            'line-color': asExpr(
              buildMapboxLiftLineColorExpression(skiLiftStatusView)
            ),
            'line-opacity': asExpr(
              buildMapboxLiftLineOpacityExpression(
                skiLiftStatusView,
                selectedRouteId
              )
            ),
            'line-width': asExpr(
              buildMapboxLiftLineWidthExpression(skiLiftStatusView)
            ),
            'line-dasharray': asExpr(buildMapboxLiftLineDashExpression()),
          }}
        />
        <Layer
          id={SKI_LIFTS_LABEL_LAYER_ID}
          type="symbol"
          minzoom={SKI_LIFT_LABEL_MIN_ZOOM}
          filter={['!=', ['get', 'label'], ''] as FilterSpecification}
          layout={{
            'symbol-placement': 'line',
            'text-field': ['get', 'label'],
            'text-font': [...SKI_LIFT_LABEL_FONT],
            'text-size': ['interpolate', ['linear'], ['zoom'], 12, 12, 16, 14],
          }}
          paint={{
            'text-color': SKI_LIFT_LABEL_TEXT_COLOR,
            'text-halo-color': SKI_LIFT_LABEL_HALO_COLOR,
            'text-halo-width': SKI_LIFT_LABEL_HALO_WIDTH,
            'text-halo-blur': SKI_LIFT_LABEL_HALO_BLUR,
            'text-opacity': asExpr(
              buildMapboxLiftLineOpacityExpression(
                skiLiftStatusView,
                selectedRouteId
              )
            ),
          }}
        />
      </Source>
      <Source id={SKI_ROUTE_ACTIVE_SOURCE_ID} type="geojson" data={activeShape}>
        <Layer
          id={SKI_ROUTE_ACTIVE_LAYER_ID}
          type="line"
          filter={['has', 'difficulty'] as FilterSpecification}
          layout={{
            'line-cap': SKI_LINE_CAP,
            'line-join': SKI_LINE_JOIN,
          }}
          paint={{
            'line-color': asExpr(
              buildMapboxSkiRunLineColorExpression(skiRunStatusView)
            ),
            'line-width': asExpr(
              buildMapboxSkiRunLineWidthExpression(skiRunStatusView)
            ),
            'line-opacity': 1,
            ...(runDash ? { 'line-dasharray': asExpr(runDash) } : {}),
          }}
        />
        <Layer
          id={SKI_ROUTE_ACTIVE_LIFT_LAYER_ID}
          type="line"
          filter={['!', ['has', 'difficulty']] as FilterSpecification}
          layout={{
            'line-cap': SKI_LINE_CAP,
            'line-join': SKI_LINE_JOIN,
          }}
          paint={{
            'line-color': asExpr(
              buildMapboxLiftLineColorExpression(skiLiftStatusView)
            ),
            'line-width': asExpr(
              buildMapboxLiftLineWidthExpression(skiLiftStatusView)
            ),
            'line-dasharray': asExpr(buildMapboxLiftLineDashExpression()),
            'line-opacity': 1,
          }}
        />
      </Source>
      <Source
        id={SKI_RUN_LABELS_SOURCE_ID}
        type="geojson"
        data={runLabelPoints}
      >
        <Layer
          id={SKI_RUN_LABELS_CIRCLE_LAYER_ID}
          type="circle"
          minzoom={SKI_RUN_LABEL_MIN_ZOOM}
          filter={runDifficultyFilter}
          paint={{
            'circle-color': ['get', 'color'],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              13,
              11,
              16,
              15,
            ],
            'circle-opacity': labelOpacity,
            'circle-stroke-color': 'rgba(255, 255, 255, 0.7)',
            'circle-stroke-width': 2,
            'circle-stroke-opacity': labelOpacity,
            'circle-pitch-alignment': 'viewport',
          }}
        />
        <Layer
          id={SKI_RUN_LABELS_TEXT_LAYER_ID}
          type="symbol"
          minzoom={SKI_RUN_LABEL_MIN_ZOOM}
          filter={runDifficultyFilter}
          layout={{
            'text-field': ['get', 'label'],
            'text-font': [...SKI_LIFT_LABEL_FONT],
            'text-size': ['interpolate', ['linear'], ['zoom'], 13, 10, 16, 13],
            'text-anchor': 'center',
            'text-justify': 'center',
            'text-offset': [0, 0.1],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
            'text-pitch-alignment': 'viewport',
          }}
          paint={{
            'text-color': '#FFFFFF',
            'text-opacity': labelOpacity,
          }}
        />
      </Source>
      {activeLines.length > 0 ? (
        <AppMapRouteDirectionLayer
          lines={activeLines}
          color={activeArrowColor}
        />
      ) : null}
    </>
  )
}
