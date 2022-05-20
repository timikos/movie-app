export default function JapiService(setOption, setError) {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a3d9e1626ef496ba66593f7546c2158c')
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      const genresObj = {}
      jsonResponse.genres.map(elem => {
        genresObj[elem.id] = elem.name
      })
      setOption(genresObj)
    }).catch(() => setError(true))
}
