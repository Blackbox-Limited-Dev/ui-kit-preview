# AGENTS.md — Bukovel Web

> Canonical rules for **Claude Code**, **Cursor**, and **Codex** (and any AGENTS.md-aware agent).
> `CLAUDE.md` at the repo root is a single `@AGENTS.md` import — never edit it. Edit this file.
> Section 1 covers behavioral guidelines; section 2 covers project-specific stack details; section 3 indexes the rules and skills under `.cursor/` — those are **normative for every agent**, not Cursor-only.

---

# Part 1 — Working principles

These apply to every change in this repo. Read them before the stack notes below.

**Tradeoff:** these guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Think before coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- **Annotated screenshots** (arrows, drawn lines, circles, highlights): restate your interpretation of the requested change in one plain sentence _before_ editing ("Moving the icon inline, immediately before the title text"). If two readings are possible, ask. Prefer widening an existing prop's type (`string` → `ReactNode`) over adding a new prop for the same slot.

## Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- **No one-element component files.** Don't extract a trivial presentational fragment into its own component/file (a lone heading, a couple of nested `<div>`s with no props, state, hooks, or branching). Inline it where it's used and put its style in the host's SCSS module. Extract a child component only when it earns it: reused in 2+ places, owns local state/hooks/effects, or is genuinely complex.

Self-check: would a senior engineer call this overcomplicated? If yes, simplify.

## Surgical changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you spot unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that **your** changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line traces directly to the user's request.

**A reported bug is usually one instance of a class.** When the report is shaped like "the focus ring is missing on this button", "this color is wrong here" — Grep for the sibling instances before calling it fixed, and either fix them in the same change or list them for the user. Don't wait for the follow-up "(and the same in the other places)".

## Comment discipline

**A comment states a live constraint the code can't show — in 1–2 lines.**

- No narrative essays or walkthroughs of what the code visibly does, no worked numeric examples of the bug being avoided.
- No personalization: "we/our/us/I", references to the user/designer/reviewer or the conversation, "user-approved", review-finding IDs.
- No history: what the code used to do, postmortems, dates. Git holds history.
- **No Figma node ids in code comments, and no Figma URLs anywhere in the repo** — including component READMEs and docs. They point into a file most readers cannot open and rot as soon as the design moves. Human-readable screen/section names are fine.
- Keep: condensed browser-quirk warnings (cross-browser divergence facts are valuable), TODO/keep-in-sync notes, lint-directive explanations, `{@link}` cross-references, concise JSDoc on exported APIs.

An existing essay-comment gets trimmed to its constraint only when the change touches it anyway — surgical-changes rules still apply.

## Goal-driven execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass."
- "Fix the bug" → "Write a test that reproduces it, then make it pass."
- "Refactor X" → "Tests pass before and after."

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

In multi-phase sessions (task 1 → task 2 → …), deliver each phase's status report **before** starting the next phase. Auto-compaction can land mid-task; an undelivered report is lost work.

**"No code / plan only" is sticky.** Once the user says plan-only (or invokes the `plan-handoff` skill), that mode holds until they explicitly release it — it survives question-and-answer rounds, compactions, model switches, and long tool sequences. **The user answering your open questions is not authorization to code**; it is input for the plan. Only an explicit "go", "implement", "you can code now" releases it, and even then restate the scope in one line before touching a file.

**Plan progress is file-driven, not memory-driven.** When implementing a `.claude/prompts/**/PLAN.md`, tick that plan's checkbox (or append a `## Progress` line) immediately after each step's verify passes. A usage-limit reset or an auto-compaction lands mid-plan; the file is what survives, so resume from the first unticked box rather than from what you remember doing.

Strong success criteria let you loop independently; weak ones ("make it work") force constant clarification.

## Performance review on every request

**Analyze every user request for performance impact and surface concerns to the user before or while implementing.** Don't silently build something that will hurt Core Web Vitals; say what it will cost, why, and what the cheaper alternative is.

