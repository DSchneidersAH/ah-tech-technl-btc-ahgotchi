import { useState, useEffect } from 'react'
import './App.css'

import petData from '../data/pet.json'
import actionsData from '../data/actions.json'
import earnActionsData from '../data/earn-actions.json'
import allPropositionsData from '../data/all-propositions.json'
import customerPropositionsData from '../data/propositions.json'
import receiptsData from '../data/Receipt Mock Data.json'
import customersData from '../data/Customer Mock Data.json'

import StatusBar from './components/StatusBar.jsx'
import HamsterRoom from './components/HamsterRoom.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import BottomPanel from './components/BottomPanel.jsx'
import BottomNav from './components/BottomNav.jsx'
import EarnPanel from './components/EarnPanel.jsx'
import OutfitSelector from './components/OutfitSelector.jsx'
import AchievementOverlay from './components/AchievementOverlay.jsx'
import ActionsView from './components/ActionsView.jsx'

function App() {
  const [age, setAge] = useState(petData.initialAge)
  // Start at 11:00 on day 1 (11 real minutes = 11 game hours elapsed)
  const [dayStartTime, setDayStartTime] = useState(Date.now() - (11 * 60 * 1000))
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [cleanness, setCleanness] = useState(50)
  const [nutrition, setNutrition] = useState(50)
  const [entertainment, setEntertainment] = useState(50)
  const [rest, setRest] = useState(50)
  const [nootjes, setNootjes] = useState(50)
  const [thought, setThought] = useState(null)
  const [bumpKey, setBumpKey] = useState(0)
  const [showEarnPanel, setShowEarnPanel] = useState(false)
  const [showOutfitSelector, setShowOutfitSelector] = useState(false)
  const [currentOutfit, setCurrentOutfit] = useState('default')
  const [hamsterSprite, setHamsterSprite] = useState('/sprites/hamster/hamster.png')
  const [lastHour, setLastHour] = useState(11)
  const [statChanges, setStatChanges] = useState([])
  const [unlockedOutfits, setUnlockedOutfits] = useState(['default', 'sombrero', 'swim'])
  const [achievementOutfit, setAchievementOutfit] = useState(null)
  const [activeTab, setActiveTab] = useState('hamster')

  // Selected customer state with localStorage persistence
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    const saved = localStorage.getItem('selectedCustomer')
    return saved || '200456' // Default to Jan de Vries
  })

  // Save selected customer to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCustomer', selectedCustomer)
  }, [selectedCustomer])

  // Get current customer name
  const getCurrentCustomerName = () => {
    const customer = customersData.find(c => c.klantnummer === selectedCustomer)
    return customer ? customer.naam : 'AH HAMSTER'
  }

  const outfits = {
    tiara: {
      id: 'tiara',
      label: 'Tiara',
      sprite: '/sprites/hamster/hamster-tiara.png',
      unlockMessage: 'Je hamster heeft 100% rust bereikt! Deze koninklijke tiara is nu van jou.',
    },
    wk: {
      id: 'wk',
      label: 'WK',
      sprite: '/sprites/hamster/hamster-wk.png',
      unlockMessage: 'Je hamster heeft 100% entertainment bereikt! Deze WK outfit is nu van jou.',
    },
  }

  // Calculate hours and minutes based on elapsed time
  // 1 real minute = 1 game hour, so 24 real minutes = 1 game day
  const elapsedSeconds = (currentTime - dayStartTime) / 1000
  const totalGameMinutes = elapsedSeconds / 60 // elapsed real seconds / 60 = elapsed real minutes = game hours
  const hours = Math.floor(totalGameMinutes) % 24
  const minutes = Math.floor((totalGameMinutes % 1) * 60)

  // Live counter - update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000) // Update every second
    return () => clearInterval(interval)
  }, [])

  // Check if a new day has started (every 24 real minutes)
  useEffect(() => {
    const elapsedMinutes = (currentTime - dayStartTime) / 1000 / 60
    if (elapsedMinutes >= 24) {
      setAge((a) => a + 1)
      setDayStartTime(Date.now())
      setLastHour(0)
    }
  }, [currentTime, dayStartTime])

  // Hourly decay - every game hour (= 1 real minute)
  // Base decay: cleanness: -5, nutrition: -10, entertainment: -5, rest: -7
  // Outfit modifiers add +3 extra decay to specific stats:
  // - tiara: rest -3 extra (total -10)
  // - sombrero: nutrition -3 extra (total -13)
  // - swim: cleanness -3 extra (total -8)
  // - wk: entertainment -3 extra (total -8)
  useEffect(() => {
    if (hours !== lastHour) {
      const outfitModifiers = {
        tiara: { rest: 3 },
        sombrero: { nutrition: 3 },
        swim: { cleanness: 3 },
        wk: { entertainment: 3 },
      }

      const modifier = outfitModifiers[currentOutfit] || {}

      const cleannessDecay = 5 + (modifier.cleanness || 0)
      const nutritionDecay = 10 + (modifier.nutrition || 0)
      const entertainmentDecay = 5 + (modifier.entertainment || 0)
      const restDecay = 7 + (modifier.rest || 0)

      setCleanness((c) => Math.max(0, c - cleannessDecay))
      setNutrition((n) => Math.max(0, n - nutritionDecay))
      setEntertainment((e) => Math.max(0, e - entertainmentDecay))
      setRest((r) => Math.max(0, r - restDecay))

      // Show stat change overlays
      const changes = [
        { type: 'rest', value: -restDecay, id: Date.now() + 0 },
        { type: 'cleanness', value: -cleannessDecay, id: Date.now() + 1 },
        { type: 'nutrition', value: -nutritionDecay, id: Date.now() + 2 },
        { type: 'entertainment', value: -entertainmentDecay, id: Date.now() + 3 },
      ]
      setStatChanges(changes)
      setTimeout(() => setStatChanges([]), 2000)

      setLastHour(hours)
    }
  }, [hours, lastHour, currentOutfit])

  const showStatChange = (type, value) => {
    const change = { type, value, id: Date.now() }
    setStatChanges((prev) => [...prev, change])
    setTimeout(() => {
      setStatChanges((prev) => prev.filter((c) => c.id !== change.id))
    }, 2000)
  }

  const handleAction = (action) => {
    // Calculate outfit-specific cost modifiers (+5 for corresponding action)
    // - tiara: "slapen" +5
    // - sombrero: "voeren" +5
    // - swim: "wassen" +5
    // - wk: "spelen" +5
    const outfitCostModifiers = {
      tiara: { slapen: 5 },
      sombrero: { voeren: 5 },
      swim: { wassen: 5 },
      wk: { spelen: 5 },
    }

    const costModifier = outfitCostModifiers[currentOutfit]?.[action.id] || 0
    const finalCost = action.cost + costModifier

    // Check if user has enough nootjes
    if (nootjes < finalCost) {
      setThought('❌')
      setBumpKey((k) => k + 1)
      setTimeout(() => setThought(null), 3500)
      return
    }

    // Spend nootjes
    setNootjes((n) => n - finalCost)

    // Check if stat is already maxed out and show special message
    const fullMessages = {
      voeren: ['Ik zit al vol!', 'Kan echt niks meer eten!', 'Mijn buikje is vol! 🤰'],
      slapen: ['Ik ben niet moe!', 'Kan niet meer slapen!', 'Ik heb genoeg rust gehad! ⚡'],
      wassen: ['Ik wil niet meer douchen!', 'Ik ben al schoon!', 'Te schoon! ✨'],
      spelen: ['Ik wil even niet spelen!', 'Ben al blij genoeg!', 'Hoef niet meer! 😊'],
    }

    // Update meters based on action type
    if (action.id === 'voeren') {
      if (nutrition >= 100) {
        const messages = fullMessages.voeren
        setThought(messages[Math.floor(Math.random() * messages.length)])
        setBumpKey((k) => k + 1)
        setTimeout(() => setThought(null), 3500)
        return
      }
      setNutrition((n) => Math.min(100, n + 20))
      showStatChange('nutrition', 20)
      // Eating also gives +5 entertainment
      setEntertainment((e) => Math.min(100, e + 5))
      showStatChange('entertainment', 5)
    } else if (action.id === 'slapen') {
      if (rest >= 100) {
        const messages = fullMessages.slapen
        setThought(messages[Math.floor(Math.random() * messages.length)])
        setBumpKey((k) => k + 1)
        setTimeout(() => setThought(null), 3500)
        return
      }
      // Logarithmic restore: higher impact when rest is low, lower when rest is high
      // Min: +10 (when rest is high), Max: +40 (when rest is low)
      const restoreAmount = Math.round(
        10 + 30 * (1 - Math.log(1 + rest) / Math.log(101))
      )

      setRest((r) => {
        const newRest = Math.min(100, r + restoreAmount)
        // Check if tiara should be unlocked
        if (newRest === 100 && !unlockedOutfits.includes('tiara')) {
          setUnlockedOutfits((prev) => [...prev, 'tiara'])
          setTimeout(() => setAchievementOutfit(outfits.tiara), 500)
        }
        return newRest
      })
      showStatChange('rest', restoreAmount)
      // Sleeping makes the hamster less clean and less entertained
      setCleanness((c) => Math.max(0, c - 5))
      showStatChange('cleanness', -5)
      setEntertainment((e) => Math.max(0, e - 5))
      showStatChange('entertainment', -5)
    } else if (action.id === 'wassen') {
      if (cleanness >= 100) {
        const messages = fullMessages.wassen
        setThought(messages[Math.floor(Math.random() * messages.length)])
        setBumpKey((k) => k + 1)
        setTimeout(() => setThought(null), 3500)
        return
      }
      setCleanness((c) => Math.min(100, c + 25))
      showStatChange('cleanness', 25)
    } else if (action.id === 'spelen') {
      if (entertainment >= 100) {
        const messages = fullMessages.spelen
        setThought(messages[Math.floor(Math.random() * messages.length)])
        setBumpKey((k) => k + 1)
        setTimeout(() => setThought(null), 3500)
        return
      }
      setEntertainment((e) => {
        const newEntertainment = Math.min(100, e + 20)
        // Check if WK should be unlocked
        if (newEntertainment === 100 && !unlockedOutfits.includes('wk')) {
          setUnlockedOutfits((prev) => [...prev, 'wk'])
          setTimeout(() => setAchievementOutfit(outfits.wk), 500)
        }
        return newEntertainment
      })
      showStatChange('entertainment', 20)
    }

    // Show thought bubble
    setThought(action.thought)
    setBumpKey((k) => k + 1)

    // Clear thought after 3.5 seconds
    setTimeout(() => setThought(null), 3500)
  }

  const handleEarnAction = (action) => {
    setNootjes((n) => n + action.nootjes)
    setThought('🥜')
    setBumpKey((k) => k + 1)
    setTimeout(() => setThought(null), 3500)
  }

  const handleSelectOutfit = (outfitId, spritePath) => {
    setCurrentOutfit(outfitId)
    setHamsterSprite(spritePath)
  }

  const handleAddHour = () => {
    // Move dayStartTime back by 1 minute (= 1 game hour)
    setDayStartTime((prev) => prev - 60000)
  }

  const handleReset = () => {
    setAge(petData.initialAge)
    setDayStartTime(Date.now() - (11 * 60 * 1000)) // Start at 11:00
    setCurrentTime(Date.now())
    setLastHour(11)
    setCleanness(50)
    setNutrition(50)
    setEntertainment(50)
    setRest(50)
    setNootjes(50)
    setThought(null)
    setBumpKey((k) => k + 1)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <div className="ah-logo">AH</div>
          <h1 className="app-title">{getCurrentCustomerName()}</h1>
        </div>
        <button className="help-btn">?</button>
      </header>

      <main className="app-main">
        {activeTab === 'hamster' ? (
          <>
            <StatusBar
              cleanness={cleanness}
              nutrition={nutrition}
              entertainment={entertainment}
              rest={rest}
              statChanges={statChanges}
              criticalStats={{
                cleanness: cleanness < 25,
                nutrition: nutrition < 25,
                entertainment: entertainment < 25,
                rest: rest < 25,
              }}
            />

            <HamsterRoom
              thought={thought}
              bumpKey={bumpKey}
              hamsterSprite={hamsterSprite}
              nutrition={nutrition}
              rest={rest}
              onBagClick={() => setShowOutfitSelector(true)}
            />

            <ActionButtons
              actions={actionsData}
              onAction={handleAction}
              nootjes={nootjes}
              currentOutfit={currentOutfit}
            />

            <BottomPanel
              age={age}
              hours={hours}
              minutes={minutes}
              nootjes={nootjes}
              onNootjesClick={() => setShowEarnPanel(!showEarnPanel)}
              onAgeClick={handleAddHour}
            />
          </>
        ) : (
          <ActionsView
            allPropositions={allPropositionsData}
            customerPropositions={customerPropositionsData}
            receipts={receiptsData}
            customers={customersData}
            selectedCustomer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
          />
        )}

        {showEarnPanel && (
          <EarnPanel
            actions={earnActionsData}
            onEarnAction={handleEarnAction}
            onClose={() => setShowEarnPanel(false)}
          />
        )}

        {showOutfitSelector && (
          <OutfitSelector
            currentOutfit={currentOutfit}
            unlockedOutfits={unlockedOutfits}
            onSelectOutfit={handleSelectOutfit}
            onClose={() => setShowOutfitSelector(false)}
          />
        )}

        {achievementOutfit && (
          <AchievementOverlay
            outfit={achievementOutfit}
            onSelect={() => {
              handleSelectOutfit(achievementOutfit.id, achievementOutfit.sprite)
              setAchievementOutfit(null)
            }}
            onClose={() => setAchievementOutfit(null)}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dev reset button */}
      <button className="dev-reset" onClick={handleReset}>
        🔄 Reset
      </button>
    </div>
  )
}

export default App
