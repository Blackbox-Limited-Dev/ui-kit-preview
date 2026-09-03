---
name: wrap-branch
description: Generates a PR title, squash-commit subject, and PR description from the current branch's commits vs main. Invoke when the user asks "how should I name my PR", "generate PR name/description", "squash title", or "wrap up this branch". Output is copy-paste text only — never pushes, never opens a PR.
---

# Wrap Branch — PR Title + Description

Goal: turn the branch's commit history into a ready-to-paste PR title,
squash subject, and description. Text output only. **Never push. Never
create the PR** — the user does that themselves.

## Step 1 — Collect

```bash
git fetch origin main 2>/dev/null; git merge-base HEAD origin/main || git merge-base HEAD main
git log --oneline <merge-base>..HEAD
git diff --stat <merge-base>..HEAD
```

If `origin/main` doesn't exist or fetch fails, use local `main`. If the log
is empty, say so and stop.

## Step 2 — Generate

From the commit subjects + diff stat, produce:

1. **PR title** — Conventional-Commit style, imperative, lowercase subject, ≤72 chars, covering the dominant concern (e.g. `feat(components): AppModal + AppTabs on Radix primitives`).
2. **Squash subject** — same string (they serve the same purpose).
3. **PR description** — short markdown:
   - 3–8 bullet summary grouped by concern (features / fixes / refactors / docs), not one bullet per commit.
   - A "Notable decisions" line only if something non-obvious happened (new dependency, pattern change, known limitation).
   - No filler sections, no test-plan boilerplate unless tests actually exist.
4. **README staleness check** — from the diff stat, flag any component whose
   API changed in the branch (props/types/variants files touched) without a
   same-branch `README.md` update. List offenders as a "README not updated:"
   line in the description so the gap lands in the PR, not in a follow-up.

## Step 3 — Deliver

Print title + description in one fenced block for copy-paste. English by
default; Ukrainian on request. Do not run `gh`/`glab`, do not push, do not
amend commits.
