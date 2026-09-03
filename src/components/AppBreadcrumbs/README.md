# AppBreadcrumbs

Breadcrumb trail — 16 Regular text at 110% line-height, 12px between crumbs and separators, which are 8×1.5px lines. Links render in `text-on-bg` and turn `text-interactive` on hover; the current (last) crumb renders in `text-on-bg-subtle` with `aria-current="page"`.

## Props

| Prop        | Type                  | Default      | Description                            |
| ----------- | --------------------- | ------------ | -------------------------------------- |
| `items`     | `AppBreadcrumbItem[]` | —            | Crumbs; `href` optional, last is plain |
| `ariaLabel` | `string`              | — (required) | Landmark name for the `<nav>`          |
| `className` | `string`              | —            | Applied to the root `<nav>`            |

`AppBreadcrumbItem = { label: string; href?: string }`. Plus every attribute a `<nav>` accepts.

## Figma

«Hotels Landing» / «Hotel List» — the trail under the header («Головна — Готелі — Пошук готелів»).

## Usage

```tsx
<AppBreadcrumbs
  items={[
    { label: 'Головна', href: '/' },
    { label: 'Готелі', href: '/hotels' },
    { label: 'Пошук готелів' },
  ]}
  ariaLabel={t('breadcrumbs.label')}
/>
```
