---
name: nextjs-component-from-figma
description: Builds or updates a Next.js (App Router) component in the Bukovel web design system from a Figma link. Reads the design via the figma-console MCP, confirms the plan with the user, then creates or modifies all files following AGENTS.md and the rules in .cursor/rules/. Triggered when the user pastes a Figma URL and asks to create, build, update, or add a component.
---

# Build or Update Next.js Component from Figma

> All rules in AGENTS.md and the files in `.cursor/rules/` take precedence over any generic coding instincts. Read AGENTS.md before starting.
> Always run the `interaction-qa` skill first. That skill handles the analysis brief and user confirmation. This skill picks up from Step 5 once the user has confirmed the plan.

---

## Step 1 — Parse the Figma URL

Extract `fileKey` and `nodeId` from the URL the user pasted:

- `figma.com/design/:fileKey/:fileName?node-id=:nodeId` → convert `-` to `:` in `nodeId`

Verify the `figma-console` MCP connection per `07-figma-console-mcp-connection.mdc`. Stop if not connected — do not silently fall back.

Inspect the node via `figma-console` (component details, screenshot, variables).

---

## Step 2 — Analyse the design

From the design context, extract:

- **Component name** — use the Figma frame/component name, converted to PascalCase
- **Variants and states** — list every named property in the Figma component (e.g. `variant=primary`, `state=disabled`)
- **Sub-components** — any nested named components that act as slots (header, body, footer, item, etc.)
- **Colours used** — map each to the closest CSS custom property declared in `src/styles/settings.scss` (e.g. `#1E6FFF` → `var(--color-primary)`). If a colour has no close match, flag it explicitly.
- **Typography** — map to `--font-size-*` / `--font-weight-*` / `--line-height-*` tokens
- **Spacing and radii** — map to the spacing scale (`--size-*`) and radii scale (`--radius-*`)
- **Breakpoints** — map Figma frame widths to entries in `$breakpoints` (consumed via `b-up` / `b-d` / `b-btw` / `b-o` mixins in `src/styles/mixins.scss`)
- **Icons** — note each icon name. Decide source per Step 7.

Decide which pattern applies:

| Condition                                                           | Pattern                                        |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| Single root element, no named inner slots                           | **Simple** (`10-add-simple-component.mdc`)     |
| Multiple named inner slots (header/body/footer, item/trigger, etc.) | **Compound** (`11-add-compound-component.mdc`) |

---

## Step 2.5 — Radix primitive lookup

For interactive components, check `13-radix-primitives-first.mdc` **before** drafting the file structure. Most named-slot or stateful widgets (`AppModal`, `AppSheet`, `AppTabs`, `AppAccordion`, `AppDropdown`, `AppTooltip`, `AppPopover`, `AppSelect`, `AppCheckbox`, `AppRadioGroup`, `AppSwitch`, …) have a Radix primitive that ships the state machine, ARIA, keyboard handling, and focus management. The build becomes "wrap a Radix primitive in this project's file layout + style with SCSS modules", not "rebuild from scratch".

Decision:

- Radix match → name the primitive in the Step 4 confirmation. The component will wrap it.
- No Radix match → list vetted npm alternatives per rule 13 step 2 and ask the user to pick. Do **not** install a runtime dep without confirmation.
- Truly custom → flag it in Step 4. The build takes on full a11y responsibility — call out the ARIA Authoring Practices pattern that applies.

## Step 3 — Check if the component already exists

Look for `src/components/App<Name>/` in the repo:

- **Does not exist** → create from scratch
- **Already exists** → list which files need to change and which stay. Apply surgical changes only — do not touch anything your new task didn't require (AGENTS.md §3).

---

## Step 4 — Confirm plan with user BEFORE writing code

Present a short summary:

```
Component: App<Name>
Pattern: simple | compound
Variants found: [list]
State matrix (mandatory — see Step 8):
  Figma-defined: [list]
  Invented: hover → var(--color-…) | pressed → var(--color-…) | …
Colour mappings:
  Figma #HEXVAL → var(--color-primary)
  Figma #HEXVAL → ⚠ no existing token — will add to every data-theme block in settings.scss
Spacing mappings: [summary]
New tokens to add: [list, or "none"]
Action: create new | update existing files: [list]
Showcase entry: src/app/showcase/<slug>/page.tsx — new | updated
```

Ask: "Does this look right? Should I proceed?"

Do not write a single file until the user confirms. The state matrix is part of
that gate: every **invented** state (present in the build, absent from Figma)
names its proposed token/colour here and ships only after the user signs it
off — never silently styled.

---

## Step 5 — Build the file structure

### Simple component

```
src/components/App<Name>/
├── index.tsx
├── App<Name>.module.scss
├── App<Name>.types.ts
├── App<Name>.stories.tsx
├── README.md
└── assets/                 ← only if the component has colocated SVGs
```

### Compound component

