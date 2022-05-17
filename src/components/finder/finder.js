import { useState } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

import MapiService from '../../services/mapi-service'

function Finder ({ setFilms }) {
  const [label, setLabel] = useState('')
  const placeholder = 'Type to search...'

  const inputLabel = (e) => {
    e.preventDefault()
    setLabel(e.target.value)
  }
  const mapi = new MapiService()
  const sub = (e) => {
    setFilms([])
    e.preventDefault()
    mapi.getResourse(label)
      .then((res) => {
        setFilms(res.results)
      })
  }

  return (
    <section className="finder__container">
      <form
        action=""
        onSubmit={sub}
      >
        <Input
          className="finder__input"
          placeholder={placeholder}
          onChange={inputLabel}
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
