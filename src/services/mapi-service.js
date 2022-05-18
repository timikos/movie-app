// import { runInContext as _ } from 'lodash'

export default function MapiService(setOption, setError, query = 'a') {
  if (!query) return
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=a3d9e1626ef496ba66593f7546c2158c&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(jsonResponse => {
      setOption(jsonResponse.results)
    }).catch(() => setError(true))
}
