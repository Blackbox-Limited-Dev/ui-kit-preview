export type AppChartKind = 'line' | 'candle'

export type AppChartStatus = 'ready' | 'loading' | 'empty'

export type AppChartCandle = {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

export type AppChartProps = {
  kind?: AppChartKind
  data?: readonly AppChartCandle[]
  status?: AppChartStatus
  height?: number
  'aria-label'?: string
  className?: string
}
