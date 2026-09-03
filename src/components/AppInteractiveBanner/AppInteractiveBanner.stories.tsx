import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppInteractiveBanner } from '.'

const meta = {
  title: 'Components/AppInteractiveBanner',
  component: AppInteractiveBanner,
  args: {
    title: 'Book early — pay less',
    description: 'Discounts on early booking for the winter season',
    label: 'up to -20%',
  },
} satisfies Meta<typeof AppInteractiveBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutLabel: Story = { args: { label: undefined } }
