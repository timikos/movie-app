import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import * as PropTypes from 'prop-types'
import { Rate } from 'antd'

import Genre from '../genre'
import { JenreConsumer } from '../jenre-context'
import noImg from '../static/no-img.png'

import './film.css'

function Film({
  elem,
  title, release_date,
  genre_ids, overview,
  poster_path, vote_average,
  addOnRatedFilms, index
}) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const [value, setValue] = useState(0)
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
    overview ? setText(limitText(overview)) : setText('*No have information*')
    poster_path
      ? setImg(`https://image.tmdb.org/t/p/w500/${poster_path}`)
      : setImg(`${noImg}`)
    setRating(vote_average)
    setValue(JSON.parse(window.localStorage.getItem(`value${index}`)))
  }, [])
  useEffect(() => {
    window.localStorage.setItem(`value${index}`, value)
  }, [value])
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
                  value={value}
                  onChange={(value) => {
                    addOnRatedFilms(elem, value)
                    setValue(value)
                  }}
                />
              </div>
            </div>
          )
        }
      }
    </JenreConsumer>
  )
}

Film.propTypes = {
  elem: PropTypes.objectOf(PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  })),
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  addOnRatedFilms: PropTypes.func,
}

Film.defaultProps = {
  elem: {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  genre_ids: [],
  title: '',
  release_date: '',
  overview: '',
  poster_path: '',
  vote_average: 0,
  addOnRatedFilms: () => {},
}

export default Film
