# spar-kit

**spar-kit** is a lightweight AI workflow system for building software with clarity, speed, and consistency.

It uses a simple four-phase model:

> **Specify → Plan → Act → Retain**

---

## How it works

1. **Specify** — clarify goals, scope, and constraints; seed the initial `spec.md` (Summary through Scope).
2. **Plan** — complete `spec.md` (including **Success Criteria**), then create `plan.md` with ordered tasks.
3. **Act** — implement with validation against the spec and plan.
4. **Retain** — align `spec.md` with what shipped, update broader docs with approval, then archive the change folder.

---

## Folder layout

Repository root = `<root>`.

| Stage | Path |
|--------|------|
| Active change | `specs/active/<change-name>/` |
| Completed change | `specs/completed/<change-name>/` |

Each active change folder usually contains `spec.md` and `plan.md`, side by side. Optional files (`research.md`, notes, small artifacts) may live in the same folder; **Retain** moves the **whole** directory to `specs/completed/<change-name>/` with no duplicate left under `active`.

---

## Skills

Phases are implemented as agent skills under `skills/`:

| Phase | Skill |
|-------|--------|
| Specify | `spar.specify` |
| Plan | `spar.plan` |
| Act | `spar.act` |
| Retain | `spar.retain` |

Copy or symlink each skill directory into your agent’s skills location (for example `.cursor/skills`, `.agents/skills`, or `.claude/skills`), following your tool’s documentation.

---

## Templates

`templates/spec.md` and `templates/plan.md` match the structure the skills expect. The spec template lists every heading; **spar.specify** only fills **Summary** through **Scope** at first, and **spar.plan** completes the rest. Both templates include HTML comments noting paths under `specs/active/` and `specs/completed/`.
