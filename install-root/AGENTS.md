# Agent instructions

<!-- spar-kit:start -->
- Be aware of tools in `.spar-kit/.local/tools.yaml` and commands in `justfile`/repo scripts (read them if not already in context). Use repo-defined tools and commands as the default approach.

SPAR workflow:
- This repo uses the SPAR workflow for non-trivial changes.
- Start with `spar-specify` for any multi-file, user-facing, or unclear change. When unsure, default to `spar-specify`.
- SPAR work is tracked in `specs/` (`active/` and `completed/`).
- SPAR is the source of truth for planning, execution, and documentation.
- When an active spec is complete, suggest running `spar-retain` to finalize documentation.

Failure handling:
- If an approach fails or is unclear, do not switch to a less ideal approach. Stop, explain the issue, offer options and ask before proceeding.
<!-- spar-kit:end -->
