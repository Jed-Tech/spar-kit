# Implementation Plan - remove-just-from-install-payload

<!-- Plan/act use specs/active/<change-name>/plan.md. After Retain: specs/completed/<change-name>/plan.md. -->
<!-- This plan should align with <change-name>_spec.md in the same folder. -->

## Summary
Update SPAR-kit's shipped install payload so `just` is no longer installed or required, while keeping this repository's internal `justfile` workflow intact. Add optional tool recommendations for `just`, `rg`, and `jq`, and align installer behavior, tests, payload verification, and current product docs with the new contract.

## Approach
Treat this as a product payload contract change, not an internal developer workflow change. Remove `just` from files under `install-root/` that become consumer-facing assets, update installer target metadata and payload validation so the missing shipped `justfile` is expected, then update tests to assert that installs leave existing consumer `justfile` setups untouched without creating new ones.

Keep completed SPAR specs and Beta1 release records as historical artifacts. Update current docs and active specs only when they describe the future install payload.

## Execution Constraints
- Do not remove or modify the repository root `justfile`.
- Do not replace internal maintainer flows such as `just pack-prep`.
- Do not add installer cleanup or migration behavior for existing consumer `justfile` files or `just` skills.
- Preserve `.spar-kit/.local/tools.yaml` seed-if-missing behavior for existing consumer tool indexes.
- Keep optional tools clearly non-blocking in docs, skill guidance, and tests.
- Keep historical completed specs and Beta1 checklist entries intact unless they are directly used as current product guidance.

## Tasks
<!-- Ordered, concrete, checkable steps. -->
- [x] Remove `justfile` and the bundled `just` skill from the shipped install payload and target config.
- [x] Update seeded `tools.yaml` templates so `just` leaves `core_cli` and `just`, `rg`, and `jq` appear under a new optional tools section.
- [x] Update `spar-init` guidance so tool checking understands optional recommendations as non-blocking tool entries.
- [x] Update installed `AGENTS.md` and `CLAUDE.md` guidance to reference repo-defined commands and scripts without naming `justfile` as a SPAR-kit convention.
- [x] Update installer code, payload verification, and install-report behavior so future installs do not seed `justfile` and existing target `justfile` files are simply ignored by SPAR-kit.
- [x] Update installer and pack-prep tests for the new install contract, including assertions that new installs do not create `justfile` and reinstalls do not modify existing `justfile` files.
- [x] Update current product documentation and active specs that still describe `justfile` as installed payload.
- [x] Remove `docs/credits.md` if no current shipped asset still uses the credited `just` skill.
- [x] Run validation checks and update this plan's task states as each task is completed.

## Validation Strategy
<!-- List the checks, tests, or observations that will confirm success. -->
- [x] Ran `npm test`; all 22 tests passed.
- [x] Ran `just pack-prep`; payload verification and the internal maintainer workflow passed. The command emitted the existing Node child-process shell deprecation warning.
- [x] Searched current product payload and active docs for product-facing `justfile` / bundled `just` references after implementation. Remaining current references are internal maintainer workflow, tests for the new non-install behavior, or this completed change record.
- [x] Inspected a test install result and confirmed no `justfile` is created, no `.agents/skills/just` directory is installed, and optional `just`, `rg`, and `jq` recommendations are present in the seeded tool index.

## Risks / Follow-ups
<!-- Capture notable risks, deferred work, or decisions that may need follow-up. -->
- `spar-init` guidance now distinguishes required tools from optional recommendations and avoids auto-installing optional tools unless the user asks.
- Existing historical specs will still mention the old Beta1 `justfile` behavior by design, so future validation searches should continue to distinguish current product surface from historical records.
- The active `extended-agent-support` spec was updated where it described future install payload behavior.
- Repo-wide `git diff --check` still reports an unrelated pre-existing whitespace issue in `ROADMAP.md`; diff-check on files touched by this change passed.
