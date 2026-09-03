# AppNavLinkItem

Round 44 × 44 icon-only navigation item for the site header. A thin wrapper over `AppButton` (`variant="tertiary" iconOnly`) with a customizable icon — the Figma component's `Icon` swap property maps to the `name`/`icon` props.

## Slots

The icon comes from exactly one of two props, mirroring `AppIcon`:

- `name` — an icon from the AppIcon iconoir registry.
- `icon` — any SVGR component (`import Bell from '~icons/notifications-bell.svg'`).

## States

`AppButton` tertiary, minus the pressed step: default (`bg-card`), hover (`bg-card-pressed`), focus-visible ring, disabled. `:active` matches hover, so a click does not deepen the fill.

## Props

| Prop        | Type               | Default | Description                                                           |
| ----------- | ------------------ | ------- | --------------------------------------------------------------------- |
| `label`     | `string`           | —       | Accessible name (`aria-label`) — required                             |
| `count`     | `number`           | —       | Count indicator, top-right; hidden when zero; displays `99+` above 99 |
| `name`      | `IconoirIconName`  | —       | Registry icon (mutually exclusive with `icon`)                        |
| `icon`      | `AppIconComponent` | —       | SVGR icon (mutually exclusive with `name`)                            |
| `href`      | `string`           | —       | Renders `next/link` instead of `<button>`                             |
| `external`  | `boolean`          | `false` | With `href`: plain `<a target="_blank">`                              |
| `className` | `string`           | —       | Applied to the root element                                           |

Plus every attribute the rendered element accepts (`onClick`, `disabled`, …) via `AppButton`'s element polymorphism.

## Accessibility

Icon-only, so `label` is mandatory and becomes the `aria-label`; the icon itself stays decorative (`aria-hidden`). With a `count`, the item is wrapped in a positioned span and the badge is folded into the button's accessible name (`Кошик, 3`) — the badge element itself is `aria-hidden`, so the exact count is announced even when the badge visually reads `99+`.

## Usage

```tsx
<AppNavLinkItem label="Меню" name="Menu" onClick={openMenu} />

<AppNavLinkItem label="Кошик" icon={CartIcon} href="/cart" />
```
