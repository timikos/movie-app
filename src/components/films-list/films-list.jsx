import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

import Film from '../film'
import { RatedFilmsProvider } from '../rated-films-context'

function FilmsList(
  {
    labelInput, films, minValue, maxValue, onDebounced, setRatedFilms, ratedFilms, setStars, stars
  }
) {
  const [loading, setLoading] = useState(false)
  const [noRes, setNoResult] = useState(false)
  const [noLabel, setNoLabel] = useState(false)
  const spinner = loading ? <Spin /> : null
  const noResultDiv = noRes ? <p>Нет результатов</p> : null
  const noLabelDiv = noLabel ? <p>Введите название фильма</p> : null
  useEffect(() => {
    films.length === 0
    && labelInput !== ''
    && onDebounced ? setLoading(true) : setLoading(false)
    films.length === 0
    && labelInput !== ''
    && !onDebounced ? setNoResult(true) : setNoResult(false)
    films.length === 0
    && labelInput === ''
    && !loading ? setNoLabel(true) : setNoLabel(false)
  }, [films])
  const addOnRatedFilms = (film, valueStars) => {
    const newArrRated = [...ratedFilms]
    newArrRated.push(film)
    const tmpArr = [...stars]
    tmpArr.push(valueStars)
    setStars(tmpArr)
    setRatedFilms(newArrRated)
  }
  const elements = films.map((elem, index) => {
    if (index >= minValue && index < maxValue) {
      return (
        <li key={index}>
          <RatedFilmsProvider>
            <Film
              addOnRatedFilms={addOnRatedFilms}
              elem={elem}
              {...elem}
            />
          </RatedFilmsProvider>
        </li>
      )
    }

    return null
  })
  return (
    <>
      {noLabelDiv}
      {noResultDiv}
      {spinner}
      <ul className="films-list__container">{elements}</ul>
    </>
  )
}

Film.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  })),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
}

Film.defaultProps = {
  films: [],
  minValue: 0,
  maxValue: 0,
}

export default FilmsList
