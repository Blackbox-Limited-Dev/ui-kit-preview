import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppCutoutCard } from '.'

const meta = {
  title: 'Components/AppCutoutCard',
  component: AppCutoutCard,
  args: { children: <p>Slot</p> },
} satisfies Meta<typeof AppCutoutCard>

export default meta
type Story = StoryObj<typeof meta>

export const Positions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: 32,
        background: 'var(--color-background-bg-theme)',
      }}
    >
      {(['top', 'middle', 'bottom'] as const).map((notch) => (
        <div key={notch} style={{ width: 240 }}>
          <AppCutoutCard notch={notch}>
            <div style={{ height: 260 }}>{notch}</div>
          </AppCutoutCard>
        </div>
      ))}
    </div>
  ),
}
