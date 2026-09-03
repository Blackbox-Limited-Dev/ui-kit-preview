# AppQtySelector

Quantity stepper on a pill track: minus button, centred count, plus button. Ported from the RN `AppQuantitySelector` — same controlled/uncontrolled contract and delete-at-min behaviour.

## Behaviour

- **Controlled** via `value` + `onChange`, or **uncontrolled** via `defaultValue` (falls back to `min`).
- `min` defaults to 1; `max` is unbounded when omitted; `step` defaults to 1.
- At `min` with `onDelete` passed, the left button swaps minus → delete icon and fires `onDelete()` instead of decrementing. Without `onDelete` the left button disables at `min`.
- At `max` the plus button disables. `disabled` dims and disables the whole control.

## Props

| Prop                              | Type                      | Default       | Description                                        |
| --------------------------------- | ------------------------- | ------------- | -------------------------------------------------- |
| `value`                           | `number`                  | —             | Controlled value                                   |
| `defaultValue`                    | `number`                  | `min`         | Uncontrolled initial value                         |
| `onChange`                        | `(value: number) => void` | —             | Fires on every change                              |
| `onDelete`                        | `() => void`              | —             | Delete action at `min` (see above)                 |
| `min` / `max` / `step`            | `number`                  | `1` / — / `1` | Clamping bounds and increment                      |
| `disabled`                        | `boolean`                 | `false`       | Disables the whole control                         |
| `decreaseLabel` / `increaseLabel` | `string`                  | — (required)  | Button aria-labels                                 |
| `deleteLabel`                     | `string`                  | — (required)  | Delete-button aria-label; required with `onDelete` |
| `className`                       | `string`                  | —             | Applied to the root                                |

## Accessibility

Both buttons carry aria-labels; the host supplies them so the component holds no copy of its own. The count is `aria-live="polite"` so screen readers announce changes.

## Figma

Qty Selector — Bukovel: WEB Design System (Counter / Atom). Variants Default / Min Qty / Remove derive from `min`/`onDelete` state, not props.

## Usage

```tsx
const [qty, setQty] = useState(1)

<AppQtySelector
  value={qty}
  onChange={setQty}
  max={10}
  onDelete={removeItem}
  decreaseLabel={t('qty.decrease')}
  increaseLabel={t('qty.increase')}
  deleteLabel={t('qty.delete')}
/>
```
