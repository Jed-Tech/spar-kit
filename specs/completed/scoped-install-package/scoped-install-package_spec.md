# scoped-install-package - Intent and Specifications

<!-- Copy this template to specs/active/<change-name>/<change-name>_spec.md (name matches the folder). After Retain: specs/completed/<change-name>/<change-name>_spec.md. -->

## Summary
Change the SPAR installer from the current unscoped package and explicit `install`
subcommand model to a scoped npm package where install is implied by the package
itself. The new canonical public command becomes:

`npx @spar-kit/install [directory] [flags]`

The installer behavior stays the same. This change standardizes the package identity,
simplifies the public CLI surface, and updates user-facing docs to teach the new command.

## Problem
The current package and command shape creates two problems:

1. Publishing `spar-kit` as an unscoped package hit npm naming-policy rejection.
2. The current CLI requires an unnecessary repeated install action:
   `npx <package> install ...`

That shape is awkward for users and does not align with the intent of a package whose
entire purpose is installation. Since this is still pre-release, the project can simplify
the interface now instead of carrying legacy compatibility.

## Scope
- Rename the npm package to `@spar-kit/install`.
- Change the canonical public install command to:
  `npx @spar-kit/install [directory] [flags]`
- Update CLI parsing so the first positional argument is treated as the optional target
  directory instead of a command.
- Remove support for the old explicit `install` subcommand shape.
- Keep the optional directory as the first positional argument.
- Continue validating only:
  - zero or one directory
  - known flags
- Keep the local executable published through `package.json bin`.
- Keep the bin name as `spar-kit`.
- Update help and usage output to show the scoped `npx` form explicitly.
- Update public docs and user-facing copy that currently teach `npx spar-kit install`
  so they teach the new scoped package form instead.

## Out of Scope
- Changing installer behavior, payload layout, or target semantics.
- Adding backward compatibility for `npx @spar-kit/install install ...`.
- Renaming the product or repository away from `spar-kit`.
- Changing the supported target flags themselves.
- Broader workflow or skill redesign unrelated to the package/CLI surface.

## Constraints
- Preserve install behavior, payload contents, target semantics, and warnings.
- Keep the published local executable exposed through `package.json bin` as `spar-kit`.
- The new CLI surface must accept zero or one positional directory followed by known flags.
- The new canonical public command must be the only documented install entry point for this release.
- Broader documentation reconciliation beyond implementation-critical surfaces can be deferred to `spar-retain`.

## Success Criteria
- `package.json` publishes under the scoped package name `@spar-kit/install`.
- Running the CLI through the new package surface works as:
  `npx @spar-kit/install [directory] [flags]`.
- The CLI no longer requires or accepts an explicit `install` subcommand.
- Help and usage output teach the scoped `npx` form explicitly.
- The optional directory remains the first positional argument, and unknown flags or more than one positional argument still fail clearly.
- Existing installer behavior for target flags and repo bootstrap output remains unchanged apart from the command surface and package identity.
- Automated tests cover the new argument surface and pass after the change.
- User-facing docs required for release readiness are updated to the scoped package command.

## Decisions
<!-- Record important product and technical choices that implementation should treat as fixed. -->
- The scoped npm package name is `@spar-kit/install`.
- Install is implied by the package; there is no separate public `install` subcommand.
- No backward compatibility is required for `npx @spar-kit/install install ...`.
- The optional install directory remains the first positional argument.
- Public docs should teach `npx @spar-kit/install [directory] [flags]`.
- The package should continue exposing a local bin named `spar-kit`.
- Broader doc cleanup beyond release-critical surfaces will be discussed during `spar-retain`.

## Open Questions
