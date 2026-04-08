# Recommendations for `spar.plan`

## Goal

Make `spar.plan` feel direct, useful, and non-overwhelming while still gathering the information needed for a strong plan.

## What the retrospective surfaced

- Too many questions in one turn is tiring.
- Users need to see which questions are blockers and which are optional.
- The plan phase should feel forward-moving, not like a broad intake interview.

## Main recommendation

Give `spar.plan` an explicit **question budgeting rule** and a **two-tier follow-up structure**.

## Recommended behavior

### 1. Cap questions per turn

Never ask more than **7 questions in a single turn**.

This should be a hard rule in the skill, not just a stylistic suggestion.

### 2. Separate blockers from optional exploration

Use two labeled sections when follow-up questions are needed:

- `Key Follow-Up Questions`
- `Optional Follow-Ups`

This makes the planning conversation easier to scan and lowers the user's sense of being interrogated.

### 3. Ask optional follow-ups only when budget allows

Recommended default:

- include `Optional Follow-Ups` in the same turn only if doing so still keeps the turn comfortably within the question budget
- otherwise ask only the key blockers first
- defer optional questions until after the blockers are resolved

This is the best balance between completeness and user comfort.

### 4. Favor directness over breadth

The skill should push the agent to ask only questions that:

- unblock success criteria
- resolve scope ambiguity
- change sequencing, risk, or validation meaningfully

If a question does not materially improve the plan, it should usually be omitted.

## Recommended wording direction for the skill

Tell the agent to:

- be direct and forward-moving
- minimize interruption cost
- distinguish clearly between required answers and useful-but-optional inputs
- avoid broad brainstorming once the work is already specific enough to plan

## Risks to avoid

- hiding critical blockers inside a long mixed list
- using optional questions to delay planning
- asking compound questions that technically stay under the limit but still overwhelm the user

## Recommended priority

High. This is a straightforward quality-of-experience improvement with clear implementation guidance.
