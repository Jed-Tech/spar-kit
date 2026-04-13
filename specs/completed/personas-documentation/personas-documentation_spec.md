# personas-documentation

## Summary
Create a single personas document for `spar-kit` at `docs/Personas/Personas.md` that describes a small set of likely users with memorable names, short narrative descriptions, and example tools they may use. The first version should cover six personas, including one team manager persona and a mix of beginner-friendly and more technical users.

## Problem
The repo has begun referencing user types such as early adopters, vibe coders, and team-oriented users, but that understanding is not yet captured in one clear artifact. Without a shared personas document, roadmap and compatibility decisions risk being ad hoc or inconsistent.

## Goal
Define a concise set of 4 to 8 personas that can guide product, documentation, and compatibility decisions for `spar-kit`, including at least one team manager persona alongside individual users.

## Scope
Produce one file, `docs/Personas/Personas.md`, containing all personas. Each persona should have a clever name, a paragraph describing the persona, and a list of tools they may use. The set should reflect likely `spar-kit` users and include one manager-oriented persona, but it does not yet need to define full adoption journeys, detailed scenarios, or implementation guidance.

## Non-Goals
- Build a full user-research program or claim these personas are validated by interviews
- Define detailed journeys, lifecycle maps, or feature-by-feature requirement matrices
- Commit the roadmap or compatibility plan to any specific persona beyond using the document as input
- Create separate files for each persona in this first iteration

## Constraints
- All personas must live in one file: `docs/Personas/Personas.md`
- The document should stay concise and easy to scan
- Each persona needs a clever name, one paragraph, and a tools list
- The persona set should be broad enough to cover beginners, agent power users, and one team manager
- The first version should use six personas, since that set has already been selected in discussion

## Success Criteria
- `docs/Personas/Personas.md` exists
- The document contains exactly six personas
- Each persona includes a distinct name that hints at the persona
- Each persona includes one paragraph of description
- Each persona includes a list of tools they may use
- At least one persona represents a new-to-coding vibe coder
- At least one persona represents a team manager
- The set reads as useful product guidance for `spar-kit`, not generic marketing copy

## Open Questions
- Whether future iterations should add persona priorities or explicit mappings to roadmap decisions
- Whether later versions should include anti-personas or users `spar-kit` is not trying to optimize for

## Decisions
- The first version will include six personas
- All personas will be documented in a single file at `docs/Personas/Personas.md`
- The initial set should balance accessibility for newer users with credibility for more technical users
- A team manager persona is in scope for the first version

## Documentation Impact
- Adds a new primary documentation artifact under `docs/Personas/`
- Gives the roadmap and future compatibility discussions a stable reference point for who the system is designed to help
