# Implementation Plan - scoped-install-package

<!-- Plan/act use specs/active/<change-name>/plan.md. After Retain: specs/completed/<change-name>/plan.md. -->
<!-- This plan should align with <change-name>_spec.md in the same folder. -->

## Summary
Update the SPAR installer to publish as `@spar-kit/install` and simplify the CLI
surface so install is implied by the package. Keep installer behavior unchanged,
preserve the local `spar-kit` bin, and update release-critical docs and tests to
teach the new scoped `npx` command.

## Approach
Make the package identity and CLI surface change together so the new command is
internally consistent end to end. Start by updating the package metadata and the
CLI parser/usage text, then adjust automated tests to validate the implied-install
surface. Once behavior and tests are aligned, update release-facing docs such as
the landing page and README to teach `npx @spar-kit/install ...`.

## Execution Constraints
- Do not change installer payload behavior or target semantics.
- Do not preserve or add support for the old `... install ...` surface.
- Keep the `bin` name as `spar-kit`.
- Keep the optional directory as the first positional argument.
- Update only release-critical docs in this change; leave broader documentation
  reconciliation for `spar-retain`.

## Tasks
<!-- Ordered, concrete, checkable steps. -->
- [x] Update package metadata to publish as `@spar-kit/install` while preserving the local `spar-kit` bin.
- [x] Refactor `lib/cli.mjs` so the first positional argument is treated as the optional directory, known flags are validated, and usage/help text teaches `npx @spar-kit/install [directory] [flags]`.
- [x] Update CLI-oriented automated tests to cover the implied-install surface and remove assumptions about the legacy `install` subcommand.
- [x] Update release-facing docs and user-facing install copy to use `npx @spar-kit/install ...` where this change must be reflected now.
- [x] Run repo validation for tests and package preparation, and verify the packaged tarball reflects the scoped package identity.

## Validation Strategy
<!-- List the checks, tests, or observations that will confirm success. -->
- Ran `npm test`.
- Ran `just pack-prep` to confirm version sync, payload verification, and tests still pass.
- Ran `npm pack` and confirmed the produced tarball metadata reports the package name as `@spar-kit/install`.
- Inspected `package/package.json` inside `spar-kit-install-0.1.0.tgz` to confirm the packaged name is `@spar-kit/install` while the local bin remains `spar-kit`.
- Manually inspected updated usage/help text and key user-facing docs for consistent `npx @spar-kit/install ...` examples.

## Risks / Follow-ups
<!-- Capture notable risks, deferred work, or decisions that may need follow-up. -->
- Active specs and retained historical docs may still reference `npx spar-kit install`; broader reconciliation is deferred to `spar-retain`.
- Scoped package publishing will require `npm publish --access=public` at release time.
- The local executable remains `spar-kit`, so internal tooling and docs must stay clear about the difference between the published package name and the local bin name.
