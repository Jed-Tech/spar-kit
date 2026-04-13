# repo-bootstrap

## Summary

Define the repo-local bootstrap behavior for `npx spar-kit install` in Beta1. This spec covers the files and folders created or updated inside the consumer repository, the boundary between SPAR-managed files and user-owned files, and the idempotent rules for re-running install.

The repo bootstrap phase is the required success condition for Beta1 install. In Beta1, the installer materializes the contents of `install-root/` into the consumer repository, subject to preserve/update rules. `install-root/` is the canonical authored source for installed SPAR content.

## Problem

The umbrella install spec defines what Beta1 install should accomplish, but implementing agents still need exact repo-local file rules. Without a dedicated bootstrap spec, it is easy for installer behavior to drift on key details such as whether `AGENTS.md` is created, how `.spar-kit/.local/` is treated, when `justfile` is seeded, and how `install-root/` should be interpreted.

This ambiguity is especially risky because bootstrap behavior touches user repositories directly. The spec needs to make managed-vs-user-owned boundaries obvious so installers remain predictable and safe.

## Goal

Beta1 repo bootstrap must create a consistent SPAR-ready repository layout without silently overwriting machine-local or user-authored content.

Repo bootstrap must:

- treat `install-root/` as the source-of-truth view of what gets installed
- create `AGENTS.md` from `install-root/AGENTS.md` when missing
- prepend the install-root SPAR `AGENTS.md` content when `AGENTS.md` already exists
- create `justfile` from `install-root/justfile` only when `justfile` is missing
- create `.agents/skills/` and populate it from `install-root/.agents/skills/`
- create `.spar-kit/` when missing
- create `.spar-kit/VERSION` from `install-root/.spar-kit/VERSION`
- create `.spar-kit/.local/` when needed
- create `.spar-kit/.local/tools.yaml` from `install-root/.spar-kit/.local/tools.yaml` only if it is absent
- create `specs/README.md` from `install-root/specs/README.md`
- create the `specs/active/` and `specs/completed/` directories from the `install-root/specs/` layout
- preserve any `.gitkeep` placeholders shipped in `install-root/specs/`

Repo bootstrap must be idempotent:

- SPAR-managed files may be updated on reinstall
- user-owned files must be preserved
- files under `.spar-kit/.local/` may be created when absent but not overwritten when present
- re-running install must not duplicate or corrupt seeded SPAR content

For Beta1, the SPAR-managed file set is:

- the SPAR-managed content installed from `install-root/AGENTS.md`, whether created into a missing `AGENTS.md` or prepended into an existing one
- `justfile` only when it was originally seeded by the installer into a repo that did not already have `justfile`
- `.agents/skills/` contents installed from `install-root/.agents/skills/`
- `.spar-kit/VERSION`
- shipped placeholder files under `specs/active/` and `specs/completed/`
- `specs/README.md`

## Scope

In scope:

- `install-root/` as the canonical authored install source
- creation and update rules for repo-root `AGENTS.md`
- creation and update rules for repo-root `justfile`
- creation and update rules for `.agents/skills/`
- creation and update rules for `.spar-kit/`
- creation and update rules for `.spar-kit/VERSION`
- creation and preservation rules for `.spar-kit/.local/`
- creation and seeding rules for `.spar-kit/.local/tools.yaml`
- `specs/` creation and `specs/README.md` install behavior
- placeholder directory behavior for `specs/active/` and `specs/completed/`
- idempotency rules for re-running install
- the boundary between SPAR-managed and user-owned repo files

## Non-Goals

- defining agent-platform detection or external platform-specific installation
- defining installer output formatting
- defining packaging mechanics or build pipeline behavior
- defining the full behavior of `spar.init`
- defining Beta2 or later platform-specific installation beyond the Codex-default install-root layout

## Constraints

- Repo bootstrap is the required success condition for Beta1 install.
- `install-root/` is the canonical authored source of truth for installed files.
- In Beta1, the install-root layout is Codex-default and includes `.agents/skills/` as shipped content.
- `.spar-kit/VERSION` is a SPAR-managed file and may be updated on reinstall or upgrade.
- Files under `.spar-kit/.local/` are machine-local and must not be overwritten if already present.
- The installer may create files under `.spar-kit/.local/` only when absent; once present they are preserved.
- `specs/README.md`, `specs/active/`, and `specs/completed/` must be installed from `install-root/specs/`.
- `AGENTS.md` must be created when missing from `install-root/AGENTS.md`.
- If a consumer repo already contains `AGENTS.md`, Beta1 prepends the install-root SPAR `AGENTS.md` content rather than overwriting the existing file.
- If existing `AGENTS.md` contains malformed SPAR markers that cannot be safely normalized, Beta1 warns and leaves the file unchanged rather than duplicating SPAR content.
- On reinstall, `.agents/skills/` entries managed by SPAR may be replaced from `install-root/.agents/skills/`; non-SPAR directories under `.agents/skills/` must be preserved.
- Existing `justfile` content must be preserved; install only seeds a skeleton when `justfile` is missing.
- Repo bootstrap must not depend on the host repo’s root `package.json` version.

## Success Criteria

- A Beta1 install that completes repo bootstrap leaves the target repo in a valid SPAR-installed state.
- `AGENTS.md`, `justfile`, `.agents/skills/`, `.spar-kit/`, and `specs/` are materialized from `install-root/` according to preserve/update rules.
- `.spar-kit/VERSION` exists after successful repo bootstrap.
- `.spar-kit/.local/tools.yaml` is created when absent and preserved when present.
- `specs/README.md`, `specs/active/`, and `specs/completed/` exist after bootstrap.
- If `AGENTS.md` already existed before install, the installer prepends the install-root SPAR `AGENTS.md` content without overwriting the existing file body.
- If `AGENTS.md` contains malformed SPAR markers, the installer warns and leaves the file unchanged.
- Existing `justfile` content is never overwritten.
- Re-running bootstrap updates SPAR-managed files outside `.spar-kit/.local/` as needed while preserving user-owned content.

## Open Questions

- None for Beta1 repo-bootstrap behavior.

## Decisions

- Repo bootstrap has its own dedicated spec within `Spar-Install`.
- Repo bootstrap is the required success condition for Beta1 install.
- `install-root/` is the canonical authored source of installed files.
- Beta1 installs the Codex-default layout shipped in `install-root/`, including `.agents/skills/`.
- `.spar-kit/.local/` is seed-only-when-absent and preserve-when-present.
- `specs/` content is installed from `install-root/specs/`.
- `AGENTS.md` is created from `install-root/AGENTS.md` when missing and prepended when already present.
- If `AGENTS.md` already exists, Beta1 prepends the install-root SPAR `AGENTS.md` content.
- If `AGENTS.md` contains malformed SPAR markers that are not safely repairable, Beta1 warns and leaves it unchanged.
- `justfile` is seeded only when missing.
- SPAR-managed directories under `.agents/skills/` may be replaced on reinstall; non-SPAR directories there are preserved.
- Reinstall may update SPAR-managed files outside `.spar-kit/.local/`.

## Documentation Impact

- Install docs should reference this spec for repo-local file behavior.
- Future implementation docs should distinguish clearly between SPAR-managed files and user-owned files.
- Any docs showing install side effects should match this repo bootstrap contract.
