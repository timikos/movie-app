import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'

import circle from '../static/circle.svg'

function Film({
  title, release_date,
  genre_ids, overview,
  poster_path, vote_average,
}) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [tags, setTags] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const limitText = (text) => {
    const limited = text.substring(0, 400) + '...'
    return text.length > 400 ? limited : text
  }

  useEffect(() => {
    setName(title)
    release_date
      ? setDateCreated(format(parseISO(release_date), 'MMMM dd, yyyy'))
      : ''
    setTags(genre_ids)
    setText(limitText(overview))
    poster_path ? setImg(poster_path) : setImg('')
    setRating(vote_average)
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
        <div className="film__circle-rating">
          <img
            src={circle}
            alt=""
          />
          <p>{rating}</p>
        </div>
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
