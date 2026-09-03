# AppHotelGallery

Hotel-card photo slider — a Swiper (`swiper/react`, `A11y` module only) track of `next/image` slides with dot indicators, hover prev/next arrows (40px tertiary icon-buttons), a favourite heart top-right, an optional discount pill top-left, and a blurred bottom fade behind the dots. Arrows never disable: `rewind` wraps next-on-last back to the first photo and prev-on-first to the last. Touch/mouse dragging comes from Swiper; dots stay hand-rendered from the active index.

The root has no intrinsic size — the host sets width/height (and can override the default 16px radius via `className`).

## Props

| Prop          | Type                     | Default                            | Description                                                 |
| ------------- | ------------------------ | ---------------------------------- | ----------------------------------------------------------- |
| `photos`      | `AppHotelGalleryPhoto[]` | —                                  | Slides — `{ src, alt }`, alt required                       |
| `labels`      | `AppHotelGalleryLabels`  | —                                  | `favourite` / `prevPhoto` / `nextPhoto` control aria-labels |
| `statusLabel` | `string`                 | —                                  | Discount pill content, e.g. «-20%»                          |
| `sizes`       | `string`                 | `(max-width: 1023px) 100vw, 373px` | `next/image` sizes for the slides                           |
| `className`   | `string`                 | —                                  | Applied to the root element                                 |

The component holds no copy of its own — `labels` is required so the host supplies translated strings.

Plus every attribute a `<div>` accepts. Client component — slide state and favourite toggle live locally.

## Figma

«Hotel List» — the photo area on every hotel card (desktop row 316×200, vertical card 333×200 / 303×200).

## Usage

```tsx
<AppHotelGallery
  photos={[{ src: hotelPhoto, alt: 'Фасад готелю' }]}
  labels={{
    favourite: t('gallery.favourite'),
    prevPhoto: t('gallery.prevPhoto'),
    nextPhoto: t('gallery.nextPhoto'),
  }}
  statusLabel="-20%"
  className={s.card_gallery}
/>
```
