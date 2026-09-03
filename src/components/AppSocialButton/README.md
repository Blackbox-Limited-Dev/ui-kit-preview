# AppSocialButton

Circular social-media link button — 52px circle with a brand icon, rendered as an `<a target="_blank">`.

## States

Default (`bg-card` + `stroke-on-surface` border, `icon-on-card` icon), hover (whole button fades to 0.7 opacity), pressed (`bg-card-pressed` background), focus-visible ring.

## Props

| Prop        | Type                                      | Default    | Description                         |
| ----------- | ----------------------------------------- | ---------- | ----------------------------------- |
| `brand`     | `'instagram' \| 'facebook' \| 'telegram'` | —          | Which brand icon to render          |
| `href`      | `string`                                  | —          | Link target (opens in new tab)      |
| `label`     | `string`                                  | brand name | `aria-label` for the icon-only link |
| `className` | `string`                                  | —          | Applied to the root element         |

Plus every `<a>` attribute.

## Figma

Bukovel WEB Design System — social components frame. Figma draws a 56px circle; the shipped size is 52px per the footer layouts.

## Usage

```tsx
<AppSocialButton brand="instagram" href="https://www.instagram.com/bukovel" />
```
