import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess, getProcessFilters, setProcessFilters } from '../../store/actions/process'
import isEmpty from '../../utils/is-empty'
import { buildFilterStrings } from '../../utils/process-helpers'

const ProcessList = props => {
  const { filters } = props.processStore

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listProcess()

    //Baixar os filtros apenas se não os tiver.
    if (isEmpty(filters)) {
      props.getProcessFilters()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const tickFilter = (id, item) => e => {
    e.preventDefault()

    //Mark filter on object
    let list = JSON.parse(JSON.stringify(filters[id]))
    let registro = list.find(it => {
      return it.value === item
    })
    registro.applied = !registro.applied
    let newFilters = JSON.parse(JSON.stringify(filters))
    newFilters[id] = list

    props.setProcessFilters(newFilters)
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters) })
  }

  const clearFilters = e => {
    e.preventDefault()

    //let filters = this.state.filters;
    let newFilters = JSON.parse(JSON.stringify(filters))
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = newFilters[index]
      filter.map(item => {
        item.applied = false
        return null
      })
    }

    props.setProcessFilters(newFilters)
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters) })
  }

  return (
    <div className="box">
      <p>Filtros</p>
      <ul>
        {filters.years
          ? filters.years.map(filter => {
              return (
                <li key={filter.value}>
                  <label>
                    <input
                      type="checkbox"
                      name={filter.value}
                      checked={filter.applied}
                      onChange={tickFilter('years', filter.value)}
                    />{' '}
                    {filter.label}
                  </label>
                </li>
              )
            })
          : null}
      </ul>

      <ul>
        {filters.graduationLevels
          ? filters.graduationLevels.map(filter => {
              return (
                <li key={filter.value}>
                  <label>
                    <input type="checkbox" name={filter.value} checked={filter.marked} onChange={() => {}} />{' '}
                    {filter.label}
                  </label>
                </li>
              )
            })
          : null}
      </ul>

      <ul>
        {filters.courses
          ? filters.courses.map(filter => {
              return (
                <li key={filter.value}>
                  <label>
                    <input type="checkbox" name={filter.value} checked={filter.marked} onChange={() => {}} />{' '}
                    {filter.label}
                  </label>
                </li>
              )
            })
          : null}
      </ul>

      <ul>
        {filters.assignments
          ? filters.assignments.map(filter => {
              return (
                <li key={filter.value}>
                  <label>
                    <input type="checkbox" name={filter.value} checked={filter.marked} onChange={() => {}} />{' '}
                    {filter.label}
                  </label>
                </li>
              )
            })
          : null}
      </ul>

      <input type="button" value="Limpar" onClick={clearFilters} />

      <p>ProcessList</p>
      <ul>
        {props.processStore.processes.map(process => {
          return <li key={process.id}>{`${process.identifier}/${process.year}`}</li>
        })}
      </ul>
    </div>
  )
}

//Put store-data on props
const mapStateToProps = state => ({
  processStore: state.processStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listProcess,
  getProcessFilters,
  setProcessFilters
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessList)
