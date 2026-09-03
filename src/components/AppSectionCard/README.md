# AppSectionCard

Titled content card — a `<section>` with an optional `<h2>` and a column slot. The title sits inside the card by default, or above it when the block reads as a page section with its own card body (the PDP FAQ and Location blocks).

`padded={false}` drops the padding, radius and background so the block sits flush on the page — every `Card` instance on both product pages is drawn that way.

The title↔body gap is 16px; a caller that needs it tighter sets `--section-card-gap` on the section.

## Props

| Prop             | Type                    | Default    | Description                             |
| ---------------- | ----------------------- | ---------- | --------------------------------------- |
| `title`          | `ReactNode`             | —          | Rendered as `<h2>`; omitted when absent |
| `titlePlacement` | `'inside' \| 'outside'` | `'inside'` | Title inside the card or above it       |
| `padded`         | `boolean`               | `true`     | `false` = flush, no card chrome         |
| `children`       | `ReactNode`             | —          | Card body                               |
| `className`      | `string`                | —          | Applied to the root element             |

## Figma

`Card` (`Header=Inside | Outside`) — every content block on the ski-pass and Bukovel Card product pages.

## Usage

```tsx
<AppSectionCard title="Опис" padded={false}>
  <p>…</p>
</AppSectionCard>
```
