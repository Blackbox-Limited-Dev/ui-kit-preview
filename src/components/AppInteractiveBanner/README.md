# AppInteractiveBanner

Promo banner row — 16 Semibold title with a muted 14 Regular description on a stroked, card-shadowed 16px-radius surface, with an optional red `AppStatusLabel` pill on the right.

## Props

| Prop          | Type     | Default | Description                 |
| ------------- | -------- | ------- | --------------------------- |
| `title`       | `string` | —       | Banner header               |
| `description` | `string` | —       | Muted secondary line        |
| `label`       | `string` | —       | Status pill, e.g. «до -20%» |
| `className`   | `string` | —       | Applied to the root element |

Plus every attribute a `<div>` accepts.

## Figma

«Hotel List» — the promo banner above the hotels list.

## Usage

```tsx
<AppInteractiveBanner
  title="Бронюйте раніше — платіть менше"
  description="Знижки на раннє бронювання зимового сезону"
  label="до -20%"
/>
```
