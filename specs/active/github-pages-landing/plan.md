# Implementation Plan - github-pages-landing

## Summary
- Build a single, dependency-free landing page under `docs/` for GitHub Pages
- Reuse `docs/assets/workflow-diagram.svg` to explain the SPAR workflow
- Provide two explicit **placeholder** CTAs (primary package-manager command, secondary agent setup URL)
- Ensure basic responsiveness and accessibility (semantic structure, focus styles)

## Tasks
- [ ] Confirm what repository URL to use in links (derive from current repo/remote if possible; otherwise use a neutral placeholder)
- [ ] Add `docs/.nojekyll` at the Pages content root
- [ ] Add `docs/css/landing.css` (layout, typography, responsive rules, visible focus styles)
- [ ] Add `docs/index.html` with sections: hero/value prop, workflow explanation (diagram), beta support note, install section with the two placeholder CTAs, footer
- [ ] Ensure `docs/index.html` references `assets/workflow-diagram.svg` correctly and includes meaningful alt text
- [ ] Verify keyboard navigation and mobile layout (narrow viewport)
- [ ] Add/adjust any repo docs cross-link only if required (prefer keeping landing self-contained)

## Notes
- **Validation ideas**:
  - Open `docs/index.html` locally; resize to mobile width; tab through interactive elements
  - Confirm diagram loads and has alt text; check heading hierarchy and contrast
- **Risks**:
  - Copy drift if beta support or install approach changes (mitigate by clearly labeling placeholders/TBD)
  - GitHub Pages asset handling (mitigate with `.nojekyll`)
- **Follow-ups**:
  - Replace placeholder install command once packaging/installer is defined
  - Replace placeholder agent setup URL once the integration flow is defined
