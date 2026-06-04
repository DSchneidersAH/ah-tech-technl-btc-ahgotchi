---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - docs/brief-AHgochi-2026-06-03/brief.md
  - docs/brief-AHgochi-2026-06-03/addendum.md
  - docs/architecture-party-mode-summary.md
  - hackathon-goal.md
workflowType: 'architecture'
project_name: 'AHgochi'
user_name: 'Pnl0m96d'
date: '2026-06-03'
note: 'PRD skipped (hackathon). Architecting from brief + addendum + party-mode + hackathon-goal. Headline: backend = 3 AI agents. Agentic-backend runtime/SDK deferred as a MAJOR OPEN DECISION.'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

> Revised after a party-mode roundtable (Winston/Amelia/Sally/John). Full discussion in [`architecture-party-mode-summary.md`](architecture-party-mode-summary.md).

### Hackathon Theme Alignment

Event theme: **"Agentic Acceleration"** — build autonomous, goal-driven AI agents that *sense, plan, and act* (not merely assist). **Security is a focus: secure-by-design earns bonus points.** This validates the agentic-backend direction and adds security as a first-class concern.

### Headline Decision — Backend = 3 AI Agents

The point of the hackathon is to **showcase AI agents**, so AHgochi's "brain" is an **agentic backend**: three AI agents, not a reducer. Proposed decomposition (~1 agent per dev, to confirm):

1. **Companion / Pet agent** — owns the pet persona, mood, and Steijn-voiced reactions to care actions.
2. **Discovery agent** — picks and pitches the new AH proposition; generates the nudge in the Steijn chat.
3. **Rewards agent** — decides the Bonus offer / cosmetic based on the user's engagement.

All three sit behind a shared **guardrail + eval layer** (FR8/FR9): inputs guarded, outputs schema-validated with a canned fallback, and a golden-case eval suite proving behaviour before the demo. Recommended baseline = hardcoded; optional stretch = an LLM "verifier" agent that checks the others (a 4th, security-flavoured agent — strong theme + bonus-points fit).

### Requirements Overview

