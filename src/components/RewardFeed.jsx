const TYPE_LABEL = {
  bonus: 'Bonus offer',
  cosmetic: 'Cosmetic',
  content: 'Content unlock',
}

function RewardFeed({ rewards, onEquip, equippedId }) {
  if (rewards.length === 0) {
    return (
      <div className="rewards">
        <h3>Rewards</h3>
        <p className="rewards-empty">
          No rewards yet. Care for AHgochi to unlock Bonus offers, cosmetics, and content.
        </p>
      </div>
    )
  }
  return (
    <div className="rewards">
      <h3>Rewards <span className="rewards-count">{rewards.length}</span></h3>
      <ul className="rewards-list">
        {rewards.map((r, idx) => (
          <li
            key={`${r.id}-${idx}`}
            className="reward-card"
            style={{ borderLeftColor: r.color }}
          >
            <div className="reward-icon" style={{ background: r.color }}>
              {r.icon}
            </div>
            <div className="reward-body">
              <div className="reward-type">{TYPE_LABEL[r.type]}</div>
              <div className="reward-title">{r.title}</div>
              <div className="reward-sub">{r.subtitle}</div>
            </div>
            {r.type === 'cosmetic' ? (
              <button
                className="reward-equip"
                onClick={() => onEquip(r)}
                disabled={equippedId === r.id}
              >
                {equippedId === r.id ? 'Equipped' : 'Equip'}
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RewardFeed
