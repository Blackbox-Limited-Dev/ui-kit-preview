import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSwitch } from '.'

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

const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Row>
      <AppSwitch
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Notifications"
      />
      <span>{checked ? 'on' : 'off'}</span>
    </Row>
  )
}

const meta = {
  title: 'Components/AppSwitch',
  component: AppSwitch,
  args: {
    'aria-label': 'Notifications',
  },
} satisfies Meta<typeof AppSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const DisabledOff: Story = { args: { disabled: true } }
export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const States: Story = {
  render: () => (
    <Row>
      <AppSwitch aria-label="Off" />
      <AppSwitch aria-label="On" defaultChecked />
      <AppSwitch aria-label="Disabled off" disabled />
      <AppSwitch aria-label="Disabled on" disabled defaultChecked />
    </Row>
  ),
}

export const ControlledState: Story = {
  render: () => <Controlled />,
}
