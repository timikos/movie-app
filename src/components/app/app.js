import { useEffect, useState } from 'react'
import './app.css'
import { Pagination } from 'antd'

import Header from '../header'
import Finder from '../finder'
import FilmsList from '../films-list'
import SwitchTab from '../switch-tab'
import MapiService from '../../services/mapi-service'

function App() {
  const [films, setFilms] = useState([])
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1)
  const mapiService = new MapiService()

  useEffect(() => {
    mapiService.getResourse().then((resultFromResponse) => {
      setFilms(resultFromResponse.results)
      setMinValue(0)
      setMaxValue(6)
    })
  }, [])

  const changePage = (page) => {
    setMinValue(() => (page - 1) * 6)
    setMaxValue(() => page * 6)
  }
  console.log(films)
  return (
    <div className="container">
      <Header />
      <SwitchTab />
      <Finder
        films={films}
        setFilms={setFilms}
      />
      <FilmsList
        minValue={minValue}
        maxValue={maxValue}
        films={films}
      />
      <Pagination
        className="pagination__container"
        defaultPageSize={6}
        defaultCurrent={1}
        total={films.length}
        onChange={changePage}
      />
    </div>
  )
}

export default App
