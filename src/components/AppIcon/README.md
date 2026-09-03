# AppIcon

Single icon component. Takes an icon in one of two ways:

- `name` — stock UI icons from [iconoir.com](https://iconoir.com/), shipped via `iconoir-react` and registered in `AppIcon.iconoir.tsx`. Keep this registry small: every entry ships to any client bundle that imports `AppIcon`.
- `icon` — a Bukovel SVG from `src/assets/icons/`, imported per use site and compiled to a React component by SVGR. Nothing is registered centrally, so a route only bundles the icons it actually renders.

## Adding a new icon

### iconoir

1. Open `AppIcon.iconoir.tsx`.
2. Import the icon by its iconoir-react export name.
3. Add it to the `iconoirIcons` object.

The `IconoirIconName` union is derived from the registry — the new key is immediately type-safe across the app.

### Bukovel SVG

1. Drop the SVG into `src/assets/icons/<name>.svg` and run `npm run assets:optimize`.
2. Import it where it is used: `import Ski from '~icons/ski.svg'`.
3. Render it: `<AppIcon icon={Ski} />`.

There is deliberately no central registry for these. A registry object references
every import, so bundlers cannot drop the unused ones — measured at ~41KB of
extra client JS for the current icon set.

Most of these SVGs paint with `currentColor` and inherit the surrounding text
color. Brand marks (`google`, `mastercard`, `card-bukovel`, …) carry their own
fills by design and ignore `color`.

## Props

| Prop          | Type                                       | Default        | Notes                                                          |
| ------------- | ------------------------------------------ | -------------- | -------------------------------------------------------------- |
| `name`        | `IconoirIconName`                          | —              | Key from the iconoir registry. Mutually exclusive with `icon`. |
| `icon`        | `AppIconComponent`                         | —              | SVGR component. Mutually exclusive with `name`.                |
| `size`        | `'small' \| 'medium' \| 'large' \| number` | `'medium'`     | `small=16`, `medium=20`, `large=24`, or a custom pixel value   |
| `color`       | `CSSProperties['color']`                   | `currentColor` | Forwarded to the SVG                                           |
| `strokeWidth` | `number`                                   | icon's own     | In viewBox units, not pixels — see below                       |
| `className`   | `string`                                   | —              | Composed with the base style                                   |
| `label`       | `string`                                   | —              | When set, icon is announced. When omitted, icon is decorative. |

## Stroke width

`strokeWidth` is forwarded to the SVG verbatim, so it is expressed in the icon's
own viewBox units — the rendered thickness is `strokeWidth × (size ÷ viewBox)`.
iconoir draws every icon in a 24-unit box with a stroke of `1.5`, which means a
16px icon renders a 1px stroke by default. To hold a stroke at 1.5 rendered
pixels there, pass `2.25` (`1.5 × 24 ÷ 16`).

## Usage

```tsx
import { AppIcon } from '~components'
import Mountain from '~icons/mountain.svg'

// Decorative (default) — hidden from assistive tech
<AppIcon name="NavArrowRight" />

// Announced — accessible label
<AppIcon name="Search" label="Search the site" />

// Bukovel SVG
<AppIcon icon={Mountain} size="large" />

// Custom size + color
<AppIcon name="Xmark" size={32} color="var(--color-accents-danger-text)" />

// 16px icon holding the design's 1.5px stroke
<AppIcon name="InfoCircle" size="small" strokeWidth={2.25} />
```
