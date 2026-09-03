'use client'

import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { AppText } from '../AppText'

import { readChartTheme } from './AppChart.theme'

import s from './AppChart.module.scss'

import type { AppChartProps } from './AppChart.types'
import type { IChartApi } from 'lightweight-charts'

const DEFAULT_HEIGHT = 360

export const AppChart = ({
  kind = 'line',
  data = [],
  status = 'ready',
  height = DEFAULT_HEIGHT,
  'aria-label': ariaLabel = 'Price chart',
  className,
}: AppChartProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [themeKey, setThemeKey] = useState('summer')

  const isLoading = status === 'loading'
  const isEmpty = status === 'empty' || (!isLoading && data.length === 0)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setThemeKey(root.dataset.theme ?? 'summer')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host || isLoading || isEmpty) return undefined

    let cancelled = false
    let chart: IChartApi | undefined

    const mount = async () => {
      const {
        createChart,
        ColorType,
        CrosshairMode,
        LineSeries,
        CandlestickSeries,
        HistogramSeries,
      } = await import('lightweight-charts')
      if (cancelled || !hostRef.current) return

      const theme = readChartTheme()
      chart = createChart(hostRef.current, {
        autoSize: true,
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: theme.text,
          fontFamily: theme.fontFamily,
        },
        grid: {
          vertLines: { color: theme.grid },
          horzLines: { color: theme.grid },
        },
        crosshair: { mode: CrosshairMode.Normal },
        rightPriceScale: { borderColor: theme.grid },
        timeScale: { borderColor: theme.grid },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: true,
          vertTouchDrag: true,
        },
        handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        },
      })

      if (cancelled) {
        chart.remove()
        return
      }

      if (kind === 'candle') {
        const series = chart.addSeries(CandlestickSeries, {
          upColor: theme.up,
          downColor: theme.down,
          wickUpColor: theme.up,
          wickDownColor: theme.down,
          borderVisible: false,
          lastValueVisible: true,
          priceLineVisible: true,
        })
        series.setData(
          data.map((row) => ({
            time: row.time,
            open: row.open,
            high: row.high,
            low: row.low,
            close: row.close,
          }))
        )
      } else {
        const series = chart.addSeries(LineSeries, {
          color: theme.line,
          lineWidth: 2,
          lastValueVisible: true,
          priceLineVisible: true,
        })
        series.setData(
          data.map((row) => ({ time: row.time, value: row.close }))
        )
      }

      const volume = chart.addSeries(
        HistogramSeries,
        {
          priceFormat: { type: 'volume' },
          lastValueVisible: false,
          priceLineVisible: false,
        },
        1
      )
      volume.setData(
        data.map((row) => ({
          time: row.time,
          value: row.volume ?? 0,
          color: row.close >= row.open ? theme.up : theme.down,
        }))
      )
      chart.panes()[0]?.setStretchFactor(0.78)
      chart.panes()[1]?.setStretchFactor(0.22)
    }

    void mount()

    return () => {
      cancelled = true
      chart?.remove()
    }
  }, [kind, data, isLoading, isEmpty, themeKey])

  return (
    <div
      className={cn(s.root, className)}
      style={{ height }}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      role={isLoading || isEmpty ? 'status' : 'img'}
    >
      {isLoading ? (
        <div className={s.status}>
          <AppText variant="body-2-regular">Loading</AppText>
        </div>
      ) : isEmpty ? (
        <div className={s.status}>
          <AppText variant="body-2-regular">No data</AppText>
        </div>
      ) : (
        <div ref={hostRef} className={s.host} />
      )}
    </div>
  )
}

export type {
  AppChartCandle,
  AppChartKind,
  AppChartProps,
  AppChartStatus,
} from './AppChart.types'
