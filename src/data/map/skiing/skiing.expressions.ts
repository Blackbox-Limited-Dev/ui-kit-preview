import {
  MAP_ROUTE_DIM_OPACITY,
  SKI_LIFT_DASH_ARRAY,
  SKI_LIFT_STATUS_STYLES,
  SKI_RUN_BASE_WIDTH,
  SKI_RUN_DIFFICULTY_COLORS,
  SKI_RUN_STATUS_STYLES,
} from './skiing.mapStyle'
import type { SkiLiftStatus, SkiRunStatus } from './skiing.types'
import type { SkiLiftStatusView, SkiRunStatusView } from './skiing.views'

export type SkiStyleExpression = string | number | SkiStyleExpression[]

export const runDifficultyColorExpression = (): SkiStyleExpression => [
  'match',
  ['get', 'difficulty'],
  'green',
  SKI_RUN_DIFFICULTY_COLORS.green,
  'blue',
  SKI_RUN_DIFFICULTY_COLORS.blue,
  'red',
  SKI_RUN_DIFFICULTY_COLORS.red,
  'black',
  SKI_RUN_DIFFICULTY_COLORS.black,
  SKI_RUN_DIFFICULTY_COLORS.blue,
]

const runDifficultyWidthExpression = (): SkiStyleExpression => [
  'match',
  ['get', 'difficulty'],
  'green',
  SKI_RUN_BASE_WIDTH.green,
  'blue',
  SKI_RUN_BASE_WIDTH.blue,
  'red',
  SKI_RUN_BASE_WIDTH.red,
  'black',
  SKI_RUN_BASE_WIDTH.black,
  SKI_RUN_BASE_WIDTH.blue,
]

const resolveRunStatusExpression = (): SkiStyleExpression => [
  'coalesce',
  ['feature-state', 'status'],
  ['get', 'status'],
  'open',
]

const runStatusBranches = (
  pick: 'colorOverride' | 'opacity',
  fallback: SkiStyleExpression
): SkiStyleExpression => {
  const statusExpr = resolveRunStatusExpression()
  const branches: SkiStyleExpression[] = []

  Object.entries(SKI_RUN_STATUS_STYLES).forEach(([status, style]) => {
    const value = style[pick]
    if (value !== undefined) {
      branches.push(['==', statusExpr, status], value)
    }
  })

  if (branches.length === 0) return fallback
  return ['case', ...branches, fallback]
}

const previewRunColor = (view: SkiRunStatus): SkiStyleExpression => {
  const style = SKI_RUN_STATUS_STYLES[view]
  return style.colorOverride ?? runDifficultyColorExpression()
}

const previewRunOpacity = (view: SkiRunStatus): SkiStyleExpression =>
  SKI_RUN_STATUS_STYLES[view].opacity

const previewRunWidth = (view: SkiRunStatus): SkiStyleExpression => {
  const factor = SKI_RUN_STATUS_STYLES[view].widthFactor
  return ['*', runDifficultyWidthExpression(), factor]
}

export const buildMapboxSkiRunLineColorExpression = (
  view: SkiRunStatusView
): SkiStyleExpression => {
  if (view === 'live') {
    return runStatusBranches('colorOverride', runDifficultyColorExpression())
  }
  if (view === 'open') return runDifficultyColorExpression()
  return previewRunColor(view)
}

export const buildMapboxSkiRunLineOpacityExpression = (
  view: SkiRunStatusView,
  selectedRouteId?: string | null
): SkiStyleExpression => {
  const base =
    view === 'live' ? runStatusBranches('opacity', 1) : previewRunOpacity(view)
  if (selectedRouteId == null) return base
  return [
    'case',
    ['==', ['get', 'id'], selectedRouteId],
    base,
    MAP_ROUTE_DIM_OPACITY,
  ]
}

export const buildMapboxSkiRunLineWidthExpression = (
  view: SkiRunStatusView
): SkiStyleExpression => {
  if (view === 'live') return runDifficultyWidthExpression()
  return previewRunWidth(view)
}

export const buildMapboxSkiRunLineDashExpression = (
  view: SkiRunStatusView
): SkiStyleExpression | undefined => {
  if (view === 'live') return undefined
  return SKI_RUN_STATUS_STYLES[view].dashArray
}

const resolveLiftStatusExpression = (): SkiStyleExpression => [
  'coalesce',
  ['feature-state', 'status'],
  ['get', 'status'],
  'open',
]

export const buildMapboxLiftLineColorExpression = (
  view: SkiLiftStatusView
): SkiStyleExpression => {
  if (view === 'live') {
    const statusExpr = resolveLiftStatusExpression()
    const branches: SkiStyleExpression[] = []
    ;(
      Object.entries(SKI_LIFT_STATUS_STYLES) as [
        SkiLiftStatus,
        (typeof SKI_LIFT_STATUS_STYLES)[SkiLiftStatus],
      ][]
    ).forEach(([status, style]) => {
      branches.push(['==', statusExpr, status], style.color)
    })
    return ['case', ...branches, SKI_LIFT_STATUS_STYLES.open.color]
  }
  return SKI_LIFT_STATUS_STYLES[view].color
}

export const buildMapboxLiftLineOpacityExpression = (
  view: SkiLiftStatusView,
  selectedRouteId?: string | null
): SkiStyleExpression => {
  let base: SkiStyleExpression
  if (view === 'live') {
    const statusExpr = resolveLiftStatusExpression()
    const branches: SkiStyleExpression[] = []
    ;(
      Object.entries(SKI_LIFT_STATUS_STYLES) as [
        SkiLiftStatus,
        (typeof SKI_LIFT_STATUS_STYLES)[SkiLiftStatus],
      ][]
    ).forEach(([status, style]) => {
      branches.push(['==', statusExpr, status], style.opacity)
    })
    base = ['case', ...branches, SKI_LIFT_STATUS_STYLES.open.opacity]
  } else {
    base = SKI_LIFT_STATUS_STYLES[view].opacity
  }

  if (selectedRouteId == null) return base
  return [
    'case',
    ['==', ['get', 'id'], selectedRouteId],
    base,
    MAP_ROUTE_DIM_OPACITY,
  ]
}

export const buildMapboxLiftLineWidthExpression = (
  view: SkiLiftStatusView
): SkiStyleExpression => {
  if (view === 'live') {
    const statusExpr = resolveLiftStatusExpression()
    const branches: SkiStyleExpression[] = []
    ;(
      Object.entries(SKI_LIFT_STATUS_STYLES) as [
        SkiLiftStatus,
        (typeof SKI_LIFT_STATUS_STYLES)[SkiLiftStatus],
      ][]
    ).forEach(([status, style]) => {
      branches.push(['==', statusExpr, status], style.width)
    })
    return ['case', ...branches, SKI_LIFT_STATUS_STYLES.open.width]
  }
  return SKI_LIFT_STATUS_STYLES[view].width
}

export const buildMapboxLiftLineDashExpression = (): SkiStyleExpression =>
  SKI_LIFT_DASH_ARRAY
