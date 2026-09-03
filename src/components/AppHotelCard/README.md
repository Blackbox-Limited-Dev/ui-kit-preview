# AppHotelCard

Hotel result card in two layouts sharing one `Hotel` shape and one DOM tree:

- `vertical` (landing carousel 373px) — white 24px-radius card, 200px gallery, stars + title, distance row, perk chips, room type + count, price block with the monobank caption in-flow below the price. The card fills its container's height and pins the price block to the bottom, so a row of cards stays even.
- `responsive` (hotels list) — the same stacked card below 1024px; at `lg` a media query rearranges it into the wide row: 316×200 gallery, content column, right column with the monobank caption, right-aligned price and a small primary select button; rows divide with a 1px line.

The list card switches arrangement in CSS, not JS, so a desktop visitor never paints the stacked card first and reflows on hydration.

Client component (gallery slider + handlers). `formatUah(value, locale)` (also exported) renders `3 500 ₴`-style prices, grouping digits per the active app locale.

## Props

| Prop                  | Type                         | Default      | Description                          |
| --------------------- | ---------------------------- | ------------ | ------------------------------------ |
| `layout`              | `'vertical' \| 'responsive'` | —            | Card arrangement                     |
| `hotel`               | `Hotel`                      | —            | Hotel data (see types)               |
| `onSelect`            | `() => void`                 | —            | Row layout — select-room handler     |
| `selectLabel`         | `string`                     | — (required) | Select button text                   |
| `installmentsLabel`   | `string`                     | — (required) | Monobank caption                     |
| `roomTypesCountLabel` | `string`                     | — (required) | «Ще N типів номерів» line, formatted |
| `starsLabel`          | `string`                     | — (required) | «N з 5» rating for assistive tech    |
| `galleryLabels`       | `AppHotelGalleryLabels`      | — (required) | Forwarded to `AppHotelGallery`       |
| `className`           | `string`                     | —            | Applied to the root element          |

Every label is required — the card holds no copy of its own, so a missing translation fails at the type level.

`Hotel`: `{ id, name, stars, distanceLabel, roomType, roomTypesCount, priceFrom, oldPrice?, nightsLabel, discount?, labels: HotelLabel[], photos, monobank }`. `HotelLabel = { icon?: AppIconComponent; text: string }` — icons are component references, so hotel data must stay within client modules (not cross a server→client props boundary).

### Labels row

Perk chips render on a single row via the exported `HotelLabelsRow` (also used by `AppHotelPreviewCard`). The first paint renders every chip plus the counter and the row clips the overflow; their widths are measured once from that render and cached, then as many chips as fit are shown and the rest collapse into a «+N» chip (present icon). The clamp re-runs on container resize through a single page-wide `ResizeObserver`.

## Figma

«Hotels Landing» carousel card (373), «Hotel List» desktop row (970×248) and mobile card (343).

## Usage

```tsx
<AppHotelCard
  layout="responsive"
  hotel={hotel}
  onSelect={openRooms}
  selectLabel={t('selectRoom')}
  installmentsLabel={t('installments')}
  roomTypesCountLabel={t('roomTypesCount', { count: hotel.roomTypesCount })}
  starsLabel={t('stars', { count: hotel.stars })}
  galleryLabels={galleryLabels}
/>
```
