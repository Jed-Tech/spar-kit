# Roadmap

This document captures planned work and a **suggested implementation order**. Priorities and specifics are yours to refine; items stay high level on purpose.

---

## Intent

- **Audience (near term):** You and AI agents shaping the skill system.
- **Audience (eventually):** Beginning practitioners who can install and use the toolkit with minimal friction.
- **Agents:** Beta focuses on **Codex** and **Cursor**. **Claude Code** joins in v1. Other systems come later, after v1.
- **Storytelling:** A static GitHub Pages site plus a friendly root `README.md`—both should explain value and how to get started (aligned messaging, not necessarily identical text).

---

## North star

A small, easy-to-install toolkit where the **Specify → Plan → Act → Retain** workflow is obvious, the skills reliably steer agents toward clear specs and plans, and adoption spreads because the experience feels inevitable—not because of heavy ceremony.

---

## Beta — early invited adopters

The scope previously described as the MVP is now the path to a **Beta** release.

Beta means:

- the toolkit is usable by **early invited adopters only**
- the core SPAR workflow is coherent enough to try on real changes
- support is intentionally narrow so quality stays high

**Beta agent support:**

- **Codex**
- **Cursor**

Define the exact checklist yourself; Beta should mean **“an invited early adopter can follow the repo and complete one real change using SPAR without guessing.”** Candidate pillars (edit freely):

1. **Skills** — The four phase skills are coherent end-to-end for a single change folder under `specs/active/` … `specs/completed/`.
2. **Templates** — Spec and plan templates match what the skills expect.
3. **Guidance for agents** — `AGENTS.md` (and related pointers) make the workflow and folder layout unavoidable for tools that read repo instructions.
4. **Install / copy path** — One documented way to get skills (and any required files) into a project for at least your Beta target agents.

Until those exist at a bar you are happy with, treat everything else as optional.

---

## v1 — broader invitation point

v1 is the release where you begin inviting users beyond the early Beta group.

**v1 agent support:**

- **Codex**
- **Cursor**
- **Claude Code**

v1 should build on the Beta foundation with stronger onboarding, clearer public-facing documentation, and enough confidence that the workflow is ready for broader real-world use.

**v1 install strategy option (Option A - hybrid):**

- Keep `npx spar-kit install` as the canonical bootstrap command.
- Optionally integrate `npx skills add` for skill syncing where it reduces setup friction.
- Keep SPAR-specific repo bootstrap guarantees (`AGENTS.md`, `.spar-kit/VERSION`, `.spar-kit/.local/**`, reporting contract) under `spar-kit` ownership.

---

## Beta foundations
These remain the highest-priority foundations because both Beta and v1 depend on them:

1. **Skills** — The four phase skills are coherent end-to-end for a single change folder under `specs/active/` … `specs/completed/`.
2. **Templates** — Spec and plan templates match what the skills expect.
3. **Guidance for agents** — `AGENTS.md` (and related pointers) make the workflow and folder layout unavoidable for tools that read repo instructions.
4. **Install / copy path** — One documented way to get skills (and any required files) into a project for at least the currently supported agents. Make sure to update spar-init with valid npx install command.
5. **Specify-phase behavior (`spar-specify`)** — Agents should **infer which feature or change they are working on** when recent chat context already makes that clear. Inference must **not** replace rigor: they still **ask the questions the skill requires** and **work through spec and documentation steps** in full. The goal is less repetitive restating, not skipping discovery or documentation.
6. **Starting SPAR / invocation clarity** — Feedback: people find it hard to remember **how to start** the workflow (for example, how or when to invoke `spar-specify`). Explore a more obvious, memorable entry—**ideas to compare:** a single umbrella command or alias (e.g. `spar-start`), a fixed “start here” line in `README.md` and `AGENTS.md`, or a tiny onboarding checklist. Settle on **one primary path** for Beta and document it so invited adopters are not guessing.
7. **Specify questioning tone (`spar-specify`)** — Questioning should be **creative and suggestive**, not only interrogative: propose concrete directions (e.g. “Do you want to do *this*?” naming a concrete option) and offer a **numbered list of 2–7 ideas** for the user to react to, sized to what fits the topic. The agent should read as a **teammate**—collaborative and imaginative—while still covering the skill’s required discovery and documentation.
8. **Plan follow-ups (`spar-plan`)** — Be **direct and forward** about follow-up questions. Ask **no more than seven** follow-up questions in total. Present them in **two clearly separated sections** so users see the distinction: **Key Follow-Up Questions** (needed for the plan to succeed) and **Optional Follow-ups** (worth considering but not critical to a successful plan).

---

## Suggested order of implementation

Order reflects your stated priority: **skills → templates → `AGENTS.md` → tooling → install path**.

| Order | Track | Notes |
|-------|--------|--------|
| 1 | **Skills** | Specify, Plan, Act, Retain—behavior, boundaries, and cross-references between phases. |
| 2 | **Templates** | Ensure spec and plan templates match what the skills expect and make the workflow legible to adopters. |
| 3 | **`AGENTS.md`** | Single source of truth for “how to work in this repo” and how SPAR fits; keep in sync as skills and templates change. |
| 4 | **Tooling** | `justfile`, `.spar-kit/.local/tools.yaml`, checks or helpers—only what reduces friction for you and adopters. |
| 5 | **Install / copy path** | Define one clear way to bring SPAR into a project for the supported agents, with as little guesswork as possible. |
| 6 | **Beta README / docs** | Friendly onboarding for invited adopters using Codex and Cursor; links to docs and install steps. |
| 7 | **v1 docs / GitHub Pages** | Public-facing value prop, getting started, and compatibility notes once broader invitation begins. |
| 8 | **Compatibility expansion** | Document and test Claude Code for v1, then additional agent environments after v1 feels solid. |

Adjust sequence if two tracks can run in parallel; the table is a default **dependency-friendly** ordering.

---

## Releases

- **Branching:** Work from `main`.
- **Milestones:** Tag on GitHub at **major** milestones. The current release path is **Beta** first, then **v1**.
- **Versions:** Tag naming and semver rules are yours to set when you publish more formally.

### Planned release sequence

1. **Beta**
   - invited adopters only
   - supports **Codex** and **Cursor**
2. **v1**
   - broader user invitations begin
   - adds **Claude Code**

---

## Later

These are post-v1 compatibility targets rather than Beta or v1 commitments:

- **Windsurf**
- **GitHub Copilot**
- **Antigravity**
- **Gemini CLI**
- other systems you choose to validate after the core three are solid

---

## Open decisions (for you)

Use this section as a scratchpad; fill in when ready.

- **Beta exit criteria:** …
- **First GitHub Pages structure (sections, tone):** …
- **First tag name after Beta:** …
- **Which “Later” systems to prioritize after v1:** Windsurf, GitHub Copilot, Antigravity, Gemini CLI, and any other post-v1 targets you decide to validate.
