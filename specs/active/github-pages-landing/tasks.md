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

- [ ] Re-read:
  - `specs/active/github-pages-landing/github-pages-landing_spec.md`
  - `specs/active/github-pages-landing/core-messaging-and-principles.md`
- [ ] Lock unresolved items before polish:
  - final H1 preference ("lightweight" lead vs SPAR loop lead)
  - exact anchor labels for the locked section order
  - copy button microcopy states
- [ ] Use canonical GitHub repo URL for nav/button targets: `https://github.com/Jed-Tech/spar-kit`
- [ ] Confirm no scope drift versus constraints/out-of-scope list.

## Phase 1 - Page Skeleton and Information Architecture

- [ ] Create/refresh `docs/index.html` semantic structure:
  - top nav (anchor links + one GitHub button)
  - hero section
  - post-install onboarding section (`spar.init`)
  - why-it-works value section
  - workflow section
  - further reading differentiation paragraph section
- [ ] Add semantic landmarks and headings in logical order (`header`, `main`, `section`, `nav`).
- [ ] Keep section order fixed: hero -> initialize -> why -> workflow -> further reading.
- [ ] Ensure nav anchors map to real section IDs and smooth in-page navigation.
- [ ] Use relative local asset/style/script URLs that remain valid under the GitHub Pages project-site path.
- [ ] Keep markup dependency-free and framework-free.

### Validation - Phase 1

- [ ] Open in integrated browser and verify:
  - sections render in correct order
  - anchor links land on correct sections
  - GitHub nav button opens expected target
  - heading hierarchy is coherent and scannable
  - local stylesheet, script, and image URLs still resolve when served from the GitHub Pages-style path
- [ ] Fix structural defects before moving on.

## Phase 2 - Messaging and Copy Integration

- [ ] Apply final hero headline and supporting copy.
- [ ] Add one-line label above install command.
- [ ] Ensure hero command is exactly: `npx spar-kit install`.
- [ ] Place `spar.init` onboarding guidance in the next section directly below hero.
- [ ] Make intent-before-action explicit in copy, not just plan-before-act.
- [ ] Add positive, paragraph-only differentiation content in lower "further reading."
- [ ] Align install/onboarding wording with the active install specs and any README/package wording updated in this same delivery pass.
- [ ] Remove/avoid:
  - social proof claims
  - comparison cards/tables
  - critical competitor language
  - footer link cluster

### Validation - Phase 2

- [ ] Integrated browser content pass:
  - 5-10 second comprehension check (what it is, how to install, what next)
  - verify CTA prominence over secondary content
  - verify differentiation remains constructive and non-critical
- [ ] Revise copy and hierarchy until clear.

## Phase 3 - Visual System and Styling

- [ ] Implement `docs/css` styling with CSS variables for:
  - charcoal/warm background
  - white text
  - warm accent gradient(s)
  - spacing scale and type scale
- [ ] Establish warm, soft, friendly dark-minimal visual language.
- [ ] Apply refined typography choices (avoid generic AI-default look).
- [ ] Ensure clean visual weight and whitespace rhythm for scanability.
- [ ] Keep style lightweight (no dependency imports that undermine static goals).

### Validation - Phase 3

- [ ] Integrated browser visual review at:
  - mobile (approx 375px)
  - tablet (approx 768px)
  - desktop (approx 1280px+)
- [ ] Check:
  - contrast and readability
  - heading/body balance
  - spacing consistency
  - warm accents are subtle, not overpowering
- [ ] Iterate styling defects before interaction work.

## Phase 4 - Interaction and Motion

- [ ] Add tiny copy button for install command (vanilla JS only).
- [ ] Implement accessible feedback state (`Copy` -> `Copied`, then reset).
- [ ] Ensure keyboard activation works (Tab + Enter/Space).
- [ ] Add subtle/moderate motion:
  - CSS-first entrance/hover transitions
  - restrained timing/easing
  - `prefers-reduced-motion` support
- [ ] Avoid heavy or distracting animation.

### Validation - Phase 4

- [ ] Integrated browser interaction pass:
  - copy button works repeatedly
  - feedback state is obvious and non-jarring
  - focus indicators are visible
  - no motion overwhelms content
- [ ] Reduced-motion validation:
  - confirm motion is reduced/disabled appropriately
- [ ] Fix all interaction/accessibility issues.

## Phase 5 - Accessibility, Responsiveness, and Quality Hardening

- [ ] Verify semantic and keyboard accessibility end-to-end.
- [ ] Verify no horizontal overflow or clipped content at key breakpoints.
- [ ] Verify command text is selectable/readable on small screens.
- [ ] Confirm nav usability on mobile and desktop.
- [ ] Confirm static assets resolve correctly from `docs/`.
- [ ] Confirm static assets resolve correctly from the actual GitHub Pages project-site URL shape, not only local file/repo browsing.
- [ ] Run lint/diagnostics for touched files and resolve introduced issues.

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
- [ ] Confirm GitHub Pages-safe relative paths are used for all local assets and same-site references.
- [ ] Confirm no out-of-scope features were introduced.
- [ ] Prepare concise handoff summary:
  - what was implemented
  - what was validated
  - what was adjusted during iterations
  - any remaining risks/questions (should be minimal)

---

## Definition of Done

Done means:

- static dependency-free landing page implemented in `docs/`
- design and messaging align with locked direction
- install and onboarding flows are unmistakably clear
- integrated-browser validation completed through multiple iterations
- accessibility/responsiveness checks pass
- spec success criteria are met with no major gaps
