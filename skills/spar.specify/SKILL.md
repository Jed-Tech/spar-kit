---
name: spar.specify
description: >-
  Use when starting a feature or refactor before executable planning: conversation first,
  then investigate the repo and outside sources as needed; only after the change name and
  high-level intent are confirmed, create specifications. Clarify problem, goals, constraints, and scope; resolve the change
  name; surface unknowns; produce an initial spec with Summary, Problem, Goal, and Scope
  only.
---

# Specify

**Run the steps below in order.** Each step is a gate: finish it before starting the next.

**Until Step 3 explicitly tells you to:** do **not** create `specs/active/<change-name>/`, and do **not** write `spec.md` (or any other files) under that path. You **may** read and search the repository, use web or documentation research, MCP or other tools, and share findings in the thread.

Repository root = `<root>`. Active work will eventually live in `specs/active/<change-name>/`; optional artifacts (e.g. `research.md`, notes) may sit in that folder once it exists and move with the folder later.

## Voice

Be **concise**, **cheerful**, and **inquisitive** — like a helpful teammate, not a form read aloud.

---

## Execution order

### Step 1 — Opening turn only

**Start by asking — use this wording (or trivially equivalent):**

> I see you would like to start ideation and planning for a change. Can you provide me with some context or your goals for the change?

If the user already gave hints in the same thread (e.g. a working title), add at most **one short** acknowledging clause, then still use the prompt above so goals stay explicit.

**In this step:** do **not** create files, do **not** draft `spec.md`, and do **not** interrogate for every section up front — save deeper structuring for after they reply.

Stop after sending that prompt (and at most one short acknowledge). **Do not** advance to Step 2 until the user has responded.

---

### Step 2 — Understand intent and name (still no files under `specs/`)

**Do this only after the user has replied to Step 1.**

- Clarify the goal from discussion; refine `<change-name>` (folder-safe, descriptive).
- Resolve scope in plain language (what is in / out at a high level); ask only what is missing.
- Investigate as needed: repository reads, web search, vendor docs, MCP, or other research—inform the conversation; **do not** create `specs/active/<change-name>/` or any file under it yet, even if you think you know the name.

**Stay in Step 2** until the change name and high-level intent are confirmed or clearly settled with the user. If either is still ambiguous, keep conversing; do **not** go to Step 3.

---

### Step 3 — Create the change folder and initial `spec.md`

**Do this only when Step 2’s gate is satisfied (name + intent settled).**

1. Create `specs/active/<change-name>/`.
2. Create `spec.md` in that folder using **only** the four sections in **Reference: initial `spec.md` shape** (later in this skill), filled from the conversation so far.
3. Optionally add `research.md`, brief notes, or other small artifacts in the same folder if they help.

If the name or intent is no longer right after Step 3, align with the user first (including renaming the folder and retitling `spec.md` if needed) before continuing.

---

### Step 4 — Context gathering and ideation

**Do this only after Step 3.**

- Review relevant code and repository documentation (now you may also capture notes in the change folder if helpful).
- Explore approaches; note risks and unknowns in the conversation and, if useful, in optional files next to `spec.md`.

---

### Step 5 — Surface unknowns and refine the opening spec

**Do this after Step 4.**

- List gaps; ask the user where needed.
- Unknowns will carry into **spar.plan** via **Open Questions** and iteration; you do **not** need the full spec template in this phase.
- Adjust the four sections in `spec.md` for clarity if needed.

---

### Step 6 — Stabilize the initial spec

**Do this last, before completion.**

Ensure **Summary**, **Problem**, **Goal**, and **Scope** are coherent and aligned with the user.

**Do not** add Non-Goals, Constraints, **Success Criteria**, or Decisions in this phase (that is **spar.plan**).

---

## Stop conditions

Stop and ask if:

- The change name or intent is still ambiguous after reasonable dialogue
- Scope cannot be stated clearly enough for **spar.plan** to succeed later

---

## Completion

This phase is complete when:

- `specs/active/<change-name>/` exists
- `spec.md` contains the four initial sections and matches the user’s intent at a high level

Then:

1. Summarize concisely: change name, scope, key risks or unknowns.
2. Ask: **Proceed to spar.plan** to complete the spec?
3. If yes: begin skill: **spar.plan**.

---

## Reference: initial `spec.md` shape

Use this **only in Step 3** when first creating `spec.md`; refine the same four sections through **Step 6**. Heading text only — fill in body content from the conversation:

```markdown
# <change-name>

## Summary
## Problem
## Goal
## Scope
```

---

## Rules (summary)

| Artifact | This phase |
|----------|------------|
| `spec.md` | **Summary, Problem, Goal, Scope only** |
| Optional files | Allowed **from Step 3 onward**; keep them in the change folder |
