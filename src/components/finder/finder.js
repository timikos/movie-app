import { useCallback } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

import MapiService from '../../services/mapi-service'

function Finder (
  {
    labelInput, setLabelInput, setFilms, setOnDebounced
  }
) {
  const placeholder = 'Type to search...'

  const newReq = useCallback(_.debounce(value => {
    MapiService(setFilms, () => {}, value)
    setOnDebounced(false)
  }, 1000), [])

  const onLabelChange = (e) => {
    e.preventDefault()
    setFilms([])
    const valueInput = e.target.value
    setLabelInput(e.target.value)
    valueInput !== '' ? newReq(e.target.value) : setLabelInput('')
    setOnDebounced(true)
  }

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
