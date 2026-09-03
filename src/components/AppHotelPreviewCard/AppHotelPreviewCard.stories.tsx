import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import NightIcon from '~icons/night.svg'
import hotelPhoto from '~img/nav/hotels-apartments.jpg'

import { AppHotelPreviewCard } from '.'

const meta = {
  title: 'Components/AppHotelPreviewCard',
  component: AppHotelPreviewCard,
  args: {
    name: 'Alpine Apart',
    stars: 3,
    datesLabel: '17–19 February',
    price: 5300,
    nightsLabel: '2 nights',
    oldPrice: 6235,
    discount: '-20%',
    labels: [
      { icon: NightIcon, text: 'VIP access' },
      { icon: NightIcon, text: 'Spa -20%' },
    ],
    photo: { src: hotelPhoto, alt: 'Alpine Apart apartments' },
    starsLabel: '3 out of 5',
    favouriteLabel: 'Add to favourites',
  },
} satisfies Meta<typeof AppHotelPreviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutLabels: Story = {
  args: { labels: undefined, discount: undefined },
}
