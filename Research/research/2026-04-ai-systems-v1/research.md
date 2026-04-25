# Research: AI systems for SPAR v1

## Question

After **Cursor**, **Codex**, and **Claude Code**, which two additional AI systems should SPAR target for v1?

The decision criteria for this note are:

1. **Mainstream relevance in March-April 2026**
2. **Practicality of adaptation**
3. **How naturally the system maps to SPAR concepts** such as repo instructions, skills, reusable prompts, and tool/MCP integration

Compatibility note for the current top three systems: our repo research and testing now support a shared-instructions approach centered on `AGENTS.md`, but skill discovery paths still differ. Cursor has been verified to work with repo-local `.agents/skills/`, while Claude Code should still be treated as a `.claude/skills/` target unless `.agents/skills/` is separately verified.

## Decision

Recommend these two for v1:

1. **Windsurf**
2. **GitHub Copilot**

Best next candidate after v1:

1. **Antigravity**

Next after that:

1. **Gemini CLI**

## Why Windsurf makes the cut

### Popularity / market signal

- Windsurf's official editor page states **"1M+ active users"**.
- Windsurf presents itself as a mainstream AI-native editor rather than a niche extension or hobby project.

### Practicality of adaptation

- Windsurf documents support for **`AGENTS.md`**.
- Windsurf has a first-party **Skills** concept with `SKILL.md` and supporting resources.
- Windsurf supports **MCP**.
- Windsurf also has **Rules** and **Workflows**, which gives SPAR several ways to express persistent guidance and repeatable flows.

### Why this matters for SPAR

SPAR already leans toward:

- repository instructions
- skill-like structured workflows
- low-ceremony reusable guidance

Windsurf is therefore a strong fit because the translation cost looks low. A likely compatibility story is:

- keep core repo guidance in `AGENTS.md`
- optionally mirror some behavior into Windsurf Rules
- map SPAR phases or helpers into Windsurf Skills / Workflows where useful

That is a much easier path than adapting to a system with no stable repo-instruction or skill mechanism.

## Why GitHub Copilot makes the cut

### Popularity / market signal

- GitHub's official materials describe Copilot as having **20M+ users** and **77,000+ organizations**.
- On **March 5, 2026**, GitHub reported **60 million Copilot code reviews**, with Copilot participating in **more than one in five** GitHub code reviews.

These are unusually strong adoption signals and make Copilot hard to ignore for a mainstream-first v1.

### Practicality of adaptation

- Copilot supports repository-wide instructions via `.github/copilot-instructions.md`.
- Copilot supports path-specific instruction files.
- Copilot supports **`AGENTS.md`** and also recognizes `CLAUDE.md` / `GEMINI.md` in some flows.
- Copilot documents support for **agent skills**, **prompt files**, **custom agents**, **hooks**, and **MCP servers**.

### Why this matters for SPAR

Copilot gives SPAR a path into:

- GitHub.com workflows
- VS Code workflows
- broader IDE workflows supported by GitHub

Even if Copilot is not the most elegant system for a skill-first methodology, its surface area and distribution are very large. That makes it a valuable v1 target because compatibility would increase the number of teams who can try SPAR without changing tools.

## Why Antigravity now ranks above Gemini CLI

### Product / audience fit

- Google's official product messaging places Antigravity inside **Google AI Studio** as a **full-stack vibe coding** experience.
- That positioning matters for SPAR because one of the intended personas is a **new-to-coding vibecoder** who is more likely to start in a guided visual/editor environment than in a terminal.

### Practicality of adaptation

- Official Google materials describe Antigravity as an **agentic development platform** rather than a raw model endpoint.
- Google positions it as part of the same broader coding ecosystem as Gemini CLI, Cursor, GitHub, JetBrains, Replit, and others.
- Community and support references indicate Antigravity has persistent project guidance concepts such as **Rules**, workspace-level artifacts, and an editor/agent workflow that can likely host SPAR-style conventions.

### Why this matters for SPAR

If SPAR wants to serve not only experienced developers but also newer "vibe coding" users, then supporting an editor-native agentic environment is strategically more important than supporting an additional CLI-first environment.

That does not necessarily mean Antigravity is a cleaner implementation target than Gemini CLI. It means the **persona fit is better** for the intended audience mix.

### Confidence / caveat

- Confidence here is **moderate**, not high.
- The audience argument is strong, but the public official documentation signal for Antigravity customization details is weaker and noisier than it is for Windsurf, Copilot, or Gemini CLI.
- So the ranking change is driven primarily by **user fit**, secondarily by technical fit.

## Why Gemini CLI is still a strong candidate

### Popularity / market signal

