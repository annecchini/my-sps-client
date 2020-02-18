import React from 'react'

const MultiSelectFilter = props => {
  const { id, filter, onTick } = props

  return (
    <ul>
      {filter
        ? filter.map(filter => {
            return (
              <li key={filter.value}>
                <label>
                  <input
                    type="checkbox"
                    name={filter.value}
                    checked={filter.applied}
                    onChange={onTick(id, filter.value)}
                  />{' '}
                  {filter.label}
                </label>
              </li>
            )
          })
        : null}
    </ul>
  )
}

export default MultiSelectFilter
