import { Pagination } from 'antd'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import RatedFilmsList from '../rated-films-list'

function RatedContainer({
  ratedFilms, stars,

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
        minValue={minValue}
        maxValue={maxValue}
      />
      {ratedFilms.length > 6
      && <Pagination
        className="pagination__container"
        defaultPageSize={6}
        defaultCurrent={1}
        total={ratedFilms.length}
        onChange={changePage}
      />}
    </>
  )
}

RatedContainer.propTypes = {
  ratedFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  })),
  stars: PropTypes.arrayOf(PropTypes.number),
}

RatedContainer.defaultProps = {
  ratedFilms: [],
  stars: [],
}

export default RatedContainer
