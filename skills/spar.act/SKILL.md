---
name: spar.act
description: >-
  Executes plan.md for an active change under specs/active/<change-name>/. Use after
  spar.plan when the user approves implementation. Follows tasks in order, validates
  with the project's usual checks, retries obvious failures once, and stops to ask if
  blocked. Does not change spec intent without approval. After implementation, hand off
  to spar.retain for cleanup and archiving. Does not replace spar.specify or spar.plan.
---

# Act

Execute the plan in `plan.md` while strictly preserving the intent in `spec.md`. Work sequentially, validate each step, keep progress updated. Refine or reorder tasks only for correctness; do not change underlying intent without approval. No silent workarounds, no drifting from the spec.

**Change location:** `specs/active/<change-name>/` (repository root = `<root>`).

**Prerequisite:** **spar.plan** should have produced stable `spec.md` and `plan.md`. If missing, stop and run **spar.plan** (or **spar.specify** first).

Optional files in the change folder (e.g. `research.md`, notes) are preserved; do not remove them.

## Inputs

- `specs/active/<change-name>/spec.md`
- `specs/active/<change-name>/plan.md`
- Repository code and docs

## Outputs

- Code or configuration changes that satisfy `spec.md`
- Updated `plan.md` with progress (checked tasks)
- Proposed `spec.md` updates (for approval only — do not apply without approval)

## Workflow

### 1. Load context

- Read `spec.md` and `plan.md`
- Confirm the change folder path
- Identify current progress (checked tasks)

### 2. Execute tasks in order

For each unchecked task:

1. Understand the task and affected files
2. Implement the change
3. Validate using the **project’s usual checks** (tests, lint, build, or narrower equivalents when a full run is unnecessary)
4. Mark the task complete in `plan.md`

Proceed sequentially unless reordering is clearly required for correctness.

### 3. Validation

- Prefer targeted checks when a full run is unnecessary
- Ensure changes align with **Success Criteria** in `spec.md`
- Ask the user to test or validate only if you cannot run the needed checks

### 4. Failure handling

If a task fails:

1. Fix obvious issues and **retry once**
2. If still failing: **stop**, explain the blocker, propose next steps, ask how to proceed

Do not introduce workarounds that change intent or degrade quality without approval.

### 5. Task evolution (allowed)

- Refine wording for clarity
- Split tasks into smaller steps
- Reorder tasks if needed for correctness

Do not alter task intent in a way that would change the spec.

### 6. Spec change handling

If implementation reveals incorrect assumptions, missing constraints, or a better approach that **changes intent**:

1. Propose the spec update clearly
2. **Do not** implement that divergent path yet
3. Wait for user approval
4. Update `spec.md` only after approval

### 7. Keep context accurate

- Keep `plan.md` in sync with progress
- Add brief notes for edge cases, follow-ups, or partial work

## Stop conditions

Stop and ask if:

- A task cannot be completed after one retry
- A required spec change is identified
- The task list is insufficient or conflicts with the spec

## Completion

Implementation is complete when:

- All tasks are completed or explicitly resolved
- Work satisfies **Success Criteria** in `spec.md`
- No unresolved blockers remain

Then:

1. Summarize: tasks completed, deviations or notes, validation results. Be concise.
2. Ask: **Should I run spar.retain** to finalize documentation and move the change to `specs/completed/<change-name>/`?
3. If yes: begin **spar.retain**. If the user prefers to defer, stop after the summary.
