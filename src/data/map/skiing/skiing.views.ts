import type { SkiLiftStatus, SkiRunStatus } from './skiing.types'

export type SkiRunStatusView = 'live' | SkiRunStatus
export type SkiLiftStatusView = 'live' | SkiLiftStatus

export const SKI_RUN_STATUS_VIEW_TABS: {
  key: SkiRunStatusView
  title: string
}[] = [
  { key: 'live', title: 'Live' },
  { key: 'open', title: 'Open' },
  { key: 'limited', title: 'Limited' },
  { key: 'hold', title: 'Hold' },
  { key: 'closed', title: 'Closed' },
]

export const SKI_LIFT_STATUS_VIEW_TABS: {
  key: SkiLiftStatusView
  title: string
}[] = [
  { key: 'live', title: 'Live' },
  { key: 'open', title: 'Open' },
  { key: 'hold', title: 'Hold' },
  { key: 'maintenance', title: 'Service' },
  { key: 'closed', title: 'Closed' },
]
