# Plan: tools-check

## Approach
Lock a v1 `tools.yaml` contract (schema, tool list, write semantics), ship it as the install-root seed, and align `spar-init` step 2 (“Tool verify-install-sync”) so agents apply one consistent shape and timestamp rule.

## Execution constraints
- Touch only `.spar-kit/.local/tools.yaml` for machine-local state; install bundle supplies the seed template.
- Preserve stable category and nested key ordering on every write.
- Do not add migration logic for legacy shapes in this change.

## Tasks
- [x] Finalize v1 schema and tool list in spec.
- [x] Update `install-root/.spar-kit/.local/tools.yaml` to v1 seed (`schema_version`, `checked_at`, full tool set, nested `forge_cli` / `installers` branches).
- [x] Update `install-root/skills/spar-init/SKILL.md` tool step (batched checks, single `checked_at`, `when`, in-place updates, `schema_version`).
- [x] Reconcile spec and plan; archive to `specs/completed/tools-check/`.

## Validation strategy
- Spec and templates reviewed against live repo `.spar-kit/.local/tools.yaml` usage (developer machine can show populated `installed` / `version` / `reason` after a run).
- No automated schema validator in repo for this phase; contract is documented and enforced by skill guidance.

## Risks / follow-ups
- **Legacy files:** Repos with pre-v1 `tools.yaml` may need one manual run or hand-merge if shape diverges; out of scope per spec.
- **Optional:** Add a small YAML schema or lint in CI later if drift becomes an issue.
