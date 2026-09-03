import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Skipass from '~assets/illustrations/cta/skipass-card.svg'

import { AppNavAction } from '.'

const meta = {
  title: 'Components/AppNavAction',
  component: AppNavAction,
  args: {
    children: 'Ski passes',
    illustration: Skipass,
  },
} satisfies Meta<typeof AppNavAction>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDot: Story = { args: { showDot: true } }

export const WithoutIllustration: Story = {
  args: { illustration: undefined, children: 'Medical centre' },
}

export const AsLink: Story = { args: { href: '#' } }
