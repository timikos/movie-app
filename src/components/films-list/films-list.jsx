import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import Spinner from '../spinner'
import Film from '../film'

import './films-list.css'

function FilmsList(
  {
    films, ratedFilms,
    minValue, maxValue,
    textInput, stars,
    onDebounced, setRatedFilms,
    setStars
  }
) {
  const [onLoad, setOnLoad] = useState(false)
  const [onResult, setOnResult] = useState(false)
  const [onHaveTextInput, setOnHaveTextInput] = useState(false)
  const spinnerLoading = onLoad ? <Spinner /> : null
  const noResultDiv = onResult ? <p>Нет результатов</p> : null
  const noTextInputDiv = onHaveTextInput ? <p>Введите название фильма</p> : null
  useEffect(() => {
    textInput !== ''
    && onDebounced ? setOnLoad(true) : setOnLoad(false)
    films.length === 0 && textInput !== ''
    && !onDebounced ? setOnResult(true) : setOnResult(false)
    textInput === ''
    && !onLoad ? setOnHaveTextInput(true) : setOnHaveTextInput(false)
  }, [films])
  const addOnRatedFilms = (film, valueStars) => {
    const newArrRatedFilms = [...ratedFilms]
    newArrRatedFilms.push(film)
    const newArrStars = [...stars]
    newArrStars.push(valueStars)
    setStars(newArrStars)
    setRatedFilms(newArrRatedFilms)
  }
  const elements = films.map((elem, index) => {
    if (index >= minValue && index < maxValue) {
      return (
        <li key={index}>
          <Film
            addOnRatedFilms={addOnRatedFilms}
            elem={elem}
            {...elem}
          />
        </li>
      )
    }

    return null
  })
  return (
    <>
      {noTextInputDiv}
      {noResultDiv}
      {spinnerLoading}
      <ul className="films-list__container">{elements}</ul>
    </>
  )
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  })),
  ratedFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  })),
  stars: PropTypes.arrayOf(PropTypes.number),
  labelInput: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onDebounced: PropTypes.bool,
  setRatedFilms: PropTypes.func,
  setStars: PropTypes.func,
}

FilmsList.defaultProps = {
  films: [],
  ratedFilms: [],
  stars: [],
  labelInput: '',
  minValue: 0,
  maxValue: 0,
  onDebounced: false,
  setRatedFilms: () => {},
  setStars: () => {},
}

export default FilmsList
