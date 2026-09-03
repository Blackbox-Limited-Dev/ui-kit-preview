// Static image imports (*.png, *.svg, …) — same types next-env.d.ts pulls in
// once `next dev` has run; referenced here so a fresh clone typechecks too.
/// <reference types="next/image-types/global" />

declare module '*.svg?url' {
  const content: string
  export default content
}
