function Pet({ stage, mood, equippedCosmetic, bumpKey }) {
  return (
    <div className="pet">
      <div className="pet-orb" key={bumpKey}>
        <span className="pet-emoji">{stage.emoji}</span>
        {equippedCosmetic ? (
          <span className="pet-cosmetic" title={equippedCosmetic.title}>
            {equippedCosmetic.icon}
          </span>
        ) : null}
      </div>
      <div className="pet-meta">
        <p className="pet-stage">
          {stage.label} <span className="pet-mood">{mood.emoji} {mood.label}</span>
        </p>
        <p className="pet-blurb">{stage.blurb}</p>
      </div>
    </div>
  )
}

export default Pet
