import './film.css'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'

function Film({
  title, release_date,
  genre_ids, overview,
  poster_path,
}) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [tags, setTags] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    setName(title)
    release_date
      ? setDateCreated(format(parseISO(release_date), 'MMMM dd, yyyy'))
      : ''
    setTags(genre_ids)
    setText(overview)
    if (poster_path) {
      setImg(poster_path)
    }
  }, [])

  return (
    <div className="film__container">
      <img
        src={`https://image.tmdb.org/t/p/w500/${img}`}
        alt="Poster"
        className="film__img"
      />
      <div className="film__about">
        <h2 className="film__name">{name}</h2>
        <p className="film__date_created">{dateCreated}</p>
        <p className="film__tags">{tags}</p>
        <p className="film__text">{text}</p>
      </div>

    </div>
  )
}

Film.propTypes = {
  title: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.number,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
}

Film.defaultProps = {
  title: '',
  release_date: '',
  genre_ids: 0,
  overview: '',
  poster_path: '',
}

export default Film
