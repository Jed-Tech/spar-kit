# remove-just-from-install-payload - Intent and Specifications

<!-- Copy this template to specs/active/<change-name>/<change-name>_spec.md (name matches the folder). After Retain: specs/completed/<change-name>/<change-name>_spec.md. -->

## Summary
Remove `just` from the installed SPAR-kit product payload while preserving `just` as an internal maintainer convenience for this repository if desired.

Future SPAR-kit installs should not seed a repo-root `justfile`, should not install the bundled `just` skill, and should not require `just` in the seeded `.spar-kit/.local/tools.yaml` tool index. Installed SPAR guidance should refer generally to repo-defined commands and scripts rather than naming `justfile` as part of the expected product surface.

## Problem
SPAR-kit is positioned as a lightweight, agent-portable, repo-native spec-driven workflow. The current install payload includes a skeleton `justfile`, a `just` skill, and a seeded tool index that treats `just` as a core CLI. That makes the installed product more opinionated about a task runner than the core SPAR workflow requires.

This creates extra setup expectations for adopters and agents even though `just` is not essential to Specify, Plan, Act, Retain, the `specs/` structure, or the SPAR skill workflow. The package should avoid prescribing `just` unless a consumer repo already chose it independently.

## Scope
- Stop installing or seeding `install-root/justfile` into consumer repositories.
- Stop installing the bundled `just` skill from the SPAR-kit product payload.
- Remove `just` from the seeded `.spar-kit/.local/tools.yaml` core tool set.
- Add a new optional tools section to the seeded `.spar-kit/.local/tools.yaml`.
- Recommend `just` as an optional task runner in the new optional tools section.
- Recommend `ripgrep` (`rg`) as an optional fast search tool in the new optional tools section.
- Recommend `jq` as an optional JSON processing tool in the new optional tools section.
- Update installed agent guidance so it no longer tells agents to inspect `justfile` as a product-level convention.
- Find and update product-facing references in shipped SPAR skills, install target configs, installer tests, payload verification, and current product documentation that still treat `just` as installed payload.
- Preserve this repository's internal maintainer use of `justfile` unless a later change explicitly chooses to replace it.

## Out of Scope
- Removing this repository's root `justfile`.
- Removing or replacing internal maintainer commands such as `just pack-prep`.
- Removing or modifying `justfile` files that already exist in consumer repositories.
- Removing or modifying already-installed `just` skills that already exist in consumer repositories.
- Adding uninstall, cleanup, migration, or deletion behavior for existing consumer installations.
- Changing the SPAR workflow stages, spec folder structure, or core SPAR skill behavior beyond references needed to stop advertising `just`.

## Constraints
- Future installs must not overwrite, remove, or modify an existing consumer `justfile`.
- Future installs must not remove existing consumer `just` skills.
- The installer should simply stop shipping `just` assets as part of the future install payload.
- The internal repo can continue using `just` for release and developer workflows.
- Optional tools in `.spar-kit/.local/tools.yaml` should be recommendations, not install requirements or blockers for SPAR-kit readiness.

## Success Criteria
- Future installs no longer create a repo-root `justfile` when the target repository lacks one.
- Future installs no longer include the bundled `just` skill in the installed skill payload.
- Seeded `.spar-kit/.local/tools.yaml` no longer lists `just` under required/core tooling.
- Seeded `.spar-kit/.local/tools.yaml` includes an optional tools section recommending `just`, `rg`, and `jq` as the final section in the file.
- Installed agent guidance no longer names `justfile` as an expected SPAR-kit command source.
- Existing consumer `justfile` files and already-installed `just` skills are not removed, modified, or migrated by the installer.
- Product-facing tests and payload verification match the new install contract.
- Current product documentation and active specs no longer describe `justfile` as installed SPAR-kit payload.

## Decisions
<!-- Record important product and technical choices that implementation should treat as fixed. -->
- `just` remains allowed as an internal maintainer tool in this repository.
- `just` should no longer be part of the installed SPAR-kit product contract.
- `just`, `rg`, and `jq` should be represented as optional recommended tools in the seeded tool index.
- The optional recommended tools section should be last in the seeded tool index so required/runtime tooling remains the primary scan path.
- Existing consumer repositories are not migrated or cleaned up; this change only affects future installed payload behavior.
- Historical completed specs and Beta1 release records should remain historical unless they are directly reused as current product documentation.
- Current product docs and active specs should be updated where they still describe `justfile` as installed payload.
- `docs/credits.md` should be removed if the bundled `just` skill is no longer shipped and no other current shipped asset needs that attribution.

## Open Questions
<!-- Only include unresolved questions that materially affect implementation or validation. -->
- None.
