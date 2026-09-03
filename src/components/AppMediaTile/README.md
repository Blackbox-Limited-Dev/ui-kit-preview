# AppMediaTile

Bento tile — a full-bleed still under a darkening overlay and a 125px bottom fade, with a 24px title caption pinned to the bottom-left corner. The tile fills its container; the grid owns the size.

The still is always rendered, so nothing shifts while a heavier layer loads. `media` stacks an extra layer above it — a lazy looping background video, for instance — leaving the still as its poster.

The bottom fade ends on `#0D1C27`, which has no design token yet; it is a local constant in this module.

## Props

| Prop        | Type                        | Default   | Description                                  |
| ----------- | --------------------------- | --------- | -------------------------------------------- |
| `image`     | `StaticImageData \| string` | —         | Still, rendered `fill` + `object-fit: cover` |
| `alt`       | `string`                    | —         | Image alt; never empty                       |
| `caption`   | `ReactNode`                 | —         | Bottom-left title                            |
| `sizes`     | `string`                    | `'100vw'` | `sizes` for the fill image                   |
| `media`     | `ReactNode`                 | —         | Extra layer above the still                  |
| `className` | `string`                    | —         | Applied to the root element                  |

## Figma

The off-season bento grid — five tiles whose fills are videos; the stills here are their poster frames.

## Usage

```tsx
<AppMediaTile
  image={aquapark}
  alt="Аквапарк «Mavka» взимку"
  caption="Аквапарк “Mavka”"
  sizes="(max-width: 1023px) 100vw, 672px"
/>
```
