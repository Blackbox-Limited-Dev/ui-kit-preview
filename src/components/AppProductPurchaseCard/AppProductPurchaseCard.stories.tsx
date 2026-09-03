import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import passThumb from '~img/ski-pass/pass-thumb.jpg'

import { AppProductPurchaseCard } from '.'

const meta = {
  title: 'Components/AppProductPurchaseCard',
  component: AppProductPurchaseCard,
  args: {
    image: passThumb,
    imageAlt: '5-day ski pass',
    title: '5-day ski pass',
    ctaLabel: 'Book',
    ctaPrice: '1 600 ₴',
  },
} satisfies Meta<typeof AppProductPurchaseCard>

export default meta
type Story = StoryObj<typeof meta>

const WithTariffs = () => {
  const [tariff, setTariff] = useState('standard')
  const [liked, setLiked] = useState(false)

  return (
    <div style={{ width: 350 }}>
      <AppProductPurchaseCard
        image={passThumb}
        imageAlt="5-day ski pass"
        title="5-day ski pass"
        meta={['Consecutive', '2025-2026']}
        tariffs={[
          { value: 'standard', caption: 'Standard', price: '1 600 ₴' },
          { value: 'vip', caption: 'VIP access', price: '3 750 ₴' },
        ]}
        tariff={tariff}
        onTariffChange={setTariff}
        tariffsLabel="Tariff"
        ctaLabel="Book"
        ctaPrice="1 600 ₴"
        favouriteLabel="Add to favourites"
        liked={liked}
        onLikedChange={setLiked}
      />
    </div>
  )
}

export const SkiPass: Story = { render: () => <WithTariffs /> }

export const LiftCard: Story = {
  render: () => (
    <div style={{ width: 350 }}>
      <AppProductPurchaseCard
        image={passThumb}
        imageAlt="Lift card"
        title="Lift card"
        meta={['Plastic card']}
        ctaLabel="Book"
        ctaPrice="1 600 ₴"
      />
    </div>
  ),
}
