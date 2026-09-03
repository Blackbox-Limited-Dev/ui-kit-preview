import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppTabsPill } from '.'

const meta = {
  title: 'Components/AppTabsPill',
  component: AppTabsPill,
  args: {
    items: [
      { value: 'list', label: 'List' },
      { value: 'map', label: 'Map', disabled: true },
    ],
    value: 'list',
    onChange: () => {},
  },
} satisfies Meta<typeof AppTabsPill>

export default meta
type Story = StoryObj<typeof meta>

const Interactive = ({ size }: { size: 'xl' | 'md' }) => {
  const [value, setValue] = useState('list')

  return (
    <AppTabsPill
      items={[
        { value: 'list', label: 'List' },
        { value: 'map', label: 'Map', disabled: true },
      ]}
      value={value}
      onChange={setValue}
      size={size}
      aria-label="Results view"
    />
  )
}

export const Xl: Story = { render: () => <Interactive size="xl" /> }
export const Md: Story = { render: () => <Interactive size="md" /> }

const Usage = ({ tone }: { tone: 'on-surface' | 'on-card' }) => {
  const [value, setValue] = useState('consecutive')

  return (
    <AppTabsPill
      items={[
        { value: 'consecutive', label: 'Consecutive' },
        { value: 'flexible', label: 'Flexible' },
      ]}
      value={value}
      onChange={setValue}
      size="md"
      tone={tone}
      stretch
      aria-label="Usage type"
    />
  )
}

export const StretchOnSurface: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Usage tone="on-surface" />
    </div>
  ),
}

export const StretchOnCard: Story = {
  render: () => (
    <div
      style={{
        width: 480,
        padding: 24,
        borderRadius: 24,
        background: 'var(--color-background-bg-theme)',
      }}
    >
      <Usage tone="on-card" />
    </div>
  ),
}
