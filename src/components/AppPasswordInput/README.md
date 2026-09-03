# AppPasswordInput

Password field — an `AppInput` with an eye toggle in the trailing slot. Client component (`'use client'`): it owns the visibility state.

Takes every `AppInput` prop except `type` and `slotRight`, which it controls itself. `autoComplete` defaults to `current-password` — pass `new-password` on registration forms.

## States

| State    | Prop         | Visual                                       |
| -------- | ------------ | -------------------------------------------- |
| Hidden   | default      | Browser bullets, `Eye` icon in the toggle    |
| Visible  | toggle click | Plain text, `EyeClosed` icon in the toggle   |
| Error    | `error="…"`  | Danger border and message, toggle unaffected |
| Disabled | `disabled`   | Field and toggle both disabled, muted icon   |

## Props

| Prop        | Type     | Default         | Description                       |
| ----------- | -------- | --------------- | --------------------------------- |
| `showLabel` | `string` | `Show password` | Toggle `aria-label` while hidden  |
| `hideLabel` | `string` | `Hide password` | Toggle `aria-label` while visible |

Plus all of [`AppInput`](../AppInput/README.md).

## Accessibility

- The toggle is a real `<button type="button">`: Enter and Space activate it, and focus stays on it after the click (the HTML spec skips label activation for interactive descendants, so the wrapping `<label>` does not steal focus).
- It carries `aria-pressed` and an `aria-label` that flips with the state.

## Figma

Bukovel: WEB Design System → Inputs → password frames (`3074-8669`).

Divergence from the design: the hidden value renders as native browser bullets instead of the teal asterisk glyphs shown in Figma. A native `type="password"` cannot restyle its masking character, and replacing it with a custom-rendered mask would cost the browser's password manager, autofill, and paste handling.
