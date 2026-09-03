import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import hotelChalet from '~img/nav/hotels-chalet.jpg'
import hotelPhoto from '~img/nav/hotels-hotels.jpg'

import { AppHotelDatesCard } from '.'

const meta = {
  title: 'Components/AppHotelDatesCard',
  component: AppHotelDatesCard,
  args: {
    name: 'White House Hotel',
    stars: 3,
    distanceLabel: '50 m from lift No. 3',
    monobank: true,
    discount: '-20%',
    photos: [
      { src: hotelPhoto, alt: 'White House hotel facade' },
      { src: hotelChalet, alt: 'Chalet in winter' },
    ],
    selectLabel: 'Select a room',
    installmentsLabel: 'Pay in instalments with monobank',
    starsLabel: '3 out of 5',
    galleryLabels: {
      favourite: 'Add to favourites',
      prevPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
    },
    offers: [
      {
        dates: '03–05 April',
        board: 'Room only',
        priceLabel: 'from 2 000 ₴',
        nightsLabel: 'for 2 nights',
      },
      {
        dates: '10–12 April',
        board: 'With breakfast',
        priceLabel: 'from 2 400 ₴',
        nightsLabel: 'for 2 nights',
      },
    ],
  },
} satisfies Meta<typeof AppHotelDatesCard>

export default meta
type Story = StoryObj<typeof meta>

const wide = [
  (Story: () => React.ReactElement) => (
    <div style={{ width: 970 }}>
      <Story />
    </div>
  ),
]

export const Default: Story = { decorators: wide }

export const WithoutOptionalLabels: Story = {
  args: { distanceLabel: undefined, installmentsLabel: undefined },
  decorators: wide,
}
