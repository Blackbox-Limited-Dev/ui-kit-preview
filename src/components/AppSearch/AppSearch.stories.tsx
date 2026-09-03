import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSearch } from '.'

const meta = {
  title: 'Components/AppSearch',
  component: AppSearch,
  args: {
    'aria-label': 'Search',
    placeholder: 'Search anything',
  },
} satisfies Meta<typeof AppSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'cable car' } }
