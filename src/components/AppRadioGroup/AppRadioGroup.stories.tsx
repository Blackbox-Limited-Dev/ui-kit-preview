import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppRadioGroup } from '.'

const Controlled = () => {
  const [value, setValue] = useState('one')

  return (
    <AppRadioGroup value={value} onValueChange={setValue} aria-label="Value">
      <AppRadioGroup.Item id="radio-controlled-one" value="one" label="One" />
      <AppRadioGroup.Item id="radio-controlled-two" value="two" label="Two" />
      <AppRadioGroup.Item
        id="radio-controlled-three"
        value="three"
        label={`Three — selected: ${value}`}
      />
    </AppRadioGroup>
  )
}

const meta = {
  title: 'Components/AppRadioGroup',
  component: AppRadioGroup,
  args: {
    'aria-label': 'Value',
    defaultValue: 'one',
    children: null,
  },
} satisfies Meta<typeof AppRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AppRadioGroup {...args}>
      <AppRadioGroup.Item id="radio-default-one" value="one" label="One" />
      <AppRadioGroup.Item id="radio-default-two" value="two" label="Two" />
      <AppRadioGroup.Item
        id="radio-default-three"
        value="three"
        label="Three"
      />
    </AppRadioGroup>
  ),
}

export const Horizontal: Story = {
  render: (args) => (
    <AppRadioGroup {...args} orientation="horizontal">
      <AppRadioGroup.Item id="radio-horizontal-one" value="one" label="One" />
      <AppRadioGroup.Item id="radio-horizontal-two" value="two" label="Two" />
      <AppRadioGroup.Item
        id="radio-horizontal-three"
        value="three"
        label="Three"
      />
    </AppRadioGroup>
  ),
}

export const States: Story = {
  render: (args) => (
    <AppRadioGroup {...args}>
      <AppRadioGroup.Item id="radio-states-one" value="one" label="Checked" />
      <AppRadioGroup.Item id="radio-states-two" value="two" label="Unchecked" />
      <AppRadioGroup.Item
        id="radio-states-three"
        value="three"
        label="Disabled"
        disabled
      />
    </AppRadioGroup>
  ),
}

export const DisabledChecked: Story = {
  render: (args) => (
    <AppRadioGroup {...args} defaultValue="two">
      <AppRadioGroup.Item
        id="radio-disabled-one"
        value="one"
        label="Disabled unchecked"
        disabled
      />
      <AppRadioGroup.Item
        id="radio-disabled-two"
        value="two"
        label="Disabled checked"
        disabled
      />
    </AppRadioGroup>
  ),
}

export const WholeGroupDisabled: Story = {
  render: (args) => (
    <AppRadioGroup {...args} disabled>
      <AppRadioGroup.Item
        id="radio-group-disabled-one"
        value="one"
        label="One"
      />
      <AppRadioGroup.Item
        id="radio-group-disabled-two"
        value="two"
        label="Two"
      />
    </AppRadioGroup>
  ),
}

export const ControlledState: Story = {
  render: () => <Controlled />,
}
