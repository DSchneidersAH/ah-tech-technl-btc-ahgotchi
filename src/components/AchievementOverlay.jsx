export default function AchievementOverlay({ outfit, onSelect, onClose }) {
  return (
    <div className="achievement-overlay" onClick={onClose}>
      <div className="achievement-panel" onClick={(e) => e.stopPropagation()}>
        <div className="achievement-confetti">🎉</div>
        <div className="achievement-confetti achievement-confetti--2">🎊</div>
        <div className="achievement-confetti achievement-confetti--3">✨</div>
        <div className="achievement-confetti achievement-confetti--4">⭐</div>

        <div className="achievement-header">
          <h2 className="achievement-title">OUTFIT ONTGRENDELD!</h2>
        </div>

        <div className="achievement-content">
          <div className="achievement-unlock-animation">
            <div className="achievement-lock-icon">🔒</div>
            <div className="achievement-arrow">→</div>
            <div className="achievement-unlock-icon">🔓</div>
          </div>

          <div className="achievement-sprite-preview">
            <img
              src={outfit.sprite}
              alt={outfit.label}
              className="achievement-sprite-image"
            />
          </div>

          <h3 className="achievement-outfit-name">{outfit.label}</h3>
          <p className="achievement-description">{outfit.unlockMessage}</p>

          <div className="achievement-buttons">
            <button className="achievement-btn achievement-btn--primary" onClick={onSelect}>
              DRAAG NU
            </button>
            <button className="achievement-btn achievement-btn--secondary" onClick={onClose}>
              LATER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
