import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import MastercardIcon from '~icons/mastercard.svg'

import { AppIcon } from '~components'

import { AppInfoLabel } from '.'

const meta = {
  title: 'Components/AppInfoLabel',
  component: AppInfoLabel,
  args: { children: 'Ski pass' },
} satisfies Meta<typeof AppInfoLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
export const WithIcon: Story = {
  args: {
    icon: <AppIcon icon={MastercardIcon} size={16} />,
    children: '-5% with Mastercard',
  },
}
export const Counter: Story = { args: { children: '+3' } }
