# Implementation Plan - spar-versioning

## Summary

- Add repo-root **`VERSION`** (one line, SemVer 2.0.0)—the **only** artifact this plan implements for versioning.
- Document the **canonical raw URL** for **`main/VERSION`** in **README**.
- **Do not** add **`package.json`**, sync scripts, or npm wiring here—**spar-install** owns that.

## Tasks

- [x] Add **`VERSION`** at repository root with an initial SemVer (e.g. `0.1.0`).
- [x] Document canonical fetch URL in a short, discoverable place (e.g. **README** one-liner or pointer to this spec’s **Decisions** table)—`https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`.
- [x] Confirm **`specs/active/Spar-Install/Spar-Install_spec.md`** references **`VERSION`** as SoT and carries **`package.json`** / install mechanics forward (cross-check only).

## Notes

- **Validation:** File is one line, valid SemVer after trim; visible on **`main`** after merge.
- **Follow-up:** **`package.json`**, sync, **`postinstall`**, **`.spar-kit/VERSION`** → **spar-install** plan.

## Retention

- **Completed:** all tasks done; **`spar-versioning_spec.md`** reconciled with shipped **`VERSION`** + **README** in **Retain**.
