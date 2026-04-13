# installer-engine

## Summary

Define the installer engine and packaging contract for Beta1 `spar-kit` installs. This spec covers how the installer is exposed through `npx spar-kit install`, what artifacts the packaged build must contain, and how the engine should be structured so future install paths can reuse it where practical.

The main design goal is one installer engine with one primary Beta1 entry point.

## Problem

The umbrella install spec defines the Beta1 install contract, but the project still needs a clear implementation model for how install is built, packaged, and invoked. Without an engine spec, packaging and execution details can drift and create multiple sources of truth for install behavior.

This is especially important because the install experience now depends on shipping the canonical install source in a predictable way. The installer needs a well-defined bundle shape so packaged releases accurately reflect repo state at build time without accidentally pulling in repo-only development materials.

## Goal

Beta1 install uses one installer engine, exposed through one primary command:

`npx spar-kit install`

The installer engine must:

- be packaged so `npx spar-kit install` can run cross-platform on Windows, macOS, and Linux
- ship the installer logic plus all required install assets for Beta1
- package `install-root/` as the canonical installable filesystem root
- include the current repo version of all authored install content by packaging `install-root/` directly
- provide a single internal source of truth for implementing the repo bootstrap and install reporting specs
- be structured so future install paths can reuse the same engine where practical

For Beta1, the engine should prioritize explicit install over hidden side effects. `npx spar-kit install` is the public install path; automatic install-on-package-add behavior is not used in Beta1.

## Scope

In scope:

- the Beta1 public install entry point: `npx spar-kit install`
- the requirement for one installer engine
- packaged installer assets required for Beta1
- `install-root/` as the build input for installable content
- build-time inclusion of the current `install-root/` tree
- the relationship between the packaged build and the repo state it represents
- future reuse of the installer engine by other install paths where practical

## Non-Goals

- defining the exact internal code architecture of the installer beyond the one-engine principle
- defining detailed repo bootstrap behavior
- defining Beta2 platform-specific agent-target behavior
- defining installer output wording beyond what is required by the reporting spec
- committing Beta1 to a secondary install path
- requiring automatic `postinstall` behavior

## Constraints

- Beta1 has one primary public install path: `npx spar-kit install`.
- Beta1 accepts Node/npm as the install prerequisite.
- The packaged installer assets must reflect the repo state for the shipped release.
- The packaged build must treat `install-root/` as the canonical authored install source.
- The packaged build must include the full current `install-root/` tree.
- The packaged build may store `install-root/` under package-internal paths, but at install time the engine must treat its contents as the consumer repo root payload rather than creating a literal top-level `install-root/` directory in the consumer repo.
- The packaged build must not infer installable content from unrelated repo directories when `install-root/` is present.
- One installer engine should be reused wherever practical for future install paths.
- Beta1 does not require a second public install path.
- The engine must support the reporting contract defined in `install-report_spec.md`.

## Success Criteria

- A packaged Beta1 release can be installed through `npx spar-kit install`.
- The packaged build contains the assets required by repo bootstrap and install reporting.
- The packaged build ships the current `install-root/` content for that release.
- The installer engine acts as the single implementation source of truth for Beta1 install behavior.
- Future install paths can reuse the same engine without redefining repo bootstrap or reporting rules.
- Beta1 install does not depend on a hidden automatic package-install side effect.

## Open Questions

- None for Beta1 installer-engine behavior.

## Decisions

- Installer engine has its own dedicated spec within `Spar-Install`.
- Beta1 public install entry point is `npx spar-kit install`.
- Beta1 uses one installer engine.
- `install-root/` is the canonical authored source for installable content.
- The packaged build includes the current `install-root/` tree.
- At install time, the packaged `install-root/` contents are materialized as repo-root payload, not as a literal `install-root/` directory in the consumer repo.
- `install-root/` itself is the Beta1 packaging contract; no separate asset manifest is required.
- `install` is the only required Beta1 installer command.
- Build docs should explicitly state that the packaging step gathers the current `install-root/` tree into the shipped artifact as the Beta1 install payload.
- Future install paths should reuse the same engine where practical.
- Beta1 does not use `postinstall` behavior.

## Documentation Impact

- Build docs should explain how packaged installer assets are produced from `install-root/`.
- Install docs should describe `npx spar-kit install` as the only primary Beta1 entry point.
- Future implementation docs should treat the installer engine as the single source of truth for install behavior.
