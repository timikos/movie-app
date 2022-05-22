import { Alert, Pagination } from 'antd'
import { useState, useEffect } from 'react'

import FilmsList from '../films-list'
import Finder from '../finder'
import MapiService from '../../services/mapi-service'
import JapiService from '../../services/japi-service'
import { JenreProvider } from '../jenre-context'

function SearchContainer({setRatedFilms}) {
  const [films, setFilms] = useState([])
  const [genres, setGenres] = useState([])
  const [labelInput, setLabelInput] = useState('')
  const [onDebounced, setOnDebounced] = useState(false)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1)
  const [error, setError] = useState(false)
  useEffect(() => {
    JapiService(setGenres, setError)
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
        setOnDebounced={setOnDebounced}
        labelInput={labelInput}
        setLabelInput={setLabelInput}
        films={films}
        setFilms={setFilms}
      />
      <FilmsList
        setRatedFilms={setRatedFilms}
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
    </>
  )
}

export default SearchContainer
