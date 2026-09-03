import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppPhoneInput } from '.'

import type {
  AppPhoneCountryIso,
  AppPhoneInputProps,
} from './AppPhoneInput.types'

// The component is controlled; the story owns the value and country state.
const Demo = (props: AppPhoneInputProps) => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState<AppPhoneCountryIso>('UA')

  return (
    <div style={{ maxWidth: '360px' }}>
      <AppPhoneInput
        {...props}
        value={value}
        onChange={setValue}
        country={country}
        onCountryChange={setCountry}
      />
    </div>
  )
}

const meta = {
  title: 'Components/AppPhoneInput',
  component: AppPhoneInput,
  args: {
    value: '',
    onChange: () => {},
    country: 'UA',
    onCountryChange: () => {},
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof AppPhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Phone number',
    required: true,
    description: 'We send the booking code to this number.',
  },
}

export const Error: Story = {
  args: { label: 'Phone number', error: 'Enter a full phone number.' },
}

export const Disabled: Story = {
  args: { label: 'Phone number', disabled: true },
}
