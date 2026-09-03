import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppMegaTabs } from '.'

const meta = {
  title: 'Components/AppMegaTabs',
  component: AppMegaTabs,
  args: {
    items: [
      { value: 'standard', caption: 'Standard', price: '1 600 ₴' },
      { value: 'vip', caption: 'VIP access', price: '3 750 ₴' },
    ],
    value: 'standard',
    onChange: () => {},
  },
} satisfies Meta<typeof AppMegaTabs>

export default meta
type Story = StoryObj<typeof meta>

const Interactive = ({ third }: { third: boolean }) => {
  const [value, setValue] = useState('standard')
  const items = [
    { value: 'standard', caption: 'Standard', price: '1 600 ₴' },
    { value: 'vip', caption: 'VIP access', price: '3 750 ₴' },
    ...(third
      ? [{ value: 'brilliant', caption: 'Brilliant', price: '7 980 ₴' }]
      : []),
  ]

  return (
    <div style={{ width: 302 }}>
      <AppMegaTabs
        items={items}
        value={value}
        onChange={setValue}
        aria-label="Tariff"
      />
    </div>
  )
}

export const TwoTabs: Story = { render: () => <Interactive third={false} /> }
export const ThreeTabs: Story = { render: () => <Interactive third /> }
