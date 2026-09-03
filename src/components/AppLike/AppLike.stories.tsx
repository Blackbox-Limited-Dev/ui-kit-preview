import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppLike } from '.'

const meta = {
  title: 'Components/AppLike',
  component: AppLike,
  args: {
    isLiked: false,
    onChange: () => {},
    label: 'Add to favourites',
  },
} satisfies Meta<typeof AppLike>

export default meta
type Story = StoryObj<typeof meta>

const ControlledLike = ({ disabled }: { disabled?: boolean }) => {
  const [liked, setLiked] = useState(false)
  return (
    <AppLike
      isLiked={liked}
      onChange={setLiked}
      disabled={disabled}
      label="Add to favourites"
    />
  )
}

export const Default: Story = {
  render: () => <ControlledLike />,
}

export const Liked: Story = {
  args: { isLiked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}
