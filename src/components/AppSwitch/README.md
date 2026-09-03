# AppSwitch

A toggle switch. Wraps
[`@radix-ui/react-switch`](https://www.radix-ui.com/primitives/docs/components/switch)
— Radix owns `role="switch"`, `aria-checked`, keyboard activation and the hidden
form input; this component owns the track, the knob and the motion.

## Accessible name is mandatory

The design defines no switch label row, so `AppSwitch` renders no text of its
own and has **no `label` prop**. A `role="switch"` button with no content has no
accessible name, so every instance must pass `aria-label` — or `aria-labelledby`
pointing at visible text the screen already shows.

## Props

| Prop                | Type                         | Default | Description                                    |
| ------------------- | ---------------------------- | ------- | ---------------------------------------------- |
| `checked`           | `boolean`                    | —       | Controlled state. Pair with `onCheckedChange`. |
| `defaultChecked`    | `boolean`                    | `false` | Uncontrolled initial state.                    |
| `onCheckedChange`   | `(checked: boolean) => void` | —       | Fires on every state change.                   |
| `disabled`          | `boolean`                    | `false` | Disables the control.                          |
| `required`          | `boolean`                    | `false` | Forwarded to the hidden form input.            |
| `name` / `value`    | `string`                     | —       | Forwarded to the hidden form input.            |
| `className`         | `string`                     | —       | Merged onto the track.                         |
| `aria-label(ledby)` | `string`                     | —       | Required — see above.                          |

## States

| State        | Track                      | Knob                          |
| ------------ | -------------------------- | ----------------------------- |
| Off          | `background-bg-on-surface` | White, 2px from the left edge |
| On           | `interactive-primary`      | White, translated 22px right  |
| Disabled off | `input-text-disabled`      | White, left                   |
| Disabled on  | `input-text-disabled`      | White, right                  |

Both disabled variants share one track color by design — the knob's position
still carries the value.

Geometry: 54 × 32 pill track, 28 × 28 knob inset 2px on every side, 22px travel,
two-layer knob shadow. The knob animates with `transform` only (compositor-only,
no layout per frame); the track cross-fades its background over 0.15s.

Both of the knob's insets ride in that `transform`, and the track aligns it
`flex-start` rather than centring it. The track leaves 4 CSS px of vertical
slack, which is an odd number of device pixels at a fractional pixel ratio, so a
laid-out knob snapped 3 above and 2 below. Transforms are not pixel-snapped.
Keep `align-items: flex-start` on the track and the `2px` in the `translate()`.

## Usage

```tsx
<AppSwitch aria-label="Email notifications" defaultChecked />

<AppSwitch
  aria-labelledby="wifi-label"
  checked={wifi}
  onCheckedChange={setWifi}
/>
```

`AppSwitch` ships `'use client'` — Radix needs it.
