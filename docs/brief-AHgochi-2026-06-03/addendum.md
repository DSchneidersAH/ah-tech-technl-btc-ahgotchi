# AHgochi — Brief Addendum

Depth that belongs downstream (PRD, architecture, build) or that earned a place but doesn't fit the 1–2 page brief.

## Grounding Facts (verified 2026-06-03)

- **Steijn** is Albert Heijn's GenAI assistant in the Mijn AH app — built on Azure AI Foundry / Azure OpenAI by a team of eight in ~3 months.
- Deliberate **character**: a young, approachable colleague with blue hair in AH's blue uniform; explicitly *not* a real person.
- Capabilities today: 20,000+ Allerhande recipes, nutrition tips, photo-your-fridge → recipe ("Scan & Kook"), personal weekly menu. AH estimates it saves users 90 min–2 hrs/week.
- Reach: Mijn AH app has **5M+ active users** (~⅓ of the Netherlands shops AH weekly). English supported.
- Roadmap signals: product info, Bonus offers, wine-food pairing; **food-waste reduction** features; AH target to cut food waste **50% by 2030**.
- Existing loyalty/gamification surfaces to tie into: **Bonus** / **Bonus Box** (personalized offers, 2nd most-used app feature), **Koopzegels** (digital savings stamps), **Air Miles**.

Sources: Microsoft Source EMEA (Steijn feature), nieuws.ah.nl, ESM Magazine, code d'azur (Bonus Box case).

## Reward Mechanics (selected)

Confirmed reward types for the loop: **Bonus/discounts**, **pet cosmetics & levels/evolutions**, **content unlocks** (recipes, tips, early access). _Air Miles / Koopzegels were considered and set aside for the prototype._

## Technical Approach (hackathon constraints)

- **Form factor:** web-app prototype, simulating placement inside the Mijn AH app and Steijn chat.
- **Backend:** simple services; **everything runs on Docker** so three developers work in parallel without stepping on each other.
- **Team:** 3 developers, not deeply technical, **building with AI agents**.
- **Time box:** **6 hours** total.
- **Implication for design:** favour a single shared pet "growth/happiness" meter, mocked data, and a scripted-but-believable demo path over real integrations. Keep services small and independently runnable (one per dev) behind docker-compose.

_[A React + Vite + Docker scaffold already exists on the `copilot/ahgochi-hackathon-project` branch / PR #1 — Node 24, `docker compose up`, dev server on 5173, container on 3000. Recommended starting point for the build.]_

## Open Questions / To Confirm

- Is low proposition discovery a measured AH pain, or assumed?
- Single growth meter vs. separate need bars (hunger/happiness/curiosity)?
- What does the pet *look* like — its own creature, or themed to Steijn's blue character?
- Which specific "new proposition" does the demo showcase discovering?
- Any numeric success targets to anchor against?
