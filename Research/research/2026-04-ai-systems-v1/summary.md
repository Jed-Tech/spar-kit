# Summary: AI systems for SPAR v1

## Recommendation

After **Cursor**, **Codex**, and **Claude Code**, support these two systems in v1:

1. **Windsurf**
2. **GitHub Copilot**

If a sixth target is added soon after v1 for the current audience mix, choose **Antigravity**.
After that, choose **Gemini CLI**.

## Compatibility matrix

The table below separates two different questions:

1. Which systems are the best **next v1 targets** for SPAR?
2. Which systems already fit the current **shared instructions + shared skills path** pattern well?

| System | Uses `AGENTS.md` or `CLAUDE.md` | Uses repo `.agents/skills/` | Fit for current shared pattern | Notes |
| --- | --- | --- | --- | --- |
| Codex | Yes - `AGENTS.md` | Yes | Strong | Best current baseline for SPAR's repo-local pattern |
| Cursor | Yes - `AGENTS.md` | Yes | Strong | `.agents/skills/` verified by our testing |
| Claude Code | Yes - `CLAUDE.md` | No documented support | Partial | Use `.claude/skills/`; do not assume `.agents/skills/` |
| Windsurf | Yes - `AGENTS.md` | Yes | Strong | Explicit cross-agent `.agents/skills/` support in docs |
| GitHub Copilot | Yes - `AGENTS.md` or root `CLAUDE.md` | Yes | Strong | Supports multiple agent-instruction and skill locations |
| Gemini CLI | Yes - configurable context names including `AGENTS.md` | Yes | Strong | `.agents/skills/` supported as a workspace alias |
| OpenCode | Yes - `AGENTS.md` and `CLAUDE.md` fallback | Yes | Strong | Good compatibility candidate even though not a current v1 priority |
| Antigravity | Unclear / not yet established in our research | Unclear / not yet established in our research | Weak for now | Still attractive strategically because of persona fit |

## Practical compatibility takeaway

If we care specifically about systems that already align well with the current SPAR convention of:

- shared repo instructions via `AGENTS.md` or `CLAUDE.md`
- shared repo-local skills via `.agents/skills/`

then the strongest documented candidates are:

1. **Codex**
2. **Cursor**
3. **Windsurf**
4. **GitHub Copilot**
5. **Gemini CLI**
6. **OpenCode**

That list is different from the **v1 roadmap priority list**. The roadmap still favors **Windsurf** and **GitHub Copilot** next because they combine compatibility with stronger strategic reach for SPAR's intended audience.

## Packaging Implications

Beta1 `spar-kit` install is currently built and distributed as an npm package.

- The package tarball is built by `npm pack` and later published with `npm publish`.
- The package includes three shipped paths from [`package.json`](/c:/Users/jedde/GithubRepos/spar-kit/package.json): `install-root/`, `lib/`, and `bin/`.
- `install-root/` is the canonical authored source for installable assets.
- `lib/` contains installer behavior such as bootstrap and reporting logic.
- `bin/` contains the CLI entrypoint for `npx spar-kit install`.

Important implications:

- To change what gets installed into user repos, update `install-root/`.
- To change how installation behaves, update `lib/`.
- To change how users invoke the installer, update `bin/` and/or `package.json`.
- Because `install-root/` is the packaging contract for Beta1, adding new installable assets should normally mean adding them there rather than creating a separate manifest system.
