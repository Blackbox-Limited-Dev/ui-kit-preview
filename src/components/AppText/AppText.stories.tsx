import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppText } from '.'

import type { AppTextVariant } from './AppText.types'

const headerVariants: AppTextVariant[] = [
  'hero',
  'display-1',
  'display-2',
  'display-3',
  'title-1',
  'title-2',
  'title-3',
]

const bodyVariants: AppTextVariant[] = [
  'body-xlarge-regular',
  'body-xlarge-medium',
  'body-xlarge-semibold',
  'body-large-regular',
  'body-large-medium',
  'body-large-semibold',
  'body-1-regular',
  'body-1-medium',
  'body-1-semibold',
  'body-2-regular',
  'body-2-medium',
  'body-2-semibold',
  'caption-regular',
  'caption-medium',
  'caption-semibold',
]

const utilityVariants: AppTextVariant[] = ['overline', 'date-number']

const allVariants: AppTextVariant[] = [
  ...headerVariants,
  ...bodyVariants,
  ...utilityVariants,
]

const Specimens = ({
  variants,
  text,
}: {
  variants: AppTextVariant[]
  text: string
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--size-xl)',
      padding: 'var(--size-lg)',
    }}
  >
    {variants.map((variant) => (
      <div key={variant}>
        <AppText
          variant="caption-regular"
          style={{ color: 'var(--color-text-on-surface-subtle)' }}
        >
          {variant}
        </AppText>
        <AppText variant={variant}>{text}</AppText>
      </div>
    ))}
  </div>
)

const meta = {
  title: 'Components/AppText',
  component: AppText,
  args: {
    children: 'Alpine resort — winter and summer in the mountains',
    variant: 'body-1-regular',
  },
  argTypes: {
    variant: { control: 'select', options: allVariants },
    as: { control: false },
  },
} satisfies Meta<typeof AppText>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Headers: Story = {
  render: () => <Specimens variants={headerVariants} text="Alpine Resort" />,
}

export const Body: Story = {
  render: () => (
    <Specimens
      variants={bodyVariants}
      text="Twelve lifts, 100 km of slopes, and a lake that turns into a skating rink."
    />
  ),
}

export const Utility: Story = {
  render: () => <Specimens variants={utilityVariants} text="24 December" />,
}
