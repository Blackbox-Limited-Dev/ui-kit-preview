import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import MastercardIcon from '~icons/mastercard.svg'
import VipIcon from '~icons/vip.svg'
import hotelChalet from '~img/nav/hotels-chalet.jpg'
import hotelPhoto from '~img/nav/hotels-hotels.jpg'

import { AppHotelCard } from '.'

import type { Hotel } from '.'

const hotel: Hotel = {
  id: 'white-house',
  name: 'White House Hotel',
  stars: 3,
  distanceLabel: '100 m from lift 12',
  roomType: 'All inclusive',
  roomTypesCount: 5,
  priceFrom: 3500,
  oldPrice: 4000,
  nightsLabel: '3 nights from',
  discount: '-20%',
  labels: [
    { icon: MastercardIcon, text: '-5% with Mastercard' },
    { icon: VipIcon, text: 'Ski pass' },
    { text: '+3' },
  ],
  photos: [
    { src: hotelPhoto, alt: 'White House hotel facade' },
    { src: hotelChalet, alt: 'Chalet in winter' },
  ],
  monobank: true,
}

const meta = {
  title: 'Components/AppHotelCard',
  component: AppHotelCard,
  args: {
    layout: 'vertical',
    hotel,
    selectLabel: 'Select a room',
    installmentsLabel: 'Pay in instalments with monobank',
    roomTypesCountLabel: `${hotel.roomTypesCount} more room types`,
    starsLabel: `${hotel.stars} out of 5`,
    galleryLabels: {
      favourite: 'Add to favourites',
      prevPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
    },
  },
} satisfies Meta<typeof AppHotelCard>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 373 }}>
        <Story />
      </div>
    ),
  ],
}

export const Responsive: Story = {
  args: { layout: 'responsive' },
  decorators: [
    (Story) => (
      <div style={{ width: 970 }}>
        <Story />
      </div>
    ),
  ],
}
