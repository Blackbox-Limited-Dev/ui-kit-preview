import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppPasswordInput } from '.'

const meta = {
  title: 'Components/AppPasswordInput',
  component: AppPasswordInput,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppPasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: { defaultValue: 'qwerty12345!' },
}

export const WithDescription: Story = {
  args: {
    id: 'password-with-description',
    description: 'At least 8 characters, one digit.',
  },
}

export const Error: Story = {
  args: {
    id: 'password-error',
    defaultValue: 'qwerty',
    error: 'Password is too short.',
  },
}

export const Disabled: Story = {
  args: { defaultValue: 'qwerty12345!', disabled: true },
}
