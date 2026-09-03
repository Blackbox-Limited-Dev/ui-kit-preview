# AppMessageBanner

Inline notice — an icon, one line of message text and an optional trailing action, on a tinted 16px-radius row.

Four colour treatments: `secondary` (teal, centred, no icon), `info` (blue on the on-surface tint), `white` (blue on the plain surface) and `danger` (red on the attention tint). Figma's fifth «Action + Error» state is `danger` with an `action` node — the slot is a `ReactNode` so the banner stays a server component and the caller owns the press target.

## Props

| Prop        | Type                                           | Default                                | Description                 |
| ----------- | ---------------------------------------------- | -------------------------------------- | --------------------------- |
| `variant`   | `'secondary' \| 'info' \| 'white' \| 'danger'` | `'info'`                               | Colour treatment            |
| `size`      | `'sm' \| 'md' \| 'md-condensed'`               | `'sm'`                                 | 14/140%, 16/150%, 16/110%   |
| `align`     | `'start' \| 'center'`                          | `center` for `secondary`, else `start` | Row and text alignment      |
| `action`    | `ReactNode`                                    | —                                      | Trailing press target       |
| `children`  | `ReactNode`                                    | —                                      | Message text                |
| `className` | `string`                                       | —                                      | Applied to the root element |

`md-condensed` is the 16/110% Figma style used by the off-season start-of-season notice and the Mastercard promo line — it has no mixin of its own, so the component applies the 110% line-height on top of `text-body-1`.

## Figma

`Message banner` — the PDP «Діти не можуть бути у SPA…» note and the off-season «Орієнтовний старт зимового сезону…» notice.

## Usage

```tsx
<AppMessageBanner variant="secondary" size="md" align="start">
  Діти не можуть бути у SPA…
</AppMessageBanner>
```
