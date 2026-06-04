export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'hamster' ? 'nav-item--active' : ''}`}
        onClick={() => onTabChange('hamster')}
      >
        <span className="nav-icon">🐹</span>
        <span className="nav-label">HAMSTER</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'actions' ? 'nav-item--active' : ''}`}
        onClick={() => onTabChange('actions')}
      >
        <span className="nav-icon">📊</span>
        <span className="nav-label">JOUW ACTIES</span>
      </button>
    </nav>
  )
}
