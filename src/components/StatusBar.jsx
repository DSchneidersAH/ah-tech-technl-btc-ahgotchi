export default function StatusBar({ cleanness, nutrition, entertainment, rest, statChanges = [], criticalStats = {} }) {
  // Calculate circle stroke dashoffset for each quadrant (0-100 to circle progress)
  const getStrokeDashoffset = (value) => {
    const circumference = 2 * Math.PI * 70 // radius = 70 (larger)
    return circumference - (value / 100) * (circumference / 4) // Each quadrant is 1/4
  }

  const circumference = 2 * Math.PI * 70

  // Position mapping for stat change overlays
  const statPositions = {
    cleanness: { x: 115, y: 45 },
    nutrition: { x: 115, y: 115 },
    entertainment: { x: 45, y: 115 },
    rest: { x: 45, y: 45 },
  }

  return (
    <div className="status-bar">
      <svg className="status-circle" viewBox="0 0 160 160" width="100%" height="100%">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="var(--ah-tan)"
          strokeWidth="16"
        />

        {/* Cleanness (top-right quadrant) - Red */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="16"
          strokeDasharray={`${circumference / 4} ${circumference}`}
          strokeDashoffset={-getStrokeDashoffset(cleanness)}
          transform="rotate(0 80 80)"
          strokeLinecap="butt"
        />

        {/* Nutrition (bottom-right quadrant) - Yellow/Orange */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#FFD93D"
          strokeWidth="16"
          strokeDasharray={`${circumference / 4} ${circumference}`}
          strokeDashoffset={-getStrokeDashoffset(nutrition)}
          transform="rotate(90 80 80)"
          strokeLinecap="butt"
        />

        {/* Entertainment (bottom-left quadrant) - Green */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#6BCF7F"
          strokeWidth="16"
          strokeDasharray={`${circumference / 4} ${circumference}`}
          strokeDashoffset={-getStrokeDashoffset(entertainment)}
          transform="rotate(180 80 80)"
          strokeLinecap="butt"
        />

        {/* Rest (top-left quadrant) - Blue */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="#6BB6FF"
          strokeWidth="16"
          strokeDasharray={`${circumference / 4} ${circumference}`}
          strokeDashoffset={-getStrokeDashoffset(rest)}
          transform="rotate(270 80 80)"
          strokeLinecap="butt"
        />

        {/* Center divider lines */}
        <line x1="80" y1="10" x2="80" y2="150" stroke="var(--ah-brown)" strokeWidth="2" />
        <line x1="10" y1="80" x2="150" y2="80" stroke="var(--ah-brown)" strokeWidth="2" />

        {/* Icons in each quadrant */}
        <text
          x="108"
          y="52"
          fontSize="26"
          textAnchor="middle"
          className={criticalStats.cleanness ? 'status-icon-critical' : ''}
        >
          🚿
        </text>
        <text
          x="108"
          y="112"
          fontSize="26"
          textAnchor="middle"
          className={criticalStats.nutrition ? 'status-icon-critical' : ''}
        >
          🍎
        </text>
        <text
          x="52"
          y="112"
          fontSize="26"
          textAnchor="middle"
          className={criticalStats.entertainment ? 'status-icon-critical' : ''}
        >
          🎮
        </text>
        <text
          x="52"
          y="52"
          fontSize="26"
          textAnchor="middle"
          className={criticalStats.rest ? 'status-icon-critical' : ''}
        >
          💤
        </text>

        {/* Stat change overlays */}
        {statChanges.map((change) => {
          const pos = statPositions[change.type]
          if (!pos) return null
          return (
            <g key={change.id} className="stat-change-overlay">
              <rect
                x={pos.x - 18}
                y={pos.y - 15}
                width="36"
                height="20"
                rx="4"
                fill={change.value > 0 ? '#4CAF50' : '#FF6B6B'}
                opacity="0.95"
              />
              <text
                x={pos.x}
                y={pos.y}
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fill="white"
              >
                {change.value > 0 ? '+' : ''}{change.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
