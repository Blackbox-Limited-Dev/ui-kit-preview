# AppHotelPreviewCard

Compact hotel teaser for the «Вибір Bukovel» row — a 320×153 card-shadowed tile with a 102×129 photo (optional discount pill), stars + 18 Medium name + dates line, a favourite heart, optional perk chips, and a price row (20 Semibold + nights + struck old price).

Client component (favourite toggle).

## Props

| Prop             | Type                   | Default | Description                                                                                         |
| ---------------- | ---------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `name`           | `string`               | —       | Hotel name                                                                                          |
| `stars`          | `number`               | —       | Star count                                                                                          |
| `datesLabel`     | `string`               | —       | E.g. «17-19 лютого»                                                                                 |
| `price`          | `number`               | —       | Price in UAH                                                                                        |
| `nightsLabel`    | `string`               | —       | E.g. «2 ночі»                                                                                       |
| `oldPrice`       | `number`               | —       | Struck-through old price                                                                            |
| `discount`       | `string`               | —       | Pill on the photo, e.g. «-20%»                                                                      |
| `labels`         | `HotelLabel[]`         | —       | Perk chips — single row, overflow collapses into a «+N» chip (`HotelLabelsRow` from `AppHotelCard`) |
| `photo`          | `AppHotelGalleryPhoto` | —       | `{ src, alt }`                                                                                      |
| `starsLabel`     | `string`               | —       | Required — «N з 5» for assistive tech                                                               |
| `favouriteLabel` | `string`               | —       | Required — favourite-toggle aria-label                                                              |
| `className`      | `string`               | —       | Applied to the root element                                                                         |

## Figma

«Hotel List» — Hotel Card / List Preview (320×153 desktop, 308×137 mobile).

## Usage

```tsx
<AppHotelPreviewCard
  name="Bukovel Apart"
  stars={3}
  datesLabel="17-19 лютого"
  price={5300}
  nightsLabel="2 ночі"
  oldPrice={6235}
  photo={{ src: photo, alt: 'Апартаменти' }}
  starsLabel={t('stars', { count: 3 })}
  favouriteLabel={t('gallery.favourite')}
/>
```
