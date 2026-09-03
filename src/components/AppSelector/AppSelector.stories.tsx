import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSelector } from '.'

const MONTHS = [
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
]

const meta = {
  title: 'Components/AppSelector',
  component: AppSelector,
  args: {
    label: 'Month',
    items: MONTHS,
    value: '10',
  },
} satisfies Meta<typeof AppSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Placeholder: Story = {
  args: { value: undefined, placeholder: 'March' },
}

export const FullWidthPanel: Story = {
  args: { fullWidth: true },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown panel width matches the trigger width.',
      },
    },
  },
}
