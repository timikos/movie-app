import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

import Film from '../film'

function FilmsList({ films, minValue, maxValue }) {
  const [loading, setLoading] = useState(false)
  const [noRes, setNoResult] = useState(false)
  const spinner = loading ? <Spin /> : null
  const noResult = noRes ? <p>Нет результатов</p> : null

  useEffect(() => {
    // films.length > 0 ? setLoading(false) : setLoading(true)
    setNoResult(false)
    if (films.length === 0) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setNoResult(true)
      },1000)
    }

    console.log(films)
  }, [films])

  const elements = films.map((elem, index) => {
    if (index >= minValue && index < maxValue) {
      return (
        <li key={index}>
          <Film
            {...elem}
          />
        </li>
      )
    }

    return null
  })
  return (
    <>
      {noResult}
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
