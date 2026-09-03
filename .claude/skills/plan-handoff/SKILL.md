---
name: plan-handoff
description: Writes an implementation plan another agent can execute, without touching production code. Invoke when the user says "plan, no code", "no code just plan", "create a plan for another agent", "write PLAN.md", or asks for a handoff/brief for a feature. While active, the only writable path is .claude/prompts/<feature>/ — the plan is the deliverable, not the implementation.
---

# Plan Handoff — write the plan, touch nothing else

Goal: produce a `.claude/prompts/<feature>/PLAN.md` that a fresh agent (with no
memory of this conversation) can execute end to end. The plan is the entire
deliverable.

## Step 0 — The write-gate (hard rule)

While this skill is active the **only** writable path is
`.claude/prompts/<feature>/` — `PLAN.md` plus any assets the plan needs
(screenshots, extracted Figma dumps, spec files). Every other file in the repo
is read-only: no components, no routes, no config, no "tiny obvious fix along
the way". If something in the codebase clearly needs to change, that change is a
**step in the plan**, not an edit.

Research is unrestricted — Read, Grep, Glob, Figma MCP, the whole repo. Only
writing is gated.

## Step 0.5 — Promised-inputs gate

If the request promises future inputs — "I will send the designs", "I'll
provide the copy", "once I export the assets…" — confirm the scope in one
short message and **wait**. No subagent fan-out, no Figma probes, no repo-wide
research sweeps until the inputs actually arrive or the user explicitly says
to start without them. Research done before the promised inputs land is
usually thrown away and re-done.

## Step 1 — Research before drafting

Read the code the plan will touch, and the AGENTS.md sections that govern it
(component conventions and SCSS token setup in Part 2, the rules index in
Part 3 — notably `10-add-simple-component`, `11-add-compound-component`,
`12-scss-mixins-and-breakpoints`, `13-radix-primitives-first`,
`14-classnames-cn-alias`). A plan that contradicts AGENTS.md is worse than no
plan.

For Figma work: one deep extraction pass (`figma-component-extract` /
`figma_get_component_for_development_deep`), not incremental per-node fetches.
Verify completeness before drafting — every visible label and every small
element's full spec (stroke, size, radius, background).

## Step 2 — PLAN.md structure

In this order:

1. **Context** — one paragraph: what is being built, where it lives, why now.
2. **Locked decisions** — everything already settled with the user, stated flatly
   so the executor does not re-litigate it.
3. **Figma → token mapping table** — mandatory whenever Figma is involved:
   `#HEX → var(--color-…)` (or the `$`-mirror when Sass functions need it) for
   every colour, plus type/spacing/breakpoints. A Figma plan without this table
   is incomplete.
4. **Open questions** — numbered, each with the options and a recommendation.
5. **Steps** — a checkbox list, each step one bounded action with its own
   **verify** line (`→ verify: typecheck passes`, `→ verify: story renders both
variants`). Include an executor contract at the top: tick each box as it
   passes, resume from the first unticked box after a compaction, surgical edits
   only, re-Read files before editing, never push.
6. **Touched files** — the full list the executor is expected to create or edit.

Write it with the Write tool. Never paste a full plan into chat instead of the
file — chat is lost, the file is the handoff.

## Step 3 — The iron rule

**Answers to the open questions update the plan. They never start the
implementation.**

The user replying "option B, and keep the header sticky" means: edit PLAN.md,
then report what changed. It is not permission to code — no matter how many
rounds of questions have gone by, how obvious the work looks, or whether the
model or the session changed in between. Plan-only holds until the user says
"implement" / "go" / "you can code now". On that release, restate the scope in
one line and wait for the nod before the first edit.

## Step 4 — Close

Print exactly three things:

- the `PLAN.md` path,
- a one-line handoff summary (what the executing agent will build, and the first
  step it starts from),
- the fresh-session recommendation, verbatim: "PLAN.md complete — open a new
  session and say implement."

No recap of the plan's contents — the file holds them. Execution belongs in a
fresh session: a clean context follows the plan file instead of half-remembered
conversation, and the write-gate of this skill never bleeds into the build.
