# AppRadioGroup

A radio group and its items. Wraps
[`@radix-ui/react-radio-group`](https://www.radix-ui.com/primitives/docs/components/radio-group)
— Radix owns roving-focus arrow-key navigation, `role="radiogroup"`, selection
state and the hidden form input; this component owns the styling and the row
layout. There is no project-side context: the group state lives in Radix's own.

Radios only exist inside a group, so the API is compound:
`AppRadioGroup` + `AppRadioGroup.Item`.

## Props — `AppRadioGroup`

| Prop                | Type                         | Default      | Description                                       |
| ------------------- | ---------------------------- | ------------ | ------------------------------------------------- |
| `value`             | `string`                     | —            | Controlled selection. Pair with `onValueChange`.  |
| `defaultValue`      | `string`                     | —            | Uncontrolled initial selection.                   |
| `onValueChange`     | `(value: string) => void`    | —            | Fires when the selection changes.                 |
| `name`              | `string`                     | —            | Forwarded to the hidden form input.               |
| `disabled`          | `boolean`                    | `false`      | Disables every item.                              |
| `required`          | `boolean`                    | `false`      | Forwarded to the hidden form input.               |
| `orientation`       | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction and arrow-key axis.              |
| `className`         | `string`                     | —            | Merged onto the group wrapper.                    |
| `aria-label(ledby)` | `string`                     | —            | A radiogroup needs an accessible name — pass one. |

## Props — `AppRadioGroup.Item`

| Prop        | Type        | Default | Description                                                     |
| ----------- | ----------- | ------- | --------------------------------------------------------------- |
| `id`        | `string`    | —       | Required. Also the label's `htmlFor` target — unique per page.  |
| `value`     | `string`    | —       | Required. Identifies the item within the group.                 |
| `disabled`  | `boolean`   | `false` | Disables this item only.                                        |
| `label`     | `ReactNode` | —       | Rendered as the item's `<label>`; clicking it selects the item. |
| `className` | `string`    | —       | Merged onto the row wrapper.                                    |

## States

| State               | Circle background    | Ring                           | Dot (12 × 12)                                                |
| ------------------- | -------------------- | ------------------------------ | ------------------------------------------------------------ |
| Unchecked           | `background-surface` | 2px `stroke-on-surface`        | —                                                            |
| Checked             | `background-surface` | 2px `interactive-primary`      | `interactive-primary`                                        |
| Unchecked, disabled | `input-bg-disabled`  | none                           | —                                                            |
| Checked, disabled   | `input-bg-disabled`  | none                           | 50/50 `color-mix` of `icon-disabled` and `input-bg-disabled` |
| Focus-visible       | —                    | 2px outline, 2px offset, brand | —                                                            |

The design defines no hover state, so there is none. The disabled+checked Figma
variant draws a checkmark copied from the checkbox; this implementation draws
the dot, which is what a radio means.

## Why the ring is a shadow, not a border

Ring, gap and dot are three stacked inset shadows on the control itself; there
is no `RadioGroup.Indicator` child. Element boxes snap to whole device pixels,
so a 12px dot inside a 24px ring rounds to a different phase than its parent and
sits a device pixel off centre at a fractional pixel ratio — measured at 8
device pixels of gap on one side against 7 on the other at `1.25`. Shadows
painted inside a single box share that box's rounding and cannot drift. Do not
convert this back to a `border` plus a child element.

## Keyboard

Tab enters and leaves the group as a single stop; arrow keys move the selection
between enabled items and wrap around. All of it comes from Radix.

## Usage

```tsx
<AppRadioGroup defaultValue="card" aria-label="Payment method">
  <AppRadioGroup.Item id="payment-card" value="card" label="Card" />
  <AppRadioGroup.Item id="payment-cash" value="cash" label="Cash" />
  <AppRadioGroup.Item id="payment-invoice" value="invoice" label="Invoice" />
</AppRadioGroup>
```

`AppRadioGroup` ships `'use client'` — Radix needs it. `AppRadioGroup.Item`
inherits that boundary from the root.
