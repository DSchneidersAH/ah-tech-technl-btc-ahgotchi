export default function OutfitSelector({ currentOutfit, unlockedOutfits, onSelectOutfit, onClose }) {
  const outfits = [
    { id: 'default', label: 'Standaard', sprite: `${import.meta.env.BASE_URL}sprites/hamster/hamster.png` },
    { id: 'sombrero', label: 'Sombrero', sprite: `${import.meta.env.BASE_URL}sprites/hamster/hamster-sombrero.png` },
    { id: 'swim', label: 'Zwemmen', sprite: `${import.meta.env.BASE_URL}sprites/hamster/hamster-swim.png` },
    { id: 'wk', label: 'WK', sprite: `${import.meta.env.BASE_URL}sprites/hamster/hamster-wk.png` },
    { id: 'tiara', label: 'Tiara', sprite: `${import.meta.env.BASE_URL}sprites/hamster/hamster-tiara.png` },
  ]

  const isUnlocked = (outfitId) => unlockedOutfits.includes(outfitId)

  return (
    <div className="outfit-overlay" onClick={onClose}>
      <div className="outfit-panel" onClick={(e) => e.stopPropagation()}>
        <div className="outfit-header">
          <h2 className="outfit-title">KIES EEN OUTFIT</h2>
          <button className="outfit-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="outfit-subtitle">
          Klik op een outfit om je hamster te verkleden
        </div>

        <div className="outfit-grid">
          {outfits.map((outfit) => {
            const unlocked = isUnlocked(outfit.id)
            return (
              <button
                key={outfit.id}
                className={`outfit-btn ${currentOutfit === outfit.id ? 'outfit-btn--active' : ''} ${!unlocked ? 'outfit-btn--locked' : ''}`}
                onClick={() => {
                  if (unlocked) {
                    onSelectOutfit(outfit.id, outfit.sprite)
                    onClose()
                  }
                }}
                disabled={!unlocked}
              >
                <div className="outfit-preview">
                  <img
                    src={outfit.sprite}
                    alt={outfit.label}
                    className="outfit-preview-image"
                    style={{ filter: !unlocked ? 'grayscale(100%) brightness(0.5)' : 'none' }}
                    onError={(e) => {
                      // Fallback to default if sprite doesn't exist yet
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="outfit-placeholder" style={{ display: 'none' }}>
                    🐹
                  </div>
                  {!unlocked && (
                    <div className="outfit-lock">🔒</div>
                  )}
                </div>
                <div className="outfit-label">{outfit.label}</div>
                {currentOutfit === outfit.id && unlocked && (
                  <div className="outfit-check">✓</div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
