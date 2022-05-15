import './film.css'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

function Film({
  title, release_date,
  genre_ids, overview,
  poster_path
}) {
  const [img, setImg] = useState(null)
  const [name, setName] = useState(null)
  const [dateCreated, setDateCreated] = useState(null)
  const [tags, setTags] = useState(null)
  const [text, setText] = useState(null)

  useEffect(() => {
    setName(title)
    setDateCreated(format(parseISO(release_date), 'MMMM dd, yyyy'))
    setTags(genre_ids)
    setText(overview)
    setImg(poster_path)
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

export default Film
