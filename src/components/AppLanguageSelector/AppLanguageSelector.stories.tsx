import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppLanguageSelector } from '.'

const meta = {
  title: 'Components/AppLanguageSelector',
  component: AppLanguageSelector,
  args: {
    language: 'ua',
  },
} satisfies Meta<typeof AppLanguageSelector>

export default meta
type Story = StoryObj<typeof meta>

export const UA: Story = {}
export const PL: Story = { args: { language: 'pl' } }
export const RO: Story = { args: { language: 'ro' } }

export const WithChangeHandler: Story = {
  args: {
    onLanguageChange: (language) => console.log('language', language),
  },
}

export const AllLanguages: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--size-sm)' }}>
      <AppLanguageSelector language="ua" />
      <AppLanguageSelector language="pl" />
      <AppLanguageSelector language="ro" />
    </div>
  ),
}
