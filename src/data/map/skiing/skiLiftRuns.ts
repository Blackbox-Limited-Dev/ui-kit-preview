import type { SkiLiftId, SkiRunId } from './skiing.types'

export const LIFT_RUN_EXCEPTIONS: Record<SkiRunId, SkiLiftId | null> = {
  'run-A': 'lift-2',
  'run-B': 'lift-2R',
  'run-D': 'lift-5',
  'run-E': 'lift-5',
  'run-F': 'lift-8',
  'run-G': 'lift-8',
  'run-J': 'lift-13',
  'run-U': 'lift-13',
  'run-K': 'lift-14',
  'run-M': 'lift-14',
  'run-Z': null,
  'run-Навчальний-майданчик': null,
  'run-Навчальний-майданчик-для-дітей': null,
}

const liftFromName = (name: string): SkiLiftId | null => {
  const match = name.normalize('NFKC').match(/^\d+/)
  return match ? `lift-${match[0]}` : null
}

export const deriveLiftRuns = (
  runs: { id: SkiRunId; name: string }[],
  liftIds: ReadonlySet<SkiLiftId>
): Record<SkiLiftId, SkiRunId[]> => {
  const byId = new Map<SkiRunId, string>()
  runs.forEach((run) => {
    if (!byId.has(run.id)) byId.set(run.id, run.name)
  })

  const map: Record<SkiLiftId, SkiRunId[]> = {}
  Array.from(byId.entries())
    .sort((a, b) => a[1].localeCompare(b[1], 'uk', { numeric: true }))
    .forEach(([id, name]) => {
      const liftId =
        id in LIFT_RUN_EXCEPTIONS ? LIFT_RUN_EXCEPTIONS[id] : liftFromName(name)
      if (liftId && liftIds.has(liftId)) {
        ;(map[liftId] ??= []).push(id)
      }
    })
  return map
}
