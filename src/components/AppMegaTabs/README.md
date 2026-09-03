# AppMegaTabs

Two-line tariff tabs — a 68px on-surface container holding 2–3 equal-width atoms, each a caption over a headline figure. The active atom lifts onto the surface colour and both its lines gain full contrast.

Built on `@radix-ui/react-toggle-group` in single-select mode: the root is a `radiogroup`, items are radios with roving focus, so arrow keys move between them and Enter/Space activates. Selection never clears.

## Props

| Prop         | Type                      | Default | Description                    |
| ------------ | ------------------------- | ------- | ------------------------------ |
| `items`      | `AppMegaTabsItem[]`       | —       | `{ value, caption, price }`    |
| `value`      | `string`                  | —       | Active item value (controlled) |
| `onChange`   | `(value: string) => void` | —       | Selection callback             |
| `aria-label` | `string`                  | —       | Accessible group name          |
| `className`  | `string`                  | —       | Applied to the root element    |

## Figma

`Mega Tabs` — the tariff row inside the ski-pass purchase card. Figma's `Show Third` boolean is just a third item.

## Usage

```tsx
<AppMegaTabs
  items={[
    { value: 'standard', caption: 'Стандарт', price: '1 600 ₴' },
    { value: 'vip', caption: 'VIP-прохід', price: '3 750 ₴' },
  ]}
  value={tariff}
  onChange={setTariff}
  aria-label="Тариф"
/>
```