- When a requested feature has a known web cost — `'use client'` on a subtree that could stay a server component, a heavy dependency imported into a client bundle, layout-affecting animations (`width`/`height`/`top`) instead of `transform`/`opacity`, per-frame JS scroll listeners, images without dimensions (CLS), unbounded lists without virtualization/pagination, blocking third-party scripts — flag it and propose the alternative.
- Prefer by default: server components until interactivity demands otherwise, CSS transitions/animations over JS where they suffice, `next/image` with explicit sizes, `next/script` strategies for third-party embeds, dynamic imports for heavy below-the-fold widgets.
- If the cost is uncertain, state the assumption and verify with the build/analyzer instead of guessing.

## Fresh state before editing

The user edits files, drops assets, and runs prettier **mid-session**, outside your view.

- When the user says they changed something by hand ("just added X.svg", "fixed myself"), **re-Read the affected files / re-glob the assets folder before your next Edit** — never edit from remembered content.
- Same after any session continuation/compaction and after formatters or `git` operations touched the tree: Read first, then Edit.
- An Edit rejected with "old_string not found" (or "old and new are identical") is the same signal: re-Read, re-derive what is actually still missing — never retry the identical edit.

---

# Part 2 — Project-specific notes

## Stack

- **Next.js 16** (App Router) with **Turbopack** as the default bundler for both `next dev` and `next build`. Webpack is opt-in via `--webpack`.
- **React 19**, **TypeScript** (strict).
- **SCSS modules**, compiled via **`sass-embedded`** (configured in `next.config.js` `sassOptions.implementation`).
- **`modern-normalize`** as the cross-browser reset (imported once in `src/app/layout.tsx`).
- **SVG handling** lives in `next.config.js` `turbopack.rules` (see SVG section below).
- **`next-classnames-minifier`** rewrites CSS-module class names in production builds only (gated on `NODE_ENV` and cloud-build env vars).
- **Sharp** for image optimization.
- **Radix UI primitives** for interactive components (see `.cursor/rules/13-radix-primitives-first.mdc`).
- **next-intl** for i18n — cookie-based locale, no URL routing yet. Request config + `Accept-Language` detection live in `src/i18n/`, messages in `messages/*.json`. Season/theme state lives in `src/providers/SeasonProvider.tsx` (localStorage + pre-paint script).

## Scripts

