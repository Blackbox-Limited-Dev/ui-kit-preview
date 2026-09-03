import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppPagination } from '.'

const meta = {
  title: 'Components/AppPagination',
  component: AppPagination,
  args: {
    page: 1,
    total: 4,
    onPage: () => {},
    prevPageLabel: 'Previous page',
    nextPageLabel: 'Next page',
  },
} satisfies Meta<typeof AppPagination>

export default meta
type Story = StoryObj<typeof meta>

const Interactive = () => {
  const [page, setPage] = useState(1)

  return (
    <div style={{ width: 500 }}>
      <AppPagination
        page={page}
        total={4}
        onPage={setPage}
        onShowMore={() => setPage((prev) => Math.min(prev + 1, 4))}
        showMoreLabel="Show more"
        prevPageLabel="Previous page"
        nextPageLabel="Next page"
      />
    </div>
  )
}

export const Default: Story = { render: () => <Interactive /> }
export const LastPage: Story = { args: { page: 4 } }
