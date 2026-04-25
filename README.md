# spar-kit

**spar-kit** is a lightweight AI workflow system for building software with clarity, speed, and consistency.

**Released version (SemVer 2.0.0):** see the root [`VERSION`](VERSION) file. Canonical `main` for checks (e.g. `spar-init`): `https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`.

It uses a simple four-phase model:

> **Specify → Plan → Act → Retain**

---

## How it works

1. **Specify** — clarify goals, scope, and constraints; seed the initial `<change-name>_spec.md` (Summary through Scope).
2. **Plan** — complete `<change-name>_spec.md` (including **Success Criteria**), then create `plan.md` with ordered tasks.
3. **Act** — implement with validation against the spec and plan.
4. **Retain** — align `<change-name>_spec.md` with what shipped, update broader docs with approval, then archive the change folder.

---

## Folder layout

Repository root = `<root>`.

| Stage | Path |
|--------|------|
| Active (SPAR pipeline) | `specs/active/<change-name>/` |
| Completed (archived) | `specs/completed/<change-name>/` |

**Specify**, **Plan**, and **Act** run against **`specs/active/`**. **Retain** moves the **whole** directory from **`active/`** to **`completed/`** with no duplicate left under **`active`**.

Each change folder usually contains `<change-name>_spec.md` (same spelling as the folder name) and `plan.md`, side by side. Optional files (`research.md`, notes, small artifacts) may live in the same folder.

See [`specs/README.md`](specs/README.md) for a concise overview of the workflow folders.

---

## Skills

Core workflow and initialization are implemented as agent skills under `skills/`:

| Stage | Skill |
|-------|--------|
| Init | `spar-init` |
| Specify | `spar-specify` |
| Plan | `spar-plan` |
| Act | `spar-act` |
| Retain | `spar-retain` |

Copy or symlink each skill directory into your agent's supported skills location, following your tool's documentation.

- Codex: `.agents/skills/`
- Cursor: `.agents/skills/` is documented in our research and verified by local testing to work
- Claude Code: use `.claude/skills/` as the supported project-local path

---

## Templates

`templates/spec.md` is copied per change to `<change-name>_spec.md`; `templates/plan.md` becomes `plan.md`. The spec template lists every heading; **spar-specify** fills the sections known from discovery, and **spar-plan** completes the rest. Both templates include HTML comments noting paths under `specs/active/` through completion under `specs/completed/`.
