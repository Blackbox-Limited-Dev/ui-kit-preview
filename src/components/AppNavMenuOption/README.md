# AppNavMenuOption

Photo card used inside the header mega-menu panels: a 219px-tall image with a dark overlay, a title in the bottom-left corner and an optional description line. The whole card is a `next/link`.

## Sizing

Height is fixed at 219px; width comes from the parent grid/row, so panels can mix fixed and fill-width cards. Pass `sizes` when the card's rendered width differs from the default (`(max-width: 1023px) 100vw, 450px`) so `next/image` picks the right source.

The title renders with `white-space: pre-line`, so a `\n` inside a message string breaks the line where the copy wants it; without one the title still wraps on width.

## States

Hover scales the photo to 1.05 (`transform`, clipped by the card's `overflow: hidden`); focus shows a ring on the card. The zoom is skipped under `prefers-reduced-motion`.

## Props

| Prop          | Type                        | Default   | Description                               |
| ------------- | --------------------------- | --------- | ----------------------------------------- |
| `image`       | `StaticImageData \| string` | —         | Card photo                                |
| `alt`         | `string`                    | —         | Photo description — required, never empty |
| `title`       | `string`                    | —         | Card title; `\n` forces a line break      |
| `description` | `string`                    | —         | Optional line under the title             |
| `href`        | `string`                    | —         | Link target                               |
| `sizes`       | `string`                    | see above | `next/image` `sizes`                      |
| `className`   | `string`                    | —         | Applied to the root element               |

## Accessibility

The link's accessible name comes from the title and the image `alt`, so `alt` must describe the photo rather than repeat the title. Focus shows a visible ring on the card.

The design draws the card at 200px inside some panels; 219px (the component's own height) is the current spec.

## Usage

```tsx
<AppNavMenuOption
  image={hotelsPhoto}
  alt="Готель у горах узимку"
  title="Готелі"
  description="Від 1 200 ₴ за ніч"
  href="/hotels"
/>
```
