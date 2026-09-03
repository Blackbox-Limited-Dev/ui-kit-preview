# AppAppPromoBanner

Store-download banner — a 600px teal panel with a decorative flower pattern on the right, a phone photo that rises above the banner's top edge, and a text block with the two store badges.

The pattern is an inline SVGR import inside an absolutely-positioned wrapper, never `next/image`. Badge links carry their own `aria-label`: the badge artwork is a brand mark with no accessible text of its own.

Below `lg` the banner stacks — text first, then the photo in normal flow — the pattern is dropped and the corner radius drops to 24px.

## Props

| Prop              | Type        | Description                              |
| ----------------- | ----------- | ---------------------------------------- |
| `title`           | `ReactNode` | Display-1 headline                       |
| `body`            | `ReactNode` | Supporting paragraph                     |
| `appStoreHref`    | `string`    | App Store link                           |
| `appStoreLabel`   | `string`    | Accessible name for the App Store link   |
| `googlePlayHref`  | `string`    | Google Play link                         |
| `googlePlayLabel` | `string`    | Accessible name for the Google Play link |
| `photoAlt`        | `string`    | Alt text for the phone photo             |
| `className`       | `string`    | Applied to the root element              |

## Figma

`app promo banner` — the closing block of the off-season ski-pass screen.

## Usage

```tsx
<AppAppPromoBanner
  title="Дізнайся першим, коли відкриються схили"
  body="Увімкни сповіщення в додатку Bukovel…"
  appStoreHref="…"
  appStoreLabel="Завантажити застосунок Bukovel в App Store"
  googlePlayHref="…"
  googlePlayLabel="Завантажити застосунок Bukovel у Google Play"
  photoAlt="Застосунок Bukovel на екрані смартфона"
/>
```
