# github-pages-landing

## Summary
Build a dependency-free, static landing page in `docs/` to be served by GitHub Pages from `main` branch `/docs`. The page should communicate SPAR-kit value in seconds, present a warm/dark/minimal brand expression, and drive users to install with a copyable hero command.

Primary install CTA:

- `npx spar-kit install`

Immediate onboarding sequence:

- show install command in hero
- guide user to run `spar.init` in the next section

The page should be visually polished but lightweight: plain `index.html + css + assets` (with optional tiny vanilla JS only for copy-to-clipboard and simple interaction).

## Problem
Prospective adopters need a focused and shareable first-touch page that immediately explains what SPAR-kit is and why it matters. Current repository docs communicate structure and internals but are not optimized for a public-facing "understand in seconds -> install now" experience.

Without a focused landing page:

- users may not quickly grasp SPAR (Specify -> Plan -> Act -> Retain)
- install intent can be buried in longer technical docs
- onboarding can stall before users run `spar.init`
- differentiators versus alternatives remain implicit instead of clearly expressed

## Scope

This change includes:

1. Single-page static landing experience in `docs/` with:
   - hero
   - immediate post-install onboarding (`spar.init`) directly below hero
   - "What you get" value cards (skill-guided workflow, low-context agent rules, tool index, spec structure)
   - "Why SPAR-kit?" prose section (focused context rationale)
   - workflow explanation
   - install + copy interaction in hero
   - "further reading" differentiation paragraph section (on-page only; not required in top nav)

2. Visual system and UX direction:
   - warm, soft, friendly dark minimalism
   - charcoal/warm background with white text
   - soft warm accent gradients used sparingly
   - clean visual weight and strong typography hierarchy

3. Navigation model:
   - minimal top nav: What you get, Why SPAR-kit?, Workflow (same-page anchors), plus one external GitHub button to the repository
   - no "Further reading" or "Install" nav items (Further reading remains on-page below the fold; install stays in the hero)
   - no additional footer link cluster

4. Motion and interaction model:
   - subtle to moderate motion only
   - static-site-compatible effects (CSS-first)
   - tiny copy button for install command

5. Accessibility baseline:
   - semantic markup
   - keyboard-usable navigation and copy control
   - strong text contrast and focus states
   - responsive layout across mobile and desktop

6. Messaging alignment:
   - copy aligns with `core-messaging-and-principles.md`
   - install and onboarding language aligns with the active install contract in repo specs and any README/package wording updated in the same delivery pass

## Out of Scope

This change does not include:

- JavaScript framework migration (React/Vue/Next/etc.)
- build tooling pipeline (bundlers, preprocessors)
- analytics/telemetry integration
- CMS/blog/docs engine integration
- testimonial/social-proof claims
- feature-comparison cards or tables
- dark/light theme toggle
- complex animation libraries
- footer link directory

## Constraints

1. Technical constraints
   - Must be static and dependency-free (`index.html`, CSS files, assets).
   - Keep JavaScript minimal; only small utility behavior (copy button and optional small progressive enhancement).
   - Must run correctly on GitHub Pages from `/docs` without extra runtime setup.
   - Use relative local asset/style/script URLs so the page remains correct under the GitHub Pages project-site path.

2. Design constraints
   - Aesthetic direction is fixed: warm, soft, friendly, minimal dark interface.
   - Visual tone: design-forward and brand expressive, but not loud or cluttered.
   - Use restrained contrast accents; avoid overpowering gradients.

3. Content constraints
   - Hero must prioritize easily copyable install command.
   - Include one-line label above command.
   - `spar.init` appears in the next section below hero, not inside hero CTA.
   - Differentiation section must be paragraph-based and positive (no direct criticism of competitors).
   - No social proof claims.
   - No footer links.

4. UX constraints
   - Minimal nav with internal anchors + one GitHub repo button.
   - Responsive and accessible.
   - Performance-conscious (small asset footprint, no unnecessary scripts).
   - Section order must remain fixed: hero -> initialize (`spar.init`) -> what you get -> why SPAR-kit? -> workflow -> further reading.

## Success Criteria

The change is successful when all criteria below are met:

1. Messaging clarity
   - A new visitor can identify SPAR-kit purpose and loop within 5-10 seconds.
   - Page clearly communicates: lightweight, focused context, intent-before-action, plan-before-act, retain-as-memory.

2. Install flow clarity
   - `npx spar-kit install` is the most visually prominent action in hero.
   - Command can be copied via tiny copy button.
   - Next section clearly instructs user to run `spar.init`.

3. UX and structure
   - Top nav includes internal anchor links (What you get, Why SPAR-kit?, Workflow) and one GitHub button only.
   - Differentiation appears further down the page in paragraph form (Further reading section; optional deep link via URL fragment only).
   - No comparison cards/tables and no footer link list.

4. Design execution
   - Charcoal/warm background and white text implemented consistently.
   - Warm accents are subtle and supportive.
   - Typography and spacing create clear scan hierarchy.
   - Visual style feels intentional, calm, and premium-minimal.

5. Technical quality
   - Works as a static GitHub Pages site from `/docs`.
   - Mobile and desktop layouts are readable and usable.
   - Keyboard focus states and copy button accessibility are present.
   - Motion remains subtle-to-moderate and respects reduced-motion settings.
   - Local assets and same-site links resolve correctly when served from the GitHub Pages project-site URL shape, not just local repo browsing.

## Decisions

1. Platform and delivery
   - Use GitHub Pages with source: `main` branch `/docs`.
   - Implement as static files with no external framework dependency.

2. Visual direction
   - Chosen aesthetic: warm dark minimalism.
   - Design adjectives: simple, warm, capable.
   - Reference inspiration: [CleanMeter](https://www.cleanmeter.app/) for atmosphere/weight balance (inspiration only, not layout cloning).

3. Primary CTA strategy
   - Hero centers on install command with one-line label and tiny copy interaction.
   - Exact command promoted: `npx spar-kit install`.

4. Onboarding sequencing
   - `spar.init` guidance appears directly below hero as the immediate next action.
   - This sequencing keeps hero focused on installation while preserving onboarding continuity.

5. Navigation and information architecture
   - Minimal anchor-based nav: What you get, Why SPAR-kit?, Workflow; single external GitHub button.
   - No footer links.
   - Canonical section order: hero, initialize, what you get, why SPAR-kit?, workflow, further reading.

6. Differentiation style
   - Competitor mention (if present) only in lower "further reading" paragraph copy.
   - Positioning must be comparative by value, never critical or dismissive.
   - Avoid visual comparison matrices/cards/tables.

7. Trust posture
   - No social-proof claims at this stage; focus on product explanation and clarity.

8. Repository target
   - Canonical GitHub repository URL for nav/button use: `https://github.com/Jed-Tech/spar-kit`

9. Motion strategy
   - Subtle-to-moderate motion using CSS-first transitions/entrances.
   - Keep interactions lightweight and non-distracting.

## Open Questions

1. Copy button feedback text
   - Confirm preferred microcopy behavior (for example: "Copy" -> "Copied").
