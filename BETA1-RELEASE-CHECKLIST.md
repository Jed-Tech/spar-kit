# Beta1 Release Checklist

Use this checklist to make Beta1 install real for users coming from the landing page.

## Phase 1: Package Readiness

- [ ] Set root `VERSION` to the intended Beta1 release version.
- [ ] Create an npm account if needed.
- [ ] Enable npm 2FA for publishing.
- [ ] Run `npm login` from the release machine.
- [ ] Run `just pack-prep`.
- [ ] Run `npm pack` and verify the tarball contents.
- [ ] Confirm the tarball includes the expected `install-root/`, `bin/`, and `lib/` files.

`just pack-prep` is the required prep step before `npm pack`. It syncs release version data from root `VERSION` into `install-root/.spar-kit/VERSION` and `package.json.version`, verifies the required install payload exists, and runs the current test suite.

## Phase 2: Install Verification

- [ ] Verify `npx spar-kit install` works from a fresh test repo using the packaged artifact.
- [ ] Verify install creates the expected repo-root payload and not a literal `install-root/` directory.
- [ ] Verify `AGENTS.md` create/prepend behavior.
- [ ] Verify existing `justfile` is preserved.
- [ ] Verify `.spar-kit/VERSION` is managed and updateable.
- [ ] Verify `.spar-kit/.local/**` is never overwritten when files already exist.
- [ ] Verify installer reporting matches the Beta1 contract.

## Phase 3: Platform Confirmation

- [ ] Confirm install behavior on Windows.
- [ ] Confirm install behavior on macOS.
- [ ] Confirm install behavior on Linux.

## Phase 4: Landing Page And Docs

- [ ] Update the landing page with the exact Beta1 install command: `npx spar-kit install`.
- [ ] Document prerequisites clearly: Node/npm required.
- [ ] Document what the installer lays down in the repo.
- [ ] Document the next step after install: ask the agent to use `spar.init`.
- [ ] Make sure the landing page and root `README.md` say the same thing.

## Phase 5: Onboarding Flow

- [ ] Validate the full onboarding flow:
- [ ] User visits landing page.
- [ ] User follows install instructions.
- [ ] User opens the repo in the supported agent.
- [ ] User asks the agent to use `spar.init`.
- [ ] User begins work with `spar.specify`.

## Phase 6: Release Decision

- [ ] Review known Beta1 limits and confirm they are acceptable for release.
- [ ] Confirm `just pack-prep` still passes before release.
- [ ] Decide whether any final manual smoke test is needed before publish.
- [ ] Confirm the npm package name is available on npm.
- [ ] Publish the package with `npm publish`.
- [ ] If the package is scoped, publish with `npm publish --access public`.
- [ ] Verify the package page appears on npm after publish.
