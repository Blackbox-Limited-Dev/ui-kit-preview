# AppNavAction

Pill-shaped navigation action for the header's actions row: a 32 × 32 colour illustration, a label, and an optional red attention dot pinned to the pill's top-right corner. Renders as `<button>`, `next/link`, or an external `<a>` depending on `href`/`external` — the same element polymorphism as `AppButton`.

## Slots

- `illustration` — an SVGR component (`import Rent from '~assets/illustrations/cta/rent.svg'`), rendered decoratively at 32 × 32. Optional: actions whose illustration is still missing render label-only without changing the pill's height.
- `children` — the label.

## States

Default is transparent. Hover, `:focus-visible` and the Radix `data-state="open"` trigger state all use `--color-background-bg-card-pressed`, so a pill that opens the mega-menu stays highlighted while its panel is open.

## Props

| Prop           | Type               | Default | Description                               |
| -------------- | ------------------ | ------- | ----------------------------------------- |
| `illustration` | `AppIconComponent` | —       | 32 × 32 SVGR illustration, decorative     |
| `showDot`      | `boolean`          | `false` | Red dot at the pill's top-right corner    |
| `children`     | `ReactNode`        | —       | Label                                     |
| `href`         | `string`           | —       | Renders `next/link` instead of `<button>` |
| `external`     | `boolean`          | `false` | With `href`: plain `<a target="_blank">`  |
| `className`    | `string`           | —       | Applied to the root element               |

Plus every attribute the rendered element accepts (`onClick`, `disabled`, …).

## Accessibility

The illustration is `aria-hidden`, so the label carries the accessible name. As a Radix `NavigationMenu.Trigger` (via `asChild`) the primitive adds `aria-expanded`/`aria-controls` and keyboard handling.

## Usage

```tsx
<AppNavAction illustration={Skipass} href="/skipass">
  Скі-паси
</AppNavAction>

<NavigationMenu.Trigger asChild>
  <AppNavAction illustration={Hotels}>Готелі</AppNavAction>
</NavigationMenu.Trigger>
```
