import './films-list.css'

import Film from '../film'

function FilmsList({ films }) {
  const elements = films.map((elem, index) => {
    if (index < 6) {
      return (
        <li key={index}>
          <Film
            {...elem}
          />
        </li>
      )
    }

  })

  return <ul className="films-list__container">{elements}</ul>
}

export default FilmsList
