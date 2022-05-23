import { Alert, Pagination } from 'antd'
import { useState, useEffect } from 'react'

import FilmsList from '../films-list'
import Finder from '../finder'
import MapiService from '../../services/mapi-service'

function SearchContainer({
  ratedFilms, setRatedFilms,
  stars, setStars,
}) {
  const [films, setFilms] = useState([])
  const [textInput, setTextInput] = useState('')
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
      <Finder
        textInput={textInput}
        setFilms={setFilms}
        setOnDebounced={setOnDebounced}
        setTextInput={setTextInput}
      />
      <FilmsList
        ratedFilms={ratedFilms}
        films={films}
        stars={stars}
        setStars={setStars}
        setRatedFilms={setRatedFilms}
        onDebounced={onDebounced}
        textInput={textInput}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Pagination
        className="pagination__container"
        defaultPageSize={6}
        defaultCurrent={1}
        total={films.length}
        onChange={changePage}
      />
    </>
  )
}

export default SearchContainer
