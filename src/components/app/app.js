import { useEffect, useState } from 'react'
import { Alert, Pagination } from 'antd'

import Header from '../header'
import Finder from '../finder'
import FilmsList from '../films-list'
import SwitchTab from '../switch-tab'
import MapiService from '../../services/mapi-service'

function App() {
  const [films, setFilms] = useState([])
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1)
  const [error, setError] = useState(false)
  const mapiService = new MapiService()

  const onError = () => {
    setError(true)
  }
  useEffect(() => {
    mapiService.getResourse()
      .then((resultFromResponse) => {
        setFilms(resultFromResponse.results)
        setMinValue(0)
        setMaxValue(6)
      })
      .catch(() => onError())
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
      </main>
    </>
  )
}

export default App