```
src/components/App<Name>/
├── index.tsx                    ← root, owns state, renders Context.Provider, attaches subcomponents
├── App<Name>.<Sub>.tsx             ← one file per subcomponent
├── App<Name>.context.ts            ← Context + useApp<Name>Context()
├── App<Name>.types.ts
├── App<Name>.module.scss           ← root + shared styles
├── App<Name>.<Sub>.module.scss     ← one file per subcomponent
├── App<Name>.stories.tsx
├── README.md
└── assets/
```

---

## Step 6 — Implement the files

### Rules that always apply (from AGENTS.md and `.cursor/rules/`)

- Arrow-function components only — enforced by ESLint
- `*.module.scss` per file group; never global styles for component-scoped CSS
- All colours via `var(--color-*)`; never hardcoded hex
- All spacing via `var(--size-*)`; never raw pixels
- All radii via `var(--radius-*)`; never raw radius pixels
- All breakpoints via `b-up` / `b-d` / `b-btw` / `b-o` mixins; never raw `@media`
- All font sizes / weights / families via `var(--font-*)`; never literal values
- Use `classnames` (`import cn from 'classnames'`) for class composition — never template literals or `.join(' ')` (user CLAUDE.md §6)
- Components that hold interactive state (`useState`, `useEffect`, event handlers) must start with `'use client'`. Presentational subcomponents do not need the directive.
- Path aliases: prefer `~components/...`, `~img/...`, `~icons/...`, `~fonts/...` (see AGENTS.md Path aliases). Use `@/` only when starting from the repo root.

### `App<Name>.types.ts`

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type App<Name>Variant = 'primary' | 'secondary'
export type App<Name>Size = 'small' | 'medium' | 'large'

export type App<Name>Props = {
  variant?: App<Name>Variant
  size?: App<Name>Size
  isLoading?: boolean
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>
```

Define variant and size unions as separate named types so consumers can import them.

### `App<Name>.module.scss`

```scss
@import 'mixins';

.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--size-sm) var(--size-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-on-primary);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);

  @media (hover: hover) {
    &:hover {
      background-color: var(--color-primary-hover);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &[disabled],
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @include b-up(md) {
    padding: var(--size-md) var(--size-lg);
  }
}
```

### `index.tsx`

```tsx
import cn from 'classnames'

import styles from './App<Name>.module.scss'

import type { App<Name>Props } from './App<Name>.types'

export const App<Name> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  className,
  children,
  ...rest
}: App<Name>Props) => (
  <button
    type="button"
    className={cn(styles.root, styles[variant], styles[size], className)}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    {...rest}
  >
    {children}
  </button>
)
```

### Compound component extras

Context file (`App<Name>.context.ts`):

```ts
import { createContext, useContext } from 'react'

export type App<Name>ContextValue = {
  // shared state goes here
}

export const App<Name>Context = createContext<App<Name>ContextValue | null>(null)

export const useApp<Name>Context = (): App<Name>ContextValue => {
  const ctx = useContext(App<Name>Context)
  if (!ctx) {
    throw new Error('App<Name> subcomponents must be rendered inside <App<Name>>.')
  }
  return ctx
}
```

Compound `index.tsx` wires subcomponents onto the root:

```tsx
'use client'

import { useMemo } from 'react'

import { App<Name>Context } from './App<Name>.context'
import { App<Name>Header } from './App<Name>.Header'
// … other subcomponents

import type { App<Name>Props } from './App<Name>.types'

const App<Name>Root = ({ children, ...props }: App<Name>Props) => {
  const value = useMemo(() => ({ /* … */ }), [])
  return <App<Name>Context.Provider value={value}>{children}</App<Name>Context.Provider>
}

type App<Name>Compound = typeof App<Name>Root & {
  Header: typeof App<Name>Header
}

export const App<Name> = App<Name>Root as App<Name>Compound
App<Name>.Header = App<Name>Header

