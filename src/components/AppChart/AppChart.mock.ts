import type { AppChartCandle } from './AppChart.types'

const DAY_MS = 86_400_000
const START_UTC = Date.UTC(2025, 0, 2)
const DAYS = 120

const isoDay = (utcMs: number) => new Date(utcMs).toISOString().slice(0, 10)

/** Deterministic LCG so Storybook data never drifts. */
const nextUnit = (seed: number) => {
  const next = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return { seed: next, unit: next / 0x1_0000_0000 }
}

const buildMockCandles = (): AppChartCandle[] => {
  const candles: AppChartCandle[] = []
  let seed = 42
  let close = 100

  for (let i = 0; i < DAYS; i += 1) {
    const step = nextUnit(seed)
    seed = step.seed
    const range = nextUnit(seed)
    seed = range.seed
    const vol = nextUnit(seed)
    seed = vol.seed

    const open = close
    const delta = (step.unit - 0.48) * 4
    close = Math.max(8, open + delta)
    const spread = 0.4 + range.unit * 2.2
    const high = Math.max(open, close) + spread
    const low = Math.max(1, Math.min(open, close) - spread)

    candles.push({
      time: isoDay(START_UTC + i * DAY_MS),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.round(800 + vol.unit * 4200),
    })
  }

  return candles
}

export const mockCandles = buildMockCandles()
