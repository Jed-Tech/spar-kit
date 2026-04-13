# Implementation Plan - Spar-Install

## Project Summary

Implement Beta1 `spar-kit` installation around `npx spar-kit install`, using `install-root/` as the canonical authored install source. The work should deliver one installer engine, one repo-bootstrap flow, and one reporting flow that match the active install specs.

## Phase: Install Root Alignment
### Phase Summary

Align repo source structure and authored install content so `install-root/` is the clear source of truth for everything that ships in Beta1.

### Related Documents

- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)
- [install-root_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-root_spec.md)
- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)

### Tasks
- [ ] Verify `install-root/` contains the complete Beta1 install payload and only installable content.
- [ ] Confirm `install-root/specs/README.md` is the intended installed `specs/README.md`.
- [ ] Confirm install-root content matches the current Beta1 decisions for `AGENTS.md`, `justfile`, `.agents/skills/`, and `.spar-kit/.local/tools.yaml`.

### Notes

- Do not expand scope into Beta2 platform-target behavior here.

## Phase: Installer Engine
### Phase Summary

Implement the Beta1 installer entry point and package flow so `npx spar-kit install` installs from `install-root/` without requiring a separate manifest.

### Related Documents

- [installer-engine_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/installer-engine_spec.md)
- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)

### Tasks
- [ ] Implement the `install` command for Beta1.
- [ ] Package `install-root/` as the install payload for the published build.
- [ ] Ensure installed payload is materialized as repo-root content, not as a literal `install-root/` directory.

### Notes

- Beta1 requires only the `install` command.

## Phase: Repo Bootstrap
### Phase Summary

Implement repo-local file application rules, preserve/update boundaries, and reinstall behavior.

### Related Documents

- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)
- [install-root_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-root_spec.md)

### Tasks
- [ ] Implement `AGENTS.md` creation/prepend behavior.
- [ ] Implement `justfile` create-if-missing behavior.
- [ ] Implement `.spar-kit/.local/**` create-only-if-absent behavior.
- [ ] Implement managed install/update behavior for the remaining shipped paths.

### Notes

- Preserve non-SPAR content where the bootstrap spec requires it.

## Phase: Reporting
### Phase Summary

Implement Beta1 installer output so users and agents get a clear success/failure result and the right next step.

### Related Documents

- [install-report_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-report_spec.md)
- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)

### Tasks
- [ ] Implement Beta1 `success` and `failure` reporting.
- [ ] Add `Warnings:` output when warnings exist.
- [ ] Add the Beta1 next-step recommendation to use `spar.init` on success.

### Notes

- Keep reporting aligned with the fixed Beta1 output contract.

## Phase: Validation
### Phase Summary

Verify that the implemented installer matches the current Beta1 install specs and behaves safely on re-run.

### Related Documents

- [spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/spec.md)
- [repo-bootstrap_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/repo-bootstrap_spec.md)
- [install-report_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/install-report_spec.md)

### Tasks
- [ ] Validate a clean Beta1 install into a test repo.
- [ ] Validate reinstall behavior for managed files and preserved files.
- [ ] Validate reporting output for success, failure, and warning cases.

### Notes

- Record any spec gaps discovered during implementation before expanding scope.