export type { App<Name>Props } from './App<Name>.types'
```

---

## Step 7 — Handle icons

For every icon spotted in the design:

| Icon type                                                  | Source                                               | How to use it                                      |
| ---------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| Standard UI icon (arrow, search, close, chevron, etc.)     | `iconoir-react` (https://iconoir.com/)               | `<AppIcon name="ArrowRight" provider="iconoir" />` |
| Bukovel-specific icon (gondola, ski lift, slope map, etc.) | Custom SVG in `src/assets/icons/`, imported via SVGR | `<AppIcon name="gondola" provider="custom" />`     |

Never import an icon library directly into a feature component. Always go through `<AppIcon name="…" provider="…" />` from `~components`. The `AppIcon` wrapper already exists at `src/components/AppIcon/`; extend its registry rather than importing icons elsewhere.

When exporting image assets from Figma: **hash-compare each new export against the existing files under `src/assets/**`** (byte hash after SVGO for SVGs, plain file hash for rasters) and reuse the existing file on a match instead of adding a copy. An asset the design references but the export did not produce becomes a **named blocker question** to the user ("icon `gondola-2` is referenced in Figma but missing from the export — where should it come from?") — never a silent placeholder.

SVGR import styles (from AGENTS.md):

- `import Foo from './foo.svg'` → React component (`<Foo width={60} />`)
- `import url from './foo.svg?url'` → static asset URL for `<Image>` / `<img src>`

---

## Step 8 — State matrix (Figma-defined vs invented)

Build a **state matrix** — mandatory, and included in the Step 4 confirmation. Two columns of truth: the interactive states the Figma design actually defines, and the states that must be **invented** because the design omits them (hover, pressed, disabled, focus are the usual gaps). Every invented state names its proposed token/colour in the matrix (e.g. `hover → var(--color-primary-hover)`) and is flagged for user sign-off before implementation.

For each state below, check whether the Figma design covers it. If a state is missing from Figma, it goes in the invented column with a proposed default — never silently styled:

| State            | Prop / mechanism                                                 | When to add                         |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------- |
| Hover            | `:hover` gated by `@media (hover: hover)`                        | All interactive elements            |
| Focus            | `:focus-visible`                                                 | All interactive elements            |
| Pressed / active | `:active`                                                        | All interactive elements            |
| Disabled         | `disabled` for native; `aria-disabled` for custom                | All interactive elements            |
| Loading          | `isLoading` prop → `aria-busy="true"` + spinner                  | Elements that trigger async actions |
| Error            | `error` prop → red border + `aria-describedby` for error message | Inputs, forms, data displays        |
| Empty            | `empty` prop or "no data" slot                                   | Lists, data displays                |

---

## Step 9 — Write Storybook stories

One `App<Name>.stories.tsx` file, CSF3 format, types from `@storybook/nextjs-vite` (Storybook 10 with Vite builder — recommended for Next 16 + Turbopack). Storybook is already installed in this repo; `.storybook/main.ts` globs `src/**/*.stories.@(ts|tsx)` so a new story file is picked up automatically.

Cover every variant and every state from Step 8.

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { App<Name> } from '.'

const meta = {
  title: 'Components/App<Name>',
  component: App<Name>,
  args: {
    // sensible defaults
  },
} satisfies Meta<typeof App<Name>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { isLoading: true } }
```

Rules:

- Cover every variant and every state from Step 8 with a named story
- Add a parameter / decorator that renders the component under each `data-theme` if cross-theme rendering differs meaningfully
- Do not wrap stories in a manual `ThemeProvider` — Storybook `preview.tsx` handles theme switching for the whole story tree

---

## Step 10 — Update the barrel and the showcase

1. Add the new export to `src/components/index.ts`:

   ```ts
   export { App<Name> } from './App<Name>'
   export type { App<Name>Props } from './App<Name>/App<Name>.types'
   ```

2. Append an entry to the showcase catalog used by `src/app/showcase/page.tsx` (list + search). Use a stable `slug`, `status: 'available'`, and a one-line description.

3. Create `src/app/showcase/<slug>/page.tsx` rendering each variant + state for visual inspection. Keep it minimal — a section per variant and a section per state is enough.

4. The showcase parent page (`src/app/showcase/page.tsx`) should keep its list sorted and its search box filtering by component name and tags. If it does not exist yet, build it as part of the first component you ship.

---

## Step 11 — Handle new tokens that have no match in `settings.scss`

If any Figma value cannot be mapped to an existing token:

1. Add the new CSS custom property to every `:root[data-theme="..."]` block in `src/styles/settings.scss` (`summer`, `winter`, and any future themes).
2. Add an SCSS mirror only if a color function (`rgba()`, `darken()`, etc.) will need it.
3. Use the new token in the component — never the raw value.

State this clearly in the Step 4 confirmation before writing any code.

---

## Step 12 — Lint and verify

After all files are written:

```bash
npm run lint
```

Confirm zero new warnings or errors. If lint surfaces issues, fix them before reporting completion.

---

## Step 12.5 — Visual parity check (mandatory before reporting done)

Lint passing is not visual parity. Before the Step 13 summary:

1. Render the component/page (Storybook or the showcase route) and screenshot it at **375 px, 768 px, and 1440 px** viewport widths.
2. Export (or screenshot) the matching Figma frames and compare side-by-side at each width — spacing, type scale, colours, alignment, text wrapping.
3. Fix mismatches and re-shoot. Any remaining deliberate divergence is stated in the Step 13 summary — never left unmentioned.

---

## Step 13 — Summary

Report:

```
Done. Here is what was built:

Component: App<Name>
Pattern: simple | compound
Files created: [list]
Files modified: [list]
Variants: [list]
States: [list]
New tokens added: [list, or "none"]
Showcase: /showcase/<slug> — added | updated
Storybook stories: [count]
Lint: passed
Parity: checked at 375 / 768 / 1440 px vs Figma — [clean | list of deliberate divergences]

To preview:
  • Storybook (component-isolated): `npm run storybook` (run init first if not installed)
  • In-app showcase: `npm run dev` and open /showcase/<slug>

TODOs for you: [anything that needs a manual decision, e.g. "Pressed state was not in Figma — added 4% darken via SCSS mirror. Confirm or adjust in App<Name>.module.scss."]
```
