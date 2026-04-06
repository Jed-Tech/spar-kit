---
name: spar.act
description: >-
  Use when implementation is approved after spar.plan: run tasks in order, validate with
  the project's usual checks, retry obvious failures once, stop and ask if blocked, and
  do not change spec intent without approval.
---

# Act

**Run the steps below in order.**

Execute the plan in `plan.md` while strictly preserving the intent in `spec.md`. Work sequentially, validate each step, keep progress updated. Refine or reorder tasks only for correctness; do not change underlying intent without approval. No silent workarounds, no drifting from the spec.

**Change location:** `specs/active/<change-name>/` (repository root = `<root>`).

**Prerequisite:** **spar.plan** should have produced stable `spec.md` and `plan.md`. If missing, stop and run **spar.plan** (or **spar.specify** first).

Optional files in the change folder (e.g. `research.md`, notes) are preserved; do not remove them.

## Inputs

- `specs/active/<change-name>/spec.md`
- `specs/active/<change-name>/plan.md`
- Repository code and docs
- When a task fails or implementation details are unclear: **MCP tools**, **web search**, **vendor or official documentation**, and other vetted external sources (use alongside the repo to interpret errors, APIs, and constraints)

## Outputs

- Code or configuration changes that satisfy `spec.md`
- Updated `plan.md` with progress (checked tasks)
- Proposed `spec.md` updates (if you recommend spec updates, approval is needed — do not apply without approval)

---

## Execution order

### Step 1 — Load context

- Read `spec.md` and `plan.md`
- Confirm the change folder path
- Identify current progress (checked tasks)

---

### Step 2 — Execute tasks

For each unchecked task:

1. Understand the task and affected files
2. Implement the change
3. Validate using the **project’s usual checks** (tests, lint, build, or narrower equivalents when a full run is unnecessary)
4. Mark the task complete in `plan.md`

Proceed sequentially unless reordering is clearly required for correctness.

---

### Step 3 — Validation

- Prefer targeted checks when a full run is unnecessary
- Ensure changes align with **Success Criteria** in `spec.md`
- Ask the user to test or validate only if you cannot run the needed checks

---

### Step 4 — Failure handling

If a task fails or you are blocked:

1. **Investigate** using the repository and, as needed, **MCP**, **web search**, **vendor or project docs**, and other external references to understand the error, API, or environment—same as a human lead would. Gathering facts this way is **expected** when the plan or local code is not enough; it is not a substitute for user approval if you discover **spec-level** surprises (see Step 6).
2. Fix obvious issues and **retry the task once**
3. If still failing: **stop**, explain the blocker, summarize what you tried (including external lookups), propose next steps, ask how to proceed

Do not introduce workarounds that change intent or degrade quality without approval.

---

### Step 5 — Task evolution (allowed)

- Refine wording for clarity
- Split tasks into smaller steps
- Reorder tasks if needed for correctness

Do not alter task intent in a way that would change the spec.

---

### Step 6 — Spec change handling

If implementation reveals incorrect assumptions, missing constraints, or a better approach that **changes intent**:

1. Propose the spec update clearly
2. **Do not** implement that divergent path yet
3. Wait for user approval
4. Update `spec.md` only after approval

---

### Step 7 — Keep context accurate

- Keep `plan.md` in sync with progress
- Add brief notes for edge cases, follow-ups, or partial work

---

## Stop conditions

Stop and ask if:

- A task cannot be completed after one retry
- A required spec change is identified
- The task list is insufficient or conflicts with the spec

---

## Completion

Implementation is complete when:

- All tasks are completed or explicitly resolved
- Work satisfies **Success Criteria** in `spec.md`
- No unresolved blockers remain

Then:

1. **Summarize concisely:** tasks completed, deviations or notes, validation results.

2. **State wrap-up intent.** Use the gist below as a guide; **exact wording is optional.**

   > We’re done with the planned work—want me to close this out? I’d sync the spec with what we shipped, tidy the change folder, and move it to **completed** so the docs stay the **source of truth**.

3. **Wait for the user.** After you send that wrap-up message, **stop until they reply**. Do **not** begin **spar.retain** without their clear go-ahead. If they defer (“not now,” “later,” etc.), do **not** archive.

4. **If they want more implementation or another follow-on request:** Do that work (keep `plan.md` and the spec accurate; follow **Execution order** Steps 2–7 as needed). When that work is done, **repeat Completion steps 1–3** in **this Completion section**.

5. **When they confirm they want to close out:** begin skill: **spar.retain**.
