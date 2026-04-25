# extended-agent-support

## Summary

Define the next installer extension for explicit agent-target support beyond the current shared repo-local baseline.

The baseline SPAR install remains:

- `AGENTS.md`
- `.agents/skills/`
- `.spar-kit/`
- `specs/`
- related repo-local SPAR files

That baseline already appears to fit the current Beta group of:

- Codex
- Cursor
- Windsurf
- GitHub Copilot
- Gemini CLI
- OpenCode

Claude Code remains the main documented exception because its project-local skill path is `.claude/skills/` and its instruction entry file is `CLAUDE.md` rather than direct `AGENTS.md` loading.

This spec defines an explicit install-flag model so `spar-kit` can keep one primary install command while adding targeted compatibility material for agents that need non-default paths or additional shims.

## Problem

The shared repo-local SPAR layout is attractive because it keeps the install story simple and portable. But not every agent uses the same repo-local paths. Claude Code is the clearest current example: research supports `CLAUDE.md` plus `.claude/skills/`, not repo-local `.agents/skills/`.

Without an explicit extension model, there are two poor outcomes:

1. `spar-kit` silently assumes all agents use the shared layout and overclaims compatibility.
2. `spar-kit` grows ad hoc one-off install behavior that is difficult to explain, test, or maintain.

The install UX should stay simple enough for a landing page and copy-paste workflow, while still allowing agent-specific compatibility setup when needed.

## Goal

Add explicit agent-target install flags while preserving `npx spar-kit install` as the primary public install path.

The intended model is:

- `npx spar-kit install` installs the shared SPAR baseline
- optional agent flags add target-specific compatibility material
- target-specific behavior is explicit rather than guessed
- supported claims should be validated in the actual agent before being promoted as reliable

Examples:

- `npx spar-kit install`
- `npx spar-kit install --claude`
- `npx spar-kit install --cursor`
- `npx spar-kit install --claude --cursor`

## Scope

In scope:

- explicit named install flags such as `--claude`, `--cursor`, `--copilot`, `--windsurf`, `--gemini`, `--opencode`, and future named targets
- baseline vs target-specific install behavior
- Claude-specific compatibility material
- how named flags should scale as future agents are added
- the relationship between user-facing flags and an internal normalized target list
- documentation expectations for agent-target commands
- test expectations for claiming compatibility

## Non-Goals

- redesigning the shared repo-local SPAR baseline
- replacing `npx spar-kit install` with `npx skills add ...`
- requiring a generic `--agent <name>` public syntax
- fully defining every future target-specific file layout beyond the immediate pattern and Claude's known needs
- changing the current release-level roadmap decisions by itself

## Constraints

- `npx spar-kit install` remains the canonical bootstrap command.
- The no-flag install path should remain the simplest recommended path.
- Agent-specific support should be explicit, not dependent on unreliable auto-detection alone.
- The landing page and docs should be able to present short, copyable commands for supported agents.
- User-facing flags should stay simple and memorable.
- Internally, named flags may be normalized into one target list so the implementation can scale cleanly.
- Compatibility claims should not rely on documentation alone when practical testing is still pending.

## Proposed behavior

### 1. Baseline install remains default

Running:

`npx spar-kit install`

should continue to install the shared SPAR repo-local baseline only.

That baseline is the compatibility source for the broad shared-path group and should remain the authored source of truth.

### 2. Add explicit named agent flags

User-facing CLI flags should be named directly after supported agents instead of requiring a generic `--agent` syntax.

Examples:

- `--claude`
- `--cursor`
- `--copilot`
- `--windsurf`
- `--gemini`
- `--opencode`
- future flags such as `--antigravity`

This is primarily a UX decision:

- easier to document
- easier to put on a landing page
- easier for users to copy correctly
- clearer when an agent needs special behavior

### 3. Normalize flags internally

Although the public CLI should use named flags, the implementation may convert those flags into an internal list of selected targets.

For example:

- `npx spar-kit install --claude --cursor`

may internally normalize to something like:

- `["claude", "cursor"]`

This keeps the public interface simple while avoiding repetitive per-flag control flow throughout the installer.

### 4. Claude-specific compatibility behavior

When `--claude` is present, the installer should add Claude-native compatibility material on top of the shared baseline.

Current expected additions:

- create or update `CLAUDE.md` as a lightweight shim that imports `@AGENTS.md`
- place SPAR skills under `.claude/skills/` using the shared repo-local skill content as the source

This does not replace the shared baseline. It adds the Claude-native view of the same SPAR content.

### 5. Other named flags may be no-op at first

For Beta-supported agents that already appear compatible with the shared baseline, named flags may initially do little or nothing beyond recording the target selection for reporting or future use.

That is acceptable as long as:

- the behavior is intentional
- docs do not overpromise extra per-agent magic when none exists
- the flag shape remains available for future targeted setup if needed

## Success Criteria

- `npx spar-kit install` remains the single canonical install command.
- The installer can accept one or more explicit agent flags.
- Claude-specific compatibility setup can be requested explicitly with `--claude`.
- The public CLI stays landing-page friendly and copyable.
- Internal implementation can scale without forcing a public `--agent <name>` syntax.
- The shared repo-local baseline remains the primary authored source.
- Compatibility claims for supported agents are backed by practical testing, not just doc interpretation.

## Open Questions

- Should `--claude` create `CLAUDE.md` only when absent, or should it manage a SPAR-owned block inside an existing file?
- Should `.claude/skills/` be populated by copy, symlink, or a configurable strategy?
- Should agent flags appear in install reporting so users can see which compatibility layers were requested?
- Should target flags that currently add no extra files still be surfaced in help output from the start, or only once they have at least one observable effect?
- How should multiple flags interact if future agents need overlapping but slightly different compatibility files?

## Decisions

- Keep `npx spar-kit install` as the canonical bootstrap command.
- Use explicit named flags such as `--claude` rather than requiring a generic public `--agent <name>` syntax.
- Allow multiple named flags in a single install command.
- Normalize named flags into an internal target list during implementation.
- Treat Claude Code as the first explicit non-default compatibility target.
- Use practical testing in each target agent as part of support validation.
- Do not make `npx skills add Jed-Tech/spar-kit` the primary SPAR install path.

## Documentation Impact

- Landing-page install UX should be able to present short per-agent commands such as `npx spar-kit install --claude`.
- Install docs should clearly explain that no-flag install gives the shared baseline, while flags add target-specific compatibility material.
- Claude documentation should explain the purpose of `CLAUDE.md` and `.claude/skills/` relative to the shared baseline.
- Compatibility docs should distinguish between documented compatibility, tested compatibility, and target-specific shims.
