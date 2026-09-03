# AppSeasonCard

Season pricing card used in the header's ski-pass mega-menu panel: a tinted 200px-tall card with a decorative pattern layout behind the content, a title (optionally with a status pill), the season's date ranges, a price block and a round arrow button.

## Variants

| Variant   | Background               | Pattern                    | Layout                                                                            |
| --------- | ------------------------ | -------------------------- | --------------------------------------------------------------------------------- |
| `neutral` | `--color-season-neutral` | `assets/decor-neutral.svg` | One 174px copy, centred                                                           |
| `low`     | `--color-season-low`     | `assets/decor-low.svg`     | Centred copy plus a 60px pair at the top-right and bottom-left edges              |
| `high`    | `--color-season-high`    | `assets/decor-high.svg`    | Three 174px copies as one centred row, 32px gap — the outer two hang off the card |
| `holiday` | `--color-season-ny`      | `assets/decor-holiday.svg` | Centred copy plus a 174px pair off the top-right and bottom-left corners          |

Every copy is the same per-variant SVG, re-rendered at the size the layout calls for. The card's `overflow: hidden` clips whatever hangs past its edges. Each pattern SVG carries its own tint and opacity from Figma. `high` is the only variant drawn without the 2px white inner stroke.

## Props

| Prop          | Type                   | Default | Description                                    |
| ------------- | ---------------------- | ------- | ---------------------------------------------- |
| `variant`     | `AppSeasonCardVariant` | —       | Colour treatment                               |
| `title`       | `string`               | —       | Card title                                     |
| `badge`       | `string`               | —       | Status pill next to the title                  |
| `dates`       | `string[]`             | `[]`    | Date ranges, rendered dot-separated            |
| `priceLabel`  | `string`               | —       | Caption above the price                        |
| `price`       | `string`               | —       | Formatted price without the unit               |
| `priceUnit`   | `string`               | —       | Price unit, e.g. `/ день`                      |
| `href`        | `string`               | —       | Arrow-button target                            |
| `actionLabel` | `string`               | —       | Accessible name of the arrow button — required |
| `className`   | `string`               | —       | Applied to the root element                    |

Formatting (currency, date ranges) is the caller's job — the card renders the strings it is given.

## Accessibility

Only the arrow button is interactive, so it carries `actionLabel` as its `aria-label`; the pattern is `aria-hidden`.

## Usage

```tsx
<AppSeasonCard
  variant="high"
  title="Високий сезон"
  badge="Популярний"
  dates={['21.12 — 09.01', '16.02 — 10.03']}
  priceLabel="Ціна від"
  price="1 200 ₴"
  priceUnit="/ день"
  href="/skipass"
  actionLabel="Перейти до скі-пасів"
/>
```
