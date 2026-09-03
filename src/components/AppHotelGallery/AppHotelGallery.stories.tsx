import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import hotelApartments from '~img/nav/hotels-apartments.jpg'
import hotelChalet from '~img/nav/hotels-chalet.jpg'
import hotelPhoto from '~img/nav/hotels-hotels.jpg'

import { AppHotelGallery } from '.'

const meta = {
  title: 'Components/AppHotelGallery',
  component: AppHotelGallery,
  args: {
    photos: [
      { src: hotelPhoto, alt: 'Hotel facade' },
      { src: hotelChalet, alt: 'Chalet in winter' },
      { src: hotelApartments, alt: 'Room interior' },
    ],
    labels: {
      favourite: 'Add to favourites',
      prevPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 333, height: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppHotelGallery>

export default meta
type Story = StoryObj<typeof meta>

export const ThreePhotos: Story = {}
export const WithDiscount: Story = { args: { statusLabel: '-20%' } }
export const SinglePhoto: Story = {
  args: { photos: [{ src: hotelPhoto, alt: 'Hotel facade' }] },
}
