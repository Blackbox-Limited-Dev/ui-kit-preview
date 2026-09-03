# AppProductPage

Product detail page template — a two-column body with a sticky purchase aside, plus the section kit every product page repeats. Each sub owns its own `AppSectionCard` and title, so a page body is a flat list of subs.

Ported from `bukovel-rn`'s `AppProductPage`: prop names match so the two codebases read side by side. The web version drops the RN scroll view for two columns and the RN bottom sheet for a sticky aside; `Gallery`, `Timeline`, `RateTable`, `PriceList` and `LocationList` are not ported — no web screen uses them yet.

Below `lg` the body stacks into one column and the aside becomes `display: contents`, so the purchase card's own parts place themselves around the content — see `AppProductPurchaseCard`.

Compound: `AppProductPage` + `.Header` `.TextSection` `.Checklist` `.Faq` `.Location`.

## `AppProductPage`

| Prop          | Type        | Default | Description                                 |
| ------------- | ----------- | ------- | ------------------------------------------- |
| `breadcrumbs` | `ReactNode` | —       | Row above the body                          |
| `aside`       | `ReactNode` | —       | Sticky purchase column; omit for one column |
| `children`    | `ReactNode` | —       | Body sections in page order                 |
| `className`   | `string`    | —       | Applied to the root element                 |

## `.Header`

| Prop        | Type                   | Default | Description                          |
| ----------- | ---------------------- | ------- | ------------------------------------ |
| `title`     | `string`               | —       | Product name, rendered as `<h1>`     |
| `meta`      | `string[]`             | —       | Dot-separated meta under the title   |
| `specs`     | `AppProductPageSpec[]` | —       | `{ label, value }` rows, as a `<dl>` |
| `className` | `string`               | —       | Applied to the root element          |

The spec table is a 152px label column next to the value, at every width.

## `.TextSection`

| Prop             | Type                    | Default    | Description                 |
| ---------------- | ----------------------- | ---------- | --------------------------- |
| `title`          | `string`                | —          | Section title               |
| `paragraphs`     | `string[]`              | —          | Body paragraphs             |
| `titlePlacement` | `'inside' \| 'outside'` | `'inside'` | Passed to `AppSectionCard`  |
| `className`      | `string`                | —          | Applied to the root element |

Paragraphs support `**inline bold**`; everything else renders as plain text.

## `.Checklist`

| Prop             | Type                            | Default    | Description                       |
| ---------------- | ------------------------------- | ---------- | --------------------------------- |
| `title`          | `string`                        | —          | Section title                     |
| `steps`          | `AppProductPageChecklistStep[]` | —          | A string, or `{ text, type }`     |
| `note`           | `string`                        | —          | Highlighted banner under the list |
| `titlePlacement` | `'inside' \| 'outside'`         | `'inside'` | Passed to `AppSectionCard`        |
| `className`      | `string`                        | —          | Applied to the root element       |

A bare string step is shorthand for `{ text, type: 'check' }`.

## `.Faq`

| Prop             | Type                      | Default     | Description                 |
| ---------------- | ------------------------- | ----------- | --------------------------- |
| `title`          | `string`                  | —           | Section title               |
| `items`          | `AppProductPageFaqItem[]` | —           | `{ key, question, answer }` |
| `titlePlacement` | `'inside' \| 'outside'`   | `'outside'` | Passed to `AppSectionCard`  |
| `className`      | `string`                  | —           | Applied to the root element |

Renders an `AppAccordion variant="card"` stack.

## `.Location`

| Prop               | Type                     | Default     | Description                         |
| ------------------ | ------------------------ | ----------- | ----------------------------------- |
| `location`         | `AppProductPageLocation` | —           | Hours, address and map tile         |
| `title`            | `string`                 | —           | Section title                       |
| `routeLabel`       | `string`                 | —           | «Прокласти маршрут» button label    |
| `copyAddressLabel` | `string`                 | —           | Accessible name for the copy action |
| `onRoute`          | `() => void`             | —           | Route button handler                |
| `onCopyAddress`    | `() => void`             | —           | Copy-address handler                |
| `titlePlacement`   | `'inside' \| 'outside'`  | `'outside'` | Passed to `AppSectionCard`          |
| `className`        | `string`                 | —           | Applied to the root element         |

`AppProductPageLocation` is `{ isOpen?, openLabel?, closedLabel?, hours?, schedule?, address, mapImage, mapAlt }`. The hours row collapses only when `schedule` is supplied; the address row's expanded panel holds the map tile and the two actions. The map is a `mapImage` prop — there is no static-map fetcher in the template.

## Figma

«Ski-pass PDP» and «Bukovel Card PDP».

## Usage

```tsx
<AppProductPage aside={<AppProductPurchaseCard … />}>
  <AppProductPage.Header title="Скі-пас на 5 днів" meta={['Поспіль', '2025-2026']} specs={specs} />
  <AppProductPage.TextSection title="Опис" paragraphs={paragraphs} />
  <AppProductPage.Checklist title="Доставка та активація" steps={steps} note={note} />
  <AppProductPage.Faq title="Часті запитання" items={faq} />
  <AppProductPage.Location title="Локація" location={location} routeLabel="…" copyAddressLabel="…" />
</AppProductPage>
```
