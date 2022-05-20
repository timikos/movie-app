import { useState } from 'react'

import SwitchTab from './components/switch-tab'
import SearchContainer from './components/search-container'
import RatedContainer from './components/rated-container'

function App() {
  const [toggleTab, setToggleTab] = useState(true)
  return (
    <main className="container">
      <SwitchTab
        setToggleTab={setToggleTab}
        toggleTab={toggleTab}
      />
      {toggleTab
        ? <SearchContainer />
        : <RatedContainer />}
    </main>
  )
}

export default App
