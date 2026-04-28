# spar-kit

SPAR-kit is a lightweight, spec-driven workflow for AI-assisted software development.
It helps humans and AI agents align intent, plan clearly, act with less drift, and retain
durable project memory.

View the product homepage: [https://jed-tech.github.io/spar-kit/](https://jed-tech.github.io/spar-kit/)

> **Specify -> Plan -> Act -> Retain**

## Install

Choose the install type that matches the repo-local layout you want:

- `npx @spar-kit/install`
  General SPAR layout. Works with most AI agent platforms.
- `npx @spar-kit/install --cursor`
  Use when you want the Cursor-native SPAR layout.
- `npx @spar-kit/install --claude`
  Use when you want the Claude-native SPAR layout.
- `npx @spar-kit/install --codex`
  Works with Codex. Same repo-local layout as Default.
- `npx @spar-kit/install --copilot`
  Works with Copilot. Same repo-local layout as Default.
- `npx @spar-kit/install --windsurf`
  Works with Windsurf. Same repo-local layout as Default.
- `npx @spar-kit/install --gemini`
  Works with Gemini. Same repo-local layout as Default.
- `npx @spar-kit/install --opencode`
  Works with OpenCode. Same repo-local layout as Default.

## Immediate next step

After install, ask your agent to use `spar-init`

`spar-init` does more than a quick setup check. Its purpose is updating SPAR-kit's
local tool index so your AI knows exactly which tools, CLIs, and project commands
are available in your repo.

That matters because agents work better when they do not have to guess. With a tool
index, they spend less time probing the environment, use fewer tokens on tool
discovery, and make more reliable decisions about how to act in your project.

The `spar-init` skill will quickly:
1. Check that your SPAR-kit install is current
2. Index available repo tools in `.spar-kit/.local/tools.yaml`

Once that is done, start your first change with `spar-specify`.

## Workflow

SPAR-kit gives every change a clear operating loop from intent to shipped work to retained
project memory.

1. **Specify**
   Clarify goals, scope, and constraints before implementation starts.
2. **Plan**
   Turn the change into an explicit sequence that reduces drift.
3. **Act**
   Implement in the repository with validation tied to the plan and spec.
4. **Retain**
   Preserve decisions and shipped behavior as durable project memory.

## What you get

SPAR-kit installs a small, repo-native workflow layer:

- Skills to guide the work
- Rules to keep agents aligned
- A tool index so AI knows what is available
- A `specs/` structure for active and completed changes

### Skill-guided workflow

Reusable SPAR skills guide agents through Specify, Plan, Act, and Retain without needing
a heavy framework.

### Low-context agent rules

Concise agent guidance keeps AI tools aligned to the SPAR workflow without flooding every
session with instructions.

### Tool index

A local tool index helps agents see and efficiently use the commands and project tools
available to them.

### Spec structure

Active and completed spec folders give each change a clear home from first intent to
retained project memory.

**Safe for existing repos:** SPAR-kit layers in without overwriting your existing skills,
rules, or `AGENTS.md`.

## Why SPAR-kit?

AI works best with focused context.

AI agents are powerful, but they are easy to derail when the context is vague, noisy, or
overloaded. SPAR-kit gives each change a small, practical structure: clarify the intent,
capture the constraints, plan the work, act against that plan, and retain what matters
when the work is done.

That structure keeps the model focused on the right problem at the right time. The spec
holds intent. The plan holds execution. Retain turns shipped work into project memory.
Each piece has a job, so your agent does not have to rediscover the same context every
session.

The result is less drift, less rework, and a cleaner path from idea to implemented change.

## Repository structure

Repository root = `<root>`.

| Stage | Path |
| --- | --- |
| Active (SPAR pipeline) | `specs/active/<change-name>/` |
| Completed (archived) | `specs/completed/<change-name>/` |

**Specify**, **Plan**, and **Act** run against `specs/active/`. **Retain** moves the whole
directory from `active/` to `completed/` with no duplicate left under `active/`.

Each change folder usually contains `<change-name>_spec.md` and `plan.md`, side by side.
Optional files such as `research.md`, notes, or small artifacts may live in the same
folder.

See [`specs/README.md`](specs/README.md) for a concise overview of the workflow folders.

## Skills

Core workflow and initialization are implemented as agent skills:

| Stage | Skill |
| --- | --- |
| Init | `spar-init` |
| Specify | `spar-specify` |
| Plan | `spar-plan` |
| Act | `spar-act` |
| Retain | `spar-retain` |

Project-local skill locations:

- Codex: `.agents/skills/`
- Cursor: `.agents/skills/`
- Claude Code: `.claude/skills/`

Copy or symlink each skill directory into your agent's supported skills location if needed,
following your tool's documentation.

## Templates

`templates/spec.md` is copied per change to `<change-name>_spec.md`.

`templates/plan.md` becomes `plan.md`.

The spec template lists every heading. `spar-specify` fills the sections known from
discovery, and `spar-plan` completes the rest. Both templates include HTML comments noting
paths under `specs/active/` through completion under `specs/completed/`.
