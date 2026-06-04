---
title: "Product Brief: AHgochi - AH Hamster"
status: draft
created: 2026-06-03
updated: 2026-06-03
---

# Product Brief: AHgochi - AH Hamster

> ⚡ Updated based on UI design. Dutch-language interface with pixel-art aesthetic.

## Executive Summary

**AH Hamster** is a virtual pet hamster that lives in the Mijn AH app, giving users a charming daily companion that reacts to their care and attention. The hamster has **two core needs** — happiness (GELUK) and hunger (VERZADIGING) — that users satisfy through four care actions: feeding (VOEREN), putting to sleep (SLAPEN), washing (WASSEN), and playing (SPELEN).

The pet rewards engagement with **Nootjes** (hazelnut points) and surfaces discovery opportunities through a personalized daily journal (DAGBOEK). The interface is entirely in Dutch with a warm, nostalgic pixel-art aesthetic that evokes Tamagotchi and classic pet games.

This brief covers a **hackathon prototype**: a web app plus simple Dockerized backend services, built by a team of three in six hours with AI agents.

## The Problem

Supermarket apps are transactional. Users open them with intent, do the task, and leave. AH already has rich propositions — Steijn, Allerhande, Bonus Box, new services — but **discovery is low**: people stick to habits and rarely find what's new. Engagement is shallow, time-in-app is short, and freshly launched propositions struggle to get noticed. Crucially, there's **no emotional reason to return between shops**.

## The Solution

**AH Hamster** is a personal virtual pet that users care for through simple daily actions. The hamster has two visible needs — **GELUK** (happiness) and **VERZADIGING** (satiation/fullness) — displayed as meters at the top of the screen. Users perform care actions to keep both meters full, earning AH Punten (points) as they go.

The interface presents four primary actions:
- **VOEREN** (Feed) — give the hamster a carrot to fill the hunger meter
- **SLAPEN** (Sleep) — let the hamster rest to restore happiness
- **WASSEN** (Wash) — shower the hamster for cleanliness and happiness
- **SPELEN** (Play) — play games with the hamster, increasing happiness while using energy

The pet lives in a cozy pixel-art room with decorative elements (window, bed, AH shopping bag, framed AH logo) that reinforce the Albert Heijn brand while maintaining a warm, nostalgic aesthetic.

## How It Works — The Core Loop

1. **Check Status** — user opens the app and sees the hamster's current GELUK (happiness) and VERZADIGING (hunger) levels displayed as progress bars, along with lifespan (LEEFTIJD: 1 DAGEN).

2. **Perform Care Action** — user taps one of four buttons:
   - **VOEREN** (Feed) — the hamster munches a carrot, hunger meter increases
   - **SLAPEN** (Sleep) — the hamster naps in its bed, happiness restores
   - **WASSEN** (Wash) — the hamster gets cleaned under a shower, happiness increases
   - **SPELEN** (Play) — play games with the hamster, happiness increases while using energy

3. **Earn Points** — caring actions reward **Nootjes** (currently 125 nootjes shown), which accumulate in the user's account.

4. **Track Progress** — the **DAGBOEK** (journal/diary) button provides a history of care actions, health milestones, and potentially discovery nudges for new products or recipes.

The hamster provides visual feedback through **thought bubbles** (shown with carrot icon), creating personality and immediate response to user actions.

## What Makes This Different

- **Nostalgic Pixel Art** — the warm, retro Tamagotchi aesthetic creates immediate emotional connection and stands out from typical modern flat design.
- **Dutch-First Interface** — fully localized UI (VOEREN, SLAPEN, WASSEN, SPELEN, GELUK, VERZADIGING, DAGBOEK) shows this is built for the Dutch market, not a generic translation.
- **Simple, Clear Mechanics** — two visible meters (happiness/hunger), four intuitive actions, immediate visual feedback through thought bubbles and animations.
- **Integrated Loyalty** — Nootjes rewards create tangible value beyond just "cute pet", with hamster-themed currency that feels natural for a pet care game.
- **Bottom Navigation** — places the hamster as a **fifth core tab** alongside HOME, PRESTATIES (achievements), VERZORGING (care), and INSTELLINGEN (settings), signaling it's a permanent feature, not a promotional widget.

## Who This Serves

