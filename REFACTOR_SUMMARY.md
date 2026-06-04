# AHgochi Refactor Summary

## Overview
Refactored the AHgochi app to match the pixel-art UI design with Dutch localization.

## Key Changes

### 1. Branding & Naming
- Changed from "AHgochi" to "AH Hamster" (AH HAMSTER in UI)
- Full Dutch localization for all UI elements
- Pixel-art aesthetic inspired by Tamagotchi and 90s handheld games

### 2. Game Mechanics
**Before:** Single happiness meter
**After:** Dual-meter system
- **GELUK** (Happiness): Affected by sleep, washing, shopping
- **VERZADIGING** (Satiation/Hunger): Affected by feeding, shopping
- **LEEFTIJD** (Age): Days counter starting at 1
- **Auto-decay**: Both meters slowly decrease over time

### 3. Care Actions
Changed from 5 generic actions to 4 Dutch care actions:
- **VOEREN** (Feed) 🥕 - Increases hunger (+20), slight happiness (+5), 5 nootjes
- **SLAPEN** (Sleep) 💤 - Increases happiness (+15), decreases hunger (-5), 3 nootjes
- **WASSEN** (Wash) 🚿 - Increases happiness (+10), 4 nootjes
- **SPELEN** (Play) 🎮 - Increases happiness (+12), decreases hunger (-8), 8 nootjes

### 4. Rewards System
- **Nootjes** 🥜 counter (starting at 125)
- Nootjes earned with every care action
- **DAGBOEK** (Journal) button for tracking history

### 5. Visual Design
**Pixel-Art Theme:**
- Press Start 2P Google Font for authentic retro feel
- Chunky borders (3-4px) with drop shadows
- Cream/tan color palette (#F5ECD7, #D4C5A9)
- AH Blue (#0084CA) for branding
- Pixelated rendering for sprites

**Room Elements:**
- Window with 4 panes (top-left)
- AH logo frame (top-right)
- Hamster sprite (center) with thought bubbles
- AH shopping bag (bottom-left)
- Hamster bed (bottom-right)
- Blue wallpaper transitioning to tan floor

### 6. UI Layout
**Mobile-First Design (428px max-width):**
- Header: AH logo + "AH HAMSTER" title + help button
- Status bar: Age, Geluk, Verzadiging meters with icons
- Hamster room: Pixel-art environment
- Action buttons: 2x2 grid with "WAT WIL JE DOEN?" prompt
- Bottom panel: Nootjes 🥜 + Dagboek boxes
- Bottom nav: HOME, PRESTATIES, VERZORGING, INSTELLINGEN

### 7. Animations
- **hamsterBounce**: Sprite bounces when action performed
- **thoughtPop**: Thought bubble appears with scale animation
- **Button press**: Translates down with shadow reduction on click
- Meter fill transitions smoothly over 0.5s

### 8. Component Structure
**New Components:**
- `StatusBar.jsx` - Age and dual meters display
- `HamsterRoom.jsx` - Pixel-art room with decorations
- `ActionButtons.jsx` - 4 care action buttons
- `BottomPanel.jsx` - Punten counter and Dagboek button
- `BottomNav.jsx` - Bottom navigation tabs

**Removed Components:**
- `Pet.jsx` - Replaced by HamsterRoom
- `GrowthMeter.jsx` - Replaced by StatusBar
- `ActionPanel.jsx` - Replaced by ActionButtons
- `SteijnChat.jsx` - Removed (not in MVP)
- `RewardFeed.jsx` - Removed (not in MVP)

### 9. Data Files Updated
**pet.json:**
- Hamster-specific content
- Dutch labels (Jonge Hamster, Volwassen Hamster)
- Dual initial values (happiness: 50, hunger: 50, age: 1)

**actions.json:**
- Dutch action labels and descriptions
- Dual-meter effects (happinessGain, hungerGain)
- Punten rewards per action
- Thought bubble icons

### 10. Technical Stack
- React 18 with hooks (useState, useEffect)
- Vite for dev server
- CSS custom properties for theming
- Google Fonts (Press Start 2P)

## Running the App
```bash
npm install
npm run dev
```

Open http://localhost:5173 in browser

## Testing the Experience
1. Click **VOEREN** - Hamster shows 🥕 thought, hunger increases
2. Click **SLAPEN** - Hamster shows 💤 thought, happiness increases
3. Click **WASSEN** - Hamster shows ✨ thought, happiness increases
4. Click **SPELEN** - Hamster shows 🎮 thought, happiness increases, hunger decreases
5. Watch meters auto-decay over time
6. See Nootjes 🥜 accumulate with each action

## Next Steps (Out of Scope for Hackathon)
- DAGBOEK view implementation
- PRESTATIES achievements system
- INSTELLINGEN settings page
- Hamster evolution/cosmetics
- Persistence (localStorage/backend)
- Nootjes redemption marketplace
- Mini-games for SPELEN action
