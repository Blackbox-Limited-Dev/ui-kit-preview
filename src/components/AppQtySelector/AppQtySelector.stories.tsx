import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppQtySelector } from '.'

const meta = {
  title: 'Components/AppQtySelector',
  component: AppQtySelector,
  args: { decreaseLabel: 'Decrease', increaseLabel: 'Increase' },
} satisfies Meta<typeof AppQtySelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MinWithDelete: Story = {
  args: { onDelete: () => {}, deleteLabel: 'Remove' },
}

export const Disabled: Story = {
  args: { defaultValue: 3, disabled: true },
}

export const MaxClamped: Story = {
  args: { defaultValue: 5, max: 5 },
}

export const ZeroBased: Story = {
  args: { min: 0, max: 10 },
}
