import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppOtpInput } from '.'

import type { AppOtpInputProps } from './AppOtpInput.types'

// The component is controlled; the story owns the code state.
const Demo = (props: AppOtpInputProps) => {
  const [value, setValue] = useState('')

  return (
    <div style={{ maxWidth: '360px' }}>
      <AppOtpInput {...props} value={value} onChange={setValue} />
    </div>
  )
}

const meta = {
  title: 'Components/AppOtpInput',
  component: AppOtpInput,
  args: {
    value: '',
    onChange: () => {},
    'aria-label': 'Confirmation code',
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof AppOtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SixDigits: Story = {
  args: { length: 6 },
}

export const Error: Story = {
  args: { error: 'That code is not valid.' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Filled: Story = {
  render: (args) => <AppOtpInput {...args} value="1234" onChange={() => {}} />,
}
