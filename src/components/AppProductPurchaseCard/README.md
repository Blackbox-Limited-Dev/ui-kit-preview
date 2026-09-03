# AppProductPurchaseCard

The product page's purchase aside — an `AppCutoutCard` holding a thumbnail with an optional favourite toggle, a centred title with dot-separated meta, optional tariff tabs and a full-width CTA carrying the label and the price.

The notch sits above the CTA (`notch="bottom"`), so the button reads as the detachable stub.

Below `lg` the card is not one box: the thumbnail moves to the top of the page, the heading is dropped because the page's own `h1` already carries it, and the cutout shell keeps only the tariffs and the CTA at the bottom of the page. That relies on the host laying the aside out with `display: contents` — `AppProductPage` does.

Tariff tabs render only when `tariffs`, `tariff` and `onTariffChange` are all supplied — the Bukovel Card page has a single price and no tabs. The favourite toggle is an `AppLike` over the thumbnail's top-right corner; it renders only when both `onLikedChange` and `favouriteLabel` are supplied, and the caller owns the `liked` state.

Width is the caller's: the card fills its container.

## Props

| Prop             | Type                        | Description                              |
| ---------------- | --------------------------- | ---------------------------------------- |
| `image`          | `StaticImageData \| string` | Product thumbnail                        |
| `imageAlt`       | `string`                    | Thumbnail alt                            |
| `title`          | `ReactNode`                 | Centred product title                    |
| `meta`           | `ReactNode[]`               | Dot-separated meta under the title       |
| `tariffs`        | `AppMegaTabsItem[]`         | Tariff tabs                              |
| `tariff`         | `string`                    | Active tariff value                      |
| `onTariffChange` | `(value: string) => void`   | Tariff selection callback                |
| `tariffsLabel`   | `string`                    | Accessible name for the tariff group     |
| `ctaLabel`       | `string`                    | CTA label                                |
| `ctaPrice`       | `string`                    | Price shown after the CTA's dot          |
| `onCta`          | `() => void`                | CTA click handler                        |
| `liked`          | `boolean`                   | Favourite state (default `false`)        |
| `onLikedChange`  | `(next: boolean) => void`   | Fires with the next favourite state      |
| `favouriteLabel` | `string`                    | Accessible name for the favourite toggle |
| `className`      | `string`                    | Applied to the root element              |

## Figma

The sticky aside on the ski-pass PDP (515px, with tabs) and the Bukovel Card PDP (431px, without).

## Usage

```tsx
<AppProductPurchaseCard
  image={thumb}
  imageAlt="Скі-пас на 5 днів"
  title="Скі-пас на 5 днів"
  meta={['Поспіль', '2025-2026']}
  ctaLabel="Оформити"
  ctaPrice="1 600 ₴"
/>
```
