export default function ActionButtons({ actions, onAction, nootjes, currentOutfit }) {
  // Calculate outfit-specific cost modifiers (+5 for corresponding action)
  const outfitCostModifiers = {
    tiara: { slapen: 5 },
    sombrero: { voeren: 5 },
    swim: { wassen: 5 },
    wk: { spelen: 5 },
  }

  // Get final cost for each action
  const getFinalCost = (action) => {
    const costModifier = outfitCostModifiers[currentOutfit]?.[action.id] || 0
    return action.cost + costModifier
  }

  // Check if user can't afford ANY action
  const canAffordAny = actions.some(action => nootjes >= getFinalCost(action))

  // Random challenges when user is out of nootjes
  const challenges = [
    "Probeer een nieuwe Feature uit",
    "Koop eens een keer ons Brood",
    "Ontdek Allerhande recepten",
    "Activeer je Bonus aanbiedingen",
    "Kies voor duurzame producten",
    "Doe je boodschappen bij AH",
    "Bekijk de weekaanbiedingen",
    "Probeer ons Huismerk",
  ]

  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]

  return (
    <div className="action-section">
      {!canAffordAny && (
        <div className="action-challenge">
          <div className="challenge-icon">💡</div>
          <div className="challenge-text">{randomChallenge}</div>
        </div>
      )}
      <div className="action-prompt">WAT WIL JE DOEN?</div>
      <div className="action-grid">
        {actions.map((action) => {
          const finalCost = getFinalCost(action)
          const canAfford = nootjes >= finalCost
          const hasModifier = finalCost > action.cost
          return (
            <button
              key={action.id}
              className={`action-btn ${!canAfford ? 'action-btn--disabled' : ''}`}
              onClick={() => onAction(action)}
              disabled={!canAfford}
            >
              <div className="action-label">{action.label}</div>
              <div className="action-cost">
                {hasModifier && <span className="cost-original">{action.cost}</span>}
                {finalCost} 🥜
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
