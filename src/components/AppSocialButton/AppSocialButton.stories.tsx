import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSocialButton } from '.'

const meta = {
  title: 'Components/AppSocialButton',
  component: AppSocialButton,
  args: {
    brand: 'instagram',
    href: 'https://www.instagram.com',
  },
} satisfies Meta<typeof AppSocialButton>

export default meta
type Story = StoryObj<typeof meta>

export const Instagram: Story = {}
export const Facebook: Story = {
  args: { brand: 'facebook', href: 'https://www.facebook.com' },
}
export const Telegram: Story = {
  args: { brand: 'telegram', href: 'https://t.me' },
}

export const AllBrands: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--size-sm)' }}>
      <AppSocialButton brand="instagram" href="https://www.instagram.com" />
      <AppSocialButton brand="facebook" href="https://www.facebook.com" />
      <AppSocialButton brand="telegram" href="https://t.me" />
    </div>
  ),
}
