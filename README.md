# 🥚 AHgochi

> **Steijn's pet.** A virtual companion that grows when you engage with Albert Heijn — and nudges you to discover what's new.

AHgochi is a Tamagotchi-style virtual pet for [**Steijn**](https://www.ah.nl/over-ah/boodschappen-bezorgen/app/steijn), Albert Heijn's AI assistant. It lives inside the Mijn AH app and the Steijn chat. Steijn *answers* your questions; AHgochi gives you a *reason to come back* — and turns discovering new AH propositions into play.

**Hackathon prototype** — web app + simple Dockerized backend, built by 3 developers in 6 hours with AI agents.

---

## Why

Grocery apps are transactional: open, do the task, leave. AHgochi adds an **emotional daily loop** on top of the Mijn AH app to drive:

- 📈 **Engagement** & time in app
- 🔎 **Discovery** of new propositions (instead of ignored banners)
- 🛒 **Secondary acquisition** / cross-sell

## The Core Loop

```
ENGAGE  →  PET REACTS  →  REWARD  →  NUDGE & DISCOVER  →  (repeat)
```

| Step | What happens |
|------|--------------|
| **Engage** | User explores the app, tries a new proposition, shops, makes a healthy/sustainable choice, or watches a featured commercial |
| **Pet reacts** | AHgochi grows, changes mood, levels up, or evolves — in real time |
| **Reward** | User earns a **Bonus offer**, a **cosmetic** (outfit/evolution), or a **content unlock** |
| **Nudge & discover** | The pet points to the next new thing to try, often via Steijn |

## Who It's For

All Mijn AH app users, **18+**.

## Scope (Hackathon)

**In:**
- Web-app pet with a visible growth/happiness meter
- A few care actions that visibly move the pet (engagement, discovery, "purchase", healthy choice)
- One example of each reward: Bonus offer · cosmetic · content unlock
- A discovery nudge inside a **mock Steijn chat**
- Small, independently runnable services via **docker-compose** (one per dev)

**Out:** real AH/Bonus/Steijn integrations · auth · payments · production data · native app.

## 🎯 Demo Goal

Land the **full mini journey** in front of judges: **meet the pet → care action → reward → discovery.**

## Tech

A React + Vite + Docker scaffold already exists on the `copilot/ahgochi-hackathon-project` branch (PR #1):

- Lightweight **React + Vite** frontend
- **Docker Compose** for containerized local runs
- Node.js 24+

```bash
# local (npm)
npm install
npm run dev -- --host      # http://localhost:5173
npm test                   # run tests
npm run test:coverage      # run tests with coverage
npm run test:ui            # run tests with UI

# local (Docker)
docker compose up --build  # http://localhost:3000
```

> Built with AI agents. Architecture decisions in progress — see `docs/architecture.md`.

## Project Docs

- 📄 **Product brief (full concept):** [`brief.md`](docs/brief-AHgochi-2026-06-03/brief.md)
- 📎 **Addendum (grounding, tech notes, open questions):** [`addendum.md`](docs/brief-AHgochi-2026-06-03/addendum.md)
- 🏗️ **Architecture (in progress):** [`architecture.md`](docs/architecture.md)

---

_Concept grounded on public info about Albert Heijn's Steijn assistant and AH loyalty features (Bonus, Allerhande, Koopzegels, Air Miles). Not affiliated with or endorsed by Albert Heijn — hackathon project._


# AHgochi

AHgochi is a lightweight React starter for the hackathon idea, set up to run locally either with Node.js or in Docker.

## Requirements

- Node.js 24+
- Docker Engine with Docker Compose (optional, for containerized local runs)

## Run locally with npm

```bash
npm install
npm run dev -- --host      # start dev server
npm test                   # run tests
npm run test:coverage      # run tests with coverage (requires ≥80%)
npm run test:ui            # run tests with UI
```

Open `http://localhost:5173`.

## Run locally with Docker

```bash
docker compose up --build
```

Open `http://localhost:3000`.

## Available scripts

- `npm run dev` - start the local Vite development server
- `npm run build` - create a production build
- `npm run lint` - lint the React source