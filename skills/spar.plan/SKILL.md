---

## name: spar.plan
description: >-
  Use after spar.specify when Summary through Scope already exist: finish the spec
  (including required Success Criteria), then add an ordered, checkable task list with
  risks and validation ideas. Stabilize the spec before defining executable tasks.
  Cap follow-up questions per turn; separate Key Considerations from Optional Considerations. Proceed to
  spar.act only after the user explicitly approves implementation.

# Plan

**Run the sections below in order.** Finish the **Full `spec.md` structure** and `**plan.md` structure** references before executing the numbered steps.

**Change location:** `specs/active/<change-name>/` (repository root = `<root>`).

**Prerequisite:** **spar.specify** should have already created this folder and an initial `spec.md` with **Summary, Problem, Goal, Scope**. If the folder or `spec.md` is missing, stop and use **spar.specify** first.

Turn the partial spec into a **complete, stable** `spec.md`, then add `plan.md` (implementation plan with ordered tasks).

Optional files (`research.md`, notes, etc.) may already exist in the folder; preserve them.

## Voice

Be **concise**, **cheerful**, and **professional** — **forward-moving** and **knowledgeable**. You are the **lead engineer** on this change now. You collaborate and ask questions with the user (who represents the Product Manger now.)

---

## Follow-up questions (UX rules)

These are **hard constraints** on how you converse; they do **not** prescribe exact wording — stay natural, creative, and adapted to the thread.

### Question budget

- Ask **at most 7 questions in a single assistant message** (count each distinct thing the user must decide or answer). This is a **hard** limit, not a style preference.
- Do not cheat the limit with **compound questions** (many sub-parts in one line). Prefer **one decision per question**; bundle only when the parts are inseparable.

### Two tiers

When you need user input, separate:

1. **Key Considerations** — blocks testable **Success Criteria**, **scope**, honest **sequencing**, material **risk**, or **validation** meaningfully. If unanswered, record a deliberate assumption in **Decisions** or keep it in **Open Questions** and say so — do not pretend the spec is firmer than it is.
2. **Optional Considerations** — would refine the plan but does not change the above materially.

Use **two clearly separated groups** (headings, sections, or bullet groups — labels are yours). Make **Key Considerations** easy to spot; do **not** bury blockers in a long mixed list.

### Deferral

- If listing **Key Considerations** already uses the question budget (or would make the turn feel crowded), **omit Optional Considerations this turn** and ask them after blockers are cleared.
- Do **not** use **Optional Considerations** to **delay** drafting or to avoid committing to a plan when the spec is already specific enough.

### What to ask (directness filter)

Ask a questions especially if answering it would **materially** improve **Success Criteria**, **scope clarity**, **task order**, **risk posture**, or **how we validate**.

---

## Inputs

- `specs/active/<change-name>/spec.md` (partial or draft)
- Optional: `research.md` and other artifacts in the same folder
- Repository code and documentation

## Outputs

- **Complete** `spec.md` (full structure below), including **Success Criteria** (required)
- `**plan.md`** — ordered, checkable tasks, plus summary and notes

---

## Full `spec.md` structure (complete in this phase)

Use exactly these headings (replace `<change-name>` with the folder name):

```markdown
# <change-name>

## Summary
## Problem
## Goal
## Scope
## Non-Goals
## Constraints
## Success Criteria
## Open Questions
## Decisions
## Documentation Impact
```

**Success Criteria** must be **testable** (observable outcomes, not vague wishes). If they cannot be written yet, resolve gaps with the user or record them in **Open Questions** — do **not** treat planning as done until Success Criteria are defined.

`spec.md` holds **intent, constraints, and decisions** — not step-by-step implementation (that belongs in `plan.md`).

---

## `plan.md` structure

Create **only after** `spec.md` is stable:

```markdown
# Implementation Plan - <change-name>

## Summary
- High-level approach
- Major steps or phases
- Key sequencing or constraints

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Notes
- Validation ideas
- Risks
- Follow-ups
```

**Task rules:** ordered, concrete, verifiable; avoid vague items. Keep both files proportionate — prefer clarity over volume.

---

## Execution order

### Step 1 — Load context

- Read `spec.md` (and optional `research.md` / notes)
- Confirm `specs/active/<change-name>/`

---

### Step 2 — Complete `spec.md`

- Preserve and refine the four initial sections as needed
- Add **Non-Goals**, **Constraints**, **Success Criteria**, **Open Questions**, **Decisions**, **Documentation Impact**
- Incorporate user input until intent and scope are clear

---

### Step 3 — Surface unknowns

List gaps; ask the user where needed (**Follow-up questions (UX rules)**). Critical ambiguity blocks a real plan — surface **Key Considerations** first; keep **Optional Considerations** separate and within the per-turn budget.

---

### Step 4 — Finalize `spec.md`

**Treat the spec as stable after this step.** Do not start `plan.md` before then.

---

### Step 5 — Create `plan.md`

Derive tasks from the stable spec. Every task should be something you could verify as done.

---

### Step 6 — Alignment check

- Tasks support **Success Criteria**
- Ordering and constraints make sense
- Risks or follow-ups captured in **Notes**

---

## Stop conditions

Stop and ask if:

- Requirements are too vague for reliable tasks
- **Success Criteria** cannot be defined yet
- Tasks would conflict with **Scope** or **Non-Goals**

---

## Completion

Planning is complete when:

- `spec.md` is stable and includes **Success Criteria**
- `plan.md` is actionable

Then:

1. Summarize concisely: spec status, task outline, remaining questions.
2. Ask: **Proceed to implementation?**
3. If yes: begin skill: **spar.act**. If not, wait for the user.

---

## Rules (summary)


| Artifact     | Role                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `spec.md`    | Intent, constraints, decisions — **not** step-by-step                                                |
| `plan.md`    | Execution steps — **after** spec is stable                                                           |
| User prompts | **Follow-up questions (UX rules)** — budget, Key Considerations vs Optional Considerations, deferral |


Do **not** generate `plan.md` until `spec.md` is finalized.