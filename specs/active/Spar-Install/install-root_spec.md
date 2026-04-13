# Install Structure

Source of truth for installed contents:

```text
install-root/
├── AGENTS.md
├── justfile
├── .agents/
│   └── skills/
│       ├── spar-init/
│       │   └── SKILL.md
│       ├── spar-specify/
│       │   └── SKILL.md
│       ├── spar-plan/
│       │   └── SKILL.md
│       ├── spar-act/
│       │   └── SKILL.md
│       └── spar-retain/
│           └── SKILL.md
├── .spar-kit/
│   ├── VERSION
│   └── .local/
│       └── tools.yaml
├── specs/
│   ├── README.md
│   ├── active/
│   └── completed/
```

Install policy:

- `install-root/` contains only items that are part of the install payload.
- Beta1 packages all of `install-root/`; no separate manifest is required.
- The installer treats `install-root/` as the asset contract and applies a small number of path-specific rules during install.

Path-specific application rules:

- `AGENTS.md`
  If the target repo does not already contain `AGENTS.md`, create it from `install-root/AGENTS.md`.
  If the target repo already contains `AGENTS.md`, prepend the SPAR content from `install-root/AGENTS.md`.

- `justfile`
  Create from `install-root/justfile` only if the target repo does not already have `justfile`.
  Never overwrite an existing `justfile` in Beta1.

- `.spar-kit/.local/**`
  Create files only when absent.
  Never overwrite existing files under `.spar-kit/.local/`.

- All other shipped paths
  Install from `install-root/` using normal SPAR-managed install behavior.
  These may be updated on reinstall according to the install specs.
