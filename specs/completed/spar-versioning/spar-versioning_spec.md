# spar-versioning

## Summary

**Minimal v1:** Root **`VERSION`** (one line, **SemVer 2.0.0**) is the **only** source of truth in git for spar-kit’s release number. **`package.json` `version`** (when added) must **match** **`VERSION`** via sync—**never** the reverse; that wiring is **spar-install**, not this change. **`spar.init`** compares canonical **`main/VERSION`** to **`.spar-kit/VERSION`** on the consumer machine.

## Problem

Versioning had grown heavy (dual authority, CI psychology). We need **one** canonical file and a **clear** rule for agents and installs.

## Goal

- **SemVer 2.0.0** only; **full SemVer ordering** when comparing (not lexical sort).
- **Source of truth:** Repo-root **`VERSION`** — single line, trim whitespace, valid SemVer. **Humans bump `VERSION`** when releasing.
- **npm (follow-on):** Root **`package.json`** will include **`version`** for the package; it **must equal** **`VERSION`**, updated via sync (**spar-install**).
- **No CI for versioning in v1:** No GitHub Action solely to enforce **`VERSION`** vs **`package.json`** alignment.
- **Canonical fetch:** `https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`
- **Consumer:** **`.spar-kit/VERSION`** is a copy of shipped **`VERSION`** (see **spar-install**). **`spar.init`** compares canonical **`VERSION`** ↔ **`.spar-kit/VERSION`** only.
- **Stale:** Local missing / invalid / **less than** canonical ⇒ reinstall (or guide). **Offline:** cannot fetch canonical ⇒ **warn and continue**.

## Scope

**In scope for the completed act:** repo-root **`VERSION`** file; public pointer to canonical raw URL in **README**.

**Deferred:** **`package.json`**, sync script, **`postinstall`**, **`.spar-kit/`** layout → **spar-install**.

**Non-Goals**

- **`package.json`** driving **`VERSION`**.
- Forks / custom remotes as canonical (v1: **Jed-Tech/spar-kit** **`main`**).
- Content-hash / signed release integrity (later).
- **CI workflows** for versioning files in v1.

## Constraints

- **SemVer** ordering must be correct when implemented in code (not string sort for “behind”).
- Do **not** use the **host app** root **`package.json`** for spar-kit’s version.
- **Canonical remote:** `https://github.com/Jed-Tech/spar-kit`, branch **`main`**.

## Success Criteria

1. Root **`VERSION`** exists with a valid SemVer string (`0.1.0` initial).
2. Canonical URL for **`VERSION`** is documented in **README** (and remains in this spec’s **Decisions**).
3. **Stale** vs **offline** rules remain unambiguous for future **`spar.init`** implementers.
4. **Invalid / unreadable `.spar-kit/VERSION`** ⇒ **stale** (reinstall path)—behavior unchanged; **`.spar-kit/`** delivery is **spar-install**.

## Open Questions

- Exact **sync** implementation for **`package.json`** (`jq`, Node, script)—**spar-install**.

## Decisions

| Topic | Decision |
|--------|----------|
| **Canonical SemVer in repo** | Root **`VERSION`** file (one line). |
| **`package.json`** | **`version`** follows **`VERSION`** via sync when npm packaging lands (**spar-install**). |
| **Canonical raw URL** | `https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION` |
| **CI for versioning (v1)** | **None**. |
| **Local parse failure** | **Stale** (reinstall). |
| **This change (Act) shipped** | **`VERSION`** at `0.1.0`; **README** links **`VERSION`** and canonical URL. No **`package.json`** in this change. |

## Documentation Impact

- **README** updated with released-version line and canonical raw URL (**applied** in Act).
- **Contributing / release** (“bump **`VERSION`**, sync **`package.json`** when it exists”)—when **`package.json`** is added under **spar-install**.
