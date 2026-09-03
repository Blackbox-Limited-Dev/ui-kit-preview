import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSeasonCard } from '.'

const meta = {
  title: 'Components/AppSeasonCard',
  component: AppSeasonCard,
  args: {
    variant: 'neutral',
    title: 'Day ski passes',
    priceLabel: 'Price from',
    price: '1 200 ₴',
    priceUnit: '/ day',
    href: '/skipass',
    actionLabel: 'Go to ski passes',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 246 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppSeasonCard>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const Low: Story = {
  args: {
    variant: 'low',
    title: 'Low season',
    dates: ['01.12 — 20.12', '10.01 — 15.02'],
  },
}

export const High: Story = {
  args: {
    variant: 'high',
    title: 'High season',
    badge: 'Popular',
    dates: ['21.12 — 09.01', '16.02 — 10.03'],
  },
}

export const Holiday: Story = {
  args: {
    variant: 'holiday',
    title: 'Holiday season',
    dates: ['31.12 — 07.01'],
  },
}
