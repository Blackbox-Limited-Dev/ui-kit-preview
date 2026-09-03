# AppSearch

Pill-shaped search field for the site header: a bare `type="search"` input on the white input surface (`--color-input-bg`) inside a 1px `--color-stroke-on-surface` border, with a trailing decorative magnifier. Fills its container's width — the 460px in Figma is contextual. Identical in both seasons; Figma's `Stroke=Off` variant is not implemented.

## Slots

The magnifier is `src/assets/icons/magnifying-glass-nav.svg` (the Figma geometry at stroke 1.5 / 24px). It is decorative, not a submit button — iconoir `Search` differs in geometry and the older `magnifying-glass.svg` is drawn at stroke 1.8.

## States

Default, hover (`bg-card-pressed` fill), focus (`--color-input-stroke-active` border via `:focus-within`), filled — the same treatment `AppInput` gives its box. No label, hint, or error states by design — reach for `AppInput` when those are needed. Submitting is the consumer's job: wrap in a `<form>`.

## Props

| Prop        | Type     | Default | Description                 |
| ----------- | -------- | ------- | --------------------------- |
| `className` | `string` | —       | Applied to the root wrapper |

Plus every `<input>` attribute (`placeholder`, `value`, `onChange`, `ref`, …), spread onto the input itself.

## Accessibility

No visible label — pass `aria-label` (or at minimum `placeholder`) so the field keeps an accessible name. The webkit clear button is hidden to match the design.

## Usage

```tsx
<form action="/search">
  <AppSearch name="q" aria-label="Пошук" placeholder="Шукай все що завгодно" />
</form>
```
