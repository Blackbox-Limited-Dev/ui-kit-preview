# AppPagination

List pagination — an optional full-width outlined «Показати ще» button above a centred row of outlined page-number buttons (52px on desktop, 40px on mobile) with prev/next arrow buttons. The active page number renders in the interactive text colour with `aria-current="page"`. Renders nothing when there is a single page.

## Props

| Prop                              | Type                     | Default      | Description                                       |
| --------------------------------- | ------------------------ | ------------ | ------------------------------------------------- |
| `page`                            | `number`                 | —            | Current 1-based page                              |
| `total`                           | `number`                 | —            | Total pages                                       |
| `onPage`                          | `(page: number) => void` | —            | Page navigation callback                          |
| `onShowMore`                      | `() => void`             | —            | Show-more action; hidden on last page or absent   |
| `showMoreLabel`                   | `string`                 | — (required) | Show-more button text; required with `onShowMore` |
| `prevPageLabel` / `nextPageLabel` | `string`                 | — (required) | Arrow-button aria-labels                          |
| `className`                       | `string`                 | —            | Applied to the root element                       |

Every label is required — the component holds no copy of its own.

## Figma

«Hotel List» — pagination under the hotels list (desktop and mobile).

## Usage

```tsx
<AppPagination
  page={page}
  total={4}
  onPage={setPage}
  onShowMore={appendPage}
  showMoreLabel={t('pagination.showMore')}
  prevPageLabel={t('pagination.prev')}
  nextPageLabel={t('pagination.next')}
/>
```
