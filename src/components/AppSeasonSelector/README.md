# AppSeasonSelector

Bordered pill that shows the current season (label + icon) and requests the other one on click — a toggle, no dropdown. Controlled-only: it never flips `<html data-theme>` itself. Storybook sets the theme via the toolbar decorator.

## States

Default (`bg-card` + `stroke-on-surface` border), hover (`bg-card-pressed`), focus-visible ring. No separate pressed state, and no disabled state in the design.

## Props

| Prop             | Type                          | Default                              | Description                    |
| ---------------- | ----------------------------- | ------------------------------------ | ------------------------------ |
| `season`         | `AppSeason`                   | —                                    | Season currently shown         |
| `onSeasonChange` | `(season: AppSeason) => void` | —                                    | Called with the _other_ season |
| `labels`         | `Record<AppSeason, string>`   | `{ winter: 'зима', summer: 'літо' }` | Visible labels                 |
| `className`      | `string`                      | —                                    | Applied to the root button     |

## Accessibility

A native `<button>`; the visible season label is its accessible name. The season icon is decorative (`aria-hidden`).

## Usage

```tsx
const [season, setSeason] = useState<AppSeason>('winter')

<AppSeasonSelector season={season} onSeasonChange={setSeason} />
```
