---
name: spar.retain
description: >-
  Finalizes documentation for a completed change under specs/active/<change-name>/.
  Aligns spec.md with final behavior, proposes broader doc updates for approval, then
  moves the entire change folder to specs/completed/<change-name>/ with no duplicates.
  Use after spar.act when implementation is done and the user wants cleanup and durable
  docs. Optional files (research.md, notes, artifacts) stay with the folder. Does not
  run spar.specify, spar.plan, or spar.act.
---

# Retain

Turn completed implementation into clean, accurate, durable knowledge: `spec.md` matches reality, broader doc updates only with approval, then archive by **moving** the whole change folder — **no duplicate** trees.

**Paths (repository root = `<root>`):**

- **Active:** `specs/active/<change-name>/`
- **Completed:** `specs/completed/<change-name>/`

**Archive rule:** Move the entire directory `specs/active/<change-name>/` → `specs/completed/<change-name>/`. If `specs/completed/<change-name>/` already exists, **stop** and ask how to resolve (do not merge silently).

All optional artifacts in the folder (`research.md`, notes, attachments) move together.

## Inputs

- `specs/active/<change-name>/spec.md`
- `specs/active/<change-name>/plan.md`
- Completed implementation in the repository
- Repository documentation (README, architecture notes, setup guides, etc., as applicable)

## Outputs

- Finalized `spec.md` (matches actual behavior)
- Final `plan.md` state (done or explained; trim noise where helpful)
- Optional updates to broader docs (**after approval** only)
- Archived folder: `specs/completed/<change-name>/` (sole copy after a successful move)

## Workflow

### 1. Review implementation vs spec

- Compare implemented behavior with `spec.md`
- Note mismatches, missing decisions, outdated assumptions

### 2. Update `spec.md`

- Reflect final behavior (spec must match reality, not original guesses)
- Update **Decisions**, **Constraints**, **Success Criteria** as needed
- Resolve or remove stale **Open Questions**
- Keep intent-focused; no step-by-step implementation narrative in the spec

### 3. Identify broader documentation impact

- Use **Documentation Impact** in `spec.md` and the change itself
- Consider README, developer onboarding, architecture or product docs as relevant to this repo

### 4. Propose broader documentation updates

- List suggested edits clearly. Be concise.
- **Do not apply** until the user approves

### 5. Apply approved updates

- Update only what was approved; keep changes minimal and accurate

### 6. Final cleanup in the change folder

- `spec.md`: clear and complete
- `plan.md`: final state (all done or explained); trim temporary noise
- Leave optional notes/research in place unless the user wants them removed

### 7. Archive change (move folder)

Move the **entire** folder:

`specs/active/<change-name>/` → `specs/completed/<change-name>/`

Create `specs/completed/` if missing. Do **not** leave a copy under `specs/active/`.

## Rules

- Spec describes **final** behavior; it is not a build log
- No silent edits to repo-wide documentation — approval first
- Stay concise
- Never duplicate the change folder in both `active` and `completed`

## Completion

Done when:

- `spec.md` matches the implementation
- Approved documentation updates are applied (or none were needed)
- The change folder exists only under `specs/completed/<change-name>/`

Then:

1. Summarize: key outcomes, doc updates made, final path
2. Confirm to the user that implementation and retention are complete
