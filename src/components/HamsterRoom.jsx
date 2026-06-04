export default function HamsterRoom({ thought, bumpKey, hamsterSprite, nutrition, rest, onBagClick }) {
  // Calculate critical stat effect based on nutrition OR rest
  // < 25: grayscale and darken starts
  // < 15: more intense
  // < 5: extremely intense
  const lowestStat = Math.min(nutrition, rest)

  const getCriticalLevel = () => {
    if (lowestStat >= 25) return 'none'
    if (lowestStat >= 15) return 'warning'
    if (lowestStat >= 5) return 'danger'
    return 'critical'
  }

  const criticalLevel = getCriticalLevel()

  const getCriticalStatEffect = () => {
    if (criticalLevel === 'none') {
      return {
        filter: 'none',
        transition: 'filter 2s ease-in-out'
      }
    }

    const grayscaleAmount = Math.min(100, ((25 - lowestStat) / 25) * 100)
    const darkenAmount = Math.min(0.8, ((25 - lowestStat) / 25) * 0.8)

    return {
      filter: `grayscale(${grayscaleAmount}%) brightness(${1 - darkenAmount})`,
      transition: 'filter 2s ease-in-out'
    }
  }

  return (
    <div className={`hamster-room hamster-room--${criticalLevel}`} key={bumpKey}>
      <div className={`room-bg ${criticalLevel !== 'none' ? `room-bg--${criticalLevel}` : ''}`} style={getCriticalStatEffect()}>
        {/* Background Image */}
        <img
          src="/sprites/backgrounds/hamster-background.png"
          alt="Hamster Room"
          className="room-background-image"
        />

        {/* Clickable AH Bag Hotspot (bottom left) */}
        <div
          className="bag-hotspot"
          onClick={onBagClick}
          title="Kies een outfit"
        />

        {/* Hamster */}
        <div className="hamster-container">
          {thought && (
            <div className={`thought-bubble ${thought.length <= 3 ? 'thought-bubble--emoji' : ''}`}>
              <span>{thought}</span>
            </div>
          )}
          <img
            src={hamsterSprite}
            alt="Hamster"
            className="hamster-sprite-image"
          />
        </div>
      </div>
    </div>
  )
}
