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

The package installs a working repository structure rather than leaving users to assemble one manually. That payload includes items such as `AGENTS.md`, `justfile`, `.spar-kit/`, and `specs/`.

The workflow model is centered on named change folders under `specs/`, moving work through active delivery and then into retained history. Agent skills such as `spar-init`, `spar-specify`, `spar-plan`, `spar-act`, and `spar-retain` are part of the operating model and guide the user through that lifecycle.

The skill content is designed to stay portable across agent ecosystems, but discovery paths still vary by tool. In particular, Cursor has been verified to work with repo-local `.agents/skills/`, while Claude Code should use `.claude/skills/` as its supported repo-local skill path.

The `docs/` folder is the public-facing landing page for users. It is intended to be served as a static GitHub Pages website, giving users a lightweight entry point for install guidance, workflow explanation, and onboarding into the kit.

## Release and publish process

`just pack-prep -> npm pack -> npm publish`

Publishing is driven from the root `VERSION` file. The repo treats that file as the canonical release version, and the publish flow is designed to make sure the packaged artifact stays aligned with it.

`just pack-prep` is the required pre-publish gate. It syncs the root version into derived package locations, verifies that the required install payload exists, and runs the current automated tests. In practice, this is the step that confirms the package is internally consistent before anything is packed.

`npm pack` creates the tarball exactly as npm would publish it. That gives us a local checkpoint to inspect the final artifact and confirm the package contains the expected installer and payload directories, especially `install-root/`, `bin/`, and `lib/`.

`npm publish` is the final release step and should only happen after the pack output has been checked. If the package is ever published under a scope, the public publish form should be used as needed.

In practice, the publish flow is:

1. Set the release number in `VERSION`.
2. Run `just pack-prep`.
3. Confirm `package.json` and `install-root/.spar-kit/VERSION` were synchronized by the prep step.
4. Run `npm pack` and inspect the tarball.
5. Confirm the tarball includes the expected install payload and CLI/runtime files.
6. Run `npm publish`.

## Developer note

The project is currently in a packaging and install-hardening phase: the core shape is in place, release mechanics exist, and the main engineering work is making the installed experience, docs, and publish flow reliable and easy to maintain.
