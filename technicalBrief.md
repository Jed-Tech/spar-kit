# Technical Brief

## Overview

`spar-kit` is a Node.js-distributed workflow kit for running software delivery through the SPAR model:

`Specify -> Plan -> Act -> Retain`

The project is not just a CLI. It is a packaged installer plus a repo-local workflow payload. The published npm package provides the command surface, the install logic, and the files that get laid down into a target repository so a team or agent can work inside a consistent structure.

## How the project is organized

- `bin/` contains the published CLI entrypoint.
- `lib/` contains runtime and release-support logic.
- `install-root/` contains the repo payload installed into user projects.
- `templates/` contains reusable spec and plan templates.
- `specs/` documents the working SPAR folder model.
- `docs/` contains the user landing page as a static GitHub Pages site.

## Current system shape

The package installs a working repository structure rather than leaving users to assemble one manually. The authored install payload now lives under `install-root/` as shared assets plus target configs. In practice, that means:

- shared repo assets such as `.spar-kit/` and `specs/`
- canonical skill content under `install-root/skills/`
- instruction templates such as `install-root/AGENTS.md` and `install-root/CLAUDE.md`
- target placement configs under `install-root/targets/`

The workflow model is centered on named change folders under `specs/`, moving work through active delivery and then into retained history. Agent skills such as `spar-init`, `spar-specify`, `spar-plan`, `spar-act`, and `spar-retain` are part of the operating model and guide the user through that lifecycle.

The installer now uses a target model rather than a single fixed repo layout. With no flags, `npx @spar-kit/install` applies the default general layout, which installs `AGENTS.md` plus `.agents/skills/`. With explicit flags such as `--codex`, `--claude`, or `--cursor`, the installer applies target-native layouts using the shared authored assets and per-target config files in `install-root/targets/`.

The skill content is designed to stay portable across agent ecosystems, but discovery paths still vary by tool. The practical result is:

- default/general and Codex installs use `.agents/skills/`
- Claude Code installs use `.claude/skills/` plus `CLAUDE.md`
- Cursor-native installs use `.cursor/skills/` plus `AGENTS.md`

The installer applies a small policy vocabulary per asset rather than treating each top-level folder as uniform. For example, `.spar-kit/VERSION` is replaced from the package payload, `.spar-kit/.local/tools.yaml` is only seeded when missing, and `AGENTS.md` / `CLAUDE.md` use SPAR-managed block updates.

The `docs/` folder is the public-facing landing page for users. It is intended to be served as a static GitHub Pages website, giving users a lightweight entry point for install guidance, workflow explanation, and onboarding into the kit.

Release versioning is driven from the root `VERSION` file. The current released SemVer
should be read from that file, and canonical `main` checks such as `spar-init` use:

`https://raw.githubusercontent.com/Jed-Tech/spar-kit/main/VERSION`

## Release and publish process

`just pack-prep -> npm pack -> npm publish --access=public`

Publishing is driven from the root `VERSION` file. The repo treats that file as the canonical release version, and the publish flow is designed to make sure the packaged artifact stays aligned with it.

`just pack-prep` is the required pre-publish gate. It syncs the root version into derived package locations, syncs skill asset templates from `templates/` into `install-root/skills/` where those assets exist, verifies that the required install payload exists, and runs the current automated tests. In practice, this is the step that confirms the package is internally consistent before anything is packed.

`npm pack` creates the tarball exactly as npm would publish it. That gives us a local checkpoint to inspect the final artifact and confirm the package contains the expected installer and payload directories, especially `install-root/`, `bin/`, and `lib/`.

`npm publish --access=public` is the final release step and should only happen after the pack output has been checked for the scoped package.

In practice, the publish flow is:

1. Set the release number in `VERSION`.
2. Run `just pack-prep`.
3. Confirm `package.json` and `install-root/.spar-kit/VERSION` were synchronized by the prep step.
4. Run `npm pack` and inspect the tarball.
5. Confirm the tarball includes the expected install payload and CLI/runtime files.
6. Run `npm publish --access=public`.

## Developer note

The project is currently in a packaging and install-hardening phase: the core shape is in place, release mechanics exist, and the main engineering work is making the installed experience, docs, and publish flow reliable and easy to maintain.
