# AppBulletPoint

Checklist row — a 24px circular marker and one line of subtle text, 18px above `md` and 16px below. Three markers: `check` (teal tick on the primary tint), `attention` (red warning triangle on the attention tint) and `info` (blue info circle on the on-surface tint).

## Props

| Prop        | Type                               | Default   | Description                 |
| ----------- | ---------------------------------- | --------- | --------------------------- |
| `type`      | `'check' \| 'attention' \| 'info'` | `'check'` | Marker treatment            |
| `children`  | `ReactNode`                        | —         | Row text                    |
| `className` | `string`                           | —         | Applied to the root element |

## Figma

`Bullet Point` (`Type = Check | Attention | Info`) — the «Доставка та активація» list on both product pages uses `check`.

## Usage

```tsx
<AppBulletPoint>Отримати у VIP касі курорту</AppBulletPoint>
```
