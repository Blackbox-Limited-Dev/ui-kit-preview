---
name: figma-preflight
description: Verifies the figma-console MCP (Desktop Bridge) connection and heals it before Figma work. Invoke at the start of any Figma task (first Figma MCP call of the session), when the user says "check figma bridge / figma connection", or after any bridge/node-lookup error. Replaces the manual "check figma bridge connection" ritual.
---

# Figma Bridge Preflight

Goal: one invocation answers "can we talk to Figma right now?", heals the
connection if possible, and gives the user the exact recovery action if not.

## Step 1 — Probe (parallel)

Call in parallel:

1. `mcp__figma-console__figma_get_status` with `probe: true` — WebSocket + live roundtrip.
2. `mcp__figma-console__figma_list_open_files` — which file is the active target.
3. `mcp__figma-console__figma_get_selection` — plugin responds to a real command.

All OK → report terse status and proceed with the actual task:

- Connection: ✅ + transport + port
- Active file name + current page
- Selection count (or "nothing selected")

## Step 2 — Self-heal on failure

If any probe fails, call `mcp__figma-console__figma_reconnect` **once**, then
re-run Step 1. Do not loop.

## Step 3 — Hand off to the user if still down

Still failing → stop and tell the user exactly:

> "Figma Console MCP not connected. Open Figma Desktop → Plugins → Development → Figma Desktop Bridge → Run. Then ask me to re-check."

- **Never** fall back to the standard `claude.ai Figma` MCP without explicit user authorisation (figma-console-only rule, `.cursor/rules/07-figma-console-mcp-connection.mdc`).
- After the user confirms, re-run Step 1 from scratch — never assume the reconnect worked.

## Mid-session disconnects (timeout / bridge drop during work)

Any `figma_*` call failing **mid-session** with a timeout or disconnect gets
the same treatment as a failed preflight — automatically, before involving the
user:

1. Re-run the Step 1 probe → Step 2 self-heal loop **once**
   (`figma_reconnect`, then re-probe).
2. Healed → **batch the remaining Figma calls** after the reconnect instead of
   resuming one-at-a-time: each round-trip re-risks the flaky bridge, so
   collect everything still needed and fetch it in as few calls as possible.
3. Still down → only now hand off to the user per Step 3.

## Node-id hygiene (on lookup failures mid-work)

`Component not found` / `Node not found` / `Failed to render image` is usually
**not** a connection problem. Before retrying anything:

1. Normalize the id: Figma URLs carry `node-id=3311-4286`; the API wants `3311:4286`. Convert dash → colon once.
2. Confirm the right file/page is open (`figma_list_open_files`); the bridge only sees open files.
3. If the id still misses, the node may be deleted/moved — ask the user to re-share the link. **Do not blind-retry the same id.**

## Known error — `Cannot unwrap symbol` on a deep read

`figma_get_component_for_development_deep` failing with `Cannot unwrap symbol` is
a plugin-side state fault, not a bad node id. Recovery, in order — and
**never blind-retry the deep call more than once**:

1. `mcp__figma-console__figma_reload_plugin`.
2. Retry the deep call **once**.
3. Still failing → fall back to the non-deep `figma_get_component_for_development`
   on the same node, then fetch the gaps with per-node reads (children whose
   specs the shallow read omitted). Note in the reply that the extraction was
   assembled from a shallow pass, so completeness must be re-checked against the
   design (every visible label, every stroke/size/radius/background).
