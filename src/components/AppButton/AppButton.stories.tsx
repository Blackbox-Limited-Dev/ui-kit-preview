import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppIcon } from '../AppIcon'

import { AppButton } from '.'

import type { AppButtonVariant } from './AppButton.types'

const variants: AppButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'outlined',
  'link',
  'error',
]

const Row = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--size-lg)',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
)

const meta = {
  title: 'Components/AppButton',
  component: AppButton,
  args: {
    children: 'Value',
    variant: 'primary',
    size: 'big',
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'inline-radio', options: ['big', 'small'] },
  },
} satisfies Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Tertiary: Story = { args: { variant: 'tertiary' } }
export const Outlined: Story = { args: { variant: 'outlined' } }
export const Link: Story = { args: { variant: 'link' } }
export const Error: Story = { args: { variant: 'error' } }

export const Small: Story = {
  render: () => (
    <Row>
      {variants.map((variant) => (
        <AppButton key={variant} variant={variant} size="small">
          Value
        </AppButton>
      ))}
    </Row>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Row>
      {variants.map((variant) => (
        <AppButton key={variant} variant={variant} disabled>
          Value
        </AppButton>
      ))}
    </Row>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <Row>
      <AppButton iconOnly aria-label="Search">
        <AppIcon name="Search" size="large" />
      </AppButton>
      <AppButton iconOnly variant="outlined" aria-label="Search">
        <AppIcon name="Search" size="large" />
      </AppButton>
      <AppButton iconOnly size="small" aria-label="Search">
        <AppIcon name="Search" />
      </AppButton>
      <AppButton iconOnly size="small" variant="outlined" aria-label="Search">
        <AppIcon name="Search" />
      </AppButton>
    </Row>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Row>
      <AppButton>
        <AppIcon name="ArrowRight" />
        Value · 1 600 ₴
        <AppIcon name="ArrowRight" />
      </AppButton>
      <AppButton variant="link">
        <AppIcon name="ArrowRight" />
        Value · 1 600 ₴
        <AppIcon name="ArrowRight" />
      </AppButton>
    </Row>
  ),
}

export const InternalLink: Story = {
  render: () => <AppButton href="#">Internal navigation (next/link)</AppButton>,
}

export const ExternalLink: Story = {
  render: () => (
    <AppButton href="https://example.com" external variant="outlined">
      External link (new tab)
    </AppButton>
  ),
}
