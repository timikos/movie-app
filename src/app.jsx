import { useState, useEffect } from 'react'

import SwitchTab from './components/switch-tab'
import SearchContainer from './components/search-container'
import RatedContainer from './components/rated-container'
import JapiService from './services/japi-service'
import { JenreProvider } from './components/jenre-context'

function App() {
  const [toggleTab, setToggleTab] = useState(true)
  const [ratedFilms, setRatedFilms] = useState([])
  const [stars, setStars] = useState([])
  const [genres, setGenres] = useState([])
  useEffect(() => {
    JapiService(setGenres)
  }, [])
  return (
    <main className="container">
      <SwitchTab
        setToggleTab={setToggleTab}
        toggleTab={toggleTab}
      />
      <JenreProvider value={genres}>
        {toggleTab
          ? <SearchContainer
            ratedFilms={ratedFilms}
            setRatedFilms={setRatedFilms}
            stars={stars}
            setStars={setStars}
          />
          : <RatedContainer
            stars={stars}
            ratedFilms={ratedFilms}
          />}
      </JenreProvider>
    </main>
  )
}

export default App
