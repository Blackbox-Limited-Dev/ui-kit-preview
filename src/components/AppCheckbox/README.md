# AppCheckbox

A checkbox with an optional label row. Wraps
[`@radix-ui/react-checkbox`](https://www.radix-ui.com/primitives/docs/components/checkbox)
— Radix owns the state machine, ARIA (`role="checkbox"`, `aria-checked`),
keyboard activation and the hidden form input; this component owns the styling
and the row layout.

## Props

| Prop                | Type                         | Default | Description                                                           |
| ------------------- | ---------------------------- | ------- | --------------------------------------------------------------------- |
| `id`                | `string`                     | —       | Required. Also the label's `htmlFor` target — unique per page.        |
| `checked`           | `boolean`                    | —       | Controlled state. Pair with `onCheckedChange`.                        |
| `defaultChecked`    | `boolean`                    | `false` | Uncontrolled initial state.                                           |
| `onCheckedChange`   | `(checked: boolean) => void` | —       | Fires on every state change.                                          |
| `disabled`          | `boolean`                    | `false` | Disables the control and dims the label.                              |
| `required`          | `boolean`                    | `false` | Forwarded to the hidden form input.                                   |
| `name` / `value`    | `string`                     | —       | Forwarded to the hidden form input.                                   |
| `label`             | `ReactNode`                  | —       | Rendered as the control's `<label>`; clicking it toggles the control. |
| `className`         | `string`                     | —       | Merged onto the row wrapper.                                          |
| `aria-label(ledby)` | `string`                     | —       | Required when no `label` is passed.                                   |

There is no indeterminate state — Radix supports it, the design does not define
it, so `onCheckedChange` narrows to `boolean`.

## States

| State               | Box background        | Border                         | Checkmark         |
| ------------------- | --------------------- | ------------------------------ | ----------------- |
| Unchecked           | `background-surface`  | 2px `stroke-on-surface`        | —                 |
| Checked             | `interactive-primary` | none                           | `icon-on-primary` |
| Unchecked, disabled | `input-bg-disabled`   | none                           | —                 |
| Checked, disabled   | `input-bg-disabled`   | none                           | `icon-disabled`   |
| Focus-visible       | —                     | 2px outline, 2px offset, brand | —                 |

The design defines no hover state, so there is none — only `cursor: pointer`.

## Usage

```tsx
<AppCheckbox id="terms" label="I agree to the terms" defaultChecked />

<AppCheckbox id="offers" label="Send me offers" onCheckedChange={setSubscribed} />

<AppCheckbox id="select-row" aria-label="Select row" checked={selected} onCheckedChange={setSelected} />
```

`AppCheckbox` ships `'use client'` — Radix needs it. Controlled usage therefore
works from any client component; server components can render the uncontrolled
form.
