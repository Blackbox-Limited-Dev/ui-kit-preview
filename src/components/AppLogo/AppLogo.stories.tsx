import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppLogo } from '.'

const meta = {
  title: 'Components/AppLogo',
  component: AppLogo,
  args: { label: 'Brand logo' },
} satisfies Meta<typeof AppLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Big: Story = {}
export const Small: Story = { args: { size: 'small' } }