| Script                    | Purpose                                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`             | Start Turbopack dev server (alias: `npm start`, which intentionally runs `next dev`, not `next start`).                                                                                                              |
| `npm run build`           | Production build via Turbopack. The `@next/bundle-analyzer` plugin only runs under webpack — under Turbopack it logs a notice and is a no-op. Use `npx next build --webpack` if you need the legacy analyzer report. |
| `npm run serve`           | Run the production build (`next start`).                                                                                                                                                                             |
| `npm run lint`            | `eslint .` against the flat config in `eslint.config.js`.                                                                                                                                                            |
| `npm run typecheck`       | `tsc --noEmit` project-wide.                                                                                                                                                                                         |
| `npm run format`          | Prettier write across the repo.                                                                                                                                                                                      |
| `npm run assets:check`    | Report unoptimized images under `src/` + `public/` (exits 1 if any).                                                                                                                                                 |
| `npm run assets:optimize` | Rewrite unoptimized images in place (SVGO + sharp).                                                                                                                                                                  |

## Path aliases

Defined in both `tsconfig.json` and `jsconfig.json` — keep in sync:

- `~img/*` → `src/assets/img/*`
- `~icons/*` → `src/assets/icons/*`
- `~fonts/*` → `src/assets/fonts/*`
- `~*` → `src/*` (e.g. `~components/Header`)
- `@/*` → repo root (TS only)

## SVG imports (Turbopack rules)

Two import styles are supported, defined in `next.config.js` under `turbopack.rules['*.svg']`:

| Import                            | Handling                                          | Use case                                 |
| --------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `import Foo from './foo.svg'`     | SVGR compiles to a React component (`as: '*.js'`) | Render inline: `<Foo width={60} />`      |
| `import url from './foo.svg?url'` | Emitted as a static asset (`type: 'asset'`)       | Pass the URL to `<Image>` or `<img src>` |

The `?url` opt-out is matched via `condition.query` — a Turbopack feature available **only in Next 16.0+** (and `condition.query` specifically in 16.2+). Do not downgrade Next without rewriting this rule.

**Decorative vs content images.** Decorative/pattern SVGs (backgrounds, ornaments, section dividers) are imported inline via SVGR and rendered inside an absolutely-positioned wrapper `<div>` — never through `next/image`. `next/image` is reserved for content photos, and always with a meaningful `alt`. Empty `alt` attributes (`alt=""`) are banned: if an image would warrant an empty alt, it is decorative and belongs on the SVGR path instead.

## SCSS / Sass setup

Design tokens come from two sources:

- **Colors** live in **`src/styles/tokens.css`**, imported in `src/app/layout.tsx` and `.storybook/preview.tsx`. Semantic custom properties per theme (`--color-<group>-<key>`, e.g. `--color-interactive-primary`, `--color-text-on-surface`) under `:root[data-theme='summer'|'winter']`. Edit that file when a token changes. Alpha tints derive at runtime via `color-mix()` instead of Sass `rgba()`.
- **Web-local tokens** live in `src/styles/settings.scss`: sizes (`--size-container-*`, `--size-*`), radii, typography (`--font-*`) as CSS custom properties, plus the **`$breakpoints` SCSS map** — used by the `b-up`/`b-d`/`b-btw`/`b-o` mixins in `mixins.scss`. Breakpoints cannot be CSS variables because `@media` queries can't reference them.

Turbopack's bundled sass-loader does not always preserve the source file's directory when handing imports to Sass, which breaks relative imports like `@import 'settings'` from `src/styles/mixins.scss`. The workaround in `next.config.js` is `sassOptions.loadPaths` listing `src/styles`. If you add new SCSS partials in a directory that's referenced via bare `@import 'name'` from outside that directory, you'll likely need to extend `loadPaths` similarly.

## Image assets — every image is optimized before it is committed

Every `*.svg`, `*.png`, `*.jpg` under `src/` and `public/` goes through `scripts/optimize-assets.mjs` — SVGs via SVGO (`svgo.config.mjs`), rasters via sharp (mozjpeg q80 / palette PNG, metadata stripped, long edge capped at 3000px — widest rendered size is 1360px @2x = 2720).

- **The `.husky/pre-commit` hook blocks the commit** when a staged image is unoptimized. It never rewrites files for you — a lossy re-encode is a human decision.
- After adding or updating **any** image: run the **`optimize-assets`** skill (`npm run assets:optimize`), eyeball the result, re-stage. `npm run assets:check` reports without writing.
- Unoptimized means: SVGO output differs from disk (byte-exact oracle), or the raster re-encodes ≥15% **and** ≥8KB smaller, or its long edge exceeds 3000px. Near-optimal files are left alone, so a clean run is quiet.
- If an asset breaks visually after optimization, add its repo-relative path to `EXCLUDED` in `scripts/optimize-assets.mjs` with a one-line reason. **Never** bypass with `git commit --no-verify`, and never loosen `svgo.config.mjs` or the sharp thresholds to unblock one file — they affect every asset.
- `next/image` optimizes at request time; the gate is about repo weight and the paths that bypass the loader (SVGR inline SVGs, `?url` imports, `public/` served as-is).

## Conventions

- **Component naming:** every design-system component is prefixed `App` — `AppButton`, `AppIcon`, `AppModal`, `AppInput`, etc. The exported identifier, the folder, the file basenames, the Storybook title, and the README heading all use the `App` prefix. The showcase route slug stays unprefixed for readability (`/showcase/icon`, `/showcase/button`). Feature/layout components that aren't part of the shared design system (e.g. existing `Header`, `Footer`, `Menu`) are exempt — only new shared components get the `App` prefix.
- **Components:** `src/components/App<Name>/{index.tsx, App<Name>.module.scss, App<Name>.types.ts, App<Name>.stories.tsx, README.md}`. Arrow-function components only — enforced by ESLint (`react/function-component-definition`).
- **Component READMEs:** a change to a component's public API (props, variants, exported types, behaviour) updates that component's `README.md` **in the same commit**. The `branch-review` and `wrap-branch` skills flag API changes that lack a same-branch README update.
- **Styles:** per-component `*.module.scss` for scoped styles; global tokens/mixins live in `src/styles/`. Color tokens live in `src/styles/tokens.css` (see SCSS / Sass setup); size/radius/typography tokens and `$breakpoints` are edited in `src/styles/settings.scss`. Multi-element modules nest child classes with `&_` under the block class (`.footer { &_card { … } }` → `s.footer_card`); single-root design-system components keep `.root` + flat variants. A pre-commit check (`scripts/check-scss-nesting.mjs`, wired through nano-staged) rejects staged `*.module.scss` files that declare a flat top-level `.block_element` selector while `.block` is defined in the same file — write it nested as `&_element`.
- **Imports:** ESLint's `react/jsx-filename-extension` allows JSX in `.ts`/`.tsx` only.
- **Class composition:** `classnames` aliased as `cn` is the only helper — see `.cursor/rules/14-classnames-cn-alias.mdc`. No template literals, no `.join(' ')`.
- **User-facing text:** page chrome lives in `messages/*.json` and is read with `t()`; catalogue text is a prop the caller supplies. Message keys are type-checked against `messages/ua.json`, and `npm run messages:check` keeps `pl`/`ro` in parity. See [`docs/i18n-text.md`](docs/i18n-text.md).

## Commit rules

- **No `Co-Authored-By` trailer.** Ever.
- **Conventional Commits**, enforced by `commitlint` via the husky `commit-msg` hook — `type(scope): subject`. Subject is imperative, lowercase, ≤72 chars, no trailing period. Breaking changes: `type!:` plus a `BREAKING CHANGE:` footer.
- **Default granularity: 1–2 commits per work session.** Bundle the session's work into one commit (two when there are clearly separable concerns). Do **not** split into many micro-commits unless the user explicitly asks.
- **Commit only when the user asks.** Never auto-commit at the end of a task; the user owns commit timing.
- The repo must compile after **each** commit — run `npm run typecheck` and `npm run lint` before committing. Pre-commit runs the assets gate + `nano-staged` (`.nanostagedrc`: eslint on staged JS/TS/JSON, stylelint on staged CSS/SCSS, prettier on staged MD/MDX).
- **Never push.** Stop after committing. The user pushes themselves.
- **A failing hook is a bug report, not a flake.** Read its output and fix the cause it names — never re-run the same commit hoping it passes, never `--no-verify`.

## Dependency policy

- **Always install the latest stable** version of a package. Run `npm view <pkg> version` before installing. Don't pin a specific version unless required.
- Only fall back to an older version when latest is genuinely incompatible (peer-dep conflict, breaking change with no codemod).
- When falling back, document **why** and the date in the **Known pins** subsection below — so the pin can be re-evaluated.
- Runtime packages go in `dependencies`; build-only tooling (linters, Storybook, prettier, transformers) in `devDependencies`.
- **Renovate** auto-merges minor/patch/pin/digest updates (`renovate.json`); ESLint and Stylelint families are grouped. Coordinate manually for major bumps.

### Known pins

- None yet. Add entries as `pkg@version (date) — reason` when a pin becomes necessary.

## Quality tooling

- **ESLint 9** with **flat config** in `eslint.config.js`. Composes:
  - `eslint-config-next/core-web-vitals` (native flat export)
  - `eslint-plugin-react`'s `configs.flat.recommended`
  - `plugin:json/recommended` via `FlatCompat` (the `eslint-plugin-json` package only ships legacy configs)
  - `eslint-config-prettier` rules + `eslint-plugin-prettier`
- **Stylelint 16** with `stylelint-config-standard-scss` + `stylelint-config-recess-order` + `stylelint-prettier`.
- **Prettier 3**, single quotes, no semicolons, 2-space tabs, ES5 trailing commas.

## Gotchas

- **`npm start` runs `next dev`**, not the production server. Use `npm run serve` for that.
- **`themeColor` lives on the `viewport` export, not `metadata`** (Next 14+). When adding a route that needs its own theme color, export `const viewport = { themeColor: '...' }` rather than putting it on `metadata`.

---

# Part 3 — Rules & Skills index

Project-specific rules and skills live under `.cursor/`. They are **normative for every agent** — Cursor, Claude Code, and Codex alike (the `.cursor/` path is historical; the rules are not Cursor-only). They are not auto-loaded — read the relevant file when its trigger fires.

**Skills are deliberately duplicated** in `.cursor/skills/` (loaded by Cursor) and `.claude/skills/` (loaded natively by Claude Code). The two copies must stay byte-identical: every skill edit applies to **both** paths, then verify with a hash compare (`Get-FileHash`). Never collapse to a single copy.

## Rules — `.cursor/rules/`

| Purpose                                                                                                                                                                                                                            | File                                                                                                     | When to load                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Quality, accessibility, token, state, and consistency checklist applied before any component build is considered complete.                                                                                                         | [`.cursor/rules/05-quality-checks.mdc`](.cursor/rules/05-quality-checks.mdc)                             | Creating or updating any component under `src/components/`.                            |
| Figma → token mapping (colors, typography, spacing, radii, breakpoints), Figma layer naming conventions, mismatch flagging, and component-type detection (simple vs compound).                                                     | [`.cursor/rules/06-figma-mcp-workflow.mdc`](.cursor/rules/06-figma-mcp-workflow.mdc)                     | User pastes a Figma URL or asks to build from Figma.                                   |
| `figma-console` MCP connection precondition — verify before any Figma work, stop if not connected, do not silently fall back to other MCP servers.                                                                                 | [`.cursor/rules/07-figma-console-mcp-connection.mdc`](.cursor/rules/07-figma-console-mcp-connection.mdc) | Any Figma read/write operation. Always-apply rule.                                     |
| Git sync workflow — always rebase onto `origin/main`, never merge, drop duplicate commits first, surface unexpected conflicts.                                                                                                     | [`.cursor/rules/08-git-rebase-workflow.mdc`](.cursor/rules/08-git-rebase-workflow.mdc)                   | Before writing or changing code on an existing branch. Always-apply rule.              |
| New branch workflow — fetch, then cut new branches from `origin/main` (never from the current branch), with Conventional-Commits prefixes.                                                                                         | [`.cursor/rules/09-new-branch-from-main.mdc`](.cursor/rules/09-new-branch-from-main.mdc)                 | Starting a new task that needs its own branch. Always-apply rule.                      |
| How to add a simple Next.js component (single root, theme-aware) — file layout, types, SCSS module tokens, arrow-function component, Storybook story, in-app showcase route, lint.                                                 | [`.cursor/rules/10-add-simple-component.mdc`](.cursor/rules/10-add-simple-component.mdc)                 | Building Button, Input, Card, Badge, Icon, Text, etc.                                  |
| How to add a compound Next.js component — parent + named subcomponents + React Context, multi-file SCSS modules, `'use client'` on the root, compound API attachment.                                                              | [`.cursor/rules/11-add-compound-component.mdc`](.cursor/rules/11-add-compound-component.mdc)             | Building Modal, Sheet, Tabs, Accordion, Dropdown, RadioGroup, etc.                     |
| SCSS responsive mixins (`b-up` / `b-d` / `b-btw` / `b-o`) and the `$breakpoints` map. Documents `clamp-builder` for opt-in fluid sizing. Bans raw `@media` queries in component SCSS.                                              | [`.cursor/rules/12-scss-mixins-and-breakpoints.mdc`](.cursor/rules/12-scss-mixins-and-breakpoints.mdc)   | Writing or modifying any `*.scss` file.                                                |
| Radix UI primitives-first policy for interactive components. Decision ladder (Radix → vetted npm → custom), composition with `asChild`, styling via `data-*` attributes, and file layout for wrapping a Radix primitive.           | [`.cursor/rules/13-radix-primitives-first.mdc`](.cursor/rules/13-radix-primitives-first.mdc)             | Creating any new interactive component (Modal, Dropdown, Tabs, Tooltip, Select, etc.). |
| `classnames` aliased as `cn` is the only class-composition helper. Canonical call pattern `cn(s.header, 'container', { [s.active]: isActive }, className)`. Bans template literals, `.join(' ')`, and ternaries for class toggles. | [`.cursor/rules/14-classnames-cn-alias.mdc`](.cursor/rules/14-classnames-cn-alias.mdc)                   | Writing or modifying any `*.tsx` / `*.ts` file that composes `className`.              |
| Swiper carousels — the CSS the library injects, explicit slide width under `slidesPerView: 'auto'`, equal-height slides via `height: auto` (never `display: grid`/`flex` on a slide), and which params work inside `breakpoints`.  | [`.cursor/rules/15-swiper-carousels.mdc`](.cursor/rules/15-swiper-carousels.mdc)                         | Building or fixing any carousel built on `swiper/react`.                               |

## Skills — `.cursor/skills/` (+ `.claude/skills/` mirror)

| Purpose                                                                                                                                                                               | File                                                                                                         | When to load                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Pre-build interaction / accessibility / responsive / multilingual / theming analysis. Produces a structured brief and waits for user sign-off before any file is written.             | [`.cursor/skills/interaction-qa/SKILL.md`](.cursor/skills/interaction-qa/SKILL.md)                           | User pastes a Figma URL — runs first, before any code is written.                              |
| End-to-end build pipeline for a Next.js component from a Figma link — parsing, plan confirmation, file scaffolding, icons, states, Storybook, in-app showcase, token additions, lint. | [`.cursor/skills/nextjs-component-from-figma/SKILL.md`](.cursor/skills/nextjs-component-from-figma/SKILL.md) | After `interaction-qa` is confirmed — picks up from its Step 5 (file structure).               |
| Writes an implementation plan another agent can execute, write-gated to `.claude/prompts/<feature>/`. Plan-only stays sticky until an explicit "implement".                           | [`.cursor/skills/plan-handoff/SKILL.md`](.cursor/skills/plan-handoff/SKILL.md)                               | User says "plan, no code", "write PLAN.md", or asks for a handoff/brief.                       |
| PR title, squash subject, and description from the branch's commits vs main. Copy-paste text only — never pushes, never opens a PR.                                                   | [`.cursor/skills/wrap-branch/SKILL.md`](.cursor/skills/wrap-branch/SKILL.md)                                 | User asks for a PR name/description, squash title, or "wrap up this branch".                   |
| Local branch review — typecheck/lint/stylelint baseline, severity-bucketed findings, mandatory web-performance pass, then waits for fix/plan/commit.                                  | [`.cursor/skills/branch-review/SKILL.md`](.cursor/skills/branch-review/SKILL.md)                             | User asks to review this branch / the last N commits / their PR locally.                       |
| Verifies + heals the figma-console MCP (Desktop Bridge) connection; node-id hygiene and known deep-read errors.                                                                       | [`.cursor/skills/figma-preflight/SKILL.md`](.cursor/skills/figma-preflight/SKILL.md)                         | Before the first figma-console MCP call of a session, or on any bridge/node-lookup error.      |
| Optimizes every image under `src/` + `public/` (SVGO + sharp) and unblocks the pre-commit assets gate; handles exclusions.                                                            | [`.cursor/skills/optimize-assets/SKILL.md`](.cursor/skills/optimize-assets/SKILL.md)                         | After adding/updating any image, or when a commit is blocked with "unoptimized assets staged". |

## Maintenance rule

**Whenever a new file is added under `.cursor/rules/` or `.cursor/skills/`, append a row to the matching table above** with the file name and a one-line "When to load" trigger. Keep the tables in sync with the filesystem — out-of-date entries are worse than no entries. For skills, also add/update the `.claude/skills/` mirror copy in the same change.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
