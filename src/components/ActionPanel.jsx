function ActionPanel({ actions, onAction, disabled }) {
  return (
    <div className="actions-panel">
      <h3>Care actions</h3>
      <p className="actions-sub">Each one nudges AHgochi forward.</p>
      <div className="actions-grid">
        {actions.map((a) => (
          <button
            key={a.id}
            className={`action action--${a.category}`}
            onClick={() => onAction(a)}
            disabled={disabled}
          >
            <span className="action-icon">{a.icon}</span>
            <span className="action-label">{a.label}</span>
            <span className="action-gain">+{a.happinessGain}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ActionPanel
