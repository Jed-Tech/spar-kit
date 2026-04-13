# spar-install

## Summary

Define the Beta1 installation contract for `spar-kit` in consumer repositories. Beta1 uses a single primary install path, `npx spar-kit install`, which bootstraps SPAR into a target repo from the canonical `install-root/` source, creates the expected repo-local structure, and preserves machine-local state under `.spar-kit/.local/`.

The install must leave the repo in a recoverable state. In Beta1, repo-local SPAR assets are the required outcome and the shipped install-root layout is Codex-default. Explicit multi-platform target installation is deferred to Beta2.

This spec is the umbrella Beta install contract. If implementation detail grows further, follow-on specs should split out packaging/build, repo bootstrap behavior, and future agent-target installation behavior while staying aligned with this contract.

## Problem

`spar-kit` needs one clear install story for Beta1. Without a defined contract, installation can drift across packaging ideas, agent platforms, and future tooling, which makes onboarding inconsistent and weakens the core SPAR promise of a lightweight, obvious workflow.

The repo also needs install behavior that matches how SPAR is actually used. `spar-kit` is not just a package dependency; it installs workflow assets into a repo, adds agent guidance, seeds the SPAR working structure, and needs a predictable source for shipped content over time. Those responsibilities need explicit rules for ownership, overwrite behavior, and packaging from source.

## Goal

Beta1 installation must make SPAR easy to adopt in a real project with one memorable entry point and predictable local outcomes.

The primary Beta1 install command is:

`npx spar-kit install`

This command runs at the consumer repo root and must:

- materialize the contents of `install-root/` into the target repository, subject to preserve/update rules
- create the expected repo-local SPAR structure from `install-root/`
- preserve machine-local files under `.spar-kit/.local/`
- succeed when repo-local installation completed

After a successful Beta1 install, the consumer repo must contain a durable repo-local SPAR payload that agents can rely on. Later agent setup flows may use the installed repo-local content to help complete platform-specific setup.

The installed content must come from `install-root/` as it exists in the repo for the shipped build so packaged installs always use the intended installable content for that release.

## Scope

In scope:

- the Beta1 primary install path: `npx spar-kit install`
- install prerequisites for Beta1, including Node/npm availability
- `install-root/` as the canonical authored source for installed content
- the repo-local file and folder contract created by install
- the requirement that `.spar-kit/VERSION` exists after install and reflects the packaged `spar-kit` version
- creating the shipped repo-local SPAR layout from `install-root/`
- preserving `.spar-kit/.local/` when files already exist
- Beta1 reporting expectations
- install outcome states as defined in `install-report_spec.md`
- packaging/build behavior for shipping the current `install-root/`
- a decomposition plan for splitting implementation detail into follow-on install specs

## Non-Goals

- defining the full behavior of `spar.init` beyond its dependency on the installed repo-local payload
- designing every future install path beyond Beta1
- supporting a no-Node install path in Beta1
- silently overwriting user-owned or machine-local files
- implementing explicit non-default platform setup in Beta1
- mutating the host application’s root `package.json` version or using it as SPAR’s version source of truth

## Constraints

- Beta1 has one primary install path to reduce onboarding ambiguity.
- The installer must be cross-platform for Windows, macOS, and Linux through the supported `npx` path.
- The installer runs as an explicit script command; there is no per-file approval flow after the user starts it.
- `install-root/` is the canonical authored source of installed content.
- Files under `.spar-kit/.local/` are machine-local and must not be overwritten if already present.
- The installer may create missing files in `.spar-kit/.local/`, but once present they are treated as user- or machine-owned.
- Managed SPAR files outside `.spar-kit/.local/` may be created or updated on reinstall.
- `.spar-kit/VERSION` is a managed SPAR file and may be overwritten on reinstall or upgrade.
- The packaged installer assets must be built from `install-root/`.
- In Beta1, `AGENTS.md` is created from `install-root/AGENTS.md` when missing and prepended when already present.
- If `AGENTS.md` contains malformed SPAR markers that are not safely repairable, Beta1 warns and leaves it unchanged rather than duplicating SPAR content.
- Existing `justfile` content must be preserved; install only creates a skeleton when no `justfile` exists.
- In Beta1, no additional platform detection is required beyond installing the shipped Codex-default layout.
- On `success`, install should clearly tell the user the outcome and recommend asking their agent to use `spar.init`.
- Detailed bootstrap rules live in `repo-bootstrap_spec.md`.
- Detailed reporting rules live in `install-report_spec.md`.
- The host repo’s root `package.json` must remain untouched except for the normal effects of the chosen `npx` invocation path; SPAR must not depend on the app package version.

