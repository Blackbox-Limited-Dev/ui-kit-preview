/** ISO-8601 timestamp from the resort status API. */
export type SkiStatusTimestamp = string

export type SkiRunStatus = 'open' | 'limited' | 'hold' | 'closed'

export type SkiLiftStatus = 'open' | 'hold' | 'maintenance' | 'closed'

export type SkiRunDifficulty = 'green' | 'blue' | 'red' | 'black'

export type SkiLiftType = 'chairlift' | 'gondola' | 'drag' | 'cable'

export type SkiRunId = string
export type SkiLiftId = string

export type SkiResortStatusPayload = {
  updatedAt: SkiStatusTimestamp
  runs: Record<SkiRunId, SkiRunStatus>
  lifts: Record<SkiLiftId, SkiLiftStatus>
}

export type SkiRunFeatureProperties = {
  id: SkiRunId
  name: string
  nameUk: string
  difficulty: SkiRunDifficulty
  status: SkiRunStatus
  lengthM?: number
}

export type SkiLiftFeatureProperties = {
  id: SkiLiftId
  name: string
  nameUk: string
  label: string
  type: SkiLiftType
  status: SkiLiftStatus
}

export type SkiLiftDetail = {
  status: SkiLiftStatus
  queueMin: number
  seats?: number
}

export type SkiRunDetail = {
  status: SkiRunStatus
  queueMin?: number
}

export type SkiResortDetailsPayload = {
  updatedAt: SkiStatusTimestamp
  lifts: Record<SkiLiftId, SkiLiftDetail>
  runs: Record<SkiRunId, SkiRunDetail>
}

export type SkiRunVM = {
  id: SkiRunId
  label: string
  difficulty: SkiRunDifficulty
  status: SkiRunStatus
  isDisabled: boolean
  lengthM: number
  queueMin?: number
}

export type SkiLiftVM = {
  id: SkiLiftId
  label: string
  type: SkiLiftType
  seats?: number
  status: SkiLiftStatus
  isOpen: boolean
  lengthM: number
  queueMin: number
  runs: SkiRunVM[]
}
