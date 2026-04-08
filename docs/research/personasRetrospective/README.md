# Personas Retrospective

This folder captures recommendations that came out of using `spar-kit` on itself to create the personas documentation feature.

These notes are implementation-oriented recommendations, not final decisions.

## Concise summary

- **`spar.specify`** should preserve conversational context, infer the likely feature when the signal is strong, confirm naturally, and sound more like a product-thinking teammate than a scripted intake form.
- **`spar.specify`** should suggest concrete directions, group questions more clearly, and never overwhelm the user with too many questions in one turn.
- **`spar.plan`** should separate blocker questions from optional follow-ups and keep planning conversations direct, concise, and easy to scan.
- **Starting SPAR** should have one obvious, memorable primary path for Beta, documented consistently in `README.md` and `AGENTS.md`.
- **`AGENTS.md` and onboarding docs** should explicitly support contextual SPAR starts so agents can begin the workflow when user intent is clear, even without a literal skill invocation.
- **`spar.act` and `spar.retain`** are in relatively good shape and mainly need light polish around conversational continuity and closeout clarity.

## Files

- `spar.specify.recommendations.md`
- `spar.plan.recommendations.md`
- `spar.act.recommendations.md`
- `spar.retain.recommendations.md`
- `otherRecommendations.md`
