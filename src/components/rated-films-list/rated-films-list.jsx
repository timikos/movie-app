import PropTypes from 'prop-types'

import RatedFilm from '../rated-film'

function RatedFilmsList(
  {
    ratedFilms, minValue, maxValue, stars
  }
) {
  const elements = ratedFilms.map((elem, index) => {
    if (index >= minValue && index < maxValue) {
      return (
        <li key={index}>
          <RatedFilm
            index={index}
            stars={stars}
            {...elem}
          />
        </li>
      )
    }

    return null
  })
  return (
    <ul className="films-list__container">{elements}</ul>
  )
}

export default RatedFilmsList
