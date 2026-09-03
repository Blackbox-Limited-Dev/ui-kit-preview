import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppFooterLink } from '.'

const meta = {
  title: 'Components/AppFooterLink',
  component: AppFooterLink,
  args: {
    href: '#',
    children: 'Hotel booking rules',
  },
} satisfies Meta<typeof AppFooterLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const External: Story = {
  args: { external: true, children: 'For investors' },
}

export const InAList: Story = {
  render: () => (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-lg)',
        padding: 0,
        margin: 0,
        listStyle: 'none',
      }}
    >
      {['Blog', 'News', 'Contacts', 'Shuttle bus'].map((label) => (
        <li key={label}>
          <AppFooterLink href="#">{label}</AppFooterLink>
        </li>
      ))}
    </ul>
  ),
}
