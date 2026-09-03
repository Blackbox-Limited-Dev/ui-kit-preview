import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppIcon } from '../AppIcon'

import { AppInput } from '.'

const Column = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--size-lg)',
      maxWidth: '360px',
    }}
  >
    {children}
  </div>
)

const meta = {
  title: 'Components/AppInput',
  component: AppInput,
  args: {
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof AppInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabelAndDescription: Story = {
  args: {
    id: 'input-with-description',
    label: 'Email',
    description: 'We only use it for booking confirmations.',
  },
}

export const Required: Story = {
  args: { label: 'Email', required: true },
}

export const WithSlots: Story = {
  render: (args) => (
    <Column>
      <AppInput
        {...args}
        label="Leading icon"
        slotLeft={<AppIcon name="Search" size={24} />}
      />
      <AppInput
        {...args}
        label="Trailing icon"
        slotRight={<AppIcon name="InfoCircle" size={24} />}
      />
      <AppInput
        {...args}
        label="Both icons"
        slotLeft={<AppIcon name="Search" size={24} />}
        slotRight={<AppIcon name="InfoCircle" size={24} />}
      />
      <AppInput {...args} label="Text appendix" slotRight="kg" />
    </Column>
  ),
}

export const Error: Story = {
  args: {
    id: 'input-error',
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.',
  },
}

export const Disabled: Story = {
  args: { label: 'Email', defaultValue: 'user@example.com', disabled: true },
}

export const States: Story = {
  render: (args) => (
    <Column>
      <AppInput {...args} label="Default" />
      <AppInput {...args} label="Filled" defaultValue="Value" />
      <AppInput {...args} label="Error" error="Something is off." />
      <AppInput {...args} label="Disabled" disabled />
    </Column>
  ),
}
