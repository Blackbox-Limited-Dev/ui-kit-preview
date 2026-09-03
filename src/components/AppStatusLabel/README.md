# AppStatusLabel

Pill label for discounts, statuses and counters — white 14 Medium text on a solid label background. Used on hotel-card galleries («-20%»), interactive banners («до -20%») and the ski-pass season accordion («До кінця сезону 24 дні»).

## Props

| Prop        | Type                                     | Default | Description                 |
| ----------- | ---------------------------------------- | ------- | --------------------------- |
| `children`  | `ReactNode`                              | —       | Label content               |
| `level`     | `'green' \| 'blue' \| 'purple' \| 'red'` | `'red'` | Pill background colour      |
| `className` | `string`                                 | —       | Applied to the root element |

Plus every attribute a `<span>` accepts.

## Figma

«Hotels Landing» / «Hotel List» sections — the red discount pill on hotel cards and the interactive banner. «Ski-pass list» — the blue season badge and the red «-10%» promo pill.

## Usage

```tsx
<AppStatusLabel>-20%</AppStatusLabel>
<AppStatusLabel level="blue">До кінця сезону 24 дні</AppStatusLabel>
```
