# pack-prep

## Summary
`pack-prep` is the Beta1 pre-packaging preparation step. It is exposed as `just pack-prep`, syncs release version data from the root `VERSION` file into the other shipped version locations, verifies the repository is ready for `npm pack`, and runs the current test suite before reporting readiness.

## Problem
Beta1 packaging currently depends on manually keeping multiple version files aligned:
- `VERSION`
- `install-root/.spar-kit/VERSION`
- `package.json.version`

It also relies on contributors remembering that the packaged install payload and validation state must be correct before running `npm pack`. That creates avoidable release drift and packaging mistakes.

## Goal
Provide one simple pre-pack command that uses the root `VERSION` as canonical, prepares the other required version locations, verifies required packaged assets exist, and confirms the repo is ready for `npm pack`.

## Scope
- Add a `just pack-prep` workflow.
- Use the root `VERSION` file as the canonical source for release version.
- Sync that value into:
  - `install-root/.spar-kit/VERSION`
  - `package.json.version`
- Verify the required packaged install assets exist.
- Run the existing test suite as part of pack preparation.
- Exit non-zero if any preparation or validation step fails.
- Print a short success summary that makes it clear the repo is ready for `npm pack`.

## Non-Goals
- Running `npm pack` automatically.
- Publishing the npm package.
- Adding a separate `pack-check` command in this change.
- Changing the Beta1 packaging contract away from `install-root/`.

## Constraints
- Root `VERSION` remains the source of truth.
- `pack-prep` must work with the existing Beta1 package layout and installer implementation.
- The prep flow should be cross-platform and reliable on Windows, macOS, and Linux.
- The command should fail fast when required packaged assets are missing or tests fail.

## Success Criteria
- Running `just pack-prep` updates `install-root/.spar-kit/VERSION` to match root `VERSION`.
- Running `just pack-prep` updates `package.json.version` to match root `VERSION`.
- `just pack-prep` verifies the required packaged install payload exists, including:
  - `install-root/AGENTS.md`
  - `install-root/justfile`
  - `install-root/.agents/skills/`
  - `install-root/.spar-kit/.local/tools.yaml`
  - `install-root/specs/README.md`
- `just pack-prep` runs `npm test`.
- On success, the command ends with a clear ready-to-pack message.
- On failure, the command exits non-zero and does not present the repo as ready.

## Open Questions
- None for Beta1.

## Decisions
- Root `VERSION` is the canonical version source.
- `install-root/.spar-kit/VERSION` and `package.json.version` are derived release artifacts that must be kept aligned before packaging.
- `just pack-prep` is the required prep step before `npm pack`.
- A separate check-only command is not required for this change.
- Beta1 `pack-prep` does not inspect tarball contents; asset existence checks plus the test suite are sufficient.
- Beta1 `pack-prep` does not rewrite `package-lock.json` when `package.json.version` changes.
- The implementation lives in `lib/pack-prep.mjs` and is invoked by the repo `justfile`.
- `pack-prep` uses the current test suite as its release-readiness gate.

## Documentation Impact
- `BETA1-RELEASE-CHECKLIST.md` now records `just pack-prep` as the required step before `npm pack`.
