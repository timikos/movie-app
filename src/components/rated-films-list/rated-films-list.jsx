import PropTypes from 'prop-types'

import RatedFilm from '../rated-film'

function RatedFilmsList(
  {
    ratedFilms, stars,
    minValue, maxValue,
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

RatedFilmsList.propTypes = {
  ratedFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  })),
  stars: PropTypes.arrayOf(PropTypes.number),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
}

RatedFilmsList.defaultProps = {
  ratedFilms: [],
  stars: [],
  minValue: 0,
  maxValue: 0,
}

export default RatedFilmsList
