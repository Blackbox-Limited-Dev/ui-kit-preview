import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppBulletPoint } from '.'

const meta = {
  title: 'Components/AppBulletPoint',
  component: AppBulletPoint,
  args: { children: 'Collect at the resort VIP ticket office' },
} satisfies Meta<typeof AppBulletPoint>

export default meta
type Story = StoryObj<typeof meta>

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AppBulletPoint type="check">
        Collect at the resort VIP ticket office
      </AppBulletPoint>
      <AppBulletPoint type="attention">
        A valid ID document is required
      </AppBulletPoint>
      <AppBulletPoint type="info">
        Activate as a mobile ski pass or on a lift card
      </AppBulletPoint>
    </div>
  ),
}
