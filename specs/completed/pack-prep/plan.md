# Implementation Plan - pack-prep

## Project Summary
Implement `just pack-prep` so Beta1 packaging uses root `VERSION` as canonical, syncs the derived shipped version files, verifies required install payload assets, runs tests, and leaves the repo ready for `npm pack`.

## Phase: Version Sync
### Phase Summary
Implement the canonical version sync from root `VERSION` into the two derived release locations.

### Related Documents
- [pack-prep_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/completed/pack-prep/pack-prep_spec.md)
- [Summary.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/active/Spar-Install/Summary.md)

### Tasks
- [X] Read root `VERSION`
- [X] Update `install-root/.spar-kit/VERSION`
- [X] Update `package.json.version`

### Notes
- Root `VERSION` is the source of truth.

## Phase: Payload Verification
### Phase Summary
Verify the required packaged install payload exists before packaging proceeds.

### Related Documents
- [pack-prep_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/completed/pack-prep/pack-prep_spec.md)
- [pack-prep_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/completed/pack-prep/pack-prep_spec.md#success-criteria)

### Tasks
- [X] Verify `install-root/AGENTS.md`
- [X] Verify `install-root/justfile`
- [X] Verify `install-root/.agents/skills/`
- [X] Verify `install-root/.spar-kit/.local/tools.yaml`
- [X] Verify `install-root/specs/README.md`

### Notes
- Fail fast if any required payload path is missing.

## Phase: Prep Command
### Phase Summary
Add the `just pack-prep` workflow and connect it to the implementation.

### Related Documents
- [pack-prep_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/completed/pack-prep/pack-prep_spec.md)
- [BETA1-RELEASE-CHECKLIST.md](/c:/Users/jedde/GithubRepos/spar-kit/BETA1-RELEASE-CHECKLIST.md)

### Tasks
- [X] Add the underlying prep implementation
- [X] Add `just pack-prep`
- [X] Print a clear ready-to-pack success message

### Notes
- `pack-prep` prepares for `npm pack`; it does not run `npm pack`.

## Phase: Validation
### Phase Summary
Verify the prep flow succeeds when the repo is ready and fails clearly when it is not.

### Related Documents
- [pack-prep_spec.md](/c:/Users/jedde/GithubRepos/spar-kit/specs/completed/pack-prep/pack-prep_spec.md)

### Tasks
- [X] Run the existing test suite through `pack-prep`
- [X] Validate non-zero failure when a required payload path is missing
- [X] Validate version sync results in all three version locations

### Notes
- Beta1 does not require tarball inspection or `package-lock.json` rewriting.
