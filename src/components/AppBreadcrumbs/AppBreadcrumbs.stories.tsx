import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppBreadcrumbs } from '.'

const meta = {
  title: 'Components/AppBreadcrumbs',
  component: AppBreadcrumbs,
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Hotels', href: '/hotels' },
      { label: 'Hotel search' },
    ],
    ariaLabel: 'Breadcrumb',
  },
} satisfies Meta<typeof AppBreadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeLevels: Story = {}
export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Hotels' }],
  },
}
