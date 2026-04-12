# Recommendations for `spar.specify`

## Goal

Make `spar.specify` feel like an intelligent product-thinking teammate that notices conversational momentum, suggests useful directions, and still preserves the rigor of specification work.

## What the retrospective surfaced

- The current first-turn rule is too rigid.
- It preserves process, but it can make the agent feel like it forgot the immediately preceding conversation.
- When the user clearly signals "start SPAR for the thing we were just discussing," the opening should acknowledge that context instead of sounding reset.
- The current skill is strong on discipline but weak on collaborative product-manager behavior.

## Main recommendation

Revise `spar.specify` so it has a **context-aware opening rule** instead of a near-verbatim fixed opener.

The new behavior should be:

1. infer the most likely feature or change from recent chat when it is reasonably clear
2. confirm that inference naturally
3. invite correction if the inference is wrong
4. continue with required clarification and specification work

## Recommended opening behavior

Instead of forcing one nearly fixed prompt, allow patterns like:

- "It looks like you want to start SPAR for the personas work we were just discussing. Is that the feature you mean, or did you have something else in mind?"
- "I think the feature here is the personas documentation work. If that is right, I can start specifying it with you. If not, point me at the change you mean."

This preserves rigor while making the agent sound aware and helpful.

## Recommended skill changes

### 1. Add contextual inference guidance

Tell the agent to infer the likely feature from:

- the most recent explicit user request
- the most recent artifact or folder just created
- the most recent concrete topic under discussion

Inference should only be used when the signal is strong. If the signal is weak, ask more openly.

### 2. Replace the fixed opener with an opening decision rule

The skill should say something like:

- if the user has just indicated they want to begin SPAR and the feature is clear from recent chat, acknowledge the likely feature and ask for confirmation or correction
- if the user wants to begin SPAR but the feature is unclear, ask what change they want to work on

This is better than requiring one sentence every time.

### 3. Explicitly adopt a product-manager style

The skill should tell the agent to:

- clarify the problem
- suggest promising directions
- offer a few concrete possibilities
- help the user sharpen the feature before writing the spec

This should be framed as a requirement, not just a tone preference.

### 4. Add structured question groups for the specify phase

A good pattern is:

- `Critical Questions`
- `Suggestions and Important Follow-ups`
- `Remaining Follow-up Questions`

Use only the sections that are actually needed. Do not force all three every time.

This gives the agent a way to be both structured and collaborative without dumping a wall of questions.

### 5. Cap question load per turn

Set a hard limit of **no more than 7 questions in one turn**.

This should be explicit in the skill. Without it, even a helpful agent can overwhelm the user.

## Recommended wording direction for the skill

The skill should emphasize:

- preserve context from the thread
- sound like a teammate, not a script
- ask questions that move the feature forward
- suggest concrete options when that would help the user react
- never let helpful inference become an excuse to skip the spec process

## Risks to avoid

- over-inference that silently picks the wrong feature
- treating suggestions as replacements for clarification
- always emitting all question sections even when the change is simple
- preserving the current rigid opener in a way that keeps causing context reset

## Recommended priority

High. This is one of the clearest friction points surfaced by the retrospective.
