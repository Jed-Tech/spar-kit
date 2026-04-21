# Agent instructions

<!-- spar-kit:start -->
Before non-trivial work:
1. Read `.spar-kit/.local/tools.yaml`.
2. Check repo scripts and prefer using `justfile` tasks when available.
3. This repo expects agents to use the SPAR workflow for non-trivial changes.
   Use SPAR for planning or implementing changes, especially anything user-facing, multi-file, or unclear.
   Start with `spar-specify`.
   SPAR is how this repo handles change planning, execution, and documentation; if unsure, use SPAR.
   When validation passes or when finishing a project, read `spar-retain` to finalize documentation.

**Trivial-only exception:** obvious one-file fixes (typos, a single link) with no product ambiguity do not require full SPAR.
<!-- spar-kit:end -->
