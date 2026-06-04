# Nootjes Economy Update

## Overzicht van Wijzigingen

Het economiesysteem is omgedraaid: gebruikers **verdienen** Nootjes door AH-activiteiten en **besteden** ze om voor hun hamster te zorgen.

## Nieuwe Flow

### 1. Nootjes Verdienen (EARN)
Gebruikers klikken op de Nootjes box (met + badge) om het "Verdien Nootjes" scherm te openen.

**AH Activiteiten die Nootjes geven:**
- 🛒 **Boodschappen doen** - 20 nootjes
- 📖 **Allerhande bekijken** - 10 nootjes  
- 🎁 **Bonus activeren** - 15 nootjes
- 🌱 **Duurzaam product kiezen** - 25 nootjes

### 2. Nootjes Uitgeven (SPEND)
Gebruikers besteden Nootjes aan verzorgingsacties voor hun hamster.

**Verzorgingsacties kosten Nootjes:**
- 🥕 **VOEREN** - 5 nootjes (hunger +20, geluk +5)
- 💤 **SLAPEN** - 3 nootjes (geluk +15, hunger -5)
- 🚿 **WASSEN** - 4 nootjes (geluk +10)
- 🎮 **SPELEN** - 8 nootjes (geluk +12, hunger -8)

## UX Features

### Nootjes Indicatie
- **Startbalans**: 50 nootjes
- **Live counter** in bottom panel met 🥜 icoon
- **+ badge** op Nootjes box om aan te geven dat je meer kunt verdienen

### Action Buttons
- Tonen **cost** onder elke actie (bijv. "5 🥜")
- **Disabled state** wanneer niet genoeg nootjes (grijs, opacity 0.5)
- **❌ thought bubble** verschijnt als je probeert te klikken zonder genoeg nootjes

### Earn Panel (Modal)
- **Overlay** met dark background
- **Slide-up animatie** bij openen
- **Close button** (×) rechtsboven
- **AH activiteiten** met beschrijving en reward
- **+XX 🥜** badge toont hoeveel je verdient

## Game Loop

```
1. Gebruiker opent app
   ↓
2. Ziet hamster met dalende meters (auto-decay)
   ↓
3. Wil hamster verzorgen maar heeft niet genoeg nootjes
   ↓
4. Klikt op Nootjes box (+)
   ↓
5. Ziet AH activiteiten om nootjes te verdienen
   ↓
6. Doet AH activiteit (bijv. Boodschappen)
   ↓
7. Krijgt 20 nootjes
   ↓
8. Kan nu hamster voeren, laten slapen, wassen of spelen
   ↓
9. Meters stijgen, hamster is blij (🥕/💤/🚿/🎮)
   ↓
10. Meters decay over tijd → terug naar stap 3
```

## Business Value

### Engagement Driver
- **Direct link** tussen AH-gedrag en pet care
- **Clear incentive** om AH activiteiten te doen
- **Habitual checking** door meter decay

### Metrics to Track
- **Earn rate**: Hoeveel nootjes per gebruiker per dag
- **Spend rate**: Hoeveel verzorgingsacties per sessie
- **Balance trends**: Houden gebruikers nootjes of geven ze alles meteen uit?
- **Activity preference**: Welke earn-acties worden het meest gedaan?
- **Care priority**: Welke verzorgingsacties zijn het populairst?

### Future Extensions
1. **Dynamic pricing**: Dure acties geven meer happiness
2. **Nootjes shop**: Koop cosmetics, accessories, evolutions
3. **Daily bonuses**: Extra nootjes voor eerste check van de dag
4. **Streaks**: Bonus voor consecutive days
5. **Challenges**: "Feed 5 times today" voor extra nootjes
6. **Real integration**: Echte AH boodschappen = echte nootjes

## Technical Implementation

### Data Structure
```json
// earn-actions.json
{
  "id": "boodschappen",
  "label": "Boodschappen doen",
  "icon": "🛒",
  "nootjes": 20
}

// actions.json (care actions)
{
  "id": "voeren",
  "label": "VOEREN",
  "icon": "🥕",
  "cost": 5,
  "happinessGain": 5,
  "hungerGain": 20
}
```

### State Management
- `nootjes` state tracks balance
- `handleEarnAction()` adds nootjes
- `handleAction()` checks balance and deducts cost
- Error handling: ❌ thought bubble if insufficient funds

### Component Structure
- `EarnPanel.jsx` - Modal for earning nootjes
- `ActionButtons.jsx` - Shows costs, disables if can't afford
- `BottomPanel.jsx` - Nootjes counter with + badge

## Testing Checklist
- [ ] Start with 50 nootjes
- [ ] Can't perform action without enough nootjes
- [ ] ❌ appears when trying to act without funds
- [ ] Earn panel opens when clicking Nootjes box
- [ ] Earning action adds nootjes correctly
- [ ] Care action deducts cost and updates meters
- [ ] Buttons disable/enable based on balance
- [ ] Cost displayed on each action button
