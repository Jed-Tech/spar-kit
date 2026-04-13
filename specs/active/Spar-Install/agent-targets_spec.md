# agent-targets

## Summary

Define Beta2 agent-target installation behavior for `spar-kit`. This spec covers how a future installer revision may place SPAR skills into supported agent-specific locations beyond the Beta1 Codex-default layout, how platform detection relates to those targets, and how failures or skips affect the final install outcome.

In Beta1, agent-target setup beyond the shipped Codex-default layout is out of scope. Repo-local bootstrap remains the required success condition, and the installed repo contents remain the recovery source when future direct platform setup is incomplete.

## Problem

Agent-target setup is operationally distinct from repo bootstrap. It involves detecting or inferring supported agent environments, writing to agent-specific paths, and deciding how those results should influence install reporting. If this behavior remains mixed into broader install specs, implementation details are more likely to drift and reporting becomes harder to reason about.

Because Beta1 now ships one Codex-default install-root layout and defers explicit multi-platform target handling, this spec should capture the future Beta2 extension point rather than forcing premature target logic into Beta1.

## Goal

Beta2 agent-target setup must attempt to configure supported agents without making agent-target success a prerequisite for a valid repo-local install.

For Beta2, likely supported targets include:

- Codex: `.agents/skills/`
- Cursor: `.cursor/skills/`

Agent-target behavior must:

- build on the Beta1 repo-local install rather than redefining it
- attempt to install or update the five SPAR skills in supported target locations when those targets are detected or present
- use the installed repo-local skill content as the source for agent-target installation
- warn when a supported target cannot be configured
- avoid turning a valid repo-local install into full failure solely because agent-target setup was skipped, unsupported, or failed
- allow no detected platform to remain `success` when repo-local install completed

## Scope

In scope:

- likely Beta2-supported agent targets and their paths
- relationship between target setup and the installed skill source
- best-effort agent-target copy/update behavior
- how target setup affects `success` vs `partial success`
- behavior when no supported platform is detected
- warning behavior for skipped or failed target setup

## Non-Goals

- defining repo bootstrap rules
- defining reporting layout beyond the meaning of target-related warnings and outcomes
- redefining the shipped Beta1 Codex-default layout
- defining every future platform-integration path beyond the first Beta2 targets
- defining `spar.init` behavior beyond its use as a recovery/setup path

## Constraints

- Beta1 does not require explicit agent-target installation beyond the shipped Codex-default layout.
- Agent-target setup is a Beta2 concern.
- The installed skill content is the source for future agent-target installation.
- The installer must not require a detected platform in order for repo-local install to succeed.
- If a future supported target is detected but cannot be configured, the installer should warn and report `partial success` when repo-local install succeeded.
- If no supported platform is detected, the installer may still report `success` when repo-local install succeeded.
- Beta2 reporting requirements must extend or supersede the Beta1 reporting contract where `partial success` is needed.

## Success Criteria

- Beta2 can add explicit target setup without redefining the Beta1 repo-local install contract.
- When supported future targets are detected and writable, the installer attempts to configure them from the installed skill source.
- When a detected supported target cannot be configured, the installer emits a warning and the final outcome is not overstated.
- No detected platform does not force `partial success` or `failure` by itself.
- The installer can complete repo-local install without requiring external agent-target success.
- Future `spar.init` flows can rely on the installed repo-local content as the recovery source for missing or stale agent-target setup.

## Open Questions

- What exact Beta2 detection rules should decide that Cursor or other non-default targets are present?
- Should Beta2 create missing target directories proactively when a platform is inferred, or only when a platform-specific root already exists?
- Should Beta2 agent-target setup overwrite existing SPAR skill directories in target locations, or use a more conservative merge/update rule?

## Decisions

- Agent-target setup has its own dedicated spec within `Spar-Install`.
- Beta1 ships only the Codex-default install-root layout.
- Explicit multi-platform target setup is deferred to Beta2.
- Agent-target setup is best-effort and does not define repo-local install success.
- Installed repo-local skill content is the source for future agent-target setup.
- Beta2 reporting will need a reporting extension or revision if `partial success` is introduced.
- No detected platform is still compatible with `success` when repo-local install completed.

## Documentation Impact

- Install docs should clearly separate Beta1 repo bootstrap from Beta2 target setup.
- Reporting docs should reflect that no detected platform does not automatically degrade install outcome.
- Future platform-support docs should extend this spec rather than redefining Beta1 target behavior.
