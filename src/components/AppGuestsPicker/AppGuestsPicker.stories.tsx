import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppGuestsPicker } from '.'

import type { AppGuestsValue } from '.'

const labels = {
  adultsLabel: 'Adults',
  adultsHint: 'From 13 y.o.',
  childrenLabel: 'Children',
  childrenHint: '2–12 y.o.',
  adultsDecreaseLabel: 'Fewer: Adults',
  adultsIncreaseLabel: 'More: Adults',
  childrenDecreaseLabel: 'Fewer: Children',
  childrenIncreaseLabel: 'More: Children',
}

const meta = {
  title: 'Components/AppGuestsPicker',
  component: AppGuestsPicker,
  args: { value: { adults: 2, children: 0 }, onChange: () => {}, ...labels },
} satisfies Meta<typeof AppGuestsPicker>

export default meta
type Story = StoryObj<typeof meta>

const Interactive = ({ initial }: { initial: AppGuestsValue }) => {
  const [value, setValue] = useState(initial)

  return (
    <div style={{ width: 288 }}>
      <AppGuestsPicker value={value} onChange={setValue} {...labels} />
    </div>
  )
}

export const Default: Story = {
  render: () => <Interactive initial={{ adults: 2, children: 0 }} />,
}

export const AtMinimum: Story = {
  render: () => <Interactive initial={{ adults: 1, children: 0 }} />,
}
