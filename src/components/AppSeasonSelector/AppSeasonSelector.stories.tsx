import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppSeasonSelector } from '.'

import type { AppSeason } from '.'

const meta = {
  title: 'Components/AppSeasonSelector',
  component: AppSeasonSelector,
  args: {
    season: 'winter',
    onSeasonChange: () => {},
    labels: { winter: 'winter', summer: 'summer' },
  },
} satisfies Meta<typeof AppSeasonSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Winter: Story = {}
export const Summer: Story = { args: { season: 'summer' } }

const InteractiveDemo = () => {
  const [season, setSeason] = useState<AppSeason>('winter')

  return (
    <AppSeasonSelector
      season={season}
      onSeasonChange={setSeason}
      labels={{ winter: 'winter', summer: 'summer' }}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}
