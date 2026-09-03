import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppBadge } from '.'

const meta = {
  title: 'Components/AppBadge',
  component: AppBadge,
  args: {
    children: 'Ready',
  },
} satisfies Meta<typeof AppBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Success: Story = { args: { variant: 'success' } }
export const Warning: Story = {
  args: { variant: 'warning', children: 'In progress' },
}
export const Outline: Story = { args: { variant: 'outline', children: 'form' } }

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--size-sm)' }}>
      <AppBadge>Planned</AppBadge>
      <AppBadge variant="success">Ready</AppBadge>
      <AppBadge variant="warning">In progress</AppBadge>
      <AppBadge variant="outline">form</AppBadge>
    </div>
  ),
}

export const InAList: Story = {
  render: () => (
    <ul
      style={{
        display: 'flex',
        gap: 'var(--size-xs)',
        padding: 0,
        margin: 0,
        listStyle: 'none',
      }}
    >
      {['form', 'input', 'text-field'].map((tag) => (
        <AppBadge key={tag} as="li" variant="outline">
          {tag}
        </AppBadge>
      ))}
    </ul>
  ),
}
