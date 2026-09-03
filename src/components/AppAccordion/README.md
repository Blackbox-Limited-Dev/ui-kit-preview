# AppAccordion

Accordion — wraps Radix Accordion in `type="multiple"`. Each item is a header row (label + 20px chevron that swaps between caret-down and chevron-up) over a collapsible content slot.

Two variants: `divider` (default) renders 36px rows split by 1px lines, for filter groups; `card` gives every item its own 24px padding / 24px radius tinted card with a 40px white circular trigger, for FAQ blocks.

Compound: `AppAccordion` (root) + `AppAccordion.Item` (`value`, `title`, children). The item is also exported on its own as `AppAccordionItem` — a server component cannot read `.Item` off a client-component reference.

Content expands/collapses with a 0.2s height animation (driven by `--radix-accordion-content-height`); disabled under `prefers-reduced-motion: reduce`.

## Props

`AppAccordion`:

| Prop           | Type                  | Default     | Description                    |
| -------------- | --------------------- | ----------- | ------------------------------ |
| `defaultValue` | `string[]`            | —           | Initially expanded item values |
| `variant`      | `'divider' \| 'card'` | `'divider'` | Row style (see above)          |
| `children`     | `ReactNode`           | —           | `AppAccordion.Item` elements   |
| `className`    | `string`              | —           | Applied to the root element    |

`AppAccordion.Item`: `value: string`, `title: ReactNode`, `children`, `className`.

`title` takes a node, not just a string, so a header can carry an info trigger, a badge and a meta row alongside its label.

## Figma

«Hotel List» — filter groups in the sidebar and the filters drawer (`divider`). «Ski-pass PDP» — the «Часті запитання» block (`card`).

## Usage

```tsx
<AppAccordion defaultValue={['price']}>
  <AppAccordion.Item value="price" title="Ціна">
    …
  </AppAccordion.Item>
</AppAccordion>
```
