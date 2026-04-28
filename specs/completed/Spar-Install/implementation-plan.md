# Implementation Plan - Spar-Install

## Project Summary

Implement Beta1 `spar-kit` installation around `npx spar-kit install`, using `install-root/` as the canonical authored install source. The work should deliver one installer engine, one repo-bootstrap flow, and one reporting flow that match the active install specs.

**Note:** After completing each phase, the agent should reply to the user with a short summary of what was completed and a brief handoff for the next phase (or closing notes after the final phase).

**Critical `.spar-kit/` boundaries (do not conflate):**

- **Managed and updateable:** `.spar-kit/VERSION` — SPAR-owned; create from `install-root` and allow update on reinstall or upgrade so it reflects the packaged `spar-kit` version.
- **Never overwrite existing files:** `.spar-kit/.local/**` — machine-local; create missing files only (e.g. seed `tools.yaml` when absent); if a path already exists, preserve it.

**Implementation progress:** Phases 1–5 complete. Automated checks: `npm test` (`test/install-validation.test.mjs`, `test/pack-prep.test.mjs`).

## Phase 1: Install Root Alignment
### Phase Summary

Align repo source structure and authored install content so `install-root/` is the clear source of truth for everything that ships in Beta1.

### Related Documents

- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)
- [install-root_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-root_spec.md)
- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)

### Tasks
- [X] Verify `install-root/` contains the complete Beta1 install payload and only installable content.
- [X] Confirm `install-root/specs/README.md` is the intended installed `specs/README.md`.
- [X] Confirm install-root content matches the current Beta1 decisions for `AGENTS.md`, `justfile`, `.agents/skills/`, and `.spar-kit/.local/tools.yaml`.

### Notes

- Do not expand scope into Beta2 platform-target behavior here.
- **Phase 1 complete.** `install-root/` is treated as ready for Beta1 packaging; Phase 2 implements how it is shipped and applied.

## Phase 2: Installer Engine
### Phase Summary

Implement the Beta1 installer entry point and package flow so `npx spar-kit install` installs from `install-root/` without requiring a separate manifest.

### Status

- **Complete.** The package exposes `spar-kit install`, ships `install-root/` in the published artifact, and materializes each top-level payload entry at the target repo root (no literal `install-root/` directory). Phase 3 adds bootstrap semantics; Phase 4 adds reporting.

### Assumptions (from Phase 1)

- `install-root/` is complete and scoped as the Beta1 install payload only.
- No separate asset manifest is required for Beta1; the packaged tree is `install-root/`.
- The engine must package that tree for release and, at install time, apply it as **repo-root files** (e.g. `AGENTS.md`, `justfile`, `.agents/`, `.spar-kit/`, `specs/`), **not** as a top-level `install-root/` folder in the target repository.

### Related Documents

- [installer-engine_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/installer-engine_spec.md)
- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)

### Tasks
- [X] Implement the `install` command for Beta1.
- [X] Package `install-root/` as the install payload for the published build.
- [X] Ensure installed payload is materialized as repo-root content, not as a literal `install-root/` directory.

### Notes

- Beta1 requires only the `install` command.
- Build/publish docs should state that the release embeds the current `install-root/` tree as the install payload (see `installer-engine_spec.md` decisions).

## Phase 3: Repo Bootstrap
### Phase Summary

Implement repo-local file application rules, preserve/update boundaries, and reinstall behavior.

### Status

- **Complete.** Implemented in `lib/repo-bootstrap.mjs` (invoked from `lib/install-engine.mjs`). `AGENTS.md` uses `<!-- spar-kit:start/end -->` for idempotent block replace on reinstall.

### Related Documents

- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)
- [install-root_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-root_spec.md)

### Tasks
- [X] Implement `AGENTS.md` creation/prepend behavior.
- [X] Implement `justfile` create-if-missing behavior.
- [X] Implement `.spar-kit/VERSION` from `install-root` as SPAR-managed (create/update on reinstall per spec).
- [X] Implement `.spar-kit/.local/**` create-only-if-absent behavior (never overwrite existing files under `.spar-kit/.local/`).
- [X] Implement managed install/update behavior for the remaining shipped paths (e.g. `.agents/skills/`, `specs/`, and other paths in `repo-bootstrap_spec.md`).

### Notes

- Preserve non-SPAR content where the bootstrap spec requires it.
- Under `.spar-kit/`, treat `VERSION` (managed, updateable) and `.local/**` (never overwrite) as separate code paths — see **Critical `.spar-kit/` boundaries** in the project summary.

## Phase 4: Reporting
### Phase Summary

Implement Beta1 installer output so users and agents get a clear success/failure result and the right next step.

### Status

- **Complete.** Implemented in `lib/install-report.mjs`; CLI wraps `runInstall` in try/catch. Layout: `Outcome:` → optional `Warnings:` (one `- ` line per warning) → `Next: Ask your agent to use spar-init.` on success.

### Related Documents

- [install-report_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-report_spec.md)
- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)

### Tasks
- [X] Implement Beta1 `success` and `failure` reporting.
- [X] Add `Warnings:` output when warnings exist.
- [X] Add the Beta1 next-step recommendation to use `spar-init` on success.

### Notes

- Keep reporting aligned with the fixed Beta1 output contract.

## Phase 5: Validation
### Phase Summary

Verify that the implemented installer matches the current Beta1 install specs and behaves safely on re-run.

### Status

- **Complete.** `npm test` runs `node --test` on `test/install-validation.test.mjs` and `test/pack-prep.test.mjs` (clean install, reinstall, path rules, VERSION vs `.local`, reporting, pack-prep).

### Related Documents

- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)
- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)
- [install-report_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-report_spec.md)

### Tasks
- [X] Assignee: Composer 2 — Validate a clean Beta1 install into a test repo.
- [X] Assignee: Composer 2 — Validate reinstall behavior for managed files and preserved files across the main Beta1 path rules.
- [X] Assignee: GPT 5.4 — Validate reinstall specifically for `.spar-kit/VERSION` (updateable) vs `.spar-kit/.local/**` (never overwrite when present).
- [X] Assignee: GPT 5.4 — Validate reporting output for success, failure, and warning cases.

### Notes

- Record any spec gaps discovered during implementation before expanding scope.
