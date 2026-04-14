# spar-initialization-skill

## Summary

Tighten the shipped `spar.init` skill so it reflects the install system that now exists. `spar.init` should act as a post-install verification and light repair pass for the repo-local SPAR bundle, with a short closeout that points users toward `spar.specify`.

## Problem

The older `spar.init` guidance assumed more ambiguity than the current product actually has. It mixed install behavior, multi-agent speculation, AGENTS block management, and tool automation in a way that was broader than needed and more likely to drift from the shipped install experience.

## Goal

Define `spar.init` around the current install contract:

1. **Version check**: Compare local `.spar-kit/VERSION` to the canonical upstream `VERSION`. If stale, recommend rerunning the current install path instead of hand-editing version files.
2. **Repo-local skill placement check**: Let the agent determine the correct repo-local skill location for itself, verify the five SPAR skills are there, and move or copy them when safe.
3. **`AGENTS.md` recommendation**: Keep the installed SPAR guidance intact, and only recommend a shorter `AGENTS.md` when the file grows beyond a practical length.
4. **Tool state**: Seed or update `.spar-kit/.local/tools.yaml`, record installed state, and keep `.gitignore` handling as a consent-gated hygiene step.
5. **Closeout**: End with a short wrap-up of what was completed and recommend `spar.specify` as the next step.

## Scope

Update the shipped `spar.init` skill in `install-root/.agents/skills/spar-init/SKILL.md` so it matches the current repo-local install model. The skill should prioritize version freshness, repo-local skill placement, lightweight `AGENTS.md` guidance, and tool-state tracking. It may recommend rerunning `npx spar-kit install` when version drift or missing skill placement suggests the install is stale, but it should not reimplement the installer.

## Non-Goals

- Designing future multi-platform agent-target behavior.
- Replacing the installer with `spar.init`.
- Rechecking installer-managed `AGENTS.md` block behavior as part of normal init.
- Making automatic tool installation the default behavior.

## Constraints

- `spar.init` should prefer repo-local installed assets when repairing skill placement.
- `.gitignore` changes require user consent.
- `.spar-kit/.local/` remains machine-local.
- Closeout should stay short and practical.

## Success Criteria

- The shipped `spar.init` skill no longer describes install as “under construction”.
- The skill recommends rerunning `npx spar-kit install` when version drift is detected.
- The repo-local skill-placement section is agent-aware and does not hardcode one path as universally correct.
- `AGENTS.md` guidance is advisory and focused on brevity rather than installer-style block management.
- Tool handling remains state-oriented and lightweight.
- The closeout is brief and points to `spar.specify`.

## Open Questions

- Should `spar.init` repair missing repo-local SPAR skills automatically when the preferred location is clear, or should it always ask first?

## Decisions

- `spar.init` is a post-install verifier and light repair skill.
- Repo-local skill placement is primary; future agent-target expansion is deferred.
- `AGENTS.md` optimization is advisory-only and only triggered for longer files.
- Tool installation is secondary to tool-state recording and user guidance.

## Documentation Impact

- `install-root/.agents/skills/spar-init/SKILL.md` now serves as the durable behavior reference for `spar.init`.
