import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppButton } from '~components'

import { AppDrawer } from '.'

const meta = {
  title: 'Components/AppDrawer',
  component: AppDrawer,
  args: { open: false, onOpenChange: () => {}, children: null },
} satisfies Meta<typeof AppDrawer>

export default meta
type Story = StoryObj<typeof meta>

const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <AppDrawer
      open={open}
      onOpenChange={setOpen}
      trigger={<AppButton variant="outlined">Filters</AppButton>}
    >
      <AppDrawer.Header closeLabel="Close">Filters</AppDrawer.Header>
      <AppDrawer.Body>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i}>Filter row {i + 1}</p>
        ))}
      </AppDrawer.Body>
      <AppDrawer.Footer>
        <AppButton onClick={() => setOpen(false)}>Show 12</AppButton>
        <AppButton variant="outlined">Clear</AppButton>
      </AppDrawer.Footer>
    </AppDrawer>
  )
}

export const Default: Story = { render: () => <Interactive /> }

const WithoutClose = () => {
  const [open, setOpen] = useState(false)

  return (
    <AppDrawer
      open={open}
      onOpenChange={setOpen}
      trigger={<AppButton variant="outlined">Filters</AppButton>}
    >
      <AppDrawer.Header>Filters</AppDrawer.Header>
      <AppDrawer.Body>
        <p>Closes via the footer action, swipe, or Esc.</p>
      </AppDrawer.Body>
      <AppDrawer.Footer>
        <AppButton onClick={() => setOpen(false)}>Show 12</AppButton>
      </AppDrawer.Footer>
    </AppDrawer>
  )
}

export const WithoutCloseButton: Story = { render: () => <WithoutClose /> }
