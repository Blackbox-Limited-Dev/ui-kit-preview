import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import aquapark from '~img/ski-pass/off-season/aquapark-mavka.jpg'
import snowpark from '~img/ski-pass/off-season/snowpark.jpg'

import { AppMediaTile } from '.'

const meta = {
  title: 'Components/AppMediaTile',
  component: AppMediaTile,
  args: {
    image: aquapark,
    alt: 'Indoor water park in winter',
    caption: 'Water park',
  },
} satisfies Meta<typeof AppMediaTile>

export default meta
type Story = StoryObj<typeof meta>

export const Tall: Story = {
  render: (args) => (
    <div style={{ width: 672, height: 449 }}>
      <AppMediaTile {...args} sizes="672px" />
    </div>
  ),
}

export const Short: Story = {
  render: () => (
    <div style={{ width: 672, height: 294 }}>
      <AppMediaTile
        image={snowpark}
        alt="Snow park in winter"
        caption="Snow park"
        sizes="672px"
      />
    </div>
  ),
}
