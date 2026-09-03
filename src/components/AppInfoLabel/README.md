# AppInfoLabel

Outlined chip for hotel-card perks and counters — 12 Regular text on the card background with a 1px stroke and an optional 16px leading icon slot.

## Props

| Prop        | Type        | Default | Description                                    |
| ----------- | ----------- | ------- | ---------------------------------------------- |
| `icon`      | `ReactNode` | —       | Optional 16px leading slot (icon / brand mark) |
| `children`  | `ReactNode` | —       | Chip content                                   |
| `className` | `string`    | —       | Applied to the root element                    |

Plus every attribute a `<span>` accepts.

## Figma

«Hotel List» — the perk chips row on hotel cards («-5% з Mastercard», «Скі-пас», «+3»).

## Usage

```tsx
<AppInfoLabel icon={<AppIcon icon={MastercardIcon} size={16} />}>
  -5% з Mastercard
</AppInfoLabel>
```
