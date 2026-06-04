# Sprites Folder

Organisatie van alle sprite assets voor AH Hamster.

## Folder Structuur

### `/hamster/` - Hamster Sprites
Verschillende hamster states en outfits:
- `hamster-idle.png` - Standaard pose
- `hamster-happy.png` - Blije staat (hoge happiness)
- `hamster-sad.png` - Verdrietige staat (lage happiness)
- `hamster-hungry.png` - Hongerige staat (lage hunger)
- `hamster-eating.png` - Eten actie
- `hamster-sleeping.png` - Slapen actie
- `hamster-washing.png` - Wassen actie
- `hamster-playing.png` - Spelen actie

**Outfits/Accessories (future):**
- `hamster-beach.png` - Strand outfit (zoals in referentie)
- `hamster-winter.png` - Winter outfit
- `hamster-ski.png` - Ski outfit
- `hamster-hat-*.png` - Verschillende hoeden

### `/backgrounds/` - Achtergronden
Kamer decoraties en backgrounds:
- `room-wall.png` - Muur textuur
- `room-floor.png` - Vloer textuur
- `window.png` - Raam decoratie
- `ah-frame.png` - AH logo lijst
- `bed.png` - Hamster bedje
- `bag.png` - AH boodschappentas
- `beach-bg.png` - Strand achtergrond (seasonal)
- `winter-bg.png` - Winter achtergrond (seasonal)

### `/items/` - Items & Props
Interactieve items en decoraties:
- `carrot.png` - Wortel (voeren icon)
- `pillow.png` - Kussen (slapen icon)
- `shower.png` - Douche (wassen icon)
- `gamepad.png` - Gamepad (spelen icon)
- `nootjes.png` - Nootjes icon
- `coconut.png` - Kokosnoot (zoals in referentie)

### `/ui/` - UI Elements
User interface elementen:
- `button.png` - Button sprite
- `panel.png` - Panel background
- `meter-bar.png` - Meter bar sprite
- `badge.png` - Badge sprite

## Sprite Specificaties

### Formaat
- **Hamster sprites**: 128x128px of 256x256px
- **Background elements**: Variabel, afhankelijk van element
- **UI elements**: 32x32px, 64x64px, of 128x128px
- **Items**: 64x64px

### Bestandsformaat
- **PNG** met transparantie voor sprites
- **JPG** voor full backgrounds zonder transparantie
- **SVG** optioneel voor UI elementen die moeten schalen

### Naamgeving
- Lowercase met dashes: `hamster-idle.png`
- Beschrijvende namen: `hamster-eating-carrot.png`
- Variants met suffix: `hamster-happy-01.png`, `hamster-happy-02.png`

## Implementatie

### Laden in React
```jsx
// Direct path (public folder)
<img src="/sprites/hamster/hamster-idle.png" alt="Hamster" />

// Of via import
import hamsterIdle from '/sprites/hamster/hamster-idle.png'
<img src={hamsterIdle} alt="Hamster" />
```

### Dynamisch laden
```jsx
const hamsterState = 'happy'
<img src={`/sprites/hamster/hamster-${hamsterState}.png`} alt="Hamster" />
```

## TODO
- [ ] Creëer of verkrijg hamster sprite sheets
- [ ] Exporteer 3D renders naar PNG
- [ ] Optimaliseer file sizes (gebruik TinyPNG of similar)
- [ ] Maak sprite variants voor alle states
- [ ] Test alle sprites in de app
- [ ] Voeg seasonal/outfit variants toe
