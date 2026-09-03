import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppStatusLabel } from '.'

const meta = {
  title: 'Components/AppStatusLabel',
  component: AppStatusLabel,
  args: { children: '-20%' },
} satisfies Meta<typeof AppStatusLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Discount: Story = {}
export const Text: Story = { args: { children: 'up to -20%' } }

export const Levels: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <AppStatusLabel level="red">-20%</AppStatusLabel>
      <AppStatusLabel level="green">Open</AppStatusLabel>
      <AppStatusLabel level="blue">24 days left in the season</AppStatusLabel>
      <AppStatusLabel level="purple">VIP</AppStatusLabel>
    </div>
  ),
}
