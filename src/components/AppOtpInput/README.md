# AppOtpInput

One-time-code field — a row of single-digit cells backed by one hidden input.

Built on the **`input-otp`** package (Radix has no OTP primitive). It renders a single accessible `<input>` and exposes per-cell render state, which gives real paste, autofill of SMS codes (`autocomplete="one-time-code"`), and backspace behaviour for free. Client component (`'use client'`).

## Props

| Prop         | Type                      | Default | Description                                           |
| ------------ | ------------------------- | ------- | ----------------------------------------------------- |
| `value`      | `string`                  | —       | Digits entered so far                                 |
| `onChange`   | `(value: string) => void` | —       | Fires on every keystroke and paste                    |
| `length`     | `number`                  | `4`     | Number of cells                                       |
| `onComplete` | `(value: string) => void` | —       | Fires once `length` digits are entered                |
| `error`      | `string`                  | —       | Message below the cells, danger cell borders          |
| `disabled`   | `boolean`                 | `false` | Blocks input, mutes the cells                         |
| `autoFocus`  | `boolean`                 | `false` | Focuses the field on mount                            |
| `className`  | `string`                  | —       | Applied to the root wrapper                           |
| `aria-label` | `string`                  | —       | Names the field — pass one, there is no visible label |

Input is restricted to digits (`REGEXP_ONLY_DIGITS`, `inputMode="numeric"`).

## States

| State    | Visual                                                                |
| -------- | --------------------------------------------------------------------- |
| Default  | `--color-input-stroke` border on `--color-input-bg`                   |
| Active   | Focused cell gets `--color-input-stroke-active` plus a blinking caret |
| Error    | Danger borders on every cell + message below                          |
| Disabled | `--color-input-bg-disabled` background, muted digits                  |

The caret is drawn by the component because the real input is visually hidden; it stops blinking under `prefers-reduced-motion: reduce`.

## Figma

Bukovel: WEB Design System → Inputs → OTP frame (`3080-4477`).

Divergence from the design: cells flex to share the row width instead of the fixed 82.3 px from the frame, so a 6-digit code and a narrow container both work.

## Usage

```tsx
const [code, setCode] = useState('')

<AppOtpInput
  aria-label="Confirmation code"
  value={code}
  onChange={setCode}
  onComplete={submit}
/>
```
