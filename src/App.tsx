import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import CapabilityMap from './components/CapabilityMap'
import ScenarioSwitcher from './components/ScenarioSwitcher'
import DemoConsole from './components/DemoConsole'
import ClosingCta from './components/ClosingCta'
import Footer from './components/Footer'
import { getScenario, scenarios } from './data/showcase'

function App() {
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id ?? '')
  const activeScenario = getScenario(activeScenarioId)

  return (
    <div className="site-shell">
      <Navigation />
      <main>
        <HeroSection />
        <CapabilityMap />
        <ScenarioSwitcher
          activeScenarioId={activeScenario?.id ?? ''}
          onScenarioChange={setActiveScenarioId}
        />
        <DemoConsole />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}

export default App
