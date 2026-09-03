'use client'

import React, { useEffect, useRef, useState } from 'react'

import PresentIcon from '~icons/present.svg'

import { AppIcon } from '../AppIcon'
import { AppInfoLabel } from '../AppInfoLabel'

import type { HotelLabel } from './AppHotelCard.types'

// Extra slack reserved before the «+N» chip, matching the RN implementation.
const COUNTER_OFFSET = 8

/** How many chips fit the row; when not all fit, room for «+N» is reserved. */
const packChips = (
  widths: number[],
  avail: number,
  counterWidth: number,
  gap: number
) => {
  let x = 0
  let allFit = true
  for (let i = 0; i < widths.length; i += 1) {
    const need = i === 0 ? widths[i] : x + gap + widths[i]
    if (need <= avail) x = need
    else {
      allFit = false
      break
    }
  }
  if (allFit) return widths.length

  const limit = avail - counterWidth - gap - COUNTER_OFFSET
  let count = 0
  x = 0
  for (let i = 0; i < widths.length; i += 1) {
    const need = i === 0 ? widths[i] : x + gap + widths[i]
    if (need > limit) break
    x = need
    count += 1
  }
  return count
}

// One observer for every chip row on the page — a list mounts a dozen cards,
// and a dozen ResizeObserver instances deliver a dozen separate callbacks.
let sharedObserver: ResizeObserver | undefined
const rowCallbacks = new WeakMap<Element, () => void>()

const observeRow = (row: Element, onResize: () => void) => {
  rowCallbacks.set(row, onResize)
  sharedObserver ??= new ResizeObserver((entries) => {
    entries.forEach((entry) => rowCallbacks.get(entry.target)?.())
  })
  sharedObserver.observe(row)

  return () => {
    rowCallbacks.delete(row)
    sharedObserver?.unobserve(row)
  }
}

const chip = (label: HotelLabel) => (
  <AppInfoLabel
    key={label.text}
    icon={label.icon && <AppIcon icon={label.icon} size={16} />}
  >
    {label.text}
  </AppInfoLabel>
)

const counterChip = (n: number) => (
  <AppInfoLabel key="counter" icon={<AppIcon icon={PresentIcon} size={16} />}>
    {`+${n}`}
  </AppInfoLabel>
)

type ChipMetrics = {
  /** Identifies the chip set the widths were taken from. */
  key: string
  widths: number[]
  counter: number
  gap: number
}

type HotelLabelsRowProps = {
  labels: HotelLabel[]
  /** The host's row class — supplies the gap and font context for the row. */
  className?: string
}

/** Single-row chip strip: renders as many chips as fit the row width, then a
 *  «+N» counter chip for the rest. The first paint renders every chip and the
 *  counter — the row clips the overflow, so measuring them costs no layout
 *  shift — and their widths are cached for later repacks. */
export const HotelLabelsRow = ({ labels, className }: HotelLabelsRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState<ChipMetrics | null>(null)
  const [visible, setVisible] = useState(labels.length)
  const labelsKey = labels.map((label) => label.text).join('|')

  useEffect(() => {
    const row = rowRef.current
    if (!row) return undefined

    // Measuring pass: every chip and the counter are in the DOM right now.
    const measure = () => {
      const widths = Array.from(
        row.children,
        (el) => (el as HTMLElement).getBoundingClientRect().width
      )
      const counter = widths.pop()
      if (counter === undefined) return
      setMetrics({
        key: labelsKey,
        widths,
        counter,
        gap: parseFloat(getComputedStyle(row).columnGap) || 0,
      })
    }

    if (metrics?.key !== labelsKey) {
      measure()
      return undefined
    }

    const repack = () =>
      setVisible(
        packChips(metrics.widths, row.clientWidth, metrics.counter, metrics.gap)
      )

    repack()
    return observeRow(row, repack)
  }, [metrics, labelsKey])

  if (labels.length === 0) return null

  const measuring = metrics?.key !== labelsKey
  const shown = measuring ? labels : labels.slice(0, visible)
  const hidden = measuring ? labels.length : labels.length - visible

  return (
    <div ref={rowRef} className={className}>
      {shown.map(chip)}
      {hidden > 0 && counterChip(hidden)}
    </div>
  )
}
