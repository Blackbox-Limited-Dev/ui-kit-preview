# AppHotelDatesCard

«Доступно на інші дати» hotel card — gallery + hotel header (stars, 24 Semibold name, distance, monobank caption) over a stack of room-offer rows. Each offer: date range 16 Semibold, board type, price column («від 2 000 ₴» / «за 2 ночі») and a small primary «Вибрати номер» button; offers divide with 1px lines.

Client component.

## Props

| Prop                | Type                              | Default      | Description                                             |
| ------------------- | --------------------------------- | ------------ | ------------------------------------------------------- |
| `name`              | `string`                          | —            | Hotel name                                              |
| `stars`             | `number`                          | —            | Star count                                              |
| `distanceLabel`     | `string`                          | —            | E.g. «50м від витягу №3»; the row is skipped when unset |
| `monobank`          | `boolean`                         | —            | Show the installments caption                           |
| `discount`          | `string`                          | —            | Gallery pill, e.g. «-20%»                               |
| `photos`            | `AppHotelGalleryPhoto[]`          | — (required) | Gallery slides                                          |
| `offers`            | `HotelRoomOffer[]`                | — (required) | Room-offer rows                                         |
| `onSelect`          | `(offer: HotelRoomOffer) => void` | —            | Select-room handler                                     |
| `selectLabel`       | `string`                          | — (required) | Button text                                             |
| `installmentsLabel` | `string`                          | —            | Monobank caption; read only when `monobank` is set      |
| `starsLabel`        | `string`                          | — (required) | «N з 5» for assistive tech                              |
| `galleryLabels`     | `AppHotelGalleryLabels`           | — (required) | Forwarded to `AppHotelGallery`                          |
| `className`         | `string`                          | —            | Applied to the root element                             |

The card holds no copy of its own: every label it renders unconditionally is
required. `distanceLabel` and `installmentsLabel` guard their own markup, so
omitting them removes the row rather than leaving an empty one — the
installments block needs both `monobank` and `installmentsLabel`.

`HotelRoomOffer = { dates, board, priceLabel, nightsLabel }`.

## Usage

```tsx
<AppHotelDatesCard
  name="White House Hotel"
  stars={3}
  …
  offers={offers}
  selectLabel={t('selectRoom')}
  installmentsLabel={t('installments')}
  starsLabel={t('stars', { count: 3 })}
  galleryLabels={galleryLabels}
/>
```
