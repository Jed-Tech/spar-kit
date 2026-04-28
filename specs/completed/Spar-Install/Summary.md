# Spar-Install Summary

## Purpose

This document summarizes what the Beta1 `spar-kit` installer implements, why it behaves that way, and the main technical boundaries future developers and agents should know before changing it.

## What Beta1 Implements

Beta1 provides one install entry point:

- `npx spar-kit install`

The installer packages and applies the contents of `install-root/` as the canonical install payload. The payload is materialized into the consumer repository as repo-root content, not as a literal `install-root/` directory.

The Beta1 payload includes:

- `AGENTS.md`
- `justfile`
- `.agents/skills/`
- `.spar-kit/VERSION`
- `.spar-kit/.local/tools.yaml`
- `specs/README.md`
- `specs/active/.gitkeep`
- `specs/completed/.gitkeep`

## Why It Works This Way

Beta1 intentionally keeps installation narrow and explicit:

- one packaging contract: `install-root/`
- one installer command: `install`
- one default layout: Codex-style repo-local structure
- no separate manifest
- no Beta2 platform-target behavior yet

This keeps the packaging story simple and makes shipped install content easy to reason about and update over time.

## Key Bootstrap Rules

### `AGENTS.md`

- If missing, create it from `install-root/AGENTS.md`.
- If present and no SPAR block exists, prepend the SPAR block.
- If a valid SPAR block exists, replace that block in place on reinstall.
- If SPAR markers are malformed and cannot be safely normalized, warn and leave the file unchanged.

This conservative malformed-marker behavior avoids duplicating SPAR content.

### `justfile`

- Create only if missing.
- Never overwrite an existing `justfile` in Beta1.

### `.spar-kit/VERSION`

- SPAR-managed and updateable.
- Always copied from the active payload on install/reinstall.

### `.spar-kit/.local/**`

- Machine-local and never overwritten when already present.
- Missing files may be created from payload.

This separation between `.spar-kit/VERSION` and `.spar-kit/.local/**` is one of the most important implementation boundaries.

### `.agents/skills/`

- SPAR-managed skill directories from payload may be replaced on reinstall.
- Non-SPAR directories already present under `.agents/skills/` are preserved.

### `specs/`

- `specs/README.md` is SPAR-managed.
- `specs/active/` and `specs/completed/` are created from payload and keep shipped placeholders.

## Reporting

Beta1 reporting is intentionally small:

- `Outcome: success` or `Outcome: failure`
- optional `Warnings:` section
- `Next: Ask your agent to use spar-init.` on success

Warnings are used for preserved or skipped actions where appropriate, such as:

- existing `justfile` preserved
- existing `.spar-kit/.local/**` files preserved
- malformed `AGENTS.md` SPAR markers left unchanged

## Validation Status

Beta1 implementation has automated validation in:

- [test/install-validation.test.mjs](/c:/Users/jedde/GithubRepos/spar-kit/test/install-validation.test.mjs)

The validation covers:

- clean install
- reinstall behavior
- `AGENTS.md` create/prepend/idempotent replace behavior
- malformed `AGENTS.md` marker behavior
- duplicate SPAR block normalization
- `.spar-kit/VERSION` vs `.spar-kit/.local/**`
- managed vs preserved skills
- `specs/README.md` from payload
- CLI reporting for success, warnings, and failure

## Known Beta1 Limits

- Explicit non-default platform installs are deferred to Beta2.
- Validation has been run in the current environment and should still be confirmed on macOS/Linux before release.
- Upgrade behavior is validated at the payload/bootstrap level, not yet as a full published old-package -> new-package install flow.

## Main Files

- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)
- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)
- [installer-engine_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/installer-engine_spec.md)
- [install-report_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-report_spec.md)
- [install-root_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-root_spec.md)
- [implementation-plan.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/implementation-plan.md)
