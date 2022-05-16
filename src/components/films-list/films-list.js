import './films-list.css'

import PropTypes from 'prop-types'

import Film from '../film'

function FilmsList({ films, minValue, maxValue }) {
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

  return <ul className="films-list__container">{elements}</ul>
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
