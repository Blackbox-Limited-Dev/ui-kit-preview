import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppMessageBanner } from '.'

const meta = {
  title: 'Components/AppMessageBanner',
  component: AppMessageBanner,
  args: { children: 'Season 2025-2026. Valid on the day of purchase.' },
} satisfies Meta<typeof AppMessageBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AppMessageBanner variant="secondary">
        Season 2025-2026. Valid on the day of purchase.
      </AppMessageBanner>
      <AppMessageBanner variant="info">
        Approximate winter-season start — mid-November
      </AppMessageBanner>
      <AppMessageBanner variant="white">
        Approximate winter-season start — mid-November
      </AppMessageBanner>
      <AppMessageBanner variant="danger">
        Could not load tariffs
      </AppMessageBanner>
      <AppMessageBanner
        variant="danger"
        action={<button type="button">Retry</button>}
      >
        Could not load tariffs
      </AppMessageBanner>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AppMessageBanner variant="secondary" size="sm">
        14 / 140%
      </AppMessageBanner>
      <AppMessageBanner variant="secondary" size="md" align="start">
        Children are not allowed in the spa. Please use the playroom or ask a
        companion for help.
      </AppMessageBanner>
      <AppMessageBanner variant="info" size="md-condensed">
        Approximate winter-season start — mid-November
      </AppMessageBanner>
    </div>
  ),
}
