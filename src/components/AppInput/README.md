# AppInput

Base text field of the design system — label, box with optional leading/trailing slots, and a description or error line below.

Server-compatible: the component carries no `'use client'` directive. Every visual state is CSS-driven (`:hover`, `:focus-within`, `:disabled`), so it renders inside server components as well as client ones.

## Slots

| Prop        | Type        | Description                                                           |
| ----------- | ----------- | --------------------------------------------------------------------- |
| `slotLeft`  | `ReactNode` | Leading content — an `AppIcon` or a short text appendix.              |
| `slotRight` | `ReactNode` | Trailing content — an `AppIcon`, a text appendix ("кг"), or a button. |

Icons inside a slot render in `--color-icon-on-card`; plain text renders in `--color-input-placeholder`, matching the Figma appendix style. Interactive slot content (for example the `AppPasswordInput` toggle) is not affected by the wrapping `<label>` — the HTML spec skips label activation for interactive descendants.

## States

| State    | Prop        | Visual                                                         |
| -------- | ----------- | -------------------------------------------------------------- |
| Default  | —           | `--color-input-stroke` border on `--color-input-bg`            |
| Hover    | —           | `--color-background-bg-card-pressed` background (pointer only) |
| Active   | —           | `:focus-within` → `--color-input-stroke-active` border         |
| Error    | `error="…"` | Danger border; `error` replaces `description` and turns it red |
| Disabled | `disabled`  | `--color-input-bg-disabled` background, muted value            |

## Props

Everything a native `<input>` accepts (`value`, `defaultValue`, `onChange`, `placeholder`, `type`, `inputMode`, `autoComplete`, `disabled`, `ref`, …) plus:

| Prop          | Type        | Default | Description                                 |
| ------------- | ----------- | ------- | ------------------------------------------- |
| `label`       | `ReactNode` | —       | Label text above the box                    |
| `required`    | `boolean`   | `false` | Red `*` after the label + native `required` |
| `description` | `ReactNode` | —       | Helper line below the box                   |
| `error`       | `string`    | —       | Error line; replaces `description`          |
| `slotLeft`    | `ReactNode` | —       | Leading slot                                |
| `slotRight`   | `ReactNode` | —       | Trailing slot                               |
| `className`   | `string`    | —       | Applied to the root wrapper                 |

## Accessibility

- The field is wrapped in a `<label>`, so the label is associated without an `id`.
- Pass `id` when the description or error must be linked: it wires `aria-describedby` to `<id>-message`.
- `aria-invalid` is set while `error` is present.

## Figma

Bukovel: WEB Design System → Inputs → `Input Molecule` (`6211-6001`) and the `Input` component set.

## Usage

```tsx
<AppInput
  id="email"
  label="Email"
  required
  placeholder="you@example.com"
  description="We only use it for booking confirmations."
  slotLeft={<AppIcon name="Search" size={24} />}
/>
```
