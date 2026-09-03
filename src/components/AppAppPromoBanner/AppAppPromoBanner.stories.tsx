import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppAppPromoBanner } from '.'

const meta = {
  title: 'Components/AppAppPromoBanner',
  component: AppAppPromoBanner,
  args: {
    title: 'Be the first to know when the slopes open',
    body: 'Turn on notifications in the app — we will let you know as soon as ski-pass sales start for the new season.',
    appStoreHref: 'https://apps.apple.com',
    appStoreLabel: 'Download the app on the App Store',
    googlePlayHref: 'https://play.google.com',
    googlePlayLabel: 'Download the app on Google Play',
    photoAlt: 'The mobile app on a smartphone screen',
  },
} satisfies Meta<typeof AppAppPromoBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
