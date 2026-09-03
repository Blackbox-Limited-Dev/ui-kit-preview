# AppLogo

Generic brand mark. Renders the full wordmark (`big`) or the standalone icon mark (`small`) as an inline SVG. Not a link — wrap it in `next/link` where navigation is needed.

## Sizes

| Size    | Rendered | Asset                  |
| ------- | -------- | ---------------------- |
| `big`   | 163 × 40 | `assets/logo-text.svg` |
| `small` | 40 × 40  | `assets/logo-icon.svg` |

## Props

| Prop        | Type          | Default  | Description                    |
| ----------- | ------------- | -------- | ------------------------------ |
| `size`      | `AppLogoSize` | `'big'`  | Which mark to render           |
| `label`     | `string`      | `'Logo'` | Accessible name (`role="img"`) |
| `className` | `string`      | —        | Applied to the root SVG        |

## Accessibility

The SVG carries `role="img"` and `aria-label`, so screen readers announce it as a single image. Marks use `currentColor` so they follow the surrounding text color.

## Usage

```tsx
<Link href="/">
  <AppLogo />
</Link>

<AppLogo size="small" />
```
