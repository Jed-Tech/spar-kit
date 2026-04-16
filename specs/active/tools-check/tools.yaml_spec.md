# tools-check

## Summary
Define and adopt a clear `tools.yaml` contract for SPAR tool checks that keeps registry metadata and runtime status in one file. The target format is a unified per-tool object model with one top-level `checked_at` timestamp representing the snapshot time of the most recent check run.

## Problem
The current `tools.yaml` acts as a registry template, while `spar.init` guidance expects runtime state updates (`installed`, `checked_at`). Without a concrete file contract, agents may write inconsistent shapes, produce noisy diffs, or make tool status hard to read and automate. We also need to avoid ambiguous timestamp semantics across per-tool and global updates.

## Goal
Establish a single, machine-readable and human-readable `tools.yaml` format that supports:
- stable registry metadata (`name`, `purpose`, `check`, optional `when`)
- per-tool current status (installed/available and optional version/reason)
- one top-level `checked_at` field for the last complete check pass
- explicit `schema_version` as part of the v1 contract

## Scope
- Define the canonical `tools.yaml` schema for this repo and installed payload.
- Specify naming and timestamp conventions (top-level `checked_at`, RFC 3339 UTC).
- Define required vs optional per-tool fields in the unified structure.
- Clarify what `spar.init` should read/write in this file for check runs.

## Non-Goals
- Defining installer-time migration behavior for legacy `tools.yaml` shapes.
- Defining per-tool timestamp history or check-run history retention.
- Defining tool installation UX beyond status recording and recommendation output.

## v1 File Contract
- Top-level required fields:
  - `schema_version`: integer, fixed as `1` for this spec.
  - `checked_at`: RFC 3339 UTC timestamp for the latest completed check pass.
  - category keys: `core_cli`, `forge_cli`, `installers`.
- Tool object required fields:
  - `name`: CLI command name.
  - `purpose`: short human-readable description.
  - `check`: shell command used to verify presence/version.
  - `installed`: boolean result of latest check.
- Tool object optional fields:
  - `target`: qualifier within nested category branches (for example `github`, `gitlab`, `windows`, `macos`).
  - `when`: optional applicability condition text when a tool is environment-specific.
  - `version`: parsed version string when available.
  - `reason`: short failure reason when not installed or check fails.

## Final v1 Tool Set
- `core_cli`: `git`, `just`, `npm`
- `forge_cli`: `gh` (`target: github`), `glab` (`target: gitlab`), `bb` (`target: bitbucket`)
- `installers`: `winget` (`target: windows`), `brew` (`target: macos`), `uv` (`target: python`, `when: "repo uses Python tooling"`)

## Canonical v1 Example
```yaml
schema_version: 1
checked_at: "1970-01-01T00:00:00Z"

core_cli:
  - name: git
    purpose: version control
    check: "git --version"
    installed: false
    reason: "not yet checked"

  - name: npm
    purpose: Node package manager (required for spar-kit install path)
    check: "npm --version"
    installed: false
    reason: "not yet checked"

forge_cli:
  github:
    - name: gh
      target: github
      purpose: GitHub CLI (issues, PRs, Actions)
      check: "gh --version"
      installed: false
      reason: "not yet checked"

installers:
  windows:
    - name: winget
      target: windows
      purpose: install and update packages on Windows
      check: "winget --version"
      installed: false
      reason: "not yet checked"

  python:
    - name: uv
      target: python
      purpose: fast Python package and env manager
      check: "uv --version"
      when: "repo uses Python tooling"
      installed: false
      reason: "not yet checked"
```

## Step 4 Write Semantics
- Run checks across the full v1 tool set and collect missing tools.
- If permissions allow, attempt automatic install for missing tools using the relevant installer path.
- Re-check tools that had install attempts, then persist only the final post-install check result.
- For each checked tool:
  - if check succeeds, write `installed: true`, set `version` when available, and remove `reason` if present.
  - if check fails or tool is missing, write `installed: false`, set `reason`, and remove `version` if present.
- Update `checked_at` once, after the full pass completes.
- Preserve tool metadata fields (`name`, `purpose`, `check`, `target`, `when`) unless intentionally updated by spec.
- Preserve unknown fields when practical.

## Failure Handling
- If an individual tool check fails, record the failure in that tool entry and continue remaining checks.
- If an automatic install attempt fails, record the failure reason and continue remaining tools.
- If `tools.yaml` cannot be read or parsed, stop and report a clear error.
- If `tools.yaml` can be read but cannot be written, summarize tool state in chat/output and report write failure.
- Do not silently skip `checked_at` updates on successful write paths.

## Acceptance Checks (Step 4)
- A full check pass sets `checked_at` to a valid UTC RFC 3339 timestamp.
- Installed tools are persisted with `installed: true` and optional `version`.
- Missing/failing tools are persisted with `installed: false` and `reason`.
- `uv` check respects `when: "repo uses Python tooling"` semantics.
- Missing tools are auto-installed when permitted, then re-checked before final write.
- Category and tool ordering remain unchanged after write.

## Constraints
- `spar.init` step 4 must read and write only `.spar-kit/.local/tools.yaml`.
- `checked_at` updates once per completed check pass, not per-tool.
- category and tool ordering is stable and follows the Final v1 Tool Set order.
- `schema_version` must be written on every successful file update.
- Unknown top-level or tool fields should be preserved when practical.

## Success Criteria
- A single `tools.yaml` shape is defined and used consistently by `spar.init`.
- Every v1 tool entry has deterministic metadata and deterministic status fields.
- `checked_at` reflects the latest completed check pass in UTC RFC 3339 format.
- Missing or failing tools are represented via `installed: false` plus `reason`.
- The spec is sufficient to implement step 4 tool check behavior without ambiguity.

## Decisions
- v1 keeps category-based layout (`core_cli`, `forge_cli`, `installers`) and does not use a per-tool `group` field.
- v1 uses one top-level `checked_at` timestamp and no per-tool timestamps.
- v1 includes `schema_version` now, even without migration work in this project phase.
- v1 tool list is fixed to the Final v1 Tool Set in this spec.

## Documentation Impact
- Update `install-root/.agents/skills/spar-init/SKILL.md` step 4 wording to match the v1 shape (`schema_version`, top-level `checked_at`, unified `tools` entries).
- Keep `install-root/.spar-kit/.local/tools.yaml` aligned to this v1 schema and tool list.
