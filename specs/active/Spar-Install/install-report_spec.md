# install-report

## Summary

Define the installer reporting contract for `spar-kit` Beta1 installs. This spec covers how `npx spar-kit install` reports outcome state, warnings, and the next-step recommendation to use `spar-init`.

The goal is to make installer output predictable for both humans and AI agents. Reporting should clearly describe repo-local install success while keeping the messaging short and actionable.

## Problem

The umbrella install spec defines success and failure at a high level, but implementation details for messaging can still drift. Without a dedicated reporting spec, different installer code paths may describe the same result differently, omit important warnings, or blur the line between repo-local success and future platform-specific setup.

Because `spar-kit` is meant to work closely with AI agents, installer output is not just UX polish. It is part of the operational contract. Agents and users need concise, consistent language that tells them what happened and what to do next.

## Goal

Beta1 installer reporting must be short, explicit, and consistent across install paths that reuse the same installer engine.

The installer must report one of two outcome states in Beta1:

- `success`
- `failure`

Reporting rules:

- `success` means the required repo-local install completed successfully.
- `failure` means the required repo-local install did not complete, so the repo is not in a valid SPAR-installed state.
- In Beta1, no platform-detection message is required because the install ships a Codex-default layout directly from `install-root/`.
- On `success`, the installer recommends asking the active agent to use `spar-init`.
- Warnings are allowed on `success` when they describe actions that were intentionally skipped or preserved.
- Warnings should be concise and specific enough to explain what was skipped or preserved.

## Scope

In scope:

- outcome state definitions for Beta1 installer reporting
- success and failure message requirements
- next-step recommendation behavior for `spar-init`
- warning/reporting rules for skipped or preserved repo-local actions
- keeping reporting short and consistent enough for users and agents to interpret reliably

## Non-Goals

- defining file copy behavior or install mechanics
- defining future Beta2 platform-detection logic
- defining packaging or build behavior
- defining the full behavior of `spar-init`
- defining logging verbosity for internal debugging beyond user-facing outcome reporting

## Constraints

- Reporting must reflect the actual install state and must not overstate what Beta1 install accomplished.
- Outcome state is determined by required repo-local install completion.
- Beta1 does not require explicit platform-detection messaging.
- Reporting should stay short and skimmable.
- Reporting should be stable enough that future docs and agent flows can reference it directly.

## Success Criteria

- Installer output always includes exactly one outcome state: `success` or `failure`.
- `success` is used when repo-local install succeeded.
- `failure` is used when the required repo-local install did not complete.
- On `success`, the installer includes a next-step recommendation to use `spar-init`.
- Reporting language stays concise enough to serve as both human-facing output and agent-consumable status.

## Open Questions

- None for Beta1 reporting behavior.

## Decisions

- Installer reporting has its own dedicated spec within `Spar-Install`.
- Beta1 installer reporting defines two outcome states: `success` and `failure`.
- Repo-local install completion is the determinant of outcome state in Beta1.
- On `success`, the installer recommends using `spar-init`.
- Installer reporting uses a fixed, simple layout rather than flexible free-form messaging.
- Beta1 warnings are grouped under a dedicated `Warnings:` section when warnings exist.

Recommended Beta1 layout:

- `Outcome: <success|failure>`
- `Warnings:` followed by one short line per warning when warnings exist
- next-step recommendation

Reporting order:

1. Outcome
2. Warnings, if any
3. Next-step recommendation

## Documentation Impact

- The umbrella install spec should reference this reporting spec for Beta1 messaging details.
- Future installer docs should use the same outcome-state language.
- Any onboarding or README install examples should match this reporting contract.
- Example install output in docs should follow the fixed Beta1 layout.
