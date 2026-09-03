import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import NotificationsBell from '~icons/notifications-bell.svg'

import { AppNavLinkItem } from '.'

const meta = {
  title: 'Components/AppNavLinkItem',
  component: AppNavLinkItem,
  args: {
    label: 'Menu',
    name: 'Menu',
  },
} satisfies Meta<typeof AppNavLinkItem>

export default meta
type Story = StoryObj<typeof meta>

export const RegistryIcon: Story = {}

export const CustomIcon: Story = {
  args: { label: 'Notifications', icon: NotificationsBell },
}

export const WithCount: Story = {
  args: { label: 'Cart', name: 'Cart', count: 3 },
}

export const WithLargeCount: Story = {
  args: { label: 'Cart', name: 'Cart', count: 150 },
}

export const AsLink: Story = {
  args: { label: 'Search', name: 'Search', href: '/search' },
}
