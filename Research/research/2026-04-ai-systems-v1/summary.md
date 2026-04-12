# Summary: AI systems for SPAR v1

## Recommendation

After **Cursor**, **Codex**, and **Claude Code**, support these two systems in v1:

1. **Windsurf**
2. **GitHub Copilot**

If a sixth target is added soon after v1 for the current audience mix, choose **Antigravity**.
After that, choose **Gemini CLI**.

## Why these two

### Windsurf

- Mainstream enough to matter now
- Best fit for SPAR's structure
- Official support for `AGENTS.md`, Skills, Rules, Workflows, and MCP
- Lowest expected translation cost from the current SPAR approach

### GitHub Copilot

- Massive distribution and adoption
- Official support for repo instructions, `AGENTS.md`, prompt files, skills, hooks, custom agents, and MCP
- Extends SPAR into GitHub-native and IDE-native workflows

## Why Antigravity ranks above Gemini CLI

One of SPAR's intended users is a new-to-coding vibecoder. That user is more likely to adopt an editor-native or AI-Studio-native agent than a terminal-first CLI agent. Because of that, **Antigravity** is a better next compatibility target than **Gemini CLI** even if Gemini CLI is cleaner technically.

## Why not Gemini CLI first

Gemini CLI is very promising and technically compatible, but for this audience mix it loses first to GitHub Copilot on ecosystem reach and then to Antigravity on beginner-friendly vibe-coding fit.

## Practical interpretation

For v1, "other AI systems" should mean:

- not just popular systems
- not just technically elegant systems
- but systems that are both widely relevant and realistic to support without over-stretching the project

On that basis, **Windsurf + GitHub Copilot** is the best pair.
