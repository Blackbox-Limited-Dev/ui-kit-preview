---
name: interaction-qa
description: Deep interaction, behaviour, and QA analysis for every component built from Figma. Works alongside nextjs-component-from-figma. Triggered automatically when the user pastes a Figma URL. Runs before any code is written: analyses desktop + mobile-web interaction patterns, keyboard navigation, focus management, component states, error states, edge cases, responsive behaviour, accessibility, and multilingual text flexibility. Produces a structured brief with a confirmed plan and open questions, waits for user sign-off, then hands off to the build process.
---

# Interaction QA — Pre-Build Analysis

> Run this skill FIRST, before `nextjs-component-from-figma` writes any file.
> Read AGENTS.md and the rules in `.cursor/rules/` before starting so all conventions are in scope.

---

## When this skill runs

Whenever the user pastes a Figma URL and asks to create or update a component.
Load this skill and complete the full analysis before touching any code.

---

## Phase 1 — Fetch the design

1. Verify the `figma-console` MCP connection (rule `07-figma-console-mcp-connection.mdc`). Stop if not connected.
2. Parse `fileKey` and `nodeId` from the URL (convert `-` to `:` in `nodeId`).
3. Inspect the node via `figma-console` (component details, screenshot, variables).
4. Also load `AGENTS.md`, `05-quality-checks.mdc`, and `06-figma-mcp-workflow.mdc` if not already in context — the build that follows must satisfy all their rules.

---

## Phase 2 — Run the interaction analysis

Think as three people at once: an interaction designer, a QA engineer, and a senior frontend engineer. For each area below, write down what you know confidently and what you are uncertain about.

### 2a. Interaction model (desktop + mobile web)

Answer these for the component:

| Question                                                             | What to look for                                   |
| -------------------------------------------------------------------- | -------------------------------------------------- |
| How does the user activate it?                                       | Click / tap / hover / focus / drag / keyboard      |
| Is it touch-only, pointer-only, or both?                             | Sliders, draggable cards, hover-only menus         |
| Does it require precise pointer hits?                                | Tap targets must be ≥ 44 × 44 px on touch          |
| Does it open native UI (file picker, date picker, virtual keyboard)? | Inputs, file uploads, OTP, search                  |
| Does the on-screen keyboard cover this component on mobile?          | Position on screen, scroll/snap behaviour needed   |
| Can it be scrolled inside?                                           | Horizontal list, vertical list, nested scroll      |
| Is it controlled by gestures?                                        | Swipe-to-dismiss, drag-to-reorder, pinch-zoom      |
| Does it respond to browser navigation?                               | Modals, drawers — should they close on `popstate`? |

### 2b. Keyboard navigation & focus

For every interactive component:

- Tab order: which elements receive focus, in what order?
- Visible focus indicator: `:focus-visible` ring present, not removed by `outline: none`?
- Activation: Enter and Space activate buttons; Enter activates links/submit
- Escape: closes modals, dropdowns, popovers
- Arrow keys: navigate radio groups, menus, tabs, listboxes
- Focus trap: modals must trap focus and restore it to the trigger on close
- Skip links / aria-hidden regions where appropriate

Flag any element in the design that visually looks interactive but has no obvious keyboard pattern — those need an explicit decision.

### 2c. Component states

Check whether the Figma design shows each state. Mark each as: **shown**, **missing — will add default**, or **missing — needs decision**.

| State                                                    | Notes |
| -------------------------------------------------------- | ----- |
| Default / rest                                           |       |
| Hover (desktop only — gate with `@media (hover: hover)`) |       |
| Focus / focus-visible                                    |       |
| Pressed / active                                         |       |
| Loading / busy (`aria-busy="true"`)                      |       |
| Disabled                                                 |       |
| Error / validation failed                                |       |
| Empty (no data, no selection)                            |       |
| Success / confirmed                                      |       |
| Read-only                                                |       |

For every state marked "missing — needs decision", you will ask the user in Phase 3.

### 2d. Responsive behaviour

This site renders on phones, tablets, and desktops. Apply these rules:

- Identify the Figma frame width and map it to the nearest entry in `$breakpoints` (`src/styles/settings.scss`).
- Decide which breakpoints meaningfully change the component (layout flip, hidden elements, font scale).
- Use the `b-up` / `b-d` / `b-btw` / `b-o` mixins from `src/styles/mixins.scss` — never raw `@media (min-width: ...)`.
- Flag any place where the desktop layout cannot reflow to a single column on small screens.

### 2e. Error and edge cases

Think through:

- What happens if the API call fails while this component is loading?
- What happens if the content inside is empty (zero items, null value, no image)?
- What happens if the user submits a form before filling required fields?
- What happens if the user clicks very fast (double-click, race condition)? Buttons must be disabled while `isLoading` is true.
- What is the maximum realistic content length? Can it overflow the layout?
- Long URLs, long single words: do they break the layout? (`overflow-wrap: anywhere` may be needed.)

### 2f. Multilingual and text flexibility

This site ships in multiple languages. Text in some languages can be 30–60 % longer than the English copy shown in Figma. Apply these rules in every component — no exceptions:

- No fixed `width` / `height` on containers that hold text. Use `min-width` / `min-height` if a minimum is required, never a hard `width` / `height`.
- Allow wrapping by default. Force a single line only when the design explicitly demands it — in that case use `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` and consider a `title` attribute or tooltip.
- Icon + label rows: the label flexes (`min-width: 0`) and the icon is pinned (`flex-shrink: 0`).
- Avoid `position: absolute` for text labels — they will overflow in long languages.

