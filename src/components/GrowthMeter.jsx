function GrowthMeter({ happiness, stages }) {
  const pct = Math.max(0, Math.min(100, happiness))
  return (
    <div className="meter">
      <div className="meter-head">
        <span>Happiness & growth</span>
        <span className="meter-value">{Math.round(pct)} / 100</span>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${pct}%` }} />
        {stages.slice(1).map((s) => (
          <div
            key={s.id}
            className="meter-tick"
            style={{ left: `${s.minHappiness}%` }}
            title={`${s.label} at ${s.minHappiness}`}
          />
        ))}
      </div>
    </div>
  )
}

export default GrowthMeter
