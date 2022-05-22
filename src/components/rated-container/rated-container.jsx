import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import Film from '../film'

function RatedContainer(
  {
    ratedFilms, minValue, maxValue, setRatedFilms
  }
) {
  const elements = ratedFilms.map((elem, index) => {

      return (
        <li key={index}>
          <Film
            {...elem}
          />
        </li>
      )


    return null
  })
  return (
    <ul className="films-list__container">{elements}</ul>
  )
}

RatedContainer.propTypes = {
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

RatedContainer.defaultProps = {
  films: [],
  minValue: 0,
  maxValue: 0,
}

export default RatedContainer
