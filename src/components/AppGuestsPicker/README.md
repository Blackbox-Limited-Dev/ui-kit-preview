# AppGuestsPicker

Guest count selector — «Дорослі» and «Діти» rows, each with an `AppQtySelector` stepper pill. Adults floor at 1, children at 0; steppers disable at the bounds.

## Props

| Prop                                              | Type                              | Default      | Description                         |
| ------------------------------------------------- | --------------------------------- | ------------ | ----------------------------------- |
| `value`                                           | `AppGuestsValue`                  | —            | `{ adults, children }` (controlled) |
| `onChange`                                        | `(value: AppGuestsValue) => void` | —            | Change callback                     |
| `adultsLabel` / `adultsHint`                      | `string`                          | — (required) | Adults row label and sub-label      |
| `childrenLabel` / `childrenHint`                  | `string`                          | — (required) | Children row label and sub-label    |
| `adultsDecreaseLabel` / `adultsIncreaseLabel`     | `string`                          | — (required) | Adults stepper aria-labels          |
| `childrenDecreaseLabel` / `childrenIncreaseLabel` | `string`                          | — (required) | Children stepper aria-labels        |
| `maxAdults`                                       | `number`                          | `10`         | Upper bound for adults              |
| `maxChildren`                                     | `number`                          | `10`         | Upper bound for children            |
| `className`                                       | `string`                          | —            | Applied to the root element         |

Every label is required — the component holds no copy of its own.

## Figma

«Hotels Landing» — the guests popover (320×206 desktop) and mobile guests modal.

## Usage

```tsx
const [guests, setGuests] = useState({ adults: 2, children: 0 })

<AppGuestsPicker value={guests} onChange={setGuests} {...guestsLabels} />
```
