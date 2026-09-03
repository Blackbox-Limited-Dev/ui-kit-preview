# AppSelector

Labelled select field — label above the trigger, the selected value and a caret inside it, options in a floating panel. Wraps the **Radix Select** primitive (`@radix-ui/react-select`), so keyboard navigation, typeahead, and ARIA wiring come from Radix.

The field anatomy mirrors `AppInput`: a semibold label over a 52px box on `--color-input-bg` with a 1px `--color-input-stroke` border that switches to `--color-input-stroke-active` while focused or open. The trigger is named by the visible label via `aria-labelledby`.

## Props

| Prop          | Type                      | Default | Description                                 |
| ------------- | ------------------------- | ------- | ------------------------------------------- |
| `items`       | `AppSelectorItem[]`       | —       | Options: `{ value: string; label: string }` |
| `value`       | `string`                  | —       | Controlled selected value                   |
| `onChange`    | `(value: string) => void` | —       | Fires with the newly selected value         |
| `label`       | `string`                  | —       | Visible label above the trigger             |
| `placeholder` | `string`                  | —       | Shown while no value is selected            |
| `fullWidth`   | `boolean`                 | `false` | Dropdown panel matches the trigger width    |
| `className`   | `string`                  | —       | Applied to the root wrapper                 |

`fullWidth` uses Radix's `--radix-select-trigger-width` variable, available because the panel renders with `position="popper"`.

## Usage

```tsx
<AppSelector
  label="Місяць"
  items={months.map((m) => ({ value: String(m.index), label: m.name }))}
  value={String(monthIndex)}
  onChange={(value) => setMonthIndex(Number(value))}
  fullWidth
/>
```

Used in the ski-pass date card for the flexible-dates month choice.
