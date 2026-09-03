import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppHotelStars } from '.'

const meta = {
  title: 'Components/AppHotelStars',
  component: AppHotelStars,
  args: { count: 3, label: '3 stars' },
} satisfies Meta<typeof AppHotelStars>

export default meta
type Story = StoryObj<typeof meta>

export const Three: Story = {}
export const Five: Story = { args: { count: 5, label: '5 stars' } }
export const One: Story = { args: { count: 1, label: '1 star' } }