- **Primary:** all Mijn AH app users, **18-45** — broad appeal with particular resonance for millennials/Gen Z who grew up with Tamagotchis and Pokemon.
- **For the user:** 
  - Daily micro-moment of delight and care
  - Tangible rewards through AH Punten accumulation
  - Gentle shopping nudges through WINKEL action and DAGBOEK discoveries
  - Nostalgic emotional connection to childhood pet games
- **For AH:** 
  - Daily active usage metric (checking hamster status)
  - Increased time-in-app through care sessions
  - Shopping action integration for product discovery
  - Cross-sell opportunities via DAGBOEK content

## Success Criteria

**User Signals:**
- Daily active return rate (how many users check their hamster daily)
- Care actions per session (VOEREN, SLAPEN, WASSEN, SPELEN interactions)
- SPELEN engagement rate (play action usage)
- DAGBOEK engagement (journal/discovery content opens)
- Nootjes accumulation velocity

**Business Metrics:**
- ↑ time in app (baseline +30-60 seconds per daily check)
- ↑ engagement frequency through daily care routines
- ↑ Nootjes redemption (linking virtual care to rewards)
- ↑ daily app opens (baseline +1-2 opens per week)

**Hackathon Demo:**
- Working hamster with animated reactions to all four care actions
- Functional GELUK and VERZADIGING meters that respond to user input
- Nootjes counter that increments with care actions
- DAGBOEK view showing care history
- Pixel-art UI matching the design aesthetic

## Scope

**In (hackathon prototype):**

**Core Interface:**
- Pixel-art hamster sprite with idle animation and care-action reactions
- GELUK (happiness) and VERZADIGING (hunger) meters with real-time updates
- LEEFTIJD (age) counter tracking days alive
- Four action buttons: VOEREN, SLAPEN, WASSEN, SPELEN with icon graphics
- Thought bubble system for hamster "speech"
- Background room with decorative elements (window, bed, AH bag, framed logo)

**Secondary Features:**
- Nootjes counter with peanut icon (🥜)
- DAGBOEK (journal) button and basic view
- Bottom navigation: HOME, PRESTATIES, VERZORGING (heart icon), INSTELLINGEN
- Help/info button (? icon in top-right)
- Time display (09:41) and status icons

**Technical:**
- React web app with pixel-art CSS styling
- Simple state management for meters and nootjes
- Dockerized backend for parallel development
- Mock data for DAGBOEK entries

**Out (explicitly):**
- Real Nootjes redemption system
- Nootjes reward marketplace
- User accounts, authentication, profile persistence
- PRESTATIES (achievements) implementation
- INSTELLINGEN (settings) full feature set
- Native mobile app wrapper
- Multiplayer/social features
- Hamster evolution or cosmetics
- Anti-cheat or rate limiting

## Design Language

**Visual Style:**
- **Pixel art aesthetic** — chunky 16-bit style reminiscent of Tamagotchi, Pokemon, and 90s handheld games
- **Warm color palette** — AH blue (#0084CA) for branding, tan/beige for UI panels, cozy room colors
- **Rounded panel frames** — cream-colored boxes with dark borders for all UI sections
- **Expressive sprite** — hamster with visible emotions through pose and thought bubbles
- **Branded touchpoints** — AH logo on shopping bag and wall art, maintaining brand presence without overwhelming

**Dutch Localization:**
- All UI in Dutch (VOEREN, SLAPEN, WASSEN, WINKEL, GELUK, VERZADIGING, LEEFTIJD, DAGBOEK, PRESTATIES, VERZORGING, INSTELLINGEN)
- "WAT WIL JE DOEN?" prompt text
- "AH HAMSTER" as title (not "AHgochi")
- Natural, friendly tone matching AH brand voice

## Vision

If successful, **AH Hamster** becomes the **emotional anchor** of the Mijn AH app — the reason millions of Dutch users check in daily even when they're not actively shopping. The pixel-art aesthetic creates a distinct brand moment that's immediately recognizable and shareable.

**Phase 1 (Year 1):** Core care loop, AH Punten rewards, basic DAGBOEK discoveries  
**Phase 2 (Year 2):** PRESTATIES (achievements), hamster cosmetics/evolution, seasonal events  
**Phase 3 (Year 3):** Social features (visit friends' hamsters), Allerhande recipe integration, sustainability goals (hamster prefers sustainable products)

The hamster tab becomes a permanent fixture alongside HOME, PRESTATIES, and VERZORGING — not a temporary promotion, but a core pillar of the AH digital experience that makes grocery shopping feel less transactional and more like caring for something you love.
