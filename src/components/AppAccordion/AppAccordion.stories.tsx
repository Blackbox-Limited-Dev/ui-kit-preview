import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppAccordion } from '.'

const meta = {
  title: 'Components/AppAccordion',
  component: AppAccordion,
  args: { children: null },
} satisfies Meta<typeof AppAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const FilterGroups: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <AppAccordion defaultValue={['price']}>
        <AppAccordion.Item value="price" title="Price">
          <p>From / To</p>
        </AppAccordion.Item>
        <AppAccordion.Item value="type" title="Property type">
          <p>Hotel, Chalet, Apartments</p>
        </AppAccordion.Item>
        <AppAccordion.Item value="distance" title="Distance to lifts">
          <p>Walking, Transfer</p>
        </AppAccordion.Item>
      </AppAccordion>
    </div>
  ),
}

export const FaqCards: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <AppAccordion variant="card" defaultValue={['tickets']}>
        <AppAccordion.Item
          value="wristband"
          title="How does the wristband work?"
        >
          <p>Tap the wristband on the turnstile at the entrance.</p>
        </AppAccordion.Item>
        <AppAccordion.Item
          value="tickets"
          title="Do I need to buy tickets in advance?"
        >
          <p>
            Buying tickets in advance is optional, but recommended for weekend
            and holiday visits.
          </p>
        </AppAccordion.Item>
      </AppAccordion>
    </div>
  ),
}
