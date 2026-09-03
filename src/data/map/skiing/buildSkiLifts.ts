import type { FeatureCollection, LineString } from 'geojson'

import skiDetailsSample from './ski-details.sample.json'
import skiLiftsRaw from './ski-lifts.json'
import skiRunsRaw from './ski-runs.json'

import { lineLengthM } from './skiing.geometry'
import { deriveLiftRuns } from './skiLiftRuns'
import type {
  SkiLiftFeatureProperties,
  SkiLiftId,
  SkiLiftVM,
  SkiResortDetailsPayload,
  SkiRunFeatureProperties,
  SkiRunId,
  SkiRunVM,
} from './skiing.types'

export const skiLiftsCollection = skiLiftsRaw as FeatureCollection<
  LineString,
  SkiLiftFeatureProperties
>

export const skiRunsCollection = skiRunsRaw as FeatureCollection<
  LineString,
  SkiRunFeatureProperties
>

const skiDetails = skiDetailsSample as SkiResortDetailsPayload

const buildRunLengths = (): Map<SkiRunId, number> => {
  const lengths = new Map<SkiRunId, number>()
  skiRunsCollection.features.forEach((feature) => {
    const id = feature.properties.id
    lengths.set(
      id,
      (lengths.get(id) ?? 0) + lineLengthM(feature.geometry.coordinates)
    )
  })
  return lengths
}

const buildRunProps = (): Map<SkiRunId, SkiRunFeatureProperties> => {
  const props = new Map<SkiRunId, SkiRunFeatureProperties>()
  skiRunsCollection.features.forEach((feature) => {
    if (!props.has(feature.properties.id)) {
      props.set(feature.properties.id, feature.properties)
    }
  })
  return props
}

export const buildSkiLiftVms = (
  payload: SkiResortDetailsPayload = skiDetails
): SkiLiftVM[] => {
  const runLengths = buildRunLengths()
  const runProps = buildRunProps()
  const liftIds = new Set<SkiLiftId>(
    skiLiftsCollection.features.map((f) => f.properties.id)
  )
  const liftRuns = deriveLiftRuns(
    Array.from(runProps.values()).map((p) => ({ id: p.id, name: p.name })),
    liftIds
  )

  return skiLiftsCollection.features.map((feature) => {
    const props = feature.properties
    const detail = payload.lifts[props.id]
    const status = detail?.status ?? props.status
    const isOpen = status === 'open'

    const runs: SkiRunVM[] = (liftRuns[props.id] ?? []).map((runId) => {
      const rp = runProps.get(runId)!
      const rd = payload.runs[runId]
      const runStatus = rd?.status ?? rp.status
      return {
        id: runId,
        label: rp.name,
        difficulty: rp.difficulty,
        status: runStatus,
        isDisabled: runStatus !== 'open' || !isOpen,
        lengthM: Math.round(runLengths.get(runId) ?? 0),
        queueMin: rd?.queueMin ?? 1,
      }
    })

    return {
      id: props.id,
      label: props.label || props.name,
      type: props.type,
      seats: detail?.seats,
      status,
      isOpen,
      lengthM: Math.round(lineLengthM(feature.geometry.coordinates)),
      queueMin: detail?.queueMin ?? 0,
      runs,
    }
  })
}

export const findRunFeature = (runId: string) =>
  skiRunsCollection.features.find((f) => f.properties.id === runId)

export const findLiftFeature = (liftId: string) =>
  skiLiftsCollection.features.find((f) => f.properties.id === liftId)