## Success Criteria

- A user can run `npx spar-kit install` from a supported repo and get a usable Beta1 SPAR setup without guessing the next step.
- Install produces `.spar-kit/VERSION` on every successful repo-local install.
- Install materializes the current `install-root/` content into the target repo according to the bootstrap rules.
- Install creates `.spar-kit/.local/tools.yaml` when absent and does not overwrite it when already present.
- Install creates a skeleton `justfile` only when the repo does not already have one.
- Install creates the expected shipped repo-local SPAR structure from `install-root/`.
- Install uses the `install-root/` content that shipped with the current build of `spar-kit`.
- Install creates `AGENTS.md` when missing from `install-root/AGENTS.md`.
- Re-running install is idempotent for managed files and preserves user-owned content.
- The installed repo-local state is sufficient for later `spar.init`-guided setup.
- Beta1 install reports the outcome states defined in `install-report_spec.md`.
- On `success`, install prints a next-step recommendation to ask the active agent to use `spar.init`.

## Open Questions

- Should future secondary install paths reuse the same installer engine through a published package, archive, or another wrapper?
- How should a later Beta version handle repos that already contain a non-SPAR `AGENTS.md`?

## Decisions

- Beta1 uses one primary install path: `npx spar-kit install`.
- Beta1 accepts Node/npm as an install prerequisite.
- Beta1 installs from `install-root/` as the canonical authored install source.
- Beta1 ships a Codex-default layout, including `.agents/skills/`.
- Repo-local installation is the required success condition.
- `.spar-kit/.local/` is seedable when absent and preserved when present.
- Packaged installs use the current `install-root/` content that ships with the build.
- `AGENTS.md` is created if missing from `install-root/AGENTS.md` and prepended if it already exists.
- Malformed SPAR markers in `AGENTS.md` are handled conservatively: warn and leave unchanged when safe repair is not possible.
- The installer creates a skeleton `justfile` only when one is not already present.
- The installer must not overwrite existing files in `.spar-kit/.local/`.
- Managed SPAR files outside `.spar-kit/.local/` may be updated on reinstall.
- Beta1 install reporting follows `install-report_spec.md`.
- On `success`, install recommends that the user ask their agent to use `spar.init`.
- `install-root/` itself is the Beta1 packaging contract; no separate asset manifest is required.
- `install` is the only required Beta1 installer command.
- Installed `specs/README.md` content comes directly from `install-root/specs/README.md` at build time.
- Future install paths should reuse one installer engine where practical, but this remains undecided beyond Beta1.
- This spec remains the umbrella install contract; detailed follow-on specs may split out build packaging, repo bootstrap behavior, and future agent-target installation behavior.

## Documentation Impact

- `README.md` must document `npx spar-kit install` as the single primary Beta1 install command.
- Beta onboarding docs should describe Node/npm as a prerequisite.
- Installation docs must explain that Beta1 installs the Codex-default layout from `install-root/`.
- Docs must describe the installed repo-local payload and later `spar.init` guidance.
- Docs must explain the installer’s non-overwrite rule for `.spar-kit/.local/`.
- Build and packaging docs must ensure the shipped installer assets include the current `install-root/`.
- Future `spar.init` documentation should assume the installed repo-local content can be used to guide later setup.
