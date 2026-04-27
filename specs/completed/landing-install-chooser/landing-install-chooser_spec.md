# landing-install-chooser - Intent and Specifications

## Summary
Add a lightweight install-choice feature to the GitHub Pages landing page so visitors can quickly choose the most appropriate installation path without losing the current page's fast, hero-first install flow.

The feature preserves the existing primary CTA while making agent-specific install options easy to discover and understand from the hero command card itself.

## Problem
The landing page currently presents one install command prominently: `npx spar-kit install`.

That keeps the page simple, but the product now supports explicit target-specific installs such as `--cursor`, `--claude`, and `--codex`. A visitor who wants an agent-native setup may not realize those options exist, may not know whether they should use the default install, or may leave the page to search repository docs for the right command.

Without an install-choice feature:

- agent-specific install options stay implicit
- users may choose the default install when they actually want a target-native layout
- the landing page misses a chance to connect install intent to the user's working environment
- adding too many raw commands to the hero later could create clutter and reduce clarity

## Scope
This change includes:

1. A landing-page feature that helps the user choose an installation type without leaving the page.
2. A curated chooser model centered on:
   - default install
   - Cursor install
   - Claude install
   - Codex install
3. Clear explanation of when to use the default install versus an agent-specific install.
4. A way to reveal or access additional supported install targets without making the primary landing experience feel crowded.
5. Updated copy and interaction behavior as needed so the selected install option can be copied or used as the page's active command.
6. Spec and UX decisions that preserve the current warm, minimal, install-first landing-page direction.
7. A single-target selection model only; multi-target install combinations remain documented elsewhere.

## Out of Scope
This change does not include:

- changing the underlying installer contract or install flag behavior
- removing the default install path as the primary recommended option
- documenting or exposing multi-target install combinations in the landing-page chooser
- turning the landing page into a full documentation matrix of every agent target
- adding backend logic, analytics, or personalization
- redesigning unrelated landing-page sections outside the install-choice flow except where small supporting adjustments are needed
- making the post-hero `spar.init` section reactive to the selected install type
- introducing a framework or dependency-heavy UI control

## Constraints
1. Technical constraints
   - Must remain static and dependency-free within the existing `docs/` landing-page implementation.
   - JavaScript should remain minimal and limited to command switching, copy behavior, and small accessibility support.
   - The feature must work correctly with relative local asset/script/style URLs under GitHub Pages project-site routing.

2. UX constraints
   - The hero must remain the fastest path to install.
   - `npx spar-kit install` must remain the primary recommended option.
   - The chooser must reduce confusion, not create a command wall or comparison matrix.
   - The chooser supports one install target selection at a time; it does not construct multi-target commands.
   - The selected install command must remain easy to select and copy.
   - The control must be keyboard-usable and readable on small screens.

3. Content constraints
   - Curated top-level choices are limited to:
     - Default
     - Cursor
     - Claude
     - Codex
   - Additional supported targets may be accessible secondarily, but should not dominate the hero.
   - Explanatory copy should clarify when the default install is appropriate versus when an agent-native install is appropriate.
   - The page should avoid overstating support quality for lower-priority targets that may rely more on broader beta feedback than on first-party daily use.

4. Design constraints
   - The chooser must preserve the current warm, soft, dark-minimal design direction.
   - It should feel integrated with the existing command card rather than like a separate settings UI.

## Success Criteria
1. Install-path clarity
   - A visitor can quickly tell there is a default install path and optional agent-specific paths.
   - A visitor can understand when to use the default install versus a curated agent-native install without leaving the hero area.

2. Hero usability
   - The hero still reads primarily as an install CTA, not as a configuration screen.
   - Switching among curated install options updates the displayed install command clearly and reliably.
   - The active command remains selectable and copyable with the existing command-selection and copy affordances.

3. Information hierarchy
   - The default install remains visually recommended and is the initial selected state.
   - Curated options for Cursor, Claude, and Codex are visible without forcing the user to scan a long list.
   - Additional supported targets are available through a lower-emphasis reveal pattern.

4. Accessibility and responsiveness
   - Install-choice controls are keyboard-usable with visible focus states.
   - Labels and commands remain readable and tappable at mobile and desktop sizes.
   - Copy feedback and command selection continue to work after changing the selected install type.

5. Messaging integrity
   - Landing-page copy remains aligned with the install contract:
     - no flags means general install
     - one target flag means that target's native layout
   - The chooser does not imply that multi-target installs are part of this landing-page flow.
   - The feature preserves the current install-first, calm, minimal landing-page tone.

## Decisions
1. Chooser model
   - Use a curated chooser rather than exposing the full target list as equal first-class choices.
   - First-class hero choices are: Default, Cursor, Claude, Codex.

2. Placement
   - The chooser lives inside the existing hero command card so the install decision and resulting command stay tightly coupled.
   - The command shown in the card is always the active selected install command.

3. Recommendation strategy
   - Default install is the initial and visually recommended selection.
   - Agent-native options are presented as explicit alternatives for users who already know their working environment.

4. Additional-target strategy
   - Lower-priority supported targets such as Copilot, Windsurf, Gemini, and OpenCode are revealed through a compact secondary "More agents" disclosure inside the command card.
   - These targets remain available but visually de-emphasized relative to the curated set.

5. Command mapping
   - Default: `npx spar-kit install`
   - Cursor: `npx spar-kit install --cursor`
   - Claude: `npx spar-kit install --claude`
   - Codex: `npx spar-kit install --codex`
   - Additional targets use their explicit named flags according to the CLI contract.
   - The chooser only presents one active target command at a time; it does not build combined multi-target commands.

6. Explanation model
   - The chooser should include short guidance that helps users choose:
     - default install as the recommended option that works with most AI agent platforms
     - Cursor and Claude as distinct native-layout options
     - Codex and the lower-priority targeted options as using the same repo-local layout as Default

7. Implementation style
   - The feature should be implemented as a lightweight enhancement to the existing command card, not as a separate wizard or docs table.
   - The existing post-hero `spar.init` section remains static in this project and should not react to chooser selection.

## Open Questions
