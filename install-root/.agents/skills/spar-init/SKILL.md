---
name: spar.init
description: >-
  After install or on demand, verify and repair spar-kit in the repo—version vs canonical
  main, five skills + AGENTS.md for the active AI system, tool inventory in
  .spar-kit/.local/tools.yaml only (and that .spar-kit/.local/ is git-ignored or the user
  is warned), optional AGENTS.md optimization (≤40 lines, with consent), optional tool
  installs, and closeout with handoff to spar.specify.
---

# Init

Run after spar-kit is installed in a project (or when the user wants a full setup pass): verify and repair setup, then hand off clearly.

## What this skill delivers

Work through these **six** areas in order unless blocked:

1. **Version check** — `main` vs **`.spar-kit/VERSION`**; if stale, **reinstall** (**primary** first, **secondary** second).
2. **Skills + `AGENTS.md`** — Five SPAR skills for this AI system; **`AGENTS.md`** SPAR section.
3. **Tool check** — **`.spar-kit/.local/tools.yaml`** (`registry` + `installed`); verify **`.spar-kit/.local/`** is git-ignored or warn / fix with consent.
4. **Optimize `AGENTS.md`** — Optional; ≤40 lines; ask first; keep canonical SPAR block.
5. **Install tools** — Try missing tools when allowed; else commands / elevation.
6. **Closeout** — Done / not done; **SPAR initialization is complete** → **`spar.specify`**.

---

## 1. Version check (This section is under construction and needs updated after Install is finalized)

**First:** Confirm **repository root**. Note **`.spar-kit/VERSION`**.

- **Canonical (one line):** fetch  
  `https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`  
  (**Jed-Tech/spar-kit**, branch **`main`**).
- **Local:** **`<repo>/.spar-kit/VERSION`** (trimmed one line, SemVer **2.0.0**).
- **Compare** with proper **SemVer ordering**, not string sort.
- **Behind or bad local** (missing, invalid, unreadable): **stale** → **reinstall** spar-kit (see below)—do not patch **`.spar-kit/VERSION`** by hand to “fix” the check.
- **Cannot fetch canonical** (offline, error): **warn**, note **version check skipped**, **continue** other steps—do not call stale **only** because of network.

**When stale (reinstall):** Do **not** hand-edit **`.spar-kit/VERSION`**. Use the **exact** commands from current **spar-kit** install documentation (e.g. **README**).
---


## 2. Skills + `AGENTS.md`

- For each of **`spar.init`**, **`spar.specify`**, **`spar.plan`**, **`spar.act`**, **`spar.retain`**: verify the skill is available to this agent (e.g. `.cursor/skills`, `.agents/skills`, `.claude/skills`, or project convention).
- If something is missing or in the wrong place: **propose** copy/symlink/move steps; apply only with **user approval**.

**`AGENTS.md` (baseline, not optimization):**

- Locate the spar-kit **`AGENTS.md`** snippet to prepend (from the installed bundle).
- **Prepend** spar-kit guidance **before** existing content; **never** delete the user’s own instructions.
- Use markers for idempotency:
  - `<!-- spar-kit:start -->`
  - `<!-- spar-kit:end -->`
- If markers exist, **update inside the block** if spar-kit guidance changed; do not duplicate the whole block.
- Edits that would **remove or contradict** user content require **consent**—stop and ask.

---

## 3. Tool check

Store **registry** and **installed** only in **`.spar-kit/.local/tools.yaml`**.

### `.spar-kit/.local/` ignore check

Do **not** change **`.gitignore`** unless the **user explicitly agrees**.

- **Install/bootstrap** should add the ignore line once when laying down **`.spar-kit/`**; init is the safety net when that did not happen.
- If this directory is a **git** repo, check whether **`.spar-kit/.local/`** is ignored (e.g. read **`.gitignore`** / parent ignore files, or **`git check-ignore -q .spar-kit/.local`** when available).
- If it is **not** ignored: **warn** and give the exact line to add:
  - `.spar-kit/.local/`
- Teams may manage ignores elsewhere—only append that line **after** explicit user consent.
- If you **cannot** determine git state (not a git repo, sandbox limits), **note** the same line for the user so they can add it if they use git later.

Open or create **`.spar-kit/.local/tools.yaml`** (seed `registry` if missing).

**Path:** **`.spar-kit/.local/tools.yaml`**

**Shape:**

```yaml
# Machine-local tool state
checked_at: "2026-04-10T12:00:00Z"

# Same structure as the spar-kit registry in .spar-kit/.local/tools.yaml (core_cli, forge_cli, …, skills)
registry:
  core_cli:
    - name: git
      purpose: version control
      check: "git --version"
  # … remainder of registry from spar-kit

# Flat map: tool `name` -> installed (evaluate checks from registry to populate)
installed:
  git: true
  just: false
  rg: true
```

**Behavior:**

- If the file is **missing**, **seed** `registry` from spar-kit **`.spar-kit/.local/tools.yaml`** (bundled path next to the installed package, or the same path when working inside **spar-kit**), set **`installed`** after running checks, set **`checked_at`**.
- On later runs, **read** `registry` from this file; **update** `installed` and `checked_at` after checks.
- If **`registry`** is stale vs upstream, **refresh** from the bundle when the user agrees.

**Run checks:** run **`check`** commands from **`registry`** where applicable; respect **`when`** for repo-dependent tools.

If **`.spar-kit/.local/`** cannot be created, **summarize** tool presence in chat only.

---

## 4. Optimize `AGENTS.md`

- **Only** after **2. Skills + `AGENTS.md`** baseline SPAR section is correct.
- **Target ≤ 40 lines** total when optimized; **explain** why brevity helps; **ask permission** before rewriting.
- An optimized file **always** includes the **exact** canonical SPAR prepended block (same meaning as upstream **`AGENTS.md`** / project policy). If the user declines optimization, leave **`AGENTS.md`** at baseline from **2. Skills + `AGENTS.md`**.

---

## 5. Install tools

- For tools marked **false** in **`installed`** that are **recommended**, try **brew / winget / apt** (etc.) if the environment allows.
- On failure or need for **sudo** / admin: stop and give **copy-paste** commands for the user.

Do not install packages without a clear path and user alignment on elevated permissions.

---

## 6. Closeout

- List **completed** vs **not done** (with reason).
- Say clearly: **SPAR initialization is complete** (or what remains if something critical failed).
- Point to **`spar.specify`** for starting the next change.

---

## Stop conditions

Stop and ask when:

- Canonical **`VERSION`** or spar-kit **`AGENTS.md`** source cannot be found
- Install docs do not define **primary** and **secondary** commands (cannot follow the ordered reinstall)
- Skill install paths are ambiguous (multiple agents, unclear roots)
- **`registry`** cannot be loaded to seed **`.spar-kit/.local/tools.yaml`** and **`.spar-kit/.local/`** cannot be written

Do not use destructive workarounds.

## Completion

Initialization is **complete** when: **(1)** version check run or **skipped with warning** (offline), and if **stale**, reinstall **attempted** or **exact install commands** given to the user; **(2)** five skills **and** **`AGENTS.md`** SPAR section **verified or fixed** (moves only with consent); **(3)** **`.spar-kit/.local/tools.yaml`** written/updated or **summarized** if unwritable, and **`.spar-kit/.local/`** ignore status **warned** or **fixed with consent** (or **noted** if git unknown); **(4)** **`AGENTS.md`** optimization only if approved; **(5)** installs attempted or user given commands; **(6)** closeout delivered with **`spar.specify`** handoff.
