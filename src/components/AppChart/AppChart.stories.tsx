import React, { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppTabsPill } from '../AppTabsPill'

import { mockCandles } from './AppChart.mock'

import { AppChart } from '.'

import type { AppChartKind } from './AppChart.types'

const MIN_HEIGHT = 200
const MAX_HEIGHT = 720

const meta = {
  title: 'Components/AppChart',
  component: AppChart,
  args: {
    kind: 'line',
    data: mockCandles,
    status: 'ready',
    height: 360,
  },
  argTypes: {
    kind: { control: 'inline-radio', options: ['line', 'candle'] },
    status: { control: 'inline-radio', options: ['ready', 'loading', 'empty'] },
    data: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AppChart>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: { kind: 'line' },
}

export const Candle: Story = {
  args: { kind: 'candle' },
}

export const KindToggle: Story = {
  render: function KindToggleStory(args) {
    const [kind, setKind] = useState<AppChartKind>('candle')
    return (
      <div style={{ display: 'grid', gap: 'var(--size-md)' }}>
        <AppTabsPill
          aria-label="Chart kind"
          size="md"
          items={[
            { value: 'line', label: 'Line' },
            { value: 'candle', label: 'Candle' },
          ]}
          value={kind}
          onChange={(value) => setKind(value as AppChartKind)}
        />
        <AppChart {...args} kind={kind} />
      </div>
    )
  },
}

export const Resizable: Story = {
  args: { kind: 'candle' },
  render: function ResizableStory(args) {
    const [height, setHeight] = useState(360)
    const dragRef = useRef<{ startY: number; startH: number } | null>(null)

    return (
      <div>
        <AppChart {...args} height={height} />
        <button
          type="button"
          aria-label="Resize chart height"
          aria-valuemin={MIN_HEIGHT}
          aria-valuemax={MAX_HEIGHT}
          aria-valuenow={height}
          role="slider"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragRef.current = { startY: event.clientY, startH: height }
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current
            if (!drag) return
            const next = drag.startH + (event.clientY - drag.startY)
            setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, next)))
          }}
          onPointerUp={() => {
            dragRef.current = null
          }}
          style={{
            display: 'block',
            width: '100%',
            height: 'var(--size-md)',
            margin: 0,
            padding: 0,
            cursor: 'ns-resize',
            background: 'transparent',
            border: 0,
            borderBottom: '2px solid var(--color-stroke-drag-indicator)',
          }}
        />
      </div>
    )
  },
}

export const Loading: Story = {
  args: { status: 'loading' },
}

export const Empty: Story = {
  args: { status: 'empty', data: [] },
}
