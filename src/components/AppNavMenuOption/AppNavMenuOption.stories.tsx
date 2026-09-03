import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ogImage from '~img/og-image.png'

import { AppNavMenuOption } from '.'

const meta = {
  title: 'Components/AppNavMenuOption',
  component: AppNavMenuOption,
  args: {
    image: ogImage,
    alt: 'Mountain hotel in winter',
    title: 'Hotels',
    href: '/hotels',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppNavMenuOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { description: 'From 1 200 ₴ per night' },
}
