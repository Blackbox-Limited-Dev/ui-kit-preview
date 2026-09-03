export type AppOtpInputProps = {
  /** Digits entered so far — shorter than `length` until the code is complete. */
  value: string
  onChange: (value: string) => void
  /** Number of cells. */
  length?: number
  onComplete?: (value: string) => void
  /** Renders the message below the cells and reddens their borders. */
  error?: string
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  'aria-label'?: string
}
