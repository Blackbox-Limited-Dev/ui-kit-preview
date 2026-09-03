# AppMetaList

Dot-separated meta row — arbitrary nodes joined by 3px circular dividers. Replaces the repeated «Circle Divider» pattern that appears in page titles, accordion headers and inside cards.

Items are `ReactNode`, not strings, so one entry can be emphasised (the season accordion puts a semibold price first, then two plain date ranges).

## Props

| Prop        | Type                     | Default    | Description                            |
| ----------- | ------------------------ | ---------- | -------------------------------------- |
| `items`     | `ReactNode[]`            | —          | Row entries, dividers inserted between |
| `gap`       | `number`                 | `8`        | Space around each divider, in px       |
| `tone`      | `'subtle' \| 'disabled'` | `'subtle'` | Divider colour                         |
| `className` | `string`                 | —          | Applied to the root element            |

`subtle` uses `--color-icon-on-secondary-subtle` (page backgrounds and accordion headers); `disabled` uses `--color-interactive-disabled` (inside cards).

Typography is the caller's — the row inherits font size and colour from its context.

## Figma

«Ski-pass list», «Ski-pass PDP», «Bukovel Card PDP» — page title meta, season accordion header, purchase-card meta, season hint heading.

## Usage

```tsx
<AppMetaList gap={8} items={['Поспіль', '2025-2026']} />
```
