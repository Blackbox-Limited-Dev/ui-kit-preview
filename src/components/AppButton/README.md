# AppButton

The design-system button: six visual options, two sizes, an icon-only mode, and
optional `href` rendering as an internal or external link.

## Variants

| Variant     | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `primary`   | Filled brand button — the default call to action.                      |
| `secondary` | Tinted brand button for secondary actions on a surface.                |
| `tertiary`  | Plain white button, no border.                                         |
| `outlined`  | White button with a 1px neutral border.                                |
| `link`      | Text-only, no padding or background. Not available with `iconOnly`.    |
| `error`     | Destructive action — attention background, danger text and focus ring. |

## Sizes

| Size    | Text button | Icon-only button | Inline icon size            |
| ------- | ----------- | ---------------- | --------------------------- |
| `big`   | 52px tall   | 52 × 52          | 24px icon-only, 20px inline |
| `small` | 40px tall   | 40 × 40          | 20px                        |

`link` is 20px tall in both sizes (no padding, no border).

## States

| State         | Prop              | Behavior                                                            |
| ------------- | ----------------- | ------------------------------------------------------------------- |
| Default       | —                 | The variant's own palette.                                          |
| Hover         | —                 | 70/30 mix of the Default and Pressed palettes, text and background. |
| Active        | —                 | The full Pressed palette.                                           |
| Focus-visible | —                 | 2px outline, 2px offset, brand color (danger on `error`).           |
| Disabled      | `disabled={true}` | The variant's own palette at 30% opacity.                           |

The design defines three states — Default, Pressed and Disabled — so Hover is
derived at runtime with `color-mix()` rather than from its own tokens, and sits
between the two. It is gated behind `@media (hover: hover)`, so touch devices go
straight from Default to Pressed. Disabled dims the whole button to 30% opacity
without changing any colors. `disabled` is available only on the button
rendering — anchors have no disabled semantics.

## Hover overrides

Two custom properties let a host override the derived hover palette without
out-specifying this module's rules (CSS-module order across two modules is not
guaranteed):

| Property                   | Overrides                  |
| -------------------------- | -------------------------- |
| `--app-button-bg-hover`    | Hover / focus-visible fill |
| `--app-button-color-hover` | Hover / focus-visible text |

Set them on the button's own class — unset, both fall back to the 70/30 mix.
`AppNavLinkItem` uses the fill override so hover matches its pressed state.

## Rendered element

| Props               | Element                                         |
| ------------------- | ----------------------------------------------- |
| no `href`           | `<button type="button">`                        |
| `href`              | `next/link`                                     |
| `href` + `external` | `<a target="_blank" rel="noopener noreferrer">` |

`target` and `rel` are defaults on the external branch and can be overridden.

## Icons

Icons are content, not API — pass `AppIcon` (or any `currentColor` SVG) as
children and it inherits the button's text color. Exception: `iconOnly`
`tertiary`/`outlined` buttons render the icon in the neutral icon color
(`--color-icon-on-card`) instead of the interactive green. `iconOnly` buttons
require an
`aria-label`; TypeScript enforces it, as it forbids `iconOnly` with
`variant="link"`.

## Usage

```tsx
<AppButton variant="primary" onClick={book}>
  Book now
</AppButton>

<AppButton variant="outlined" size="small">
  <AppIcon name="ArrowRight" />
  Value · 1 600 ₴
</AppButton>

<AppButton iconOnly variant="tertiary" aria-label="Search">
  <AppIcon name="Search" size="large" />
</AppButton>

<AppButton href="/rooms">Browse rooms</AppButton>

<AppButton href="https://bukovel.com" external variant="link">
  Official site
</AppButton>
```

Click handlers come from a client component — `AppButton` itself ships no
`'use client'` directive, so it renders on the server by default.
