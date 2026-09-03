/** `showMoreLabel` is required exactly when the show-more button can appear. */
type AppPaginationShowMoreProps =
  | {
      /** Appends the next page; the button hides on the last page. */
      onShowMore: () => void
      showMoreLabel: string
    }
  | { onShowMore?: never; showMoreLabel?: never }

export type AppPaginationProps = {
  /** Current 1-based page. */
  page: number
  /** Total number of pages. */
  total: number
  onPage: (page: number) => void
  prevPageLabel: string
  nextPageLabel: string
  className?: string
} & AppPaginationShowMoreProps
