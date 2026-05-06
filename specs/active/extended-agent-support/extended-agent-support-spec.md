# extended-agent-support

## Summary

Define explicit agent-target installation behavior for `spar-kit` using named install flags, target-native repo layouts, and per-target config files under `install-root/targets/`.

The install-root layout should support:

- shared authored assets at the top level
- one config file per target under `targets/`
- one shared default config for always-installed repo assets

The base install remains the general shared layout:

- `AGENTS.md`
- `.agents/skills/`
- `.spar-kit/`
- `specs/`
- related repo-local SPAR files

That general layout is the default when the user runs:

`npx spar-kit install`

When the user requests a specific agent target such as `--claude` or `--cursor`, the installer should write that target's native instruction file and native skill location instead of also writing the general shared layout.

When the user requests multiple target flags, the installer should materialize each requested target-native layout. In that case, duplicate skill content across target directories is acceptable because the user explicitly requested multiple targets.

## Problem

The current shared repo-local SPAR layout is attractive because it is simple and portable. But not every agent uses the same repo-local file conventions.

Examples from current research:

- the general/shared pattern uses `AGENTS.md` and `.agents/skills/`
- Claude Code uses `CLAUDE.md` and `.claude/skills/`
- Cursor may work with the shared pattern, but when a user explicitly chooses a Cursor-native install target, they should receive the Cursor-native layout rather than a duplicate general layout

If the installer always writes the same shared layout, users who want agent-native repo structure may end up with extra files and folders they did not ask for.

If the installer tries to support each target implicitly, the behavior becomes hard to explain and harder to trust.

The installer needs a simple rule set that:

- keeps the default install path clean
- allows explicit target-native installs
- treats duplicates as intentional only when the user asked for multiple targets

## Goal

Add explicit named install flags so `spar-kit` can support both:

1. a default general install
2. explicit agent-native installs

The intended model is:

- no flags -> install the general shared layout
- one target flag -> install only that target's native layout
- multiple target flags -> install each requested target-native layout

Examples:

- `npx spar-kit install`
- `npx spar-kit install --codex`
- `npx spar-kit install --claude`
- `npx spar-kit install --cursor`
- `npx spar-kit install --claude --cursor`

## Scope

In scope:

- explicit named install flags such as `--codex`, `--claude`, `--cursor`, `--copilot`, `--windsurf`, `--gemini`, `--opencode`, and future named targets
- `install-root/targets/<name>.json` as the target config convention
- `install-root/targets/default.json` as the always-installed asset config
- the distinction between general layout and target-native layout
- single-target vs multi-target install behavior
- native instruction-file selection per target
- native skill-path selection per target
- how duplicates are treated when multiple flags are used
- documentation expectations for copyable target commands
- installer policy vocabulary for file and directory ownership behavior
- test expectations for support claims

## Non-Goals

- replacing `npx spar-kit install` as the canonical install entry point
- requiring a generic public `--agent <name>` syntax
- auto-detecting the user's intended agent and silently changing the output layout
- forcing a shared `.agents/skills/` source into repos that requested a different native target layout
- defining every future target's exact file map up front
- replacing future testing with documentation-only compatibility claims

## Constraints

- `npx spar-kit install` remains the canonical bootstrap command.
- The no-flag install path should remain the simplest recommended path.
- User-facing flags should be short, explicit, and landing-page friendly.
- Agent-target behavior should be explicit rather than inferred when it affects what files land in the repo.
- A single target flag should not install extra repo-local target surfaces the user did not request.
- Multiple target flags may intentionally result in duplicated SPAR skill content across different target-native directories.
- Compatibility claims should be backed by practical testing in the agent whenever possible.
- Install config cannot assume one policy per parent directory because mixed-ownership cases already exist, especially under `.spar-kit/`.

## Proposed behavior

### 1. Default install writes the general shared layout

Running:

`npx spar-kit install`

should install the general SPAR layout:

- `AGENTS.md`
- `.agents/skills/`
- `.spar-kit/`
- other standard SPAR repo-local files

This remains the default install story and the most generally documented command.

### 2. Named flags select target-native layouts

User-facing install flags should be named directly after supported agents instead of requiring a generic `--agent` syntax.

Examples:

