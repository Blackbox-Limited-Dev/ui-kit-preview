# AppLinkCard

Sidebar navigation card — a 96px bordered row with a wrapping 18px Medium title and a 48px illustration on the right.

`href` turns the card into a `next/link` and enables the hover treatment (pressed background, primary border); without it the card is a plain block with no hover state.

The illustration is passed in as a node and rendered `aria-hidden` — it repeats the title, so it carries no meaning of its own.

## Props

| Prop        | Type        | Default | Description                    |
| ----------- | ----------- | ------- | ------------------------------ |
| `title`     | `ReactNode` | —       | Card label, wraps to two lines |
| `artwork`   | `ReactNode` | —       | 48×48 decorative illustration  |
| `href`      | `string`    | —       | Renders the card as a link     |
| `className` | `string`    | —       | Applied to the root element    |

## Figma

Sidebar `card` on the ski-pass list and both product pages — «Мої скі-паси та носії», «Правила використання скі-пасів», «Часті запитання».

## Usage

```tsx
<AppLinkCard title="Мої скі-паси та носії" artwork={<MyPassesArt />} />
```
