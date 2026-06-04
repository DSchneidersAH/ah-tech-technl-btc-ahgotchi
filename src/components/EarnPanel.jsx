export default function EarnPanel({ actions, onEarnAction, onClose }) {
  return (
    <div className="earn-overlay" onClick={onClose}>
      <div className="earn-panel" onClick={(e) => e.stopPropagation()}>
        <div className="earn-header">
          <h2 className="earn-title">VERDIEN NOOTJES</h2>
          <button className="earn-close" onClick={onClose}>×</button>
        </div>
        <div className="earn-subtitle">
          Doe AH activiteiten om nootjes te verdienen
        </div>
        <div className="earn-grid">
          {actions.map((action) => (
            <button
              key={action.id}
              className="earn-btn"
              onClick={() => {
                onEarnAction(action)
                onClose()
              }}
            >
              <div className="earn-icon">{action.icon}</div>
              <div className="earn-info">
                <div className="earn-label">{action.label}</div>
                <div className="earn-desc">{action.description}</div>
              </div>
              <div className="earn-reward">+{action.nootjes} 🥜</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
