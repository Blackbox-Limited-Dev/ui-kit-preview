# AppCutoutCard

Ticket-style card — a 24px-radius surface with a 1px border and two Ø24 circles cut out of the left and right edges, the way a torn stub reads. Used as the shell of the product purchase card.

The background is three stacked segments: a top piece (surface + 1px border, top radii), a 38px middle band where the notch arcs are inline SVG caps at each edge with a plain stretching centre, and a bottom piece (surface + 1px border, bottom radii). The caps carry the arc and the side border, so the border follows the arc instead of stopping at it, and the notch stays a true circle at any card width. A pseudo-element circle painted in the page background would not work — the page behind the card is not a flat colour on every route.

Width is the caller's: the card fills its container.

## Props

| Prop        | Type                            | Default    | Description                                                        |
| ----------- | ------------------------------- | ---------- | ------------------------------------------------------------------ |
| `notch`     | `'top' \| 'middle' \| 'bottom'` | `'bottom'` | Notch height: 25% / 50% of the card, or 72px above its bottom edge |
| `children`  | `ReactNode`                     | —          | Card body                                                          |
| `className` | `string`                        | —          | Applied to the root element                                        |

## Figma

`cards with cutout` (`Notch Position = Middle | Top | Bottom`) — both product pages use `Bottom`, where the notch sits just above the CTA at both the desktop and the mobile card height.

## Usage

```tsx
<AppCutoutCard notch="bottom">…</AppCutoutCard>
```
