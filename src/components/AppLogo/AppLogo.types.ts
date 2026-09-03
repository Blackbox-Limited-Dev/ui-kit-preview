export type AppLogoSize = 'big' | 'small'

export type AppLogoProps = {
  /** `big` renders the full wordmark, `small` the standalone icon mark. */
  size?: AppLogoSize
  /** Accessible name announced for the logo image. */
  label?: string
  className?: string
}
