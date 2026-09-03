'use client'

/* eslint-disable camelcase -- react-day-picker's classNames API is snake_case */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'
import { useLocale } from 'next-intl'
import { DayPicker } from 'react-day-picker'

import CaretLeftIcon from '~icons/caret-left.svg'
import CaretRightIcon from '~icons/caret-right.svg'

import { getDateLocale } from '~i18n/dateLocales'

import s from './AppDateRangeCalendar.module.scss'

import type { DayButtonProps } from 'react-day-picker'
import type { AppLanguage } from '~i18n/config'
import type { AppDateRangeCalendarProps } from './AppDateRangeCalendar.types'

const Chevron = ({ orientation }: { orientation?: string }) =>
  orientation === 'left' ? (
    <CaretLeftIcon width={20} height={20} />
  ) : (
    <CaretRightIcon width={20} height={20} />
  )

const dateKey = (date: Date) =>
  date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

// Context keeps the DayButton override referentially stable — an inline
// component would remount every button on each calendar render.
const MarkedColorsContext = createContext<Map<number, string | undefined>>(
  new Map()
)

const DayButton = ({
  day,
  modifiers,
  children,
  ...buttonProps
}: DayButtonProps) => {
  const markedColors = useContext(MarkedColorsContext)
  const ref = useRef<HTMLButtonElement>(null)

  // Default react-day-picker DayButton behavior: keyboard nav moves focus.
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const key = dateKey(day.date)
  const isMarked = markedColors.has(key)
  const isSelectedEdge = Boolean(modifiers.range_start || modifiers.range_end)
  const color = markedColors.get(key)

  return (
    <button ref={ref} {...buttonProps}>
      {children}
      {(modifiers.today || isMarked) && (
        <span
          className={cn(s.calendar_day_dot, {
            [s.calendar_day_dot_today]: modifiers.today,
            [s.calendar_day_dot_selected]: isSelectedEdge,
          })}
          style={
            !modifiers.today && !isSelectedEdge && color
              ? { backgroundColor: color }
              : undefined
          }
        />
      )}
    </button>
  )
}

export const AppDateRangeCalendar = ({
  value,
  onChange,
  numberOfMonths = 2,
  defaultMonth,
  readOnly = false,
  markedDates,
  className,
}: AppDateRangeCalendarProps) => {
  const language = useLocale() as AppLanguage
  const [hovered, setHovered] = useState<Date | undefined>()

  // Start of today, computed once: a fresh `new Date()` per render makes the
  // `disabled` matcher a new object every time, remounting every day button.
  const disabledBefore = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return { before: today }
  }, [])

  const markedColors = useMemo(() => {
    const map = new Map<number, string | undefined>()
    markedDates?.forEach(({ date, color }) => map.set(dateKey(date), color))
    return map
  }, [markedDates])

  // Booking-style selection: a click before the start (or with a complete
  // range) restarts from the clicked day; a click after the start closes the
  // range; a click on the start itself keeps it.
  const handleDayClick = (day: Date) => {
    if (readOnly || !onChange) return
    const from = value?.from
    if (!from || value?.to) {
      onChange({ from: day, to: undefined })
      return
    }
    if (dateKey(day) === dateKey(from)) return
    if (dateKey(day) < dateKey(from)) onChange({ from: day, to: undefined })
    else onChange({ from, to: day })
  }

  const previewEnd =
    value?.from &&
    !value.to &&
    hovered &&
    dateKey(hovered) > dateKey(value.from)
      ? hovered
      : undefined

  return (
    <MarkedColorsContext.Provider value={markedColors}>
      <DayPicker
        mode="range"
        selected={value}
        // rdp renders its own internal selection unless `onSelect` is set —
        // the custom rules must run through it to stay controlled.
        onSelect={(_range, triggerDate) => handleDayClick(triggerDate)}
        onDayMouseEnter={(day) => setHovered(day)}
        onDayMouseLeave={() => setHovered(undefined)}
        modifiers={{
          preview:
            value?.from && previewEnd
              ? { after: value.from, before: previewEnd }
              : [],
          preview_start: value?.from && previewEnd ? value.from : [],
          preview_end: previewEnd ?? [],
        }}
        modifiersClassNames={{
          preview: s.calendar_day_preview,
          preview_start: s.calendar_day_preview_start,
          preview_end: s.calendar_day_preview_end,
        }}
        numberOfMonths={numberOfMonths}
        defaultMonth={defaultMonth}
        disabled={readOnly ? undefined : disabledBefore}
        locale={getDateLocale(language)}
        formatters={{
          formatWeekdayName: (date, options) =>
            date
              .toLocaleDateString(options?.locale?.code, { weekday: 'short' })
              .charAt(0)
              .toUpperCase(),
        }}
        components={{ Chevron, DayButton }}
        className={cn(s.calendar, className)}
        classNames={{
          root: s.calendar,
          months: s.calendar_months,
          month: s.calendar_month,
          month_caption: s.calendar_caption,
          caption_label: s.calendar_caption_label,
          nav: s.calendar_nav,
          button_previous: s.calendar_nav_button,
          button_next: s.calendar_nav_button,
          month_grid: s.calendar_grid,
          weekdays: s.calendar_weekdays,
          weekday: s.calendar_weekday,
          week: s.calendar_week,
          day: s.calendar_day,
          day_button: s.calendar_day_button,
          disabled: s.calendar_day_disabled,
          outside: s.calendar_day_outside,
          hidden: s.calendar_day_hidden,
          selected: s.calendar_day_selected,
          range_start: s.calendar_day_range_start,
          range_middle: s.calendar_day_range_middle,
          range_end: s.calendar_day_range_end,
          today: s.calendar_day_today,
          chevron: s.calendar_chevron,
        }}
      />
    </MarkedColorsContext.Provider>
  )
}

export type {
  AppCalendarMarkedDate,
  AppDateRangeCalendarProps,
  DateRange,
} from './AppDateRangeCalendar.types'
