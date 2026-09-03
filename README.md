<h1 align="center">
  Design system
</h1>

Component library in Storybook. The Next app is a stub host for the Storybook builder.

## Getting Started

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_MAPBOX_TOKEN` (required for map stories). Then:

```bash
npm install
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006).

```bash
npm run storybook:build
npm run storybook:serve
```

builds a static Storybook and serves `storybook-static/`.

## Scripts

| Script                    | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `npm run storybook`       | Storybook dev server (port 6006)        |
| `npm run storybook:build` | Static Storybook to `storybook-static/` |
| `npm run lint`            | ESLint                                  |
| `npm run typecheck`       | `tsc --noEmit`                          |
