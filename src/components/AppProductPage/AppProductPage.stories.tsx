import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import mapImage from '~img/ski-pass/map.jpg'
import passThumb from '~img/ski-pass/pass-thumb.jpg'

import { AppProductPurchaseCard } from '../AppProductPurchaseCard'

import { AppProductPage } from '.'

const meta = {
  title: 'Components/AppProductPage',
  component: AppProductPage,
  args: { children: null },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppProductPage>

export default meta
type Story = StoryObj<typeof meta>

export const SkiPassPdp: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <AppProductPage
        aside={
          <AppProductPurchaseCard
            image={passThumb}
            imageAlt="5-day ski pass"
            title="5-day ski pass"
            meta={['Consecutive', '2025-2026']}
            ctaLabel="Book"
            ctaPrice="1 600 ₴"
          />
        }
      >
        <AppProductPage.Header
          title="5-day ski pass"
          meta={['Consecutive', '2025-2026']}
          specs={[
            { label: 'Valid from', value: 'On the day of purchase' },
            { label: 'Valid for', value: 'Two seasons' },
            { label: 'Night skiing', value: 'Included' },
            {
              label: 'Skiing period',
              value: 'Season start until 18 December, and from 17 March',
            },
          ]}
        />
        <AppProductPage.TextSection
          title="Description"
          paragraphs={[
            'You can now top up your card online with products that used to be sold only at the ticket office.',
            '**An unused ski pass, or any unused day of it, cannot be moved to another day.**',
          ]}
        />
        <AppProductPage.Checklist
          title="Pickup and activation"
          steps={[
            'Collect at the resort VIP ticket office',
            'Activate as a mobile ski pass or on a lift card',
          ]}
          note="Children are not allowed in the spa. Please use the playroom or ask a companion for help."
        />
        <AppProductPage.Faq
          title="FAQ"
          items={[
            {
              key: 'wristband',
              question: 'How does the wristband work?',
              answer: 'Tap the wristband on the turnstile at the entrance.',
            },
            {
              key: 'tickets',
              question: 'Do I need to buy tickets in advance?',
              answer:
                'Buying tickets in advance is optional, but recommended for weekend and holiday visits.',
            },
          ]}
        />
        <AppProductPage.Location
          title="Location"
          routeLabel="Get directions"
          copyAddressLabel="Copy address"
          location={{
            isOpen: true,
            openLabel: 'Open',
            closedLabel: 'Closed',
            hours: '8:00–22:00',
            address: 'Bike route No. 1 “Lake”, 5 km, mountain village',
            mapImage,
            mapAlt: 'Map of the ski-pass ticket office',
          }}
        />
      </AppProductPage>
    </div>
  ),
}
