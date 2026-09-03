import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AppDateRangeCalendar } from '.'

import type { DateRange } from '.'

const meta = {
  title: 'Components/AppDateRangeCalendar',
  component: AppDateRangeCalendar,
} satisfies Meta<typeof AppDateRangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

const daysFromToday = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

const InteractiveCalendar = ({
  numberOfMonths,
  markedDates,
}: {
  numberOfMonths: 1 | 2
  markedDates?: { date: Date; color?: string }[]
}) => {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <AppDateRangeCalendar
      value={range}
      onChange={setRange}
      numberOfMonths={numberOfMonths}
      markedDates={markedDates}
    />
  )
}

export const TwoMonths: Story = {
  render: () => <InteractiveCalendar numberOfMonths={2} />,
}

export const SingleMonth: Story = {
  render: () => <InteractiveCalendar numberOfMonths={1} />,
}

export const MarkedDates: Story = {
  render: () => (
    <InteractiveCalendar
      numberOfMonths={2}
      markedDates={[
        { date: daysFromToday(0) },
        { date: daysFromToday(3) },
        { date: daysFromToday(7), color: 'var(--color-labels-green)' },
        { date: daysFromToday(12), color: 'var(--color-labels-red)' },
      ]}
    />
  ),
}
