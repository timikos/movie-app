import { useEffect, useState } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

import MapiService from '../../services/mapi-service'
// import _ from 'lodash'

function Finder ({ setFilms }) {
  const [label, setLabel] = useState('')
  const placeholder = 'Type to search...'
  const mapi = new MapiService()

  const onLabelChange = (e) => {
    e.preventDefault()
    setLabel(e.target.value)
  }
  useEffect(() => {
    setFilms([])
    mapi.getResourse(label)
      .then((res) => setFilms(res.results))
  }, [label])
  return (
    <section className="finder__container">
      <form
        action=""
      >
        <Input
          value={label}
          className="finder__input"
          placeholder={placeholder}
          onChange={onLabelChange}
        />
      </form>
    </section>
  )
}

Finder.propTypes = {
  setFilms: PropTypes.func,
}

Finder.defaultProps = {
  setFilms: () => {},
}

export default Finder
