import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppMetaList } from '.'

const meta = {
  title: 'Components/AppMetaList',
  component: AppMetaList,
  args: { items: ['Consecutive', '2025-2026'] },
} satisfies Meta<typeof AppMetaList>

export default meta
type Story = StoryObj<typeof meta>

export const Subtle: Story = {}

export const Disabled: Story = {
  args: { tone: 'disabled', items: ['5 days', 'Consecutive'] },
}

export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AppMetaList gap={8} items={['Consecutive', '2025-2026']} />
      <AppMetaList
        gap={10}
        items={[
          <strong key="price">From 2 125 ₴ / day</strong>,
          '19 December – 1 January',
          '7 January – 16 March',
        ]}
      />
      <AppMetaList
        gap={12}
        items={['19 December – 1 January', '7 January – 16 March']}
      />
    </div>
  ),
}
