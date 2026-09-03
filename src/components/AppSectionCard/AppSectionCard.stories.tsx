import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSectionCard } from '.'

const meta = {
  title: 'Components/AppSectionCard',
  component: AppSectionCard,
  args: {
    title: 'Description',
    children: <p>You can now top up your card online.</p>,
  },
} satisfies Meta<typeof AppSectionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Inside: Story = {}
export const InsideFlush: Story = { args: { padded: false } }
export const Outside: Story = { args: { titlePlacement: 'outside' } }
export const OutsideFlush: Story = {
  args: { titlePlacement: 'outside', padded: false },
}