- `--codex`
- `--claude`
- `--cursor`
- `--copilot`
- `--windsurf`
- `--gemini`
- `--opencode`
- future flags such as `--antigravity`

These flags should drive which repo-local target surfaces are created.

### 2a. Install-root target config layout

`install-root/` should use a simple shared-content plus target-config structure, for example:

- `.spar-kit/`
- `specs/`
- `skills/`
- `AGENTS.md`
- `CLAUDE.md`
- `targets/default.json`
- `targets/general.json`
- `targets/codex.json`
- `targets/claude.json`
- `targets/cursor.json`
- other future `targets/<name>.json` files

Target configs should describe placement of already-authored shared assets. They should not become duplicate content stores.

### 2b. Default config for always-installed assets

`targets/default.json` should define the repo assets that are always installed regardless of target selection.

Current expected contents include:

- `.spar-kit/`
- `specs/`

Installer behavior should be:

1. always materialize `targets/default.json`
2. if no flags are present, also materialize `targets/general.json`
3. if flags are present, materialize the selected `targets/<name>.json` files

### 2c. Config entries must carry install policy

Target config entries should not only describe source and destination. They should also describe install behavior through a small policy vocabulary.

This is required because repo assets already have mixed ownership rules. For example:

- `.spar-kit/VERSION` should be replaced
- `.spar-kit/.local/tools.yaml` should be seeded only when missing
- `AGENTS.md` and `CLAUDE.md` should use managed-block logic

That means policy must be defined per file or managed subtree entry, not only by parent directory.

### 3. Single target flag means only that target's native layout

If the user provides exactly one target flag, the installer should write only that target's native compatibility files rather than also writing the default shared layout.

Examples:

`npx spar-kit install --claude`

should produce:

- `CLAUDE.md`
- `.claude/skills/`
- `.spar-kit/`
- `specs/`
- other standard SPAR repo-local files that are not agent-specific

It should not also create:

- `AGENTS.md`
- `.agents/skills/`

Likewise:

`npx spar-kit install --cursor`

should produce Cursor-native target files and should not also create `.agents/skills/` unless `.agents/skills/` is itself part of the requested Cursor-native contract.

### 4. Multiple target flags mean multiple target-native layouts

If the user provides multiple target flags, the installer should materialize each requested target-native layout.

Example:

`npx spar-kit install --claude --cursor`

may produce:

- `CLAUDE.md`
- `.claude/skills/`
- `AGENTS.md`
- `.cursor/skills/`
- `.spar-kit/`
- other standard SPAR repo-local files

In this case, duplicated SPAR skill content across target directories is acceptable because the user explicitly requested both targets.

### 5. Internal normalization is still allowed

Although the public interface should use named flags, the implementation may normalize selected flags into an internal target list such as:

- `["claude", "cursor"]`

This is an implementation detail that allows the installer to scale without exposing a generic `--agent` syntax publicly.

## Current target guidance

Current working direction based on research, discussion, and current implementation:

- default / general install:
  - `targets/default.json`
  - `targets/general.json`
  - `AGENTS.md`
  - `.agents/skills/`
- `--codex`:
  - `targets/default.json`
  - `targets/codex.json`
  - `AGENTS.md`
  - `.agents/skills/`
- `--claude`:
  - `targets/default.json`
  - `targets/claude.json`
  - `CLAUDE.md`
  - `.claude/skills/`
- `--cursor`:
  - `targets/default.json`
  - `targets/cursor.json`
  - `AGENTS.md`
  - `.cursor/skills/`

Other named targets should follow the same principle:

- use the target's native instruction file if needed
- use the target's native repo-local skill path if needed
- do not create unrelated target surfaces unless they were explicitly requested
- define placement via `targets/<name>.json` rather than by duplicating authored content per target

## Installer policy vocabulary

The current working policy set is:

- `seed_if_missing`
  - create the item if missing
  - do not overwrite it if it already exists
- `managed_block`
  - create the file if missing
  - if present, insert or update only the SPAR-managed block
  - preserve non-SPAR content outside the managed block
- `replace`
  - overwrite the target with the packaged version
- `replace_managed_children`
  - create the parent path if missing
  - replace only explicitly SPAR-managed children
  - preserve unknown or user-owned siblings

