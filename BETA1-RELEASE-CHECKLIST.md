# Beta1 Release Checklist

Use this checklist to make the expanded Beta release real for users coming from the landing page.

Current Beta agent scope:

- Codex
- Cursor
- Windsurf
- GitHub Copilot
- Gemini CLI
- OpenCode
- Claude Code

Validation model for this Beta:

- direct first-party validation: general install, Codex, Cursor
- beta-tester feedback validation: Claude Code, Windsurf, GitHub Copilot, Gemini CLI, OpenCode

## Phase 1: Package Readiness

- [X] Set root `VERSION` to the intended Beta1 release version.
- [X] Create an npm account if needed.
- [X] Enable npm 2FA for publishing.
- [X] Run `npm login` from the release machine.
- [X] Run `just pack-prep`.
- [X] Run `npm pack` and verify the tarball contents.
- [X] Confirm the tarball includes the expected `install-root/`, `bin/`, and `lib/` files.
- [X] Restructure `install-root/` around shared assets plus `targets/*.json`.
- [X] Confirm `install-root/skills/` is the canonical authored skill source.
- [X] Confirm `install-root/targets/default.json` and named target configs exist for the current Beta surface.

`just pack-prep` is the required prep step before `npm pack`. It syncs release version data from root `VERSION` into `install-root/.spar-kit/VERSION` and `package.json.version`, syncs skill asset templates from `templates/` into `install-root/skills/` where those assets exist, verifies the required install payload exists, and runs the current test suite.

## Phase 2: Installer And Policy Verification

- [X] Verify `npx spar-kit install` works from a fresh test repo using the packaged artifact.
- [X] Verify install creates the expected repo-root payload and not a literal `install-root/` directory.
- [X] Verify `AGENTS.md` managed-block create/update behavior.
- [X] Verify `CLAUDE.md` exists in the payload and is treated as a managed SPAR file.
- [X] Verify existing `justfile` is preserved.
- [X] Verify `.spar-kit/VERSION` is managed and updateable.
- [X] Verify `.spar-kit/.local/**` is never overwritten when files already exist.
- [X] Verify `specs/` scaffold files are installed while user-owned work folders are preserved by policy.
- [X] Verify installer reporting includes installed targets.
- [X] Verify installer reporting still matches the current success / notes / failure contract.
- [X] Verify explicit named targets are supported in the installer:
  - [X] `--codex`
  - [X] `--claude`
  - [X] `--cursor`
  - [X] `--copilot`
  - [X] `--windsurf`
  - [X] `--gemini`
  - [X] `--opencode`

## Phase 3: Direct Validation

- [X] Confirm install behavior on Windows.
- [X] Directly validate the default general install.
- [X] Directly validate explicit Codex install (`--codex`).
- [X] Directly validate explicit Cursor install (`--cursor`) at the installer/layout level.
- [X] Validate multi-target install behavior at the installer/layout level (for example `--claude --cursor`).
- [ ] Perform an in-agent manual workflow check in Codex using the current Beta install.
- [ ] Perform an in-agent manual workflow check in Cursor using the current Beta install.

## Phase 4: Beta-Feedback Validation

- [ ] Prepare a short beta feedback request for:
  - [ ] Claude Code
  - [ ] Windsurf
  - [ ] GitHub Copilot
  - [ ] Gemini CLI
  - [ ] OpenCode
- [ ] Ask beta testers to confirm:
  - [ ] install command used
  - [ ] whether the target-native instruction file was recognized
  - [ ] whether the target-native skills path was recognized
  - [ ] whether `spar-init` and `spar-specify` were discoverable
  - [ ] any agent-specific setup quirks or failures
- [ ] Review beta feedback and decide whether any target configs need refinement.

## Phase 5: Landing Page And Docs

- [X] Complete landing page design pass (layout, copy, visual polish, and final CTAs).
- [X] Update the landing page with the exact Beta1 install commands:
  - [X] `npx spar-kit install`
  - [X] `npx spar-kit install --codex`
  - [X] `npx spar-kit install --claude`
  - [X] `npx spar-kit install --cursor`
- [X] Document prerequisites clearly: Node/npm required.
- [ ] Document the target-config installer model and what the installer lays down in the repo.
- [X] Document the next step after install: ask the agent to use `spar-init`.
- [X] Make sure the landing page and root `README.md` say the same thing.
- [X] Apply the remaining README wording tweak needed for final parity with the landing page.
- [ ] Clarify value proposition vs `npx skills` so users understand why/when to use `spar-kit`.
- [ ] Explain the current confidence model:
  - [ ] direct validation for general/Codex/Cursor
  - [ ] beta-feedback validation for the broader agent set
- [ ] Lock the Beta1 published package name and exact user-facing install command before final docs/release steps proceed.
- [ ] Configure GitHub Pages settings for the landing page.
- [ ] Verify the GitHub Pages site is live on the intended public URL.

## Phase 6: Onboarding Flow

- [ ] Validate the full onboarding flow for the direct-validation path:
  - [ ] User visits landing page.
  - [ ] User follows install instructions.
  - [ ] User opens the repo in Codex or Cursor.
  - [ ] User asks the agent to use `spar-init`.
  - [ ] User begins work with `spar-specify`.
- [ ] Run a full end-to-end skill-system test in a fresh repo (install -> `spar-init` -> `spar-specify` -> `spar-plan` -> `spar-act` -> `spar-retain`).

## Phase 7: Release Decision

- [ ] Confirm all blocking pre-publish checklist items above are complete before `npm publish`.
- [ ] Review known Beta1 limits and confirm they are acceptable for release.
- [X] Confirm `just pack-prep` still passes before release.
- [ ] Decide whether any final manual smoke test is needed before publish.
- [ ] Confirm the npm package name is available on npm.
- [ ] Publish the package with `npm publish`.
- [ ] If the package is scoped, publish with `npm publish --access public`.
- [ ] Verify the package page appears on npm after publish.

## Phase 8: Post-Publish Testing (Before Announcements)

- [ ] Run post-publish smoke test from npm (`npx spar-kit@latest install`) in a fresh test repo.
- [ ] Confirm install behavior on macOS using the published npm package.
- [ ] Confirm install behavior on Linux using the published npm package.
- [ ] Gather first beta-tester feedback from at least one non-directly-validated agent target.
