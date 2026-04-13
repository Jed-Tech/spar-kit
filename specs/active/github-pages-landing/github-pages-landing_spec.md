# github-pages-landing

## Summary
Add a static marketing landing page served from the repository `docs/` folder so GitHub Pages can publish it from the `/docs` source. The page explains Spar-kit’s value and the Specify → Plan → Act → Retain workflow, then drives a first-time-user CTA to install (placeholder: package-manager command) with a secondary CTA (placeholder: “paste this URL into your agent to set up spar-kit”).

## Problem
Prospective adopters need a focused, shareable entry point that sells the workflow and reduces guesswork on how to get started. The root README explains structure but is not optimized as a public-facing marketing surface; the roadmap calls for a static GitHub Pages site aligned with that messaging.

## Goal
Ship a fast, accessible, dependency-free static page (`index.html` plus styles) that works when GitHub Pages uses the `docs/` folder on the default branch, reinforces Spar-kit’s positioning, and drives visitors toward installation via two clear placeholder CTAs (primary: package-manager command; secondary: agent-URL setup).

## Scope
- **Page**: add a static marketing landing page under `docs/` suitable for GitHub Pages.
- **Core messaging**: describe Spar-kit’s value and the Specify → Plan → Act → Retain workflow for first-time users.
- **CTA (primary, placeholder)**: show a copyable “install via package manager” command (exact install method TBD).
- **CTA (secondary, placeholder)**: show a “paste this URL into your agent to set up spar-kit” affordance (exact URL + integration details TBD).
- **Credibility**: include current Beta agent/tooling support as described in repo docs.
- **No build step**: keep it dependency-free static HTML/CSS.

## Non-Goals
- Building a documentation site, blog, or multi-page marketing site (single landing page only).
- Introducing a JS framework, bundler, or node toolchain for the site.
- Finalizing the real install mechanism and agent-URL integration in this change (placeholders only).
- Custom domains / DNS; repository settings configuration is out of scope for code changes.

## Constraints
- Must be valid static HTML/CSS viewable locally and on GitHub Pages.
- Must not rely on a build step or external runtime.
- Copy must stay consistent with the repository’s current facts (workflow, folder layout, skills).
- No tracking scripts or third-party cookies.
- Accessible and responsive (semantic headings, visible focus states, works on narrow viewports).

## Success Criteria
- Landing page exists at `docs/index.html` and loads without errors when opened locally.
- The page clearly communicates: what Spar-kit is, why it’s useful, and the SPAR workflow (Specify → Plan → Act → Retain).
- The page includes two CTAs:
  - Primary CTA shows a copyable placeholder command for “install via package manager” (explicitly labeled as placeholder/TBD).
  - Secondary CTA shows a placeholder “agent setup URL” pattern (explicitly labeled as placeholder/TBD).
- The workflow diagram asset `docs/assets/workflow-diagram.svg` is displayed with meaningful alt text.
- The page is usable on mobile widths (layout adapts) and keyboard navigable (tab focus visible).
- A `docs/.nojekyll` file exists to prevent asset processing issues on GitHub Pages.

## Open Questions
- What is the definitive “install via package manager” command (tool, package name, supported OSes)?
- What is the definitive “agent setup URL” format, and what agents/tools will it support first?
- What is the canonical repo/org URL to use in-page (derive from git remote vs hardcode)?
- Which “Beta support” agents should be named explicitly (and which should be avoided to prevent drift)?

## Decisions
- Host as GitHub Pages from the repo `docs/` folder (no build step).
- Use a single `docs/index.html` entrypoint plus minimal static assets (CSS + existing diagram).
- Treat both install CTAs as placeholders until installation mechanics are defined.

## Documentation Impact
- Adds a public-facing landing page under `docs/` suitable for GitHub Pages publishing from `/docs`.
