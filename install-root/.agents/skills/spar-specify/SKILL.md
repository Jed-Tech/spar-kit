---
name: spar.specify
description: >-
  Use this skill when the user wants to define a new feature, bug fix, or
  significant change before planning or implementation. Clarify intent, problem,
  scope, out-of-scope boundaries, success picture, important unknowns, and a
  folder-safe change name; create the initial SPAR spec without drafting
  implementation tasks or build steps.
---

# Specify

Turn a rough or emerging idea into a clear enough change definition that it can be used to create an implementation plan.

This is a discovery phase. Ask, scope, define the problem, and brainstorm with
the user. Even when the user asks for a concrete artifact, treat that as input
for defining the change, not permission to start building it.

## Roles

- The user is the domain expert. You need to ask them questions so you understand their intent.
- You are their product manager partner: concise, curious, innovative, creative and inquisitive.

Use thread context. If the change is obvious, confirm your understanding instead
of making the user restate it. If it is not obvious, ask the next best question.
Good questions are your main tool for success in this stage.

## Boundaries

- Do not draft implementation steps, tasks, page structure, copy, components, or
  build steps during Specify.
- Do not transition to `spar.plan` on first contact.
- Wait to create files until the user and agent have settled the folder-safe
  `<change-name>` and high-level intent.
- Default location is `specs/active/<change-name>/`.
- Optional notes and artifacts such as `research.md` may live in the change folder once it
  exists.

## Template

Before creating `<change-name>_spec.md`, read [assets/spec.md](assets/spec.md)
and use it as the template.

During Specify, fill the sections that can be honestly known from discovery.
Usually this means `Summary`, `Problem`, `Scope`, `Out of Scope`, and
`Open Questions`. Leave further sections empty for now:
`Constraints`, `Success Criteria`, and `Decisions`.

## Conversation Guidance

- Keep replies short, especially the first reply.
- First reply when the change is unclear: ask one primary question about the desired change.
- Save deeper prompts about beneficiaries, acceptance, tradeoffs, and risks for
  later turns unless the user already volunteered that context.
- Offer at most three short options when the user seems stuck.
- If intent, scope, or success is still fuzzy, keep working with the user before
  planning. This skill may take several turns. Do not jump to implementation. Remember good questions lead to great outcomes.

## Outcomes

Specify is complete when:

1. A change folder exists under `specs/active/`, `specs/next/`, or `specs/later/`.
2. The folder name is descriptive, folder-safe, and aligned with the user.
3. `<change-name>_spec.md` exists from [assets/spec.md](assets/spec.md).
4. The spec captures the current intent, problem, scope boundaries, and material
   open questions without inventing implementation detail.

## Completion

When the outcomes are satisfied:

1. Briefly recap the change name, scope, and main risks or unknowns.
2. If the folder is under `specs/next/` or `specs/later/`, stop unless the user
   asks to move it to `specs/active/`.
3. If the folder is under `specs/active/`, ask: "Ready to turn this into an
   implementation plan?"
4. Only start `spar.plan` after the user confirms.

If any outcome is not satisfied, stay in Specify and ask the next best question
or offer a few concrete directions to help the user converge.

## Artifact Recap

| Artifact | In this phase |
| --- | --- |
| `<change-name>_spec.md` | Intent, problem, scope boundaries, and material open questions |
| Other files in the change folder | Optional, once the folder exists |
