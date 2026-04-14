# Research: documenting agent-specific install outputs (APM)

**Source:** [agentic-project-management](https://github.com/sdi2200262/agentic-project-management) — install flow and docs as of review.

## What they do

- **`apm init`** installs **different files per assistant** (Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenCode). The top-level README states that outcome generically (“commands, guides, skills, project artifact templates”) rather than listing every path in one place.
- **Full detail lives outside the repo root README:** [Getting Started](https://agentic-project-management.dev/docs/getting-started), [CLI guide](https://agentic-project-management.dev/docs/cli), and assistant-specific notes (e.g. standalone skills under `skills/`, with examples like `.claude/skills/apm-assist/` for Claude Code).
- **Optional partial install** is documented separately (e.g. curl a single skill without full init), so “minimal footprint” is not confused with “full init.”

## Takeaways for Spar

1. **Per-assistant truth** — When Beta2 supports multiple agent targets, users will ask “what landed on disk?” Maintain a **short, authoritative list of paths per target** (tables or generated lists), not only a single generic paragraph.
2. **Central vs split docs** — A **summary** in one place (e.g. install overview) plus **target-specific sections** or pages reduces “I ran install—where are my files?” churn.
3. **Version + target** — Install output can change with **spar-kit version** and **selected target**; stating both in troubleshooting or `status`-style output (future) matches how users debug mismatches.
4. **Examples without claiming completeness** — Example paths (like `.claude/skills/...`) are useful **as samples**; label them as assistant-specific so readers do not assume one layout fits all tools.

This file records external learnings only; Spar’s normative behavior remains in `specs/active/Spar-Install/` and `specs/active/Spar-Install-beta2/`.
