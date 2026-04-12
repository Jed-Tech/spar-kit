# spar-initialization-skill

## Summary

Specify the **spar.init** skill so it can be **rewritten from scratch** against clear requirements. The skill runs after install (or on demand) to verify and repair spar-kit setup in the user’s repository and environment: **version freshness vs canonical main**, **skills + AGENTS.md correctness** for the active AI system, **tool inventory** (and optional install), **optional AGENTS.md optimization** (length + canonical SPAR block), and a **structured closeout** that hands off to **spar.specify** for new work.

## Problem

The current `spar.init` skill does not match the intended product behavior. Adopters need a single, dependable “first run” that:

- knows whether their spar-kit files are **current** relative to **main on GitHub**,
- ensures **all five skills** are present and correctly placed for the **AI system in use**,
- validates or records **recommended CLI tools**,
- keeps `**AGENTS.md`** correct and ideally **short**, without destroying project-specific instructions,
- attempts **missing tool installs** when allowed, and
- ends with an honest **done / not done** summary and a clear **next step**.

Without a written spec, rewrites will keep drifting.

## Goal

Define **exact responsibilities and boundaries** for **spar.init** so implementation can follow. Confirmed scope items:

1. **Version check**: Compare local spar-kit-related assets (at minimum **spar.init**; exact bundle TBD by **spar-versioning**) to the **canonical main** copy on GitHub; if stale, run install or guide the user if privileges are insufficient.
2. **Skills + AGENTS.md**: Ensure **all five skills** — **spar.init**, **spar.specify**, **spar.plan**, **spar.act**, **spar.retain** — are present and correctly set up for the **AI system in use**; ensure `**AGENTS.md`** contains the **SPAR section**; the agent may **move/copy files** and **correct `AGENTS.md`** as needed.
3. **Tool check**: Use **one** gitignored file **`.spar-kit/.local/tools.yaml`** with **`registry`** (same shape as spar-kit’s committed **`.spar-kit/.local/tools.yaml`** registry) and **`installed`**—no separate tracked **`.spar-kit/tools/index.yaml`**.
4. **Optimize `AGENTS.md`**: Target **≤ 40 lines** when optimized; explain why brevity helps; **ask permission** before rewriting. An optimized file **always** includes the **exact canonical SPAR prepended text** defined by the system.
5. **Install tools**: Attempt to install missing recommended tools; if not permitted, **ask the user** to help (commands / elevation).
6. **Closeout**: Summarize what was done and what was not; state that **SPAR initialization is complete**; suggest using `**spar.specify`** when beginning a new feature or project (naming TBD if a shorter alias is introduced).

**Dependency:** The **version comparison** rules in (1) follow `**specs/completed/spar-versioning/spec.md`** (canonical `**main/VERSION**` vs `**.spar-kit/VERSION**`).

## Scope

Requirements and acceptance criteria for rewriting **spar.init** (`skills/spar.init/SKILL.md`) and any small supporting artifacts agreed in planning: the six goal areas (version check; five skills + **`AGENTS.md`**; tool check via **`.spar-kit/.local/tools.yaml`** only; optional **`AGENTS.md`** optimization with consent; tool install attempts; closeout with **spar.specify** handoff). User consent gates for destructive or opinionated edits (optimize **`AGENTS.md`**, install tools, file moves). Per–AI-system layout and detection (“C”—paths, symlink vs copy, multi-agent repos) refines item (2) later and is not detailed here. Concrete installers, GitHub fetch mechanics, and version file formats stay under **spar-versioning** + install work, then get referenced by **spar.init**.