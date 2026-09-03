# AppPhoneInput

Phone field — a country calling-code dropdown next to a masked national number.

Built on **`@radix-ui/react-select`** (trigger, portal, viewport, item) for the country dropdown, and on `AppInput` for the number box. Client component (`'use client'`): it owns the mask formatting and the select state.

## Value contract

Controlled pair — the parent assembles the full international number:

```tsx
const [phone, setPhone] = useState('')
const [country, setCountry] = useState<AppPhoneCountryIso>('UA')

<AppPhoneInput
  label="Phone number"
  value={phone}                 // national digits only: '501234567'
  onChange={setPhone}
  country={country}             // 'UA' | 'PL' | 'RO'
  onCountryChange={setCountry}
/>

// full number: `${countriesByIso[country].dial}${phone}`
```

`value` holds digits only; the component renders them masked (`50 123 45 67`) and emits digits back through `onChange`. Digits beyond the mask's capacity are dropped.

## Countries

| ISO  | Dial   | Mask           |
| ---- | ------ | -------------- |
| `UA` | `+380` | `00 000 00 00` |
| `PL` | `+48`  | `000 000 000`  |
| `RO` | `+40`  | `000 000 000`  |

Add one by appending a row to `AppPhoneInput.countries.ts` and dropping its 20 × 20 circle flag into `src/assets/img/flags/` (then run `npm run assets:optimize`). In the mask, every `0-9` is a digit placeholder and every other character is a literal.

## Props

| Prop              | Type                      | Description                                |
| ----------------- | ------------------------- | ------------------------------------------ |
| `value`           | `string`                  | National digits, no calling code           |
| `onChange`        | `(value: string) => void` | Receives digits only                       |
| `country`         | `AppPhoneCountryIso`      | Selected country                           |
| `onCountryChange` | `(iso) => void`           | Fired by the dropdown                      |
| `label`           | `ReactNode`               | Label above the row                        |
| `required`        | `boolean`                 | Red `*` + native `required`                |
| `description`     | `ReactNode`               | Helper line below the row                  |
| `error`           | `string`                  | Replaces `description`, reddens both boxes |
| `disabled`        | `boolean`                 | Disables the trigger and the number field  |
| `id` / `name`     | `string`                  | Applied to the number input                |
| `className`       | `string`                  | Applied to the root wrapper                |

## Accessibility

- The trigger is a Radix `Select.Trigger` (a real `<button>`): Enter/Space opens, arrows move, Escape closes, typing jumps to a country.
- It carries `aria-label="Country calling code"` — its visible content is a flag plus a dial code.
- The label points at the number input via `htmlFor`; `aria-describedby` links the description/error line and `aria-invalid` is set while `error` is present.

## Figma

Bukovel: WEB Design System → Inputs → phone input frames (`3071-8632`, `3074-8677`).

Divergence from the design: the flag disc carries a `--color-stroke-divider-on-surface` outline for every country, not only the non-Ukrainian ones — the token is near-invisible against the input background and one rule covers every future flag.