- Gemini CLI's official GitHub repository shows very high open-source traction, including **100k+ GitHub stars** by April 2026.
- This is a meaningful signal that the tool is becoming mainstream for terminal-first AI workflows.

### Practicality of adaptation

- Gemini CLI supports project context files through **`GEMINI.md`**.
- Gemini CLI documents support for alternate context filenames, including **`AGENTS.md`**.
- Gemini CLI supports **skills** and **MCP**.
- Gemini CLI has strong terminal-native ergonomics, which align well with toolkits like SPAR.

### Why it now sits below Antigravity

Gemini CLI may still be the better **technical fit** on paper, especially for repo-local instructions and skill reuse. But because one of SPAR's target personas is a beginner-oriented vibecoder, it makes sense to place an editor-native, AI-Studio-centered environment above a terminal-first agent in the priority order.

## Other candidates considered

### Roo Code / Cline-style ecosystems

Pros:

- active communities
- agentic workflows
- VS Code extension model

Cons:

- weaker mainstream signal than Windsurf or Copilot
- higher risk of churn across forks, naming, and product positioning
- less clear payoff for a small v1 support matrix

Conclusion:

Worth watching, but not top-two for v1.

### Aider

Pros:

- respected in terminal-centric workflows
- strong fit for repo-local guidance and disciplined change loops

Cons:

- smaller mainstream footprint than Copilot and Windsurf
- lower strategic distribution value for a public-facing v1

Conclusion:

A good compatibility candidate later, but not the strongest v1 expansion choice.

## Recommendation framing for the roadmap

For v1, "other AI systems" should mean:

- systems that are already meaningfully mainstream by March-April 2026
- systems that have enough official customization surface to express SPAR without awkward hacks
- systems that expand SPAR into distinct adoption channels, not just more variants of the same niche

That leads to this prioritized order for the current persona mix:

1. Cursor
2. Codex
3. Claude Code
4. Windsurf
5. GitHub Copilot
6. Antigravity
7. Gemini CLI

## Sources

### Windsurf

- Official editor page: [https://windsurf.com/windsurf](https://windsurf.com/windsurf)
- Cascade overview: [https://docs.windsurf.com/windsurf/cascade](https://docs.windsurf.com/windsurf/cascade)
- AGENTS.md docs: [https://docs.windsurf.com/windsurf/cascade/agents-md](https://docs.windsurf.com/windsurf/cascade/agents-md)
- Skills docs: [https://docs.windsurf.com/windsurf/cascade/skills](https://docs.windsurf.com/windsurf/cascade/skills)

### GitHub Copilot

- Customization cheat sheet: [https://docs.github.com/copilot/reference/customization-cheat-sheet](https://docs.github.com/copilot/reference/customization-cheat-sheet)
- Repository instructions / AGENTS.md support: [https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- Copilot code review adoption note from **March 5, 2026**: [https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/)
- GitHub post citing **20M+ users** and **77,000+ organizations**: [https://github.blog/news-insights/company-news/goodbye-github/](https://github.blog/news-insights/company-news/goodbye-github/)

### Gemini CLI

- Context files / `GEMINI.md`: [https://geminicli.com/docs/cli/gemini-md/](https://geminicli.com/docs/cli/gemini-md/)
- Skills: [https://geminicli.com/docs/cli/skills/](https://geminicli.com/docs/cli/skills/)
- GitHub repository: [https://github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

### Antigravity

- Google AI Studio full-stack vibe coding announcement: [https://blog.google/innovation-and-ai/technology/developers-tools/full-stack-vibe-coding-google-ai-studio/](https://blog.google/innovation-and-ai/technology/developers-tools/full-stack-vibe-coding-google-ai-studio/)
- Gemini 3 announcement referencing Google Antigravity as Google's new agentic development platform: [https://blog.google/technology/developers/build-with-gemini-3-flash/](https://blog.google/technology/developers/build-with-gemini-3-flash/)
- Google Developers Blog noting the ecosystem of agentic platforms such as Antigravity: [https://developers.googleblog.com/introducing-the-developer-knowledge-api-and-mcp-server/](https://developers.googleblog.com/introducing-the-developer-knowledge-api-and-mcp-server/)

## Notes on confidence

- Confidence is **high** for the top recommendation of **Windsurf** because popularity and adaptation fit both point the same direction.
- Confidence is **moderate-to-high** for **GitHub Copilot** as the second recommendation because the popularity case is stronger than the workflow elegance case, but the official customization surface is now broad enough to make support practical.
- Confidence is **moderate** that **Antigravity** should rank ahead of **Gemini CLI** for SPAR's stated persona mix; this is driven more by audience fit than by a stronger public customization story.
- Confidence is **moderate** that **Gemini CLI** remains the strongest CLI-first follow-on target because of its official docs and open-source traction.
