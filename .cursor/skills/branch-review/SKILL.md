---
name: branch-review
description: Reviews the current branch's own commits locally — typecheck/lint/stylelint baseline, severity-bucketed findings, mandatory web-performance pass — then stops and waits. Invoke on "pull review", "review this branch", "review the last N commits", "review my PR" (local review, no GitHub). Never auto-fixes and never commits.
---

# Branch Review — local, severity-bucketed, then stop

Goal: review what this branch changed, report it in one pass the user can act
on, and **wait**. No fixing, no committing, no pushing until the user says so.

## Step 1 — Range

Default range: `git merge-base main HEAD`..`HEAD` (use `origin/main` if the
local `main` is stale). If the user said "last N commits", use `HEAD~N..HEAD`.
State the resolved range and the file count in one line before reviewing.

```bash
git log --oneline <range>
git diff --stat <range>
```

## Step 2 — Baseline first

```bash
npm run typecheck
npm run lint
npx stylelint "src/**/*.{css,scss}" --allow-empty-input
```

Report any failure **before** the findings — a broken baseline outranks every
style opinion, and the repo must compile at every commit (AGENTS.md commit
rules). If a pre-commit hook would block, say so here.

## Step 3 — Findings

Read the diff. Above ~15 changed files, fan out sub-agents by area (routes /
components / styles / config) and merge their findings.

Report as four severity buckets — **Critical / High / Medium / Low** — each entry
one line:

```
path/to/File.tsx:42 — problem. fix.
```

No praise, no restating what the diff does, no "consider maybe". Empty buckets
are omitted. Check at least: AGENTS.md violations (hardcoded colors instead of
CSS custom properties / `$`-mirrors, raw `@media` queries in component SCSS
instead of the `b-up`/`b-d` mixins, className composed with template literals
instead of `cn`, a hand-rolled interactive component where a Radix primitive
exists, missing `App` prefix on a new design-system component), dead imports,
**README staleness** (any component whose public API — props, variants,
exported types — changed in the branch without a same-branch `README.md`
update: flag each one), missing stories updates for changed component APIs,
and unhandled empty/loading/error states.

## Step 4 — Performance pass (mandatory section)

Always present, even when empty — AGENTS.md "Performance review on every
request". Reason about Core Web Vitals and bundle cost:

- `'use client'` creep — client components that could stay server components;
  heavy dependencies imported into client bundles;
- layout thrash / CLS: images without explicit dimensions or `next/image`,
  fonts without `font-display` strategy, content injected above the fold;
- animations on layout properties (`width`/`height`/`top`) instead of
  `transform`/`opacity`; GSAP timelines or scroll listeners running on the main
  thread per frame;
- unbounded lists rendered without virtualization or pagination;
- oversized images shipped from the repo (the assets gate caps the long edge,
  but check the rendered size actually needs the source size);
- blocking third-party scripts without `next/script` strategy.

## Step 5 — Stop

End with the findings and nothing else. Then branch on the user's word:

- **"fix"** → apply in severity order, Critical first, re-running
  typecheck/lint at the end;
- **"plan"** → hand off via the `plan-handoff` skill's conventions
  (`.claude/prompts/<feature>/PLAN.md`);
- **"commit"** → commit per AGENTS.md commit rules (Conventional Commits, no
  `Co-Authored-By`, never push).

Never auto-fix, never commit unasked, never push.