This policy set is intended to stay small unless practical implementation reveals a real gap.

## Current policy mapping

Current expected mappings include:
- `AGENTS.md`
  - `managed_block`
- `CLAUDE.md`
  - `managed_block`
- `.spar-kit/VERSION`
  - `replace`
- `.spar-kit/.local/tools.yaml`
  - `seed_if_missing`
- `specs/`
  - `replace_managed_children`

`specs/` is not a plain replace target because it contains both SPAR-owned scaffold files and user-owned work product such as change folders under `specs/active/` and `specs/completed/`.

Under `replace_managed_children`, `specs/` should:

- ensure the expected parent structure exists
- replace explicitly SPAR-managed scaffold files
- preserve user-created or user-owned work folders and their contents

## Instruction-file approach

Because a single-target install should avoid writing unrelated instruction files, `--claude` should not depend on a repo-local `AGENTS.md` shim being present.

That means the current favored direction for Claude is:

- write SPAR-managed content directly into `CLAUDE.md`

rather than:

- creating a `CLAUDE.md` that merely imports `@AGENTS.md`

The import approach may still be useful for a future refinement when `AGENTS.md` is also present, but it is not the baseline for the current Claude-only implementation.

## Skill materialization approach

Given the target-native model, the installer should generally materialize actual skill directories in the selected target path rather than relying on a hidden shared repo-local source.

That makes copy/update behavior the current default assumption.

Symlink-based optimization may be considered later, but it is not the primary design direction for this target-native model.

Skill-target directories use `replace_managed_children` semantics in the current implementation so SPAR-managed skill folders can be refreshed while preserving unknown user-added skill directories in the same target path.

## Success Criteria

- `npx spar-kit install` remains the single canonical install command.
- The installer can accept one or more explicit agent flags.
- No-flag install writes the general shared layout.
- A single target flag writes only that target's native layout.
- Multiple target flags write all requested target-native layouts.
- Claude-only install can succeed without also creating `AGENTS.md`.
- The public install UX remains short and easy to present on a landing page.
- Compatibility claims for named targets are validated through practical testing where possible.

## Open Questions

- After direct validation in general/Codex/Cursor and beta-tester feedback from the broader agent set, do any target configs need target-specific adjustments beyond the current shared `skills` plus native-path placement model?

## Decisions

- Keep `npx spar-kit install` as the canonical bootstrap command.
- Use explicit named flags such as `--codex`, `--claude`, and `--cursor` rather than requiring a generic public `--agent <name>` syntax.
- Use `install-root/targets/<name>.json` for per-target install config.
- Use `install-root/targets/default.json` for always-installed repo assets.
- Use a small explicit install-policy vocabulary in target config entries.
- No flags means install the general shared layout.
- One target flag means install only that target's native layout.
- Multiple target flags mean install each requested native layout.
- Duplicate target-native skill content is acceptable when multiple flags were explicitly requested.
- `--codex` is an explicit named target in addition to the default `general` target.
- `--cursor` currently maps to `AGENTS.md` plus `.cursor/skills/`.
- `--claude` currently maps to `CLAUDE.md` plus `.claude/skills/`.
- `CLAUDE.md` is a fully managed SPAR block rather than an `@AGENTS.md` import baseline.
- Skill-target directories currently use `replace_managed_children` behavior so SPAR-managed skill folders refresh while unknown user-added skill directories are preserved.
- Install reporting includes the installed target list in success output.
- Direct first-party validation is expected for `general`, `codex`, and `cursor`.
- The remaining supported agents may rely on beta-tester feedback rather than first-party validation before refinement.
- Do not make `npx skills add Jed-Tech/spar-kit` the primary SPAR install path.
- Back support claims with practical testing in each target agent whenever feasible.

## Documentation Impact

- Landing-page install UX should be able to present short, copyable commands such as `npx spar-kit install`, `npx spar-kit install --codex`, `npx spar-kit install --claude`, and `npx spar-kit install --cursor`.
- Install docs should clearly explain the difference between default general install, single-target install, and multi-target install.
- Claude docs should explain why `--claude` creates `CLAUDE.md` and `.claude/skills/` without also creating the default general layout.
- Future compatibility docs should distinguish between documented target shape and tested target behavior.
