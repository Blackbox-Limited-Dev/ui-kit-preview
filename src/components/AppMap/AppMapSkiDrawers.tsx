'use client'

import React, { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { AppButton } from '~components/AppButton'
import { AppDrawer } from '~components/AppDrawer'
import { AppIcon } from '~components/AppIcon'
import { AppSwitch } from '~components/AppSwitch'
import { AppTabsPill } from '~components/AppTabsPill'
import { AppText } from '~components/AppText'
import LiftClosedIcon from '~icons/lift-closed.svg'
import LiftOpenIcon from '~icons/lift-open.svg'
import MountainIcon from '~icons/mountain.svg'
import {
  SKI_LIFT_STATUS_VIEW_TABS,
  SKI_RUN_DIFFICULTY_COLORS,
  SKI_RUN_DISABLED_COLORS,
  SKI_RUN_STATUS_VIEW_TABS,
  skiQueueLevel,
  type SkiLiftStatusView,
  type SkiLiftType,
  type SkiLiftVM,
  type SkiRunDifficulty,
  type SkiRunStatusView,
  type SkiRunVM,
} from '~data/map/skiing'

import s from './AppMap.module.scss'

const LIFT_TYPE_LABEL: Record<SkiLiftType, string> = {
  chairlift: 'chairlift',
  gondola: 'gondola',
  drag: 'drag lift',
  cable: 'cable car',
}

const RUN_DIFFICULTY_LABEL: Record<SkiRunDifficulty, string> = {
  green: 'Green',
  blue: 'Blue',
  red: 'Red',
  black: 'Black',
}

const RUN_DIFFICULTY_ORDER: SkiRunDifficulty[] = [
  'green',
  'blue',
  'red',
  'black',
]

const formatMeters = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

const DRAWER_UNMOUNT_MS = 500

const useMountedWhileOpen = (open: boolean) => {
  const [mounted, setMounted] = useState(open)

  if (open && !mounted) {
    setMounted(true)
  }

  useEffect(() => {
    if (open) return undefined
    const id = window.setTimeout(() => setMounted(false), DRAWER_UNMOUNT_MS)
    return () => window.clearTimeout(id)
  }, [open])

  return mounted
}

const seatWord = (n: number) => (n === 1 ? 'seat' : 'seats')

const seatLabel = (type: SkiLiftType, seats?: number) => {
  if (seats && seats > 0) return `${seats} ${seatWord(seats)}`
  return LIFT_TYPE_LABEL[type]
}

const queueClass = (minutes: number, disabled?: boolean) => {
  if (disabled) return s.queueDisabled
  const level = skiQueueLevel(minutes)
  if (level === 'error') return s.queueError
  if (level === 'warning') return s.queueWarning
  return s.queueNormal
}

type LiftFilter = 'open' | 'soon' | 'all'

export type MapPanelView =
  | { kind: 'list' }
  | { kind: 'lift'; id: string }
  | { kind: 'run'; id: string }

type RunChipProps = {
  run: SkiRunVM
  onPress?: () => void
}

const RunChip = ({ run, onPress }: RunChipProps) => {
  const color = run.isDisabled
    ? SKI_RUN_DISABLED_COLORS[run.difficulty]
    : SKI_RUN_DIFFICULTY_COLORS[run.difficulty]
  const inner = (
    <>
      {run.isDisabled ? <span className={s.chipHatch} /> : null}
      <span className={s.chipLabel} style={{ color }}>
        {run.label}
      </span>
    </>
  )

  if (!onPress) {
    return <span className={cn(s.chip, s.chip_static)}>{inner}</span>
  }

  return (
    <button
      type="button"
      className={s.chip}
      aria-label={`Run ${run.label}`}
      onClick={(event) => {
        event.stopPropagation()
        onPress()
      }}
    >
      {inner}
    </button>
  )
}

type AppMapSkiDrawersProps = {
  lifts: SkiLiftVM[]
  view: MapPanelView
  contentOpen: boolean
  settingsOpen: boolean
  onCloseContent: () => void
  onCloseSettings: () => void
  onBack: () => void
  onSelectLift: (id: string) => void
  onSelectRun: (id: string) => void
  skiRunStatusView: SkiRunStatusView
  skiLiftStatusView: SkiLiftStatusView
  onRunStatusViewChange: (value: SkiRunStatusView) => void
  onLiftStatusViewChange: (value: SkiLiftStatusView) => void
  runDifficultyVisibility: Record<SkiRunDifficulty, boolean>
  onToggleRunDifficulty: (difficulty: SkiRunDifficulty) => void
}

export const AppMapSkiDrawers = ({
  lifts,
  view,
  contentOpen,
  settingsOpen,
  onCloseContent,
  onCloseSettings,
  onBack,
  onSelectLift,
  onSelectRun,
  skiRunStatusView,
  skiLiftStatusView,
  onRunStatusViewChange,
  onLiftStatusViewChange,
  runDifficultyVisibility,
  onToggleRunDifficulty,
}: AppMapSkiDrawersProps) => {
  const [filter, setFilter] = useState<LiftFilter>('all')
  const liftById = useMemo(
    () => new Map(lifts.map((lift) => [lift.id, lift])),
    [lifts]
  )
  const runById = useMemo(() => {
    const map = new Map<string, { run: SkiRunVM; lift: SkiLiftVM }>()
    lifts.forEach((lift) => {
      lift.runs.forEach((run) => map.set(run.id, { run, lift }))
    })
    return map
  }, [lifts])

  const visibleLifts = lifts.filter((lift) =>
    filter === 'open' ? lift.isOpen : filter === 'soon' ? !lift.isOpen : true
  )

  const selectedLift = view.kind === 'lift' ? liftById.get(view.id) : undefined
  const selectedRunPair = view.kind === 'run' ? runById.get(view.id) : undefined

  const title =
    view.kind === 'lift' && selectedLift
      ? `Lift ${selectedLift.label}`
      : view.kind === 'run' && selectedRunPair
        ? `Run ${selectedRunPair.run.label}`
        : 'Lifts'

  const contentMounted = useMountedWhileOpen(contentOpen)
  const settingsMounted = useMountedWhileOpen(settingsOpen)

  return (
    <>
      {contentMounted ? (
        <AppDrawer
          open={contentOpen}
          onOpenChange={(open) => {
            if (!open) onCloseContent()
          }}
          direction="right"
          offset="screen"
          showOverlay={false}
          dismissible={false}
          className={s.mapDrawer}
        >
          <AppDrawer.Header
            className={s.mapDrawerHeader}
            closeLabel="Close"
            onClose={onCloseContent}
          >
            {view.kind === 'list' ? (
              title
            ) : (
              <span className={s.headerRow}>
                <AppButton
                  iconOnly
                  variant="outlined"
                  size="small"
                  aria-label="Back"
                  onClick={onBack}
                >
                  <AppIcon name="NavArrowLeft" size={20} />
                </AppButton>
                <span className={s.headerTitle}>{title}</span>
              </span>
            )}
          </AppDrawer.Header>
          <AppDrawer.Body className={s.mapDrawerBody}>
            {view.kind === 'list' ? (
              <div className={s.list}>
                <div className={s.tabs}>
                  <AppTabsPill
                    aria-label="Lift filter"
                    stretch
                    value={filter}
                    onChange={(next) => setFilter(next as LiftFilter)}
                    items={[
                      { value: 'open', label: 'Open' },
                      { value: 'soon', label: 'Soon' },
                      { value: 'all', label: 'All' },
                    ]}
                  />
                </div>
                {visibleLifts.length === 0 ? (
                  <p className={s.empty}>Nothing found</p>
                ) : (
                  visibleLifts.map((lift, index) => (
                    <div
                      key={lift.id}
                      className={cn(s.liftRow, {
                        [s.liftRow_divider]: index > 0,
                      })}
                    >
                      <button
                        type="button"
                        className={s.liftHit}
                        aria-label={`Lift ${lift.label}`}
                        onClick={() => onSelectLift(lift.id)}
                      />
                      <span className={s.liftMeta}>
                        <AppIcon
                          icon={lift.isOpen ? LiftOpenIcon : LiftClosedIcon}
                          size={40}
                        />
                        <span
                          className={cn(s.liftNumber, {
                            [s.liftNumber_closed]: !lift.isOpen,
                          })}
                        >
                          {lift.label}
                        </span>
                      </span>
                      <span className={s.runs}>
                        {lift.runs.map((run) => (
                          <RunChip
                            key={run.id}
                            run={run}
                            onPress={() => onSelectRun(run.id)}
                          />
                        ))}
                      </span>
                      {lift.queueMin > 0 ? (
                        <span
                          className={cn(
                            s.queue,
                            queueClass(lift.queueMin, !lift.isOpen)
                          )}
                        >
                          <span className={s.queueNum}>{lift.queueMin}</span>
                          <span className={s.queueUnit}>min</span>
                        </span>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            ) : null}

            {view.kind === 'lift' && selectedLift ? (
              <div className={s.detail}>
                <div className={s.card}>
                  <div className={s.cell}>
                    <span className={s.colLabel}>LIFT NO</span>
                    <div className={s.cellValue}>
                      <span className={s.liftMeta}>
                        <AppIcon
                          icon={
                            selectedLift.isOpen ? LiftOpenIcon : LiftClosedIcon
                          }
                          size={40}
                        />
                        <span
                          className={cn(s.liftNumber, {
                            [s.liftNumber_closed]: !selectedLift.isOpen,
                          })}
                        >
                          {selectedLift.label}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={s.cell}>
                    <span className={s.colLabel}>TYPE</span>
                    <div className={s.cellValue}>
                      <span className={s.value}>
                        {seatLabel(selectedLift.type, selectedLift.seats)}
                      </span>
                    </div>
                  </div>
                  <div className={cn(s.cell, s.cell_right)}>
                    <span className={s.colLabel}>LENGTH (M)</span>
                    <div className={s.cellValue}>
                      <span className={s.value}>
                        {formatMeters(selectedLift.lengthM)}
                      </span>
                    </div>
                  </div>
                  <div className={cn(s.cell, s.cell_right)}>
                    <span className={s.colLabel}>QUEUE</span>
                    <div className={s.cellValue}>
                      <span
                        className={cn(
                          s.queue,
                          queueClass(
                            selectedLift.queueMin,
                            !selectedLift.isOpen
                          )
                        )}
                      >
                        <span className={s.queueNum}>
                          {selectedLift.queueMin}
                        </span>
                        <span className={s.queueUnit}>min</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={s.tableHeader}>
                    <span className={cn(s.colLabel, s.colRun)}>RUN</span>
                    <span className={cn(s.colLabel, s.colDifficulty)}>
                      DIFFICULTY
                    </span>
                    <span className={cn(s.colLabel, s.colLength)}>
                      LENGTH (M)
                    </span>
                    <span className={cn(s.colLabel, s.colQueue)}>QUEUE</span>
                  </div>
                  {selectedLift.runs.map((run) => (
                    <button
                      key={run.id}
                      type="button"
                      className={s.tableRow}
                      aria-label={`Run ${run.label}`}
                      onClick={() => onSelectRun(run.id)}
                    >
                      <span className={s.colRun}>
                        <RunChip run={run} />
                      </span>
                      <span className={s.colDifficulty}>
                        <AppIcon
                          icon={MountainIcon}
                          size={24}
                          color={SKI_RUN_DIFFICULTY_COLORS[run.difficulty]}
                        />
                      </span>
                      <span className={cn(s.value, s.colLength)}>
                        {formatMeters(run.lengthM)}
                      </span>
                      <span
                        className={cn(
                          s.colQueue,
                          s.queue,
                          queueClass(run.queueMin ?? 0, run.isDisabled)
                        )}
                      >
                        {run.isDisabled ? (
                          '—'
                        ) : (
                          <>
                            <span className={s.queueNum}>
                              {run.queueMin ?? 0}
                            </span>
                            <span className={s.queueUnit}>min</span>
                          </>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {view.kind === 'run' && selectedRunPair ? (
              <div className={s.detail}>
                <div className={s.card}>
                  <div className={s.cell}>
                    <span className={s.colLabel}>RUN</span>
                    <div className={s.cellValue}>
                      <RunChip run={selectedRunPair.run} />
                    </div>
                  </div>
                  <div className={s.cell}>
                    <span className={s.colLabel}>DIFFICULTY</span>
                    <div className={s.cellValue}>
                      <AppIcon
                        icon={MountainIcon}
                        size={24}
                        color={
                          SKI_RUN_DIFFICULTY_COLORS[
                            selectedRunPair.run.difficulty
                          ]
                        }
                      />
                    </div>
                  </div>
                  <div className={cn(s.cell, s.cell_right)}>
                    <span className={s.colLabel}>LENGTH (M)</span>
                    <div className={s.cellValue}>
                      <span className={s.value}>
                        {formatMeters(selectedRunPair.run.lengthM)}
                      </span>
                    </div>
                  </div>
                  <div className={cn(s.cell, s.cell_right)}>
                    <span className={s.colLabel}>QUEUE</span>
                    <div className={s.cellValue}>
                      <span
                        className={cn(
                          s.queue,
                          queueClass(
                            selectedRunPair.run.queueMin ?? 0,
                            selectedRunPair.run.isDisabled
                          )
                        )}
                      >
                        {selectedRunPair.run.isDisabled ? (
                          '—'
                        ) : (
                          <>
                            <span className={s.queueNum}>
                              {selectedRunPair.run.queueMin ?? 0}
                            </span>
                            <span className={s.queueUnit}>min</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <AppText as="h3" variant="title-3" className={s.sectionTitle}>
                    Lift
                  </AppText>
                  <button
                    type="button"
                    className={s.relatedLift}
                    aria-label={`Lift ${selectedRunPair.lift.label}`}
                    onClick={() => onSelectLift(selectedRunPair.lift.id)}
                  >
                    <AppIcon
                      icon={
                        selectedRunPair.lift.isOpen
                          ? LiftOpenIcon
                          : LiftClosedIcon
                      }
                      size={40}
                    />
                    <span className={s.liftInfo}>
                      <span
                        className={cn(s.liftNumber, {
                          [s.liftNumber_closed]: !selectedRunPair.lift.isOpen,
                        })}
                      >
                        {selectedRunPair.lift.label}
                      </span>
                      <span className={s.liftType}>
                        {LIFT_TYPE_LABEL[selectedRunPair.lift.type]}
                      </span>
                    </span>
                    <span
                      className={cn(
                        s.queue,
                        queueClass(
                          selectedRunPair.lift.queueMin,
                          !selectedRunPair.lift.isOpen
                        )
                      )}
                    >
                      <span className={s.queueNum}>
                        {selectedRunPair.lift.queueMin}
                      </span>
                      <span className={s.queueUnit}>min</span>
                    </span>
                  </button>
                </div>
              </div>
            ) : null}
          </AppDrawer.Body>
        </AppDrawer>
      ) : null}

      {settingsMounted ? (
        <AppDrawer
          open={settingsOpen}
          onOpenChange={(open) => {
            if (!open) onCloseSettings()
          }}
          direction="right"
          offset="screen"
          showOverlay={false}
          className={s.mapDrawer}
        >
          <AppDrawer.Header
            className={s.mapDrawerHeader}
            closeLabel="Close"
            onClose={onCloseSettings}
          >
            Map settings
          </AppDrawer.Header>
          <AppDrawer.Body className={s.mapDrawerBody}>
            <div className={s.settings}>
              <section>
                <AppText as="h3" variant="title-3">
                  Runs
                </AppText>
                <p className={s.settingsHint}>
                  Preview each status on every run. Live uses mixed API data
                  later.
                </p>
                <AppTabsPill
                  aria-label="Run status"
                  value={skiRunStatusView}
                  onChange={(next) =>
                    onRunStatusViewChange(next as SkiRunStatusView)
                  }
                  items={SKI_RUN_STATUS_VIEW_TABS.map((tab) => ({
                    value: tab.key,
                    label: tab.title,
                  }))}
                />
              </section>
              <section>
                <AppText as="h3" variant="title-3">
                  Run difficulty
                </AppText>
                <p className={s.settingsHint}>
                  Show or hide runs by difficulty.
                </p>
                {RUN_DIFFICULTY_ORDER.map((difficulty) => (
                  <div key={difficulty} className={s.difficultyRow}>
                    <span className={s.difficultyLabel}>
                      <span
                        className={s.dot}
                        style={{
                          backgroundColor:
                            SKI_RUN_DIFFICULTY_COLORS[difficulty],
                        }}
                      />
                      <AppText as="span" variant="body-1-regular">
                        {RUN_DIFFICULTY_LABEL[difficulty]}
                      </AppText>
                    </span>
                    <AppSwitch
                      checked={runDifficultyVisibility[difficulty]}
                      onCheckedChange={() => onToggleRunDifficulty(difficulty)}
                      aria-label={RUN_DIFFICULTY_LABEL[difficulty]}
                    />
                  </div>
                ))}
              </section>
              <section>
                <AppText as="h3" variant="title-3">
                  Lifts
                </AppText>
                <p className={s.settingsHint}>
                  Same for chair and gondola lifts on the winter map.
                </p>
                <AppTabsPill
                  aria-label="Lift status"
                  value={skiLiftStatusView}
                  onChange={(next) =>
                    onLiftStatusViewChange(next as SkiLiftStatusView)
                  }
                  items={SKI_LIFT_STATUS_VIEW_TABS.map((tab) => ({
                    value: tab.key,
                    label: tab.title,
                  }))}
                />
              </section>
            </div>
          </AppDrawer.Body>
        </AppDrawer>
      ) : null}
    </>
  )
}
