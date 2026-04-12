# spar-install

## Summary

Define **spar-kit installation** for consumer projects: how the **npm** path and **non-npm** paths lay out files under `**.spar-kit/`**, ensure `**.spar-kit/VERSION`** always exists after install (so `**spar.init**` can compare to canonical `**main/VERSION**`), and keep the host app’s root `package.json` untouched. Cross-reference `**spar-versioning**`: upstream root `VERSION` is the only SemVer source of truth in git; `**package.json` `version**` matches `**VERSION**` via sync for npm only.

## Problem

Install behavior is split across **Node/npm**, **manual/curl**, and future scripts, but `**spar.init`** needs **one reliable local path** for SemVer (`**.spar-kit/VERSION`**) and a clear rule for refresh when stale. Without an install spec, packaging choices ( `**postinstall`**, what gets copied where) drift from the versioning spec and confuse users and agents.

## Goal

**v1 install outline (aligned with current versioning decisions):**

- **Single local version file for agents:** After **any supported install**, the consumer repo has `**<project>/.spar-kit/VERSION`** containing the same SemVer string as upstream `**VERSION`** on `**main**` (one line, SemVer 2.0.0). `**spar.init**` reads **only** this path for local version (plus fetch of canonical `**main/VERSION`** for comparison)—not the host project’s root `**package.json`**.
- **npm:** The published package uses `**package.json`** as usual under `**node_modules`**. `**npm install**` must **also** ensure `**.spar-kit/VERSION`** is written (e.g. `**postinstall`** or equivalent)—so npm users get the same `**.spar-kit/VERSION**` contract as copy-based installs.
- **Non-npm:** Installers/copy flows write `**.spar-kit/`** (including `**VERSION`**, skills placement per later **“C”** / init spec) without modifying unrelated project files.
- **`.gitignore`:** When the installer first creates or updates **`.spar-kit/`**, it must ensure **`.spar-kit/.local/`** is ignored by git (append **`.spar-kit/.local/`** to **`.gitignore`** idempotently if missing, or rely on an existing pattern that already covers that path). Machine-local tool state under **`.spar-kit/.local/`** must not be committed by default. **`spar.init`** **verifies** this: if the path is not ignored, it **warns** with the exact line and may append to **`.gitignore`** only with **explicit user consent**—never silently.
- **Upstream repo:** Root `**VERSION`** is canonical; `**package.json` `version`** follows via sync (see **spar-versioning**). **v1:** no CI enforcement—contributors use docs + local sync.
- **Isolation:** Do **not** change or depend on the **application** root `**package.json` `version`** for spar-kit.

**Dependencies:** **`specs/completed/spar-versioning/spec.md`** is authoritative for SemVer rules, canonical remote, stale/offline behavior, and **`VERSION`** as source of truth (with **`package.json`** sync for npm when npm packaging exists).

**Tools state:** **`spar.init`** uses a **single** file **`.spar-kit/.local/tools.yaml`** (`registry` + `installed`). In **consumer** projects it is **gitignored** (machine-local); the **spar-kit** repository commits the **default registry** at this path—not a separate tracked **`.spar-kit/tools/index.yaml`**.

**`spar.init` must know how to run install (reinstall):** When the version check says **stale** (or **`VERSION`** is missing/invalid), **`spar.init`** is responsible for **refreshing** spar-kit using a **supported install path**—not ad-hoc file copies. Requirements:

- **Documented commands (primary + secondary):** This spec (and consumer-facing **README** when published) must name **exact** reinstall commands for **(1) primary**—published **npm** package, **`npm install` / `pnpm` / `yarn`** at **project root**—and **(2) secondary**—**non-npm** script, archive, or copy flow with the same **`.spar-kit/`** outcome. **`spar.init`** does **not** infer how the repo was first installed; it always tries **primary** first, then **secondary** if the install is still stale or **primary** could not complete (or prints both in order when the agent cannot run them).
- **Privileges:** Network, package managers, and **`sudo`** stay user-controlled; **`spar.init`** does not bypass consent or elevate silently.
- **After reinstall:** Re-read **`.spar-kit/VERSION`** and continue the rest of the init flow (skills, tools, **`AGENTS.md`**, closeout).

Until exact package names and scripts are shipped, **`spar.init`** should point at the **current** published install instructions rather than inventing package identifiers.

## Scope

**In scope for this spec (outline → full spec in plan phase):**

- Package layout under `**node_modules`** vs `**.spar-kit/`** contents.
- `**postinstall**` (or alternative) contract: must create/update `**.spar-kit/VERSION**` idempotently where possible.
- Skill and asset copy targets (high level; per-agent paths may stay in **spar-initialization-skill** / “C”).
- Uninstall or upgrade story at a high level (how `**.spar-kit/`** is updated on reinstall).
- **Init-facing reinstall commands:** npm package identifier(s), lockfile-aware notes, and non-npm upgrade steps so **`spar.init`** can run or quote them verbatim.
- **`.gitignore`:** idempotent append of **`.spar-kit/.local/`** (or equivalent pattern) when bootstrap creates **`.spar-kit/`**; aligns with **`spar.init`** verify / warn / consent-to-patch behavior.

**Out of scope until linked specs are ready:**

- Full `**spar.init`** behavior (see **spar-initialization-skill**).