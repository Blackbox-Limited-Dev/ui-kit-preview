# AppFooterLink

Footer navigation text link — body-1 regular, subtle color that darkens on hover/press. Renders `next/link` by default, a plain `<a target="_blank">` with `external`.

## States

Default (`text-on-bg-subtle`), hover/pressed (`text-on-bg`), focus-visible ring.

## Props

| Prop        | Type        | Default | Description                                        |
| ----------- | ----------- | ------- | -------------------------------------------------- |
| `href`      | `string`    | —       | Link target                                        |
| `external`  | `boolean`   | `false` | Plain `<a target="_blank">` instead of `next/link` |
| `children`  | `ReactNode` | —       | Link text                                          |
| `className` | `string`    | —       | Applied to the root element                        |

Plus every `<a>` attribute.

## Figma

Bukovel WEB Design System — footer link component (default / hover / pressed variants).

## Usage

```tsx
<AppFooterLink href="/blog">Блог</AppFooterLink>
<AppFooterLink href="https://invest.bukovel.com" external>
  Invest Bukovel
</AppFooterLink>
```
