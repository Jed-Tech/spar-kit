# Core Messaging and Principles for GitHub Pages Landing

## Purpose

This document defines the messaging foundation for the SPAR-kit landing page in `docs/`.
It is the source of truth for how we explain value, differentiate from alternatives, and
guide a first-time visitor from awareness to install to first successful workflow step.

The page should help a visitor understand SPAR-kit in seconds:

- what it is
- why it exists
- why it is lightweight
- how to install it
- what to do immediately after install

---

## Product Positioning

SPAR-kit is a lightweight, spec-driven development system for AI-assisted software work.
It gives teams a clear operating loop:

Specify -> Plan -> Act -> Retain

SPAR-kit is intentionally minimal in process and artifacts. It adds just enough structure
to align intent, reduce drift, and preserve durable project memory, without forcing heavy
ceremony or bloated documentation.

---

## Core Value Proposition

Primary value statement:

"SPAR-kit helps AI and humans ship the right changes with lightweight structure:
align intent, plan clearly, execute confidently, and retain lasting project knowledge."

Supporting value themes:

1. Clarity before code
   - The system emphasizes understanding user intent before implementation.
   - This reduces wasted effort and improves quality of first-pass output.

2. Minimal context, higher signal
   - AI performs better with focused context, not maximal context.
   - SPAR-kit keeps inputs lean and relevant so models can reason and act effectively.

3. Plan-driven execution
   - A concrete plan reduces execution drift and keeps work aligned to goals.
   - Planning is lightweight but explicit.

4. Long-term memory through Retain
   - Retain captures what changed and why.
   - This creates reusable context for future AI sessions and contributors.

---

## Foundational Principles

### 1) Lightweight over heavyweight

SPAR-kit is deliberately lean.
It does not require formal ceremonies, large process documents, or rigid governance layers.
It introduces only the artifacts that repeatedly prove useful in real implementation work.

Messaging implications:

- Say "lightweight" and "minimal overhead" often.
- Avoid language that sounds enterprise-heavy or bureaucratic.
- Emphasize speed to first value and low maintenance burden.

### 2) AI-first context discipline

SPAR-kit is built on the principle that capable AI systems degrade when overloaded with
irrelevant or excessive context. More context is not always better.

SPAR-kit optimizes for high-signal context:

- clear intent
- explicit constraints
- compact spec content
- focused plan

Messaging implications:

- Frame this as performance optimization, not limitation.
- Explain that SPAR-kit improves model effectiveness by reducing noise.

### 3) Intent before action

Implementation should not begin until user intent is understood.
SPAR-kit enforces this sequence:

- clarify user goals and desired outcomes
- define scope and constraints
- confirm understanding
- then plan and execute

Messaging implications:

- Stress "understand first, implement second."
- Position this as the reason SPAR-kit reduces rework and misalignment.

### 4) Practical spec-driven development

SPAR-kit is a lightweight form of spec-driven development.
It does not treat specs as heavy documentation artifacts; it treats them as operational
alignment tools for high-quality execution.

Messaging implications:

- Use phrases like "practical spec-driven development" and "lightweight spec-driven system."
- Clarify that specs are concise, actionable, and execution-oriented.

### 5) Retain as strategic advantage

Retain is critical for long-term project health.
It transforms the delivered spec into durable source-of-truth documentation:

- what was built
- why decisions were made
- how the change fits the system

This retained knowledge improves future AI performance by providing trustworthy project memory.

Messaging implications:

- Treat Retain as essential, not optional cleanup.
- Connect Retain directly to faster and safer future iterations.

---

## Differentiation Narrative (Internal Guidance)

Use this for internal alignment and possible comparison sections.
Prefer neutral, value-focused framing on public pages.

### Against broader "agent superpower" toolkits

SPAR-kit differentiates on delivery discipline, not feature sprawl.
It focuses on a clear operating loop and predictable execution quality.

Suggested framing:

- "Less about adding more agent powers, more about shipping the right change reliably."

### Against spec-only workflows

SPAR-kit covers the full lifecycle from intent to retained knowledge:

- Specify
- Plan
- Act
- Retain

