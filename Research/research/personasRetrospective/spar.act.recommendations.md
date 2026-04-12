# Recommendations for `spar.act`

## Goal

Keep `spar.act` strong on execution discipline while making sure it inherits the improved context sensitivity established earlier in the workflow.

## What the retrospective surfaced

Most of the friction in this session happened before implementation, not during implementation. `spar.act` generally behaved well. The main opportunity is to make sure it does not feel disconnected from the human conversation that led into implementation.

## Main recommendation

Make only light changes to `spar.act`.

## Recommended changes

### 1. Preserve conversational continuity in wrap-up messages

When implementation is done, the wrap-up should sound aware of what was just shipped and why it matters. The current completion pattern is good, but it can be nudged toward slightly more human phrasing without losing clarity.

### 2. Encourage concise spec-to-implementation traceability

Tell the agent to mention:

- what was built
- how it maps to the plan
- whether anything notable was learned

This should stay brief, but it helps the user feel that the skill is carrying context, not just checking boxes.

### 3. Keep progress updates grounded in the actual user goal

If the plan is small, updates should stay lightweight and tied to the real user outcome, not just internal task mechanics.

## What not to change

- Do not make `spar.act` more conversational at the expense of execution rigor.
- Do not loosen the spec-change approval rule.
- Do not weaken validation expectations.

## Recommended priority

Low to medium. Worth polishing, but not as urgent as `spar.specify` and `spar.plan`.
