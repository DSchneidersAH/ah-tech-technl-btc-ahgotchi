export default function BottomPanel({ age, hours, minutes, nootjes, onNootjesClick, onAgeClick }) {
  const circumference = 2 * Math.PI * 20
  const totalMinutes = hours + (minutes / 60)
  const progress = (totalMinutes / 24) * circumference
  const isDay = hours >= 6 && hours < 18

  return (
    <div className="bottom-panel">
      <div className="punten-box" onClick={onAgeClick}>
        <svg className="time-circle" width="60" height="60" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="var(--ah-tan)"
            strokeWidth="6"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={isDay ? "#FFD93D" : "#6BB6FF"}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            transform="rotate(-90 25 25)"
            strokeLinecap="round"
          />
          <text x="25" y="30" fontSize="16" textAnchor="middle">
            {isDay ? '☀️' : '🌙'}
          </text>
        </svg>
        <div className="punten-section">
          <div className="punten-label">LEEFTIJD</div>
          <div className="punten-value">{age} DAG{age !== 1 ? 'EN' : ''}</div>
          <div className="punten-sublabel">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}</div>
        </div>
      </div>
      <div className="punten-box" onClick={onNootjesClick}>
        <div className="punten-section">
          <span className="punten-icon">🥜</span>
          <div className="punten-label">NOOTJES</div>
          <div className="punten-value">{nootjes}</div>
        </div>
        <div className="earn-badge">+</div>
      </div>
    </div>
  )
}
