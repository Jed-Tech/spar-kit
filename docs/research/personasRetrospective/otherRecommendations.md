# Other Recommendations

## Scope

These recommendations apply to parts of `spar-kit` other than the skill files themselves.

## 1. Add one obvious way to start SPAR

The system currently has a discoverability problem around starting the workflow. Beta users should not have to remember which skill to invoke first or how explicit they need to be.

Recommend choosing **one primary entry path** for Beta and teaching it everywhere.

Good candidates to compare:

- a single umbrella entry such as `spar.start`
- a fixed "Start here" pattern in `README.md`
- a fixed "Start here" pattern in `AGENTS.md`
- a short onboarding checklist for invited adopters

My recommendation is:

- pick one primary path
- document it consistently in `README.md` and `AGENTS.md`
- treat every other path as secondary

If Beta is optimized for simplicity, a single memorable entry point is likely worth it.

## 2. Add explicit guidance in `AGENTS.md` about contextual SPAR starts

If agents are expected to begin SPAR even when the user does not invoke a skill name directly, `AGENTS.md` should say so explicitly.

Recommended guidance:

- when a user clearly intends to start a feature/change workflow, begin the appropriate SPAR phase
- infer likely continuity from recent chat when the signal is strong
- confirm the inferred feature briefly instead of resetting context

This would help align agent behavior beyond the skill text alone.

## 3. Add a short onboarding example

New users will benefit from one concrete example showing:

1. a normal conversational request
2. the agent noticing that it should start SPAR
3. a contextual specify opening
4. the flow into plan, act, and retain

This example may do more for discoverability than a long explanation.

## 4. Revisit templates after skill updates

If `spar.specify` and `spar.plan` become more structured in how they ask questions, review the templates afterward to make sure they still reinforce the intended experience.

Likely areas to check:

- whether template comments hint at the intended depth
- whether examples nudge agents toward concise, user-friendly outputs
- whether headings and defaults still match the improved skill behavior

## 5. Consider a lightweight principles section for Beta

A short section in docs could state the intended SPAR interaction principles:

- preserve context
- infer carefully
- ask only useful questions
- distinguish blockers from optional exploration
- feel like a teammate, not a script

This could help keep future changes coherent across skills, docs, and onboarding.

## Recommended priority order

1. Improve `spar.specify`
2. Improve `spar.plan`
3. Choose and document one primary SPAR starting path
4. Update `AGENTS.md` to support contextual starts
5. Add a short onboarding example
6. Revisit templates and polish other skills
