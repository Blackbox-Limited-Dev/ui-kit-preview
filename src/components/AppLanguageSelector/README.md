# AppLanguageSelector

Language switcher for the site header: pill trigger (round flag, uppercase language code, down chevron) opening a Radix `DropdownMenu` with the three languages as native-name items. Selecting an item fires `onLanguageChange`.

## Slots

Flags come from the shared `src/assets/img/flags/flag-{ua,pl,ro}.svg` circles (also used by `AppPhoneInput`), rendered inline via SVGR — they are sub-KB and sit above the fold, so inlining beats a lazy-loaded image request. Menu items add the 1px `stroke-divider-on-surface` ring per the dropdown design.

## States

Trigger: default (`bg-card`, no border), hover (`bg-card-pressed`), focus-visible ring. Menu item: default (`bg-card`), hover and keyboard-highlighted (`bg-card-pressed`).

## Props

| Prop               | Type                              | Default | Description                   |
| ------------------ | --------------------------------- | ------- | ----------------------------- |
| `language`         | `AppLanguage`                     | —       | `'ua' \| 'pl' \| 'ro'`        |
| `onLanguageChange` | `(language: AppLanguage) => void` | —       | Fires on menu item select     |
| `className`        | `string`                          | —       | Applied to the trigger button |

Plus every `<button>` attribute, applied to the trigger.

## Accessibility

Radix DropdownMenu provides `aria-haspopup`/`aria-expanded` on the trigger, arrow-key navigation, Enter to select, and Esc to close. The visible language code is the trigger's accessible name; flags are `aria-hidden`. Item labels are the languages' own names («Українська», «Română», «Polski») — they intentionally never translate.

## Usage

Controlled — the parent owns the selected language.

```tsx
<AppLanguageSelector language={language} onLanguageChange={setLanguage} />
```
