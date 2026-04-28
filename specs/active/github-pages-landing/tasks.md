# Tasks - github-pages-landing

## Execution Strategy

Implement in small passes with validation after each pass. Use integrated browser checks as
the primary QA loop, fix issues immediately, and rerun validation until all success criteria
in `github-pages-landing_spec.md` are met.

Validation loop policy for this change:

1. implement a scoped slice
2. validate in integrated browser (desktop + mobile widths)
3. capture defects against spec
4. fix defects
5. re-validate
6. repeat at least 3 full iteration passes before final handoff

---

## Phase 0 - Inputs and Locks

- [x] Re-read:
  - `specs/active/github-pages-landing/github-pages-landing_spec.md`
  - `specs/active/github-pages-landing/core-messaging-and-principles.md`
- [x] Lock unresolved items before polish:
  - final H1 preference locked to "lightweight" lead
  - exact anchor labels locked to `Why`, `Workflow`, `Further Reading`
  - copy button microcopy locked to `Copy` -> `Copied`
- [x] Use canonical GitHub repo URL for nav/button targets: `https://github.com/Jed-Tech/spar-kit`
- [x] Confirm no scope drift versus constraints/out-of-scope list.

## Phase 1 - Page Skeleton and Information Architecture

- [x] Create/refresh `docs/index.html` semantic structure:
  - top nav (anchor links + one GitHub button)
  - hero section
  - post-install onboarding section (`spar.init`)
  - why-it-works value section
  - workflow section
  - further reading differentiation paragraph section
- [x] Add semantic landmarks and headings in logical order (`header`, `main`, `section`, `nav`).
- [x] Keep section order fixed: hero -> initialize -> why -> workflow -> further reading.
- [x] Ensure nav anchors map to real section IDs and smooth in-page navigation.
- [x] Use relative local asset/style/script URLs that remain valid under the GitHub Pages project-site path.
- [x] Keep markup dependency-free and framework-free.

### Validation - Phase 1

- [x] Open in integrated browser and verify:
  - sections render in correct order
  - anchor links land on correct sections
  - GitHub nav button opens expected target
  - heading hierarchy is coherent and scannable
  - local stylesheet, script, and image URLs still resolve when served from the GitHub Pages-style path
- [x] Fix structural defects before moving on.

## Phase 2 - Messaging and Copy Integration

- [x] Apply final hero headline and supporting copy.
- [x] Add one-line label above install command.
- [x] Ensure hero command is exactly: `npx @spar-kit/install`.
- [x] Place `spar.init` onboarding guidance in the next section directly below hero.
- [x] Make intent-before-action explicit in copy, not just plan-before-act.
- [x] Add positive, paragraph-only differentiation content in lower "further reading."
- [x] Align install/onboarding wording with the active install specs and any README/package wording updated in this same delivery pass.
- [x] Remove/avoid:
  - social proof claims
  - comparison cards/tables
  - critical competitor language
  - footer link cluster

### Validation - Phase 2

- [x] Integrated browser content pass:
  - 5-10 second comprehension check (what it is, how to install, what next)
  - verify CTA prominence over secondary content
  - verify differentiation remains constructive and non-critical
- [x] Revise copy and hierarchy until clear.

## Phase 3 - Visual System and Styling

- [x] Implement `docs/css` styling with CSS variables for:
  - charcoal/warm background
  - white text
  - warm accent gradient(s)
  - spacing scale and type scale
- [x] Establish warm, soft, friendly dark-minimal visual language.
- [x] Apply refined typography choices (avoid generic AI-default look).
- [x] Ensure clean visual weight and whitespace rhythm for scanability.
- [x] Keep style lightweight (no dependency imports that undermine static goals).

### Validation - Phase 3

- [x] Integrated browser visual review at:
  - mobile (approx 375px)
  - tablet (approx 768px)
  - desktop (approx 1280px+)
- [x] Check:
  - contrast and readability
  - heading/body balance
  - spacing consistency
  - warm accents are subtle, not overpowering
- [x] Iterate styling defects before interaction work.

## Phase 4 - Interaction and Motion

- [x] Add tiny copy button for install command (vanilla JS only).
- [x] Implement accessible feedback state (`Copy` -> `Copied`, then reset).
- [x] Ensure keyboard activation works (Tab + Enter/Space).
- [x] Add subtle/moderate motion:
  - CSS-first entrance/hover transitions
  - restrained timing/easing
  - `prefers-reduced-motion` support
- [x] Avoid heavy or distracting animation.

### Validation - Phase 4

- [x] Integrated browser interaction pass:
  - copy button works repeatedly
  - feedback state is obvious and non-jarring
  - focus indicators are visible
  - no motion overwhelms content
- [x] Reduced-motion validation:
  - confirm motion is reduced/disabled appropriately
- [x] Fix all interaction/accessibility issues.

## Phase 5 - Accessibility, Responsiveness, and Quality Hardening

- [x] Verify semantic and keyboard accessibility end-to-end.
- [x] Verify no horizontal overflow or clipped content at key breakpoints.
- [x] Verify command text is selectable/readable on small screens.
- [x] Confirm nav usability on mobile and desktop.
- [x] Confirm static assets resolve correctly from `docs/`.
- [ ] Confirm static assets resolve correctly from the actual GitHub Pages project-site URL shape, not only local file/repo browsing.
- [x] Run lint/diagnostics for touched files and resolve introduced issues.

### Validation - Phase 5

- [ ] Integrated browser QA sweep (desktop + mobile emulation):
  - visual regressions
  - interaction regressions
  - anchor behavior
  - copy-to-clipboard behavior
  - readability and contrast
- [ ] Fix and re-test until clean.

## Final Acceptance Pass (Mandatory Multi-Iteration Gate)

- [ ] Perform at least 3 full integrated-browser iteration loops:
  1. full walkthrough and issue capture
  2. targeted fixes
  3. full re-walkthrough
- [ ] Confirm each spec Success Criteria item is explicitly satisfied.
- [x] Confirm GitHub Pages-safe relative paths are used for all local assets and same-site references.
- [ ] Confirm no out-of-scope features were introduced.
- [ ] Prepare concise handoff summary:
  - what was implemented
  - what was validated
  - what was adjusted during iterations
  - any remaining risks/questions (should be minimal)

## Current Open Browser Polish

- [ ] Resolve the warm background glow rendering issue observed in the in-app browser:
  - glow circles should remain visible at rest, not only during scroll/compositor updates
  - glow behavior should remain visually consistent while scrolling
  - avoid reintroducing the unwanted grid-texture emphasis surfaced by earlier fixed-background experiments

---

## Definition of Done

Done means:

- static dependency-free landing page implemented in `docs/`
- design and messaging align with locked direction
- install and onboarding flows are unmistakably clear
- integrated-browser validation completed through multiple iterations
- accessibility/responsiveness checks pass
- spec success criteria are met with no major gaps
