# Where user-facing text comes from

Two sources, and the split is deliberate.

## 1. Page chrome lives in `messages/{ua,pl,ro}.json`

Section titles, benefit cards, the comparison table, filter facet labels, sort
options, navigation copy. No backend endpoint will ever return these — they are
part of the page, not of the catalogue. They are read with `useTranslations` /
`getTranslations` at the call site.

## 2. Catalogue text is caller-supplied

Every design-system component that renders catalogue data (`AppHotelCard`,
`AppHotelDatesCard`, `AppHotelGallery`, `AppPagination`, …) takes each string as
a prop. Nothing inside those components reads the message catalogue. Today the
page fills those props from `messages/*` and the mock rows in
`src/app/hotels/_data.ts`; when the API lands, the call site passes the response
field instead and no component changes.

If you are adding a component that renders data the backend will own, take the
text as a prop. If you are adding page chrome, add a message key.

## Typed keys

`src/global.ts` augments next-intl's `AppConfig` with `typeof messages/ua.json`,
so every `t()` key is checked at compile time:

```ts
t('cards.vip.title') // ✔
t('cards.vip.titel') // ✖ tsc: Did you mean '"cards.vip.title"'?
```

Dynamic keys are checked too, as long as the interpolated value is a literal
union rather than `string`:

```ts
const CARDS = [{ id: 'vip' }, { id: 'mavka' }] as const
t(`cards.${card.id}.title`) // ✔ checked — `card.id` is 'vip' | 'mavka'
```

That is why the hotels constants (`src/app/hotels/_constants.ts`) and the header
nav config (`src/components/Header/constants.tsx`) are `as const` / typed from
the catalogue: widening an id to `string` silently removes the check.

Only `ua.json` is type-checked (it is the catalogue wired into `AppConfig`).
`npm run messages:check` compares the `pl` and `ro` key sets against it and
fails on any missing or extra key.

## Pre-parsed rows instead of lookups inside JSX

Where a component maps over a constant and reads two or three keys per row, the
lookups collapse into one pass that returns render-ready objects, so each key
appears exactly once, next to its data:

```tsx
// Before — the keys are spread through the markup
const Before = () => (
  <>
    {CARDS.map((card) => (
      <article key={card.id}>
        <h3>{t(`cards.${card.id}.title`)}</h3>
        <p>{t(`cards.${card.id}.description`)}</p>
      </article>
    ))}
  </>
)

// After — every key appears once, next to its data
const After = () => {
  const cards = CARDS.map((card) => ({
    id: card.id,
    title: t(`cards.${card.id}.title`),
    description: t(`cards.${card.id}.description`),
  }))

  return (
    <>
      {cards.map((card) => (
        <article key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </article>
      ))}
    </>
  )
}
```

In a client component wrap that pass in `useMemo(…, [t])`; in a server component
(`BenefitsSection`, `CompareSection`) there is no re-render, so a plain `.map`
is the whole optimisation — `useMemo` is unavailable there anyway.

## Remaining dynamic-key sites

| Site                    | Lookups per item     | Verdict                                                                                                    |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `BenefitsSection.tsx`   | 4                    | Pre-parsed                                                                                                 |
| `CompareSection.tsx`    | 4 (rows) + 2 (chips) | Pre-parsed                                                                                                 |
| `FiltersPanel.tsx`      | 1 (`options.<key>`)  | Left inline — one lookup per checkbox, rendered next to its key                                            |
| `ListToolbar.tsx`       | 1 (`sort.<value>`)   | Left inline                                                                                                |
| `Header.SlotPanel.tsx`  | 1–5 per card         | Left inline — the panel is one component per nav action, and the keys sit on the element that renders them |
| `Header.ActionsRow.tsx` | 1 (`actions.<id>`)   | Left inline                                                                                                |
| `Footer/index.tsx`      | 1                    | Left inline                                                                                                |

A single lookup rendered right where its value is used is already as legible as
a pre-parsed field; collapsing it only adds indirection.
