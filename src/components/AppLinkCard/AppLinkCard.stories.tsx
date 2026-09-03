import React from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import MyPassesArt from '~img/ski-pass/my-passes.svg'
import RulesArt from '~img/ski-pass/rules.svg'
import FaqArt from '~img/ski-pass/faq.svg'

import { AppLinkCard } from '.'

const meta = {
  title: 'Components/AppLinkCard',
  component: AppLinkCard,
  args: { title: 'My ski passes and cards' },
} satisfies Meta<typeof AppLinkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Sidebar: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 350 }}
    >
      <AppLinkCard title="My ski passes and cards" artwork={<MyPassesArt />} />
      <AppLinkCard title="Ski-pass rules" artwork={<RulesArt />} />
      <AppLinkCard title="FAQ" artwork={<FaqArt />} href="#faq" />
    </div>
  ),
}
