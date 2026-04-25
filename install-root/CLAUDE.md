# Claude instructions

<!-- spar-kit:start -->
Before non-trivial work:
1. Become aware of the installed tools available to you by reading: `.spar-kit/.local/tools.yaml`.
2. Check repo scripts and prefer using `justfile` tasks when available.
3. This repo expects agents to use the SPAR workflow for planning and implementing non-trivial changes.
   Use SPAR for planning or implementing changes, especially anything user-facing or multi-file.
   To use the SPAR workflow, start with `spar-specify`.
   SPAR is how this repo handles change planning, execution, and documentation; if unsure, suggest using `spar-specify` to properly spec, plan, and implement a change.

When validation passes or when finishing a project, read `spar-retain` to finalize documentation.

**Trivial-only exception:** obvious one-file fixes (typos, a single link) with no product ambiguity do not require full SPAR.
<!-- spar-kit:end -->
