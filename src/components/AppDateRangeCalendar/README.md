# AppDateRangeCalendar

Range calendar for the hotels search — wraps `react-day-picker` in `mode="range"` with every element styled through the `classNames` API (no default stylesheet). One or two 320px month blocks, single-letter weekday headers, 32px day rows, teal endpoint circles and an on-surface range band that rounds off at week edges. Days before today are disabled.

The calendar locale follows the active `next-intl` locale (`ua` → `uk`, `pl`, `ro` from `react-day-picker/locale`).

## Props

| Prop             | Type                                      | Default | Description                                                        |
| ---------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------ |
| `value`          | `DateRange`                               | —       | Selected range (controlled)                                        |
| `onChange`       | `(range: DateRange \| undefined) => void` | —       | Selection callback                                                 |
| `numberOfMonths` | `1 \| 2`                                  | `2`     | Month blocks side by side                                          |
| `defaultMonth`   | `Date`                                    | —       | Month shown on mount                                               |
| `readOnly`       | `boolean`                                 | `false` | Informational calendar: nothing selectable, past days stay enabled |
| `markedDates`    | `AppCalendarMarkedDate[]`                 | —       | Days that show a 4px event dot                                     |
| `className`      | `string`                                  | —       | Applied to the root element                                        |

`DateRange` is re-exported from `react-day-picker`. `AppCalendarMarkedDate` is `{ date: Date; color?: string }` — `color` defaults to `var(--color-labels-blue)`.

### Selection

Booking-style: with nothing selected a click sets the start; a click after the start closes the range; a click before the start — or any click when a range is complete — restarts the selection from the clicked day. Clicking the start again while only the start is picked changes nothing.

### Hover

- Nothing selected — the hovered day gets a 32px on-surface circle.
- Only the start picked — hovering a later day previews the would-be range as a band from the start to the hovered day, whose right edge is the rounded tip; hovering an earlier day gets the plain circle.
- Complete range — non-selected days get the plain circle.
- Range start, end and middle days never react to hover.

### Dots

Each day cell has a single dot slot in its bottom edge. Priority: a selected range edge shows a white dot, today shows a primary dot, a marked date shows its own (or the default blue) dot. Days that are neither today nor marked show nothing.

## Figma

«Hotels Landing» — the date-selection popover (712×412 desktop, dual month) and the mobile date modal (single month).

## Usage

```tsx
const [range, setRange] = useState<DateRange | undefined>()

<AppDateRangeCalendar value={range} onChange={setRange} numberOfMonths={2} />
```
