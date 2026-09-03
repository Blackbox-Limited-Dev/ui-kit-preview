import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppMap, AppMapSummer } from '.'

const meta = {
  title: 'Screens/AppMap',
  component: AppMap,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    theme: 'winter',
  },
} satisfies Meta<typeof AppMap>

export default meta
type Story = StoryObj<typeof meta>

export const WinterSki: Story = {}

export const SummerPins: Story = {
  globals: {
    theme: 'summer',
  },
  render: () => <AppMapSummer />,
}
