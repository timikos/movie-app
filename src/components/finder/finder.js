import { useEffect } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

import MapiService from '../../services/mapi-service'

function Finder ({ labelInput, setLabelInput, setFilms }) {
  const placeholder = 'Type to search...'
  const onLabelChange = (e) => {
    e.preventDefault()
    setLabelInput(e.target.value)
    _.debounce( () => {console.log("TYT")}, 1000)()
  }

  useEffect(() => {
    // MapiService(setFilms, () => {}, labelInput)

  }, [labelInput])

  return (
    <section className="finder__container">
      <form
        action=""
      >
        <Input
          value={labelInput}
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
