# Implementation Plan - landing-install-chooser

## Summary
Extend the landing-page hero with a lightweight install chooser that keeps the default command primary while letting users switch to curated agent-native install commands for Cursor, Claude, and Codex. Additional supported targets remain accessible through a compact secondary reveal so the page gains clarity without turning the hero into a dense compatibility matrix.

## Approach
Implement this as a focused enhancement to the existing hero command card rather than a hero redesign. Keep one active command display, let the chooser update that single command, and preserve the current copy/select behavior so the command card remains the install source of truth.

Use a two-level interaction model:

- first-class visible choices for `Default`, `Cursor`, `Claude`, and `Codex`
- a compact `More targets` reveal for lower-priority supported targets

Keep the post-hero `spar.init` section unchanged. Scope the feature to hero copy, hero interaction, and command-card styling only.

## Execution Constraints
- Preserve the existing dependency-free `docs/` architecture.
- Keep `npx spar-kit install` as the initial selected and visually recommended command.
- Support only one selected install target at a time in the chooser.
- Do not expose multi-target command building in this feature.
- Keep the install chooser inside the existing command card and avoid turning the hero into a comparison grid or documentation matrix.
- Preserve current command selection and copy affordances after command switching.
- Do not make the post-hero `spar.init` section reactive.
- Keep copy aligned with the existing CLI contract and extended-agent-support spec.

## Tasks
- [x] Re-read the current command-card implementation in `docs/index.html`, `docs/css/landing.css`, and `docs/main.js`.
- [x] Update hero markup to add semantic chooser controls for `Default`, `Cursor`, `Claude`, and `Codex`.
- [x] Add a compact `More targets` reveal for supported secondary options such as `Copilot`, `Windsurf`, `Gemini`, and `OpenCode`.
- [x] Add concise helper copy in the command card that explains default install versus agent-native install without adding visual clutter.
- [x] Update the active command display so it switches among explicit install commands based on the selected option.
- [x] Preserve and re-validate:
  - click-to-select command behavior
  - keyboard selection behavior
  - copy button behavior and feedback
  - focus visibility and keyboard usability for chooser controls
- [x] Update command-card styling so the chooser feels integrated with the existing warm, minimal visual language at mobile and desktop widths.
- [x] Keep the `spar.init` section static, with no reactive command substitution or scope creep below the hero.
- [x] Validate in the in-app browser and refine for clarity, density, and responsiveness.

## Validation Strategy
- Verify first load shows `npx spar-kit install` as the selected default command.
- Verify visible curated choices update the command to:
  - `npx spar-kit install --cursor`
  - `npx spar-kit install --claude`
  - `npx spar-kit install --codex`
- Verify secondary revealed targets update the same command node with their explicit named flags.
- Verify the command remains selectable with one click after changing install types repeatedly.
- Verify copy-to-clipboard continues to work after switching choices.
- Verify keyboard-only navigation can move through chooser controls, activate a choice, and copy the resulting command.
- Verify the hero still reads primarily as an install CTA on mobile, tablet, and desktop.
- Verify the post-hero `spar.init` section remains unchanged in behavior.
- Local validation completed:
  - `node --check docs/main.js`
  - command mapping and static `spar.init` copy confirmed from source
- Browser validation completed with iterative user review in the in-app browser, including:
  - command-card hierarchy and spacing polish
  - `More agents` disclosure wording and behavior
  - elimination of layout jump when revealing additional agents
  - helper-text refinement for default, Codex, and lower-priority targeted options

## Risks / Follow-ups
- The main UX risk is hero density; if the chooser starts to feel heavy, reduce helper copy before adding more UI structure.
- Lower-priority targets may need especially terse labeling so the `More agents` reveal stays secondary.
- Multi-target install documentation is intentionally deferred and should be addressed elsewhere rather than leaking into this landing-page feature.
