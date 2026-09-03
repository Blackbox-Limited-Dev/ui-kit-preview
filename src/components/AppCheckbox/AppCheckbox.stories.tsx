import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppCheckbox } from '.'

const Column = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--size-md)',
      alignItems: 'flex-start',
    }}
  >
    {children}
  </div>
)

const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Column>
      <AppCheckbox
        id="checkbox-controlled"
        checked={checked}
        onCheckedChange={setChecked}
        label="Controlled by the story state"
      />
      <span>{checked ? 'checked' : 'unchecked'}</span>
    </Column>
  )
}

const meta = {
  title: 'Components/AppCheckbox',
  component: AppCheckbox,
  args: {
    id: 'checkbox-story',
    label: 'Value',
  },
} satisfies Meta<typeof AppCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = {
  args: { id: 'checkbox-checked', defaultChecked: true },
}
export const Disabled: Story = {
  args: { id: 'checkbox-disabled', disabled: true },
}
export const DisabledChecked: Story = {
  args: {
    id: 'checkbox-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    id: 'checkbox-without-label',
    label: undefined,
    'aria-label': 'Value',
  },
}

export const States: Story = {
  render: () => (
    <Column>
      <AppCheckbox id="checkbox-states-unchecked" label="Unchecked" />
      <AppCheckbox
        id="checkbox-states-checked"
        label="Checked"
        defaultChecked
      />
      <AppCheckbox id="checkbox-states-disabled" label="Disabled" disabled />
      <AppCheckbox
        id="checkbox-states-disabled-checked"
        label="Disabled checked"
        disabled
        defaultChecked
      />
    </Column>
  ),
}

export const ControlledState: Story = {
  render: () => <Controlled />,
}
