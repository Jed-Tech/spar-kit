# Beta1 Release Checklist

Use this checklist to make Beta1 install real for users coming from the landing page.

## Phase 1: Package Readiness

- [X] Set root `VERSION` to the intended Beta1 release version.
- [X] Create an npm account if needed.
- [X] Enable npm 2FA for publishing.
- [X] Run `npm login` from the release machine.
- [X] Run `just pack-prep`.
- [X] Run `npm pack` and verify the tarball contents.
- [X] Confirm the tarball includes the expected `install-root/`, `bin/`, and `lib/` files.

`just pack-prep` is the required prep step before `npm pack`. It syncs release version data from root `VERSION` into `install-root/.spar-kit/VERSION` and `package.json.version`, verifies the required install payload exists, and runs the current test suite.

## Phase 2: Install Verification

- [X] Verify `npx spar-kit install` works from a fresh test repo using the packaged artifact.
- [X] Verify install creates the expected repo-root payload and not a literal `install-root/` directory.
- [X] Verify `AGENTS.md` create/prepend behavior.
- [X] Verify existing `justfile` is preserved.
- [X] Verify `.spar-kit/VERSION` is managed and updateable.
- [X] Verify `.spar-kit/.local/**` is never overwritten when files already exist.
- [X] Verify installer reporting matches the Beta1 contract.

## Phase 3: Platform Confirmation

- [X] Confirm install behavior on Windows.

## Phase 4: Landing Page And Docs

- [ ] Complete landing page design pass (layout, copy, visual polish, and final CTAs).
- [ ] Update the landing page with the exact Beta1 install command: `npx spar-kit install`.
- [ ] Document prerequisites clearly: Node/npm required.
- [ ] Document what the installer lays down in the repo.
- [ ] Document the next step after install: ask the agent to use `spar-init`.
- [ ] Make sure the landing page and root `README.md` say the same thing.
- [ ] Clarify value proposition vs `npx skills` so users understand why/when to use `spar-kit`.

## Phase 5: Onboarding Flow

- [ ] Validate the full onboarding flow:
- [ ] User visits landing page.
- [ ] User follows install instructions.
- [ ] User opens the repo in the supported agent.
- [ ] User asks the agent to use `spar-init`.
- [ ] User begins work with `spar-specify`.
- [ ] Run a full end-to-end skill-system test in a fresh repo (install -> `spar-init` -> `spar-specify` -> `spar-plan` -> `spar-act` -> `spar-retain`).

## Phase 6: Release Decision

- [ ] Review known Beta1 limits and confirm they are acceptable for release.
- [ ] Confirm `just pack-prep` still passes before release.
- [ ] Decide whether any final manual smoke test is needed before publish.
- [ ] Confirm the npm package name is available on npm.
- [ ] Publish the package with `npm publish`.
- [ ] If the package is scoped, publish with `npm publish --access public`.
- [ ] Verify the package page appears on npm after publish.


## Phase 7: Post-Publish Testing (Before Announcements)

- [ ] Run post-publish smoke test from npm (`npx spar-kit@latest install`) in a fresh test repo.
- [ ] Confirm install behavior on macOS using the published npm package.
- [ ] Confirm install behavior on Linux using the published npm package.
