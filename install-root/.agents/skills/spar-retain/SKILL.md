---
name: spar.retain
description: >-
  Use after implementation when the user wants cleanup and durable documentation:
  reconcile the spec with actual behavior, propose broader documentation edits for
  approval only, tidy notes in the change folder, then archive the change folder as a
  unit so nothing remains in active work. Closeout should convey why the retained spec
  matters as the durable record of what shipped.
---

# Retain

**Run the steps below in order.**

Turn completed implementation into clean, accurate, durable knowledge: `<change-name>_spec.md` matches reality, broader repo doc updates only with approval, then archive by **moving** the whole change folder.

- **Active:** `specs/active/<change-name>/`
- **Completed:** `specs/completed/<change-name>/`

**Queue folders (`specs/next/`, `specs/later/`):** Not part of this archive step; retention only moves **`active/`** → **`completed/`**.

**Archive rule:** Move the entire directory `specs/active/<change-name>/` → `specs/completed/<change-name>/`. If `specs/completed/<change-name>/` already exists, **stop** and ask how to resolve (do not merge silently).

All optional artifacts in the folder (`research.md`, notes, attachments) move together.

## Inputs

- `specs/active/<change-name>/<change-name>_spec.md`
- `specs/active/<change-name>/plan.md`
- Completed implementation in the repository
- Repository documentation (README, architecture notes, setup guides, etc., as applicable)

## Outputs

- Finalized `<change-name>_spec.md` (matches actual behavior)
- Final `plan.md` state (done or explained; trim noise where helpful)
- Optional updates to broader docs (**after approval** only)
- Archived folder: `specs/completed/<change-name>/` (sole copy after a successful move)

---

## Execution order

### Step 1 — Review implementation vs spec

- Compare implemented behavior with `<change-name>_spec.md`
- Note mismatches, missing decisions, outdated assumptions

---

### Step 2 — Update `<change-name>_spec.md`

- Reflect final behavior (spec must match reality, not original guesses)
- Update **Decisions**, **Constraints**, **Success Criteria** as needed
- Resolve or remove stale **Open Questions**
- Keep intent-focused; no step-by-step implementation narrative in the spec

---

### Step 3 — Identify broader documentation impact

- Use **Documentation Impact** in `<change-name>_spec.md` and the change itself
- Consider README, developer onboarding, architecture or product docs as relevant to this repo

---

### Step 4 — Propose broader documentation updates

- List suggested edits clearly. Be concise.
- **Do not apply** until the user approves
- If **no** broader repo documentation changes are warranted after Step 3, say so **briefly** in your user-facing summary later (**Completion**) — so the user knows the question was considered, not skipped.

---

### Step 5 — Apply approved updates

- Update only what was approved; keep changes minimal and accurate

---

### Step 6 — Final cleanup in the change folder

- **`<change-name>_spec.md` — last pass:** Read it end-to-end. Fix typos, stale phrasing, or inconsistencies **introduced while editing**; ensure nothing contradicts the shipped behavior you captured in Step 2.
- **`plan.md` — last pass:** Every task is checked **or** explicitly explained (won’t do, superseded, follow-up elsewhere). Remove only **scratch** or **duplicate** lines that would confuse someone later; keep useful context.
- **Optional files (`research.md`, notes, attachments):** **Keep** unless the user asked to drop something or a file is clearly obsolete after Steps 2–5. When in doubt, keep.

---

### Step 7 — Archive change (move folder)

Move the **entire** folder:

`specs/active/<change-name>/` → `specs/completed/<change-name>/`

Create `specs/completed/` if missing. Do **not** leave a copy under `specs/active/`.

---

## Rules

- Spec describes **final** behavior; it is not a build log
- No silent edits to repo-wide documentation — approval first
- Stay concise — closeout is **not** a long retrospective by default (unless the user asks for one)

---

## Completion

Done when:

- `<change-name>_spec.md` matches the implementation
- Approved documentation updates are applied (or none were needed)
- The change folder exists only under `specs/completed/<change-name>/`

Then:

1. **Summarize concisely** — key outcomes, **doc updates made** (or **none** — state that briefly if Step 4 had nothing to apply), **final path** under `specs/completed/`. Tie the closeout to **why retention exists**: the archived **`<change-name>_spec.md`** (and folder) are the **durable source of truth** for what shipped — not administrative noise. **Exact wording is optional**; sound natural.
2. Keep the summary **short**; at most **one line** of notable learning if useful — not a full postmortem unless the user wants depth.
3. Confirm to the user that implementation and retention are complete.