Flag any place in the Figma design where text appears to be in a fixed-size container that would break with longer copy.

### 2g. Theming readiness

The site ships with multiple themes (currently `summer` default and `winter`, more may follow). Apply these rules:

- Every colour must resolve via a CSS custom property so the component restyles automatically when `data-theme` changes
- Flag any colour that needs to be defined in additional theme blocks in `src/styles/settings.scss`
- Note any state where the two existing themes diverge meaningfully — those need a Storybook story per theme

### 2h. Accessibility

Every interactive component must have:

- A semantic HTML element where possible (`<button>`, `<a>`, `<input>`, `<dialog>`, `<nav>`). ARIA only when no native element fits.
- Correct ARIA role when the native semantics aren't enough (`role="dialog"`, `role="tablist"`, `role="menu"`, etc.)
- ARIA state for binary properties: `aria-disabled`, `aria-busy`, `aria-checked`, `aria-selected`, `aria-expanded`
- `aria-label` (or `aria-labelledby`) when the visible label alone is not descriptive enough (icon-only buttons, image cards)
- `aria-describedby` linking error or help text to inputs
- `aria-hidden="true"` on decorative icons
- Minimum colour contrast: 4.5:1 for body text, 3:1 for large text and interactive boundaries — under every theme

Flag any element in the design that appears interactive but has no visible label — those need a mandatory `aria-label` prop.

### 2i. Mobile WebKit checklist

Mobile Chrome and iOS Safari fail differently — check both engines; they need different fixes:

- Tap highlight suppressed on **both** engines: Android Chrome needs `-webkit-tap-highlight-color: transparent`; iOS Safari needs its own handling (a proper `:active` style and touch handling — the Android property alone does not cover it). One fix does not cover the other.
- `:focus-visible` styles present and visible on both engines.
- The **entire padded box** is clickable: hit area ≥ 44 × 44 px **including padding**, and the padding belongs to the interactive element itself, not a wrapper.
- Input text overflow behaves identically on both engines (long values scroll inside the field — no clipped or escaping text).
- **Control components (radio, checkbox, switch):** self-screenshot at `dpr: 1` and `dpr: 1.25` and check the geometry — inner and outer shape pixel sizes should divide evenly at 1.25 dpr, otherwise the inner dot/checkmark renders subpixel off-center on 125 % displays.

---

## Phase 3 — Produce the brief

Write a structured brief to the user. Split it into two clear sections.

### Section A — What I understood (no questions needed)

Write this as a plain-language summary. Example structure:

```
Component: App[Name]
Pattern: simple / compound
Variants from Figma: [list]

INTERACTIONS
  Activation: click / hover / keyboard / …
  Native UI triggered: virtual keyboard on tap (mobile) / file picker / none
  Scroll behaviour: [describe if any]
  Gestures: [swipe / drag / none]

KEYBOARD
  Tab order: [describe]
  Activation keys: Enter / Space
  Escape behaviour: closes / not applicable
  Arrow keys: [list nav behaviour or "n/a"]
  Focus trap: yes / no

STATES I WILL BUILD
  Default, Hover, Focus, Pressed, Disabled — all shown in Figma
  Loading — not in Figma, will add `aria-busy` + spinner default
  Error — not in Figma, will add red border + error text below via `aria-describedby`
  Empty — not in Figma, will add placeholder slot

RESPONSIVE
  Designed at [X]px width → maps to breakpoint `[name]`
  Layout changes at: [list breakpoints + what changes, or "none"]

TEXT FLEXIBILITY
  All text containers use flexible sizing — no fixed width/height
  [List any Figma fixed containers you spotted and how you will handle them]

THEMING
  Colours mapped to existing tokens: [count]
  New tokens needed: [count, list, or "none"]
  Cross-theme differences to story: [list, or "none"]

ACCESSIBILITY
  Semantic root: <button> / <a> / <dialog> / …
  ARIA: aria-label / aria-busy / aria-disabled / aria-describedby
  [Any icon-only elements that will need a required `aria-label` prop]
```

### Section B — Open questions (need your answer before I build)

List only genuine decision points — things that change how the component is built. Do not ask about things you can decide with a sensible default.

Write each question as a plain sentence. Number them.

Example questions:

- "The error state is not in the Figma design. Should the error message appear below the field via `aria-describedby`, or inside a tooltip?"
- "The loading state is not in the Figma design. Standard pattern here is a spinner with `aria-busy='true'` — is that fine, or do you want a skeleton?"
- "The card can contain a very long title. Should it truncate after two lines with ellipsis, or always show in full and push content down?"
- "The modal closes on Escape and overlay click in standard web patterns — should it also close on browser back navigation?"

If you have zero open questions, say so clearly: "No open questions — I have everything I need to build this."

Then ask: "Does Section A look right? If yes and there are no questions, I will start building."

---

## Phase 4 — Wait for user confirmation

Do not write a single file until:

1. The user confirms Section A is correct (or corrects it).
2. The user answers all questions in Section B.

---

## Phase 5 — Hand off to nextjs-component-from-figma

Once confirmed, proceed with the `nextjs-component-from-figma` skill starting at its Step 5 (file structure), carrying forward:

- All states identified in Phase 2c
- All responsive rules from Phase 2d
- All text-flexibility rules from Phase 2f
- All theming requirements from Phase 2g
- All accessibility props from Phase 2h
- User answers from Phase 3 Section B

The final component must satisfy every rule in AGENTS.md and the `.cursor/rules/` files.
