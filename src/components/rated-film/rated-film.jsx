import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'

import Genre from '../genre'
import { JenreConsumer } from '../jenre-context'
import { RatedFilmsConsumer } from '../rated-films-context'
import { Rate } from 'antd'

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
            <RatedFilmsConsumer>
              {() => {
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
                      <Rate
                        count={10}
                        value={stars[index]}
                      />
                    </div>
                  </div>
                )
              }}
            </RatedFilmsConsumer>
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
}

RatedFilm.defaultProps = {
  title: '',
  release_date: '',
  genre_ids: [],
  overview: '',
  poster_path: '',
}

export default RatedFilm
