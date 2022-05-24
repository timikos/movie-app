import { useCallback } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './finder.css'
import MapiService from '../../services/mapi-service'

function Finder (
  {
    textInput, setTextInput,
    setFilms, setOnDebounced
  }
) {
  const placeholder = 'Type to search...'
  const newRequest = useCallback(_.debounce(value => {
    MapiService(setFilms, () => {}, value)
    setOnDebounced(false)
  }, 1000), [])

  const onLabelChange = (e) => {
    e.preventDefault()
    setFilms([])
    const valueInput = e.target.value
    setTextInput(e.target.value)
    valueInput !== '' ? newRequest(e.target.value) : setTextInput('')
    setOnDebounced(true)
  }

  return (
    <section className="finder__container">
      <form
        action=""
      >
        <Input
          value={textInput}
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