Suggested framing:

- "Not just writing specs; ensuring specs become shipped outcomes and lasting project memory."

### Against standard-centric specification projects

SPAR-kit is optimized for day-to-day implementation flow in real repositories, with simple
install and fast onboarding.

Suggested framing:

- "Operational and practical for daily engineering work, not just formal specification output."

---

## Install and Onboarding Messaging

### Install hierarchy

Default recommended path:

- `npx spar-kit install`

Key requirement:

- this should be the primary install CTA on the page
- other install options can exist, but should be secondary

### Immediate next action after install

Core onboarding instruction:

- run `spar.init` in the agent workflow

Intent:

- verify setup
- establish a clean, consistent baseline
- hand off naturally to Specify for first change work

Suggested short sequence copy:

1. Install: `npx spar-kit install`
2. Initialize: run `spar.init`
3. Start first change with Specify

---

## Tone and Voice Guidelines

Desired voice:

- clear
- practical
- confident
- lightweight
- non-hype

Avoid:

- inflated marketing claims
- abstract buzzword language
- aggressive competitor callouts
- process-heavy phrasing

Preferred message style:

- short declarative sentences
- high signal, low fluff
- concrete user outcomes

---

## Homepage Copy Pillars (for content blocks)

### Hero pillar

SPAR-kit is lightweight structure for AI-assisted software delivery.
It helps teams align intent, plan work, execute changes, and retain durable knowledge.

### Why it works pillar

AI works best with focused context.
SPAR-kit reduces noise and improves execution quality by structuring only what matters.

### Workflow pillar

Specify -> Plan -> Act -> Retain is the operating loop.
Each phase has a clear role in reducing drift and improving delivery confidence.

### Retain pillar

Retain turns completed work into project memory.
That memory helps future AI sessions understand what changed and why.

### Get started pillar

Install in one command:

- `npx spar-kit install`

Then run:

- `spar.init`

---

## Messaging Do/Do Not Checklist

Do:

- emphasize "lightweight" and "focused context"
- connect planning to reduced drift
- present Retain as long-term leverage
- keep install path obvious and immediate
- align with README/package release language

Do not:

- imply heavy process or mandatory ceremony
- frame SPAR-kit as a complex framework
- bury install CTA below conceptual content
- treat Retain as optional archival housekeeping

---

## Candidate Taglines

Primary candidates:

- "Lightweight spec-driven development for AI teams."
- "From intent to implementation to retained project memory."
- "Specify. Plan. Act. Retain. Ship with clarity."

Secondary candidates:

- "Less process. Better context. Stronger outcomes."
- "Focused context for smarter AI delivery."

---

## Candidate Short Descriptions

One-line product description:

"SPAR-kit is a lightweight, spec-driven workflow that helps AI and teams deliver aligned
changes with less drift and stronger long-term project memory."

Two-line website description:

"SPAR-kit gives AI-assisted development a clear operating loop:
Specify -> Plan -> Act -> Retain.
It stays intentionally lightweight so models get high-signal context, execute better, and
leave behind useful documentation for the next iteration."

---

## Alignment Notes for Implementation

When drafting `docs/index.html`, keep messaging hierarchy strict:

1. What it is (lightweight spec-driven system)
2. How to start (`npx spar-kit install`) in the hero
3. What to do next (`spar.init`) directly below hero
4. What you get (structure at a glance)
5. Why it matters ("Why SPAR-kit?" focused-context rationale)
6. How it works (SPAR loop)
7. Further reading / differentiation

Implementation note:

- Keep the visual section order fixed as: hero -> initialize -> what you get -> why SPAR-kit? -> workflow -> further reading.
- The top nav uses lower-page anchors (Why SPAR-kit?, What you get, Workflow) plus GitHub; omit Install (hero) and Further reading from the nav bar.
- Hero install remains the immediate primary CTA without needing its own nav item.
- For any local stylesheet, script, image, or same-site link in `docs/`, use relative URLs instead of root-relative paths.

Accessibility and readability implications:

- short sections
- obvious headings
- scannable bullets
- clear command formatting
- responsive layout without visual clutter