**Functional Requirements (derived from brief + roundtable):**
- FR0 — **Scripted golden path (the spine):** a deterministic ~60–90s journey — needy pet → Steijn discovery nudge → discovery care action → visible pet "rescue" reaction → Bonus reward reveal. Every other requirement justifies itself against this script. *(Promoted from NFR — this IS the product on stage.)*
- FR1 — Pet entity with a single shared growth/happiness meter + mood. Boots into a **slightly-needy** state (care = rescue, not a transaction).
- FR2 — **Two hero care-actions:** engagement ("I came back") + discovery (the stated business goal). Other action types may exist as label-only data, not extra code paths.
- FR3 — **Two rewards:** a **Bonus offer** (the money shot) + one hardcoded cosmetic. Content-unlock cut.
- FR4 — Feedback with three beats: **anticipation → payoff → visible state shift** (first-class, not a footnote).
- FR5 — **Steijn-voiced personality:** short, warm, eager-junior-colleague copy at care/nudge moments (free wow; a strings file or an agent's job).
- FR6 — Discovery nudge **resolves on screen**: the new proposition is named and the offer is revealed.
- FR7 — `/reset` to seed state; in-memory only (no database).
- FR8 — **Agent guardrails:** every agent call is wrapped — input validation + prompt-injection guard on user-influenced text → agent → **output-schema validation** → safe **canned fallback** if invalid/unsafe/timed-out. Implemented as **hardcoded middleware** (recommended baseline, deterministic + secure) and/or an LLM **verification agent**. Doubles as the determinism safety net (NFR5).
- FR9 — **Agent evals:** a small **golden-case eval suite per agent** (input → expected/acceptable output) run before the demo to prove each agent behaves. Implemented as **hardcoded assertions** and/or an **LLM-as-judge "verification" check**. Gives demo confidence and is a visible secure-by-design artifact for judges.

**Non-Functional Requirements:**
- NFR1 — Maximise simplicity for 6h / 3 non-deeply-technical devs building with AI agents.
- NFR2 — Dockerized via docker-compose; **frozen `pet-state` contract + compose committed at hour 0**, before feature code.
- NFR3 — Mock data only; no real AH / Steijn / Bonus integration; no auth.
- NFR4 — "Real-time" = optimistic UI / polling. **No WebSockets / push infra.**
- NFR5 — **Agent-output determinism:** constrained/low-temp prompts, structured (schema'd) outputs, seeded conversation, and **canned fallback** if an agent errors or times out mid-demo. The golden path must survive an agent hiccup on stage.
- NFR6 — Reuse the existing React + Vite + Docker scaffold (PR #1).
- NFR7 — **Secure-by-design (bonus points):** LLM keys server-side only; validate agent inputs/outputs; guard user-influenced inputs against prompt injection; secrets in `.env` (git-ignored), never committed. Realised concretely via the **guardrails (FR8)** and **evals (FR9)**.

**Scale & Complexity:**
- Primary domain: web frontend + **agentic backend** (3 AI agents)
- Complexity level: low surface area, but **non-determinism is the real risk**, not distributed systems
- Components: **1 frontend + 3 AI agents** behind a thin API/gateway (mock AH data served as a seeded fixture)

### Technical Constraints & Dependencies
- React + Vite frontend, Node.js 24, Docker Compose (existing scaffold, PR #1)
- 3 AI agents — runtime/SDK/orchestration **deferred (major open decision)**
- Org LLM gateway (`portal.api-ai.digitaldev.nl`) **rejects the Haiku model; Opus (claude-opus-4-x) works** — agents must target a supported model
- No external network dependencies at demo time beyond the LLM endpoint

### Cross-Cutting Concerns Identified
- **Frozen pet-state JSON contract** — highest-leverage artifact; locked hour 0
- **Demo determinism vs. AI non-determinism** — structured outputs + canned fallbacks
- **Agent orchestration** — how the 3 agents coordinate and share/read pet state
- **Secure-by-design** — keys, input/output validation, prompt-injection guard
- **Guardrails & evals layer** — shared wrapper around all 3 agents (input guard → schema-validated output → canned fallback) + a golden-case eval suite. **Decided: hybrid** — hardcoded guards/evals as the reliable baseline + an optional LLM "verifier" (4th agent) as a stretch goal.
- **Steijn-voice / AH-blue theming** — consistent persona across pet and chat
- **One primary surface** — pet lives inside the Steijn chat (recommended; to confirm)

## Starter Template Evaluation

### Primary Technology Domain
Web frontend (React + Vite) + **agentic backend** (3 AI agents). Aligns with the "Agentic Acceleration" theme.

### Frontend Starter — ✅ DECIDED: reuse the existing scaffold
- The **React + Vite + Docker Compose** scaffold already on **PR #1** (Node 24; dev server `5173`, container `3000`).
- **Rationale:** it exists, matches the docker-compose constraint, and saves all setup. **First implementation story = merge PR #1 and confirm it runs.**

### Agentic Backend Starter — 🔶 OPEN (MAJOR DECISION — deferred by user)
Candidate runtimes/SDKs, versions verified 2026-06-03:

| Option | Version | License | Fit |
|---|---|---|---|
| `@anthropic-ai/claude-agent-sdk` | 0.3.x | Proprietary | Full sense→plan→act agent loop + tools; most "agentic", best theme fit; heavier, proprietary |
| `@anthropic-ai/sdk` (raw Messages API) | 0.100.1 | MIT | Simplest; you write a small agent loop; one language with the TS frontend; max control |
| `@ai-sdk/anthropic` (Vercel AI SDK) | 3.0.81 | MIT | Great DX, streaming + tool-calling; nice if the UI wants token streaming |

- A Python agent stack is possible but adds a second language — not recommended given the TS frontend and non-deeply-technical devs.
- **Sub-decisions bundled here:** 3 agents as 3 containers vs 1 service / 3 modules; orchestration pattern; confirm available gateway models + keys.

Sources: [claude-agent-sdk (npm)](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) · [anthropic-sdk-typescript (npm)](https://www.npmjs.com/package/@anthropic-ai/sdk) · [@ai-sdk/anthropic (npm)](https://www.npmjs.com/package/@ai-sdk/anthropic)

## Major Open Decisions
1. 🔶 **Agentic backend runtime & SDK** (deferred) — SDK choice, 3 containers vs 1 service, orchestration, model/gateway confirmation.
2. ❓ **The specific new AH proposition** the pet drives discovery of (owed from context analysis — unlocks the discovery pillar).
3. ✅ **One surface vs two** — RESOLVED: one primary surface, chat-primary (pet embedded in the Steijn chat).

## Core Architectural Decisions

### Decision Priority Analysis
- **Critical (block implementation):** pet-state contract, API surface, agent-orchestration shape.
- **Important:** frontend surface layout, state management, docker-compose layout, secrets.
- **Deferred:** agent SDK/runtime (Major Open Decision #1); container-per-agent vs in-process.

### Data Architecture — pet-state contract (FROZEN at hour 0)
In-memory only; `/reset` restores the seed. The single shared shape all 3 devs code against:

```json
{
  "pet":   { "happiness": 0, "mood": "needy|content|happy|delighted",
             "level": "egg|hatched", "cosmetics": ["string"] },
  "lastReaction": { "trigger": "engagement|discovery|reward|reset",
                    "message": "Steijn-voiced string",
                    "animation": "idle|lean|bounce|sparkle",
                    "happinessDelta": 0 },
  "nudge":  { "active": true, "proposition": "string",
              "message": "string", "offer": { "title": "string" } },
  "reward": { "type": "bonus|cosmetic", "title": "string", "detail": "string" }
}
```
`nudge` and `reward` are `null` when inactive. Validate every agent output against this shape (FR8); on failure → canned fallback fragment. No DB, no migrations.

### Authentication & Security
- No auth (mock prototype). LLM keys server-side only, in `.env` (git-ignored).
- Guardrails (FR8) + evals (FR9), hybrid. Prompt-injection guard on user-influenced text.

### API & Communication Patterns
- REST/JSON via a single backend **gateway**:
  - `GET  /api/pet` → current state
  - `POST /api/care {action}` → Companion agent reacts; if `action=discovery`, also Discovery agent → nudge
  - `POST /api/reward` → Rewards agent (**auto-fires when happiness crosses a threshold**)
  - `POST /api/reset` → seed state
- Every response returns the **full pet-state object** → frontend just renders it (no polling).
- Errors: `{ error, fallbackState }` so the demo never white-screens.

### Agent Orchestration
- Thin gateway/orchestrator owns the loop: validate input → call agent(s) → schema-validate output → update in-memory state → return. Agents invoked sequentially per request.
- Agents sit behind a gateway interface; in-process vs container-per-agent is bound to the parked SDK decision.

### Frontend Architecture
- **ONE primary surface: the Steijn chat, pet embedded** (pet card + meter + mood with the conversation). Nudge arrives as a Steijn chat message. *(Resolved: chat-primary.)*
- State: React `useReducer` + a typed API client. No Redux/router needed.
- Components: `ChatView` · `PetCard` (sprite+meter+mood) · `CareControls` · `NudgeMessage` · `RewardReveal`.

### Infrastructure & Deployment
- docker-compose: `frontend` (Vite) + `backend` (gateway+agents). Container-per-agent deferred.
- Config via `.env`: `LLM_API_KEY`, `LLM_BASE_URL` (org gateway), `MODEL` (an Opus model — Haiku rejected by the gateway).
- No CI/CD (hackathon).

### Reward Trigger
- **Auto at happiness threshold** (resolved) — crossing a level auto-reveals the reward for a clean golden-path payoff, fewer clicks on stage.

### Implementation Sequence
1. Merge PR #1 scaffold; commit pet-state schema + docker-compose (all 3 devs together, ~hour 0).
2. Parallel: **Dev A** gateway + orchestration + guardrails · **Dev B** frontend chat + pet · **Dev C** agents + mock-AH fixture + evals.
3. Integrate against the contract by ~hour 4; rehearse the golden path.
