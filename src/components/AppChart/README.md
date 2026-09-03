# AppChart

Canvas line or candlestick chart with a volume pane. Pan by drag, zoom by wheel or pinch, and grow with the host via `ResizeObserver`.

Wraps [lightweight-charts](https://tradingview.github.io/lightweight-charts/). Not a Radix primitive — no chart primitive exists there.

## Variants

| Variant  | Description                     |
| -------- | ------------------------------- |
| `line`   | Close price as a line. Default. |
| `candle` | OHLC candlesticks.              |

## States

| State   | Prop                        | Default |
| ------- | --------------------------- | ------- |
| Default | `status="ready"`            | ready   |
| Loading | `status="loading"`          | —       |
| Empty   | `status="empty"` or no rows | —       |

## Props

| Prop         | Type                              | Default         | Description                        |
| ------------ | --------------------------------- | --------------- | ---------------------------------- |
| `kind`       | `'line' \| 'candle'`              | `'line'`        | Series type                        |
| `data`       | `readonly AppChartCandle[]`       | `[]`            | OHLC (+ optional `volume`)         |
| `status`     | `'ready' \| 'loading' \| 'empty'` | `'ready'`       | Loading / empty replace the canvas |
| `height`     | `number`                          | `360`           | Host height in CSS pixels          |
| `aria-label` | `string`                          | `'Price chart'` | Accessible name                    |
| `className`  | `string`                          | —               | Applied to the root element        |

Colours come from theme tokens (`data-theme`) at mount. Drag-pan and wheel-zoom are library defaults.

Storybook-only for now — not exported from `src/components/index.ts` and not on the in-app showcase.

## Usage

```tsx
<AppChart kind="candle" data={rows} height={360} />
```
