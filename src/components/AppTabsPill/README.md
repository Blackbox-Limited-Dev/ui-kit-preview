# AppTabsPill

Toggle pill — an on-surface container with pill items; the active item gets a white background and full-opacity text. Two sizes: `xl` (44px items, list toolbar) and `md` (36px items, the floating mobile pill). Items can be disabled («Карта» until the map view ships).

Built on `@radix-ui/react-toggle-group` in single-select mode: the root is a `radiogroup`, items are radios with roving focus, so arrow keys move between them and Enter/Space activates. Selection never clears — re-activating the current item is a no-op.

A disabled item carries `aria-disabled` only, never the `disabled` attribute: Radix drops a disabled item out of the roving tab order, which would hide it from keyboard users. It stays focusable and announces its state, but activating it does nothing.

## Props

| Prop         | Type                        | Default        | Description                              |
| ------------ | --------------------------- | -------------- | ---------------------------------------- |
| `items`      | `AppTabsPillItem[]`         | —              | `{ value, label, disabled? }`            |
| `value`      | `string`                    | —              | Active item value (controlled)           |
| `onChange`   | `(value: string) => void`   | —              | Selection callback                       |
| `size`       | `'xl' \| 'md'`              | `'xl'`         | Item height 44 / 36                      |
| `tone`       | `'on-surface' \| 'on-card'` | `'on-surface'` | Container/active-item colours            |
| `stretch`    | `boolean`                   | `false`        | Fill the parent width, equal-width items |
| `aria-label` | `string`                    | —              | Accessible group name                    |
| `className`  | `string`                    | —              | Applied to the root element              |

`tone='on-card'` inverts the pair for tabs sitting on a card: the container takes the surface colour and the active item the theme background. Use it wherever the tab row sits inside a tinted card, like the ski-pass season accordion.

## Figma

«Hotel List» — the Список/Карта toggle in the list toolbar (xl) and the floating mobile pill (md). «Ski-pass list» — the Поспіль/На вибір row inside the season accordion (md, stretch, on-card) and inside the date card (md, stretch).

## Usage

```tsx
<AppTabsPill
  items={[
    { value: 'list', label: 'Список' },
    { value: 'map', label: 'Карта', disabled: true },
  ]}
  value={view}
  onChange={setView}
  aria-label="Вигляд результатів"
/>
```
