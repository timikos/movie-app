import { useState } from 'react'

const MapiService = () => {
  const [query, setQuery] = useState('return')
  const _apiBase = `https://api.themoviedb.org/3/search/movie?api_key=a3d9e1626ef496ba66593f7546c2158c&language=en-US&query=${query}&page=1&include_adult=false`

  async function getResourse() {
    const res = await fetch(`${_apiBase}`)

    if (!res.ok) {
      throw new Error(`NOT FETCH ${res.status}`)
    }
    return res.json()
  }

  async function getAllFilms() {
    const res = await getResourse()
    return res.results
  }

  const getFilm = (filmName) => getResourse(setQuery(filmName))

  return (
    getAllFilms().then((el) => {
      console.log(el)
      getFilm('test').then((el) => {
        console.log(el)
      })
    })
  )
}

export default MapiService
