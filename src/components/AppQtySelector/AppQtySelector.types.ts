type AppQtySelectorBaseProps = {
  /** Controlled value — omit to let the component manage its own state. */
  value?: number
  /** Uncontrolled initial value; falls back to `min`. */
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  /** Unbounded when omitted. */
  max?: number
  step?: number
  disabled?: boolean
  decreaseLabel: string
  increaseLabel: string
  className?: string
}

/** `deleteLabel` is required exactly when the delete action can appear. */
type AppQtySelectorDeleteProps =
  | {
      /** When at `min`, the left button swaps to a delete icon and fires this
       *  instead of decrementing. Without it the left button disables at `min`. */
      onDelete: () => void
      deleteLabel: string
    }
  | { onDelete?: never; deleteLabel?: never }

export type AppQtySelectorProps = AppQtySelectorBaseProps &
  AppQtySelectorDeleteProps
