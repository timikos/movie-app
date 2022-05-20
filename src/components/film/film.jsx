import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'

import Genre from '../genre'
import { JenreConsumer } from '../jenre-context'

function Film({
  title, release_date,
  genre_ids, overview,
  poster_path, vote_average,
}) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  let className = 'film__circle-rating'
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
  if (rating >= 0 && rating < 3) className += ' circle-rating__red'
  else if (rating >= 3 && rating < 5) className += ' circle-rating__orange'
  else if (rating >= 5 && rating < 7) className += ' circle-rating__yellow'
  else className += ' circle-rating__green'
  return (
    <JenreConsumer>
      {
        (genres) => {
          const genresFilm = tags.map(elem => genres[elem])
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
                {genresFilm.map((elem, index) => {
                  return (
                    <Genre
                      key={index}
                      elem={elem}
                    />
                  )
                })}
                <p className="film__text">{text}</p>
                <div className={className}>
                  <p>{rating}</p>
                </div>
                <div className="rating-area">
                  <input type="radio" id="star-1" name="rating" value="1" />
                  <label htmlFor="star-1" title="Оценка «1»" />
                  <input type="radio" id="star-2" name="rating" value="2" />
                  <label htmlFor="star-2" title="Оценка «2»" />
                  <input type="radio" id="star-3" name="rating" value="3" />
                  <label htmlFor="star-3" title="Оценка «3»" />
                  <input type="radio" id="star-4" name="rating" value="4" />
                  <label htmlFor="star-4" title="Оценка «4»" />
                  <input type="radio" id="star-5" name="rating" value="5" />
                  <label htmlFor="star-5" title="Оценка «5»" />
                  <input type="radio" id="star-6" name="rating" value="6" />
                  <label htmlFor="star-6" title="Оценка «6»" />
                  <input type="radio" id="star-7" name="rating" value="7" />
                  <label htmlFor="star-7" title="Оценка «7»" />
                  <input type="radio" id="star-8" name="rating" value="8" />
                  <label htmlFor="star-8" title="Оценка «8»" />
                  <input type="radio" id="star-9" name="rating" value="9" />
                  <label htmlFor="star-9" title="Оценка «9»" />
                  <input type="radio" id="star-10" name="rating" value="10" />
                  <label htmlFor="star-10" title="Оценка «10»" />
                </div>
              </div>
            </div>
          )
        }
      }
    </JenreConsumer>
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
