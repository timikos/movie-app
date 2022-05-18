import { runInContext as _ } from 'lodash'
import { useEffect, useState } from 'react'

function MapiService() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function getResourse() {
      if (!query) return
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a3d9e1626ef496ba66593f7546c2158c&language=en-US&query=${query}&page=1&include_adult=false`)
      if (!response.ok) {
        throw new Error(`NOT FETCH ${response.status}`)
      }
      return response.json()
    }
    getResourse()
  }, [query])
}

// _.debounce()

export default MapiService
