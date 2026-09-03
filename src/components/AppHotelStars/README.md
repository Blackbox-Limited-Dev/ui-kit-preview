# AppHotelStars

Hotel star rating — a row of 12px orange stars with a 2px gap.

## Props

| Prop        | Type     | Default | Description                                            |
| ----------- | -------- | ------- | ------------------------------------------------------ |
| `count`     | `number` | —       | Number of stars, 1–5                                   |
| `label`     | `string` | —       | Announced to assistive tech; omit to render decorative |
| `className` | `string` | —       | Applied to the root element                            |

Plus every attribute a `<span>` accepts.

## Accessibility

A run of stars is one piece of information, not N. With a `label`, the wrapper is
declared as a single graphic (`role="img"` + `aria-label`), so a screen reader
announces «4 з 5» once instead of walking four SVGs. Without a `label` there is
nothing useful to announce, so the run is marked `aria-hidden` and skipped
entirely.

The `role` is therefore conditional on the label: `role="img"` without an
accessible name is itself a violation, so the component cannot declare the role
unconditionally. Every call site passes a label today; the decorative branch is
what keeps the component safe to reuse next to a rating that is already spelled
out in text.

## Usage

```tsx
<AppHotelStars count={3} label="3 зірки" />
```
