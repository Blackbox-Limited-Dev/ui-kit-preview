# AppBadge

Pill-shaped status or tag label. Renders a `<span>` by default; pass `as="li"` to use it inside a list.

## Variants

| Variant   | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `neutral` | Muted text on the on-surface background — default, e.g. "Planned" |
| `success` | Green text on a 12% green tint, e.g. "Ready"                      |
| `warning` | Amber text on an 18% tint, e.g. "In progress"                     |
| `outline` | Muted text on the surface with a 1px stroke — tags                |

## Props

| Prop        | Type              | Default     | Description                 |
| ----------- | ----------------- | ----------- | --------------------------- |
| `variant`   | `AppBadgeVariant` | `'neutral'` | Colour treatment            |
| `as`        | `ElementType`     | `'span'`    | Rendered element            |
| `className` | `string`          | —           | Applied to the root element |

Plus every attribute the rendered element accepts.

## Figma

No Figma source. The component formalises the status and tag pills that already lived in the component-showcase index, so the four variants map 1:1 to what that page rendered. Re-check the tokens against the design file once a badge component ships there.

## Usage

```tsx
<AppBadge variant="success">Ready</AppBadge>

<ul>
  {tags.map((tag) => (
    <AppBadge key={tag} as="li" variant="outline">
      {tag}
    </AppBadge>
  ))}
</ul>
```
