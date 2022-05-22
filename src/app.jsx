import { useState, useEffect } from 'react'

import SwitchTab from './components/switch-tab'
import SearchContainer from './components/search-container'
import RatedContainer from './components/rated-container'
import { RatedFilmsProvider } from './components/rated-films-context'
import JapiService from './services/japi-service'
import { JenreProvider } from './components/jenre-context'


function App() {
  const [toggleTab, setToggleTab] = useState(true)
  const [ratedFilms, setRatedFilms] = useState([])
  const [genres, setGenres] = useState([])
  console.log(ratedFilms)
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
          ? <RatedFilmsProvider value={setRatedFilms}>
            <SearchContainer setRatedFilms={setRatedFilms} />
        </RatedFilmsProvider>
          : <RatedContainer ratedFilms={ratedFilms} />
        }
      </JenreProvider>
    </main>
  )
}

export default App
