export type ChartTheme = {
  text: string
  grid: string
  line: string
  up: string
  down: string
  fontFamily: string
}

export const readChartTheme = (): ChartTheme => {
  const root = getComputedStyle(document.documentElement)
  const body = getComputedStyle(document.body)
  const token = (name: string) => root.getPropertyValue(name).trim()

  return {
    text: token('--color-text-on-surface-subtle'),
    grid: token('--color-stroke-divider-on-surface'),
    line: token('--color-interactive-primary'),
    up: token('--color-labels-green'),
    down: token('--color-accents-red-text-on-card'),
    fontFamily: body.fontFamily,
  }
}
