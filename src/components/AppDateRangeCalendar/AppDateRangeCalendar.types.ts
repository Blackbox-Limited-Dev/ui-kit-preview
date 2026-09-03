import type { DateRange } from 'react-day-picker'

export type AppCalendarMarkedDate = {
  date: Date
  /** Dot color; defaults to `var(--color-labels-blue)`. */
  color?: string
}

export type AppDateRangeCalendarProps = {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  numberOfMonths?: 1 | 2
  /** Month shown on mount. Defaults to the current month. */
  defaultMonth?: Date
  /** Informational calendar: no day is selectable and past days stay enabled. */
  readOnly?: boolean
  /** Days that show an event dot. Today always shows a primary dot; on a
   *  selected range edge the dot turns white. */
  markedDates?: AppCalendarMarkedDate[]
  className?: string
}

export type { DateRange } from 'react-day-picker'
