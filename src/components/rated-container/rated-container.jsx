import { Pagination } from 'antd'
import { useState, useEffect } from 'react'

import RatedFilmsList from '../rated-films-list'

function RatedContainer({
  setRatedFilms, ratedFilms, stars
}) {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1)
  useEffect(() => {
    setMinValue(0)
    setMaxValue(6)
  }, [])

  const changePage = (page) => {
    setMinValue(() => (page - 1) * 6)
    setMaxValue(() => page * 6)
  }

  return (
    <>
      <RatedFilmsList
        stars={stars}
        ratedFilms={ratedFilms}
        setRatedFilms={setRatedFilms}
        minValue={minValue}
        maxValue={maxValue}
      />
      <Pagination
        className="pagination__container"
        defaultPageSize={6}
        defaultCurrent={1}
        total={ratedFilms.length}
        onChange={changePage}
      />
    </>
  )
}

export default RatedContainer
