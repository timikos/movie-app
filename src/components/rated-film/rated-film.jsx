import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'
import { Rate } from 'antd'

import Genre from '../genre'
import { JenreConsumer } from '../jenre-context'
import '../film/film.css'
import noImg from '../static/no-img.png'

function RatedFilm({
  title, release_date,
  genre_ids, overview,
  poster_path, vote_average,
  stars, index
}) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const [starsTen, setStarsTen] = useState(0)
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
    poster_path
      ? setImg(`https://image.tmdb.org/t/p/w500/${poster_path}`)
      : setImg(`${noImg}`)
    setRating(vote_average)
    setStarsTen(stars)
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
                src={img}
                alt="Poster"
                className="film__img"
              />
              <div className="film__about">
                <h2 className="film__name">{name}</h2>
                <p className="film__date_created">{dateCreated}</p>
                <div className="film__tags">
                  {genresFilm.map((elem, index) => {
                    return (
                      <Genre
                        key={index}
                        elem={elem}
                      />
                    )
                  })}
                </div>
                <p className="film__text">{text}</p>
                <div className={className}>
                  <p>{rating}</p>
                </div>
                <Rate
                  className="film__stars"
                  count={10}
                  value={starsTen[index]}
                />
              </div>
            </div>
          )
        }
      }
    </JenreConsumer>
  )
}

RatedFilm.propTypes = {
  title: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  stars: PropTypes.arrayOf(PropTypes.number),
  index: PropTypes.number,
}

RatedFilm.defaultProps = {
  title: '',
  release_date: '',
  genre_ids: [],
  overview: '',
  poster_path: '',
  vote_average: 0,
  stars: [],
  index: 0,
}

export default RatedFilm
