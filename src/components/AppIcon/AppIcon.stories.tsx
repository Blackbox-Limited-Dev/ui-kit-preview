import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Mountain from '~icons/mountain.svg'

import { AppIcon } from '.'
import { iconoirIcons } from './AppIcon.iconoir'

const meta = {
  title: 'Components/AppIcon',
  component: AppIcon,
  args: {
    name: 'ArrowRight',
    size: 'medium',
  },
} satisfies Meta<typeof AppIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'small' } }
export const Medium: Story = { args: { size: 'medium' } }
export const Large: Story = { args: { size: 'large' } }
export const CustomNumber: Story = { args: { size: 48 } }

export const WithLabel: Story = {
  args: { label: 'Next page' },
}

export const CustomSvg: Story = {
  args: { size: 'large' },
  render: (args) => <AppIcon icon={Mountain} size={args.size} />,
}

export const Gallery: Story = {
  args: { size: 'medium' },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 'var(--size-lg)',
        padding: 'var(--size-lg)',
      }}
    >
      {(Object.keys(iconoirIcons) as Array<keyof typeof iconoirIcons>).map(
        (key) => (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--size-xs)',
              alignItems: 'center',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-on-surface-subtle)',
            }}
          >
            <AppIcon name={key} size={args.size} />
            <span>{key}</span>
          </div>
        )
      )}
    </div>
  ),
}
