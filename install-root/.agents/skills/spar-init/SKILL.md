---
name: spar-init
description: >-
  After install or on demand, complete the repo-local spar-kit setup by checking
  version freshness, .agents/skills, AGENTS.md, .spar-kit/.local/tools.yaml, and
  .gitignore hygiene; make safe repairs or recommendations, then finish with a
  short handoff to spar-specify.
---

# Init

Run after `spar-kit` is installed in a project, or when the user wants a setup check. Treat this as a post-install verification and light repair pass for the repo-local SPAR bundle.

## What this skill delivers

Work through these areas in order unless blocked:

1. **Version check** - compare upstream `VERSION` to local `.spar-kit/VERSION`.
2. **Repo-local skill placement check** - verify the SPAR skills are in the correct repo-local location for the current agent.
3. **`AGENTS.md` recommendation** - encourage a short, effective `AGENTS.md` for lower token usage and clearer agent behavior.
4. **Tool verify-install-sync** - seed or update `.spar-kit/.local/tools.yaml`.
5. **`.gitignore` hygiene check** - recommend ignoring `.spar-kit/.local/` when needed.
6. **Closeout** - a short summary and a recommendation to use `spar-specify`.

---

## 1. Version check

First confirm repository root and note `.spar-kit/VERSION`.

- **Canonical:** fetch
  `https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`
- **Local:** `<repo>/.spar-kit/VERSION`
- Compare using SemVer ordering, not string sorting.
- If local is missing, invalid, unreadable, or behind upstream: treat the install as stale.
- If canonical cannot be fetched: warn that the version check was skipped and continue the rest of init.

When stale:

- Do **not** hand-edit `.spar-kit/VERSION`.
- Recommend rerunning the current install path:
  - `npx spar-kit install`
- If the user wants help, explain that reinstall is the supported way to refresh the repo-local SPAR bundle.

---

## 2. Repo-local skill placement check

Determine whether this agent uses repo-local skills and, if so, what repo-local location it expects.

- Identify the correct repo-local skill location for the current agent.
- Verify the five SPAR skills are present in the correct repo-local location for that agent.
- Prefer repo-local installed assets as the repair source when safe and available.

If the current skill location is wrong, missing, or unclear:

- explain the issue
- move or copy the SPAR skills to the preferred repo-local location for this agent.
- repair only when the action is safe and consistent with the installed repo-local bundle

Keep this focused on verifying and repairing skill placement, not re-running the full install workflow.

---

## 3. `AGENTS.md` recommendation

`AGENTS.md` includes a brief description of how to use spar-kit. That guidance is essential and should be kept.

Check how many lines `AGENTS.md` contains. If it is longer than 60 lines, give this lightweight recommendation (using natural language):

- shorter `AGENTS.md` files are usually better for agent focus and lower token usage
- keep instructions crisp, specific, non-redundant, and relevant to most agent communications.
- avoid turning `AGENTS.md` into a long instruction list.

If the user wants help optimizing `AGENTS.md`, keep the guidance brief and preserve the intended SPAR instructions.

---

## 4. Tool verify-install-sync

Use only `.spar-kit/.local/tools.yaml`.

### Tool state file

- Run checks across the full tool set and record missing tools.
- Batch checks into one command when practical so the user is not prompted separately for each tool.
- Continue checking the remaining tools even if one tool is missing or fails.
- Capture `checked_at` in the same batched command when practical so the user is not prompted separately for the timestamp.
- Prefer Node for cross-platform UTC timestamp generation: `new Date().toISOString().replace(/\.\d{3}Z$/, "Z")`.
- Do not run a second timestamp command if the first timestamp capture succeeds.
- If tools are missing, install them automatically when your permissions allow.
- Re-check tools that had install attempts, then persist the final post-install result.
- Preserve the existing `tools.yaml` structure and update entries in place.
- For each tool entry, maintain `installed`, `version` (when available), and `reason` (when missing/failing) consistently.
- Update `checked_at` once after the completed full pass.
- Respect `when` rules (for example, `uv` when the repo uses Python tooling).

If `.spar-kit/.local/` cannot be written, summarize tool presence in chat instead.

---

## 5. `.gitignore` hygiene check

Treat `.gitignore` as a follow-up hygiene check, not part of install.

- If this is a git repo, check whether `.spar-kit/.local/` is ignored.
- If it is not ignored, recommend that the user add it as ignored.
  - `.spar-kit/.local/`
- Offer the exact line to add, then modify `.gitignore` only after explicit user consent.

---

## 6. Closeout

Keep the wrap-up short:

- what was verified or fixed
- what still needs user action, if anything
- briefly confirm SPAR is ready, note any remaining user action, and recommend `spar-specify` for the next change

Example shape:

SPAR initialization is complete. Verified version, repo-local SPAR skill placement, `AGENTS.md` length, and tool state. You are ready to start utilizing SPAR-kit. Mention **`spar-specify`** when starting your next feature or change.

---

## Stop conditions

Stop and ask when:

- `.spar-kit/VERSION` cannot be checked and the repo-local SPAR bundle is obviously incomplete
- `AGENTS.md` is missing or malformed and a safe repair source is not available; explain the issue with an enthusiastic, constructive recommendation for the safest next step
- `.spar-kit/.local/tools.yaml` cannot be seeded and the local directory cannot be written

Do not use destructive workarounds.

## Completion

Initialization is complete when:

- version check ran or was skipped with warning
- repo-local SPAR skill placement was checked, adjusted when safe, or reinstall was recommended
- `AGENTS.md` length was checked and a recommendation was given when useful
- `.spar-kit/.local/tools.yaml` was updated or tool state was summarized
- the closeout is short and points to `spar-specify`
