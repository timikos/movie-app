import { useEffect, useState } from 'react'
import { Alert, Pagination } from 'antd'

import Header from './components/header'
import Finder from './components/finder'
import FilmsList from './components/films-list'
import SwitchTab from './components/switch-tab'
import MapiService from './services/mapi-service'

function App() {
  const [films, setFilms] = useState([])
  const [labelInput, setLabelInput] = useState('')
  const [onDebounced, setOnDebounced] = useState(false)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1)
  const [error, setError] = useState(false)
  useEffect(() => {
    MapiService(setFilms, setError, '')
    setMinValue(0)
    setMaxValue(6)
  }, [])

  const changePage = (page) => {
    setMinValue(() => (page - 1) * 6)
    setMaxValue(() => page * 6)
  }
  const errorMessage = error ? <Alert
    type="error"
    message="ERROR LOADING!"
    className="error__message"
  />
    : null
  return (
    <>
      {errorMessage}
      <main className="container">
        <Header />
        <SwitchTab />
        <Finder
          setOnDebounced={setOnDebounced}
          labelInput={labelInput}
          setLabelInput={setLabelInput}
          films={films}
          setFilms={setFilms}
        />
        <FilmsList
          onDebounced={onDebounced}
          labelInput={labelInput}
          setLabelInput={setLabelInput}
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
      </main>
    </>
  )
}

export default App
