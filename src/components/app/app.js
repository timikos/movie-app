import { useEffect, useState } from 'react'

import './app.css'
import Header from '../header'
import FilmsList from '../films-list'
import MapiService from '../../services/mapi-service'

function App() {
  const [films, setFilms] = useState([])
  const mapiService = new MapiService()

  useEffect(() => {
    mapiService.getResourse().then((resultFromResponse) => {
      setFilms(resultFromResponse.results)
    })
  }, [films.length])
  return (
    <div className="container">
      <Header />
      <FilmsList
        films={films}

      />
    </div>
  )
}

export default App
