# Architecture Roundtable — Discussion Summary (2026-06-03)

A BMAD "party mode" session stress-tested the AHgochi Project Context Analysis before locking the architecture. Four independent agent perspectives, summarized below, followed by the decisions taken.

## Key Perspectives

### 🏗️ Winston (System Architect) — *cut the distributed-systems ambition*
- **Biggest risk:** 4 services in a 6h / 3-non-technical-dev / mock-data project. Each container adds contracts, dockerfiles, healthchecks, and a hour-5 networking bug nobody can debug.
- Collapse the backend; "independently-runnable services" is "architecture cosplay" here.
- **State:** for demo determinism you want the *opposite* of a database — in-memory state + a `/reset` endpoint. No Postgres.
- **Highest-leverage artifact:** the pet-state JSON contract + action endpoints, written *before* anyone codes.
- Define "real-time" — optimistic UI on a POST is enough; don't let it smuggle in WebSockets.
- Cut multi-stage evolution; keep meter + mood, one sprite swap on threshold.

### 💻 Amelia (Senior Engineer) — *freeze the contract, plan the merge*
- **#1 demo killer:** no frozen interface contract. Commit one immutable `pet-state.schema.json` at hour 0.
- `/reset` + a seed/fixture file are mandatory for determinism.
- "real-time" → polling / optimistic update, never push infra.
- **Parallel split (3 devs, zero collision):** boundary = schema + `docker-compose.yml`, locked together in the first 30 min. Then each dev works behind the frozen interface, stubbing the others until integration.
- Build *one* reward component (switch on `type`), *one* care code-path (type = label + icon). Don't build 3×/4×.

### 🎨 Sally (UX Designer) — *lock the moment, then the architecture*
- The analysis is "structurally complete and emotionally empty." A single rising meter is "a progress bar with a face."
- **Pet must boot into a slightly-needy state** so the judge instantly reads "it needs me." Care = *rescue*, not a transaction.
- Feedback needs three beats: **anticipation → payoff → visible state shift**. Make it a first-class requirement.
- **Personality is free wow:** the pet should talk in Steijn's voice (young, warm, eager-junior-colleague). A JSON of strings beats any animation.
- **Cut to one surface** — the pet lives *inside* the Steijn chat; the nudge is more powerful as a chat message anyway.
- Reframe FR1 as the **scripted golden path** (the exact ~60–90s journey); everything else justifies itself against that script.

### 📋 John (Product Manager) — *what is the demo selling?*
- It's selling a **behaviour-change loop** to AH execs, not a pet. The ONE job: *a care-loop turns a routine grocery interaction into a reason to come back AND try something new* (engagement + discovery, fused).
- Four care-actions feed one meter → they look identical to a judge. Cut to **two**: engagement (the "I came back" tap) + discovery (the stated goal).
- Three rewards → **two**: the **Bonus offer** (the money shot: care → discount → buy something new) + one hardcoded cosmetic (the dopamine). Cut content unlock.
- **Missing payoff:** the nudge must *resolve* on screen — name the new proposition, reveal the offer. Otherwise it's a setup with no punchline.
- "Demo determinism" is not an NFR — it's the **#1 functional requirement**.
- **Open question to the team:** *name the specific new AH proposition the pet drives discovery of.*

## Convergence (all four independently agreed)
1. **Cut scope** — the demo is a scripted sequence, not a feature grid.
2. **Freeze a pet-state JSON contract at hour 0**; integrate against the contract, not each other's code.
3. **In-memory state + `/reset`** for repeatable runs.
4. **Promote demo determinism** to the spine of the build.
5. **Resolve the discovery nudge** into a visible payoff.
6. **No WebSockets** — optimistic UI / polling.

## Decisions Taken (by the user)
- **Backend = 3 AI agents.** The hackathon's purpose is to showcase AI agents, so the pet's "brain" is an agentic backend, not a reducer. This is the headline architectural decision and overrides Winston's "maybe no backend" provocation.
- Proposed agent decomposition (to confirm in the architecture step), mapping 1 agent ≈ 1 dev:
  1. **Companion/Pet agent** — owns the pet persona, mood, and Steijn-voiced reactions to care actions.
  2. **Discovery agent** — picks and pitches the new proposition; generates the nudge in the Steijn chat.
  3. **Rewards agent** — decides the Bonus offer / cosmetic based on engagement.
- Adopt the room's cuts: 2 hero care-actions (engagement + discovery), 2 rewards (Bonus offer + 1 cosmetic), 1 sprite-swap instead of multi-stage evolution, one primary surface (the Steijn chat), Steijn-voice copy as a first-class feature, scripted golden path as the spine.

## New Risk Introduced by the Decision
- **AI agents are non-deterministic — which collides head-on with demo determinism.** Mitigations to design in: constrained/low-temperature prompts, structured (schema'd) agent outputs, a seeded conversation, and **canned fallback responses** if an agent errors or times out mid-demo. The golden path must survive an agent hiccup on stage.

## Open Question Still Owed
- **What specific new AH proposition does the pet make you discover in the demo?** (Needed before the discovery pillar is real rather than theatre.)
