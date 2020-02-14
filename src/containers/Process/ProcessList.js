import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess, getProcessFilters } from '../../store/actions/process'
import isEmpty from '../../utils/is-empty'

const ProcessList = props => {
  const { clearErrors, listProcess, getProcessFilters } = props
  const { filters } = props.processStore

  //componentDidMount
  useEffect(() => {
    clearErrors()
    listProcess()

    //Baixar os filtros apenas se não os tiver.
    if (isEmpty(filters)) {
      getProcessFilters()
    }
  }, [clearErrors, listProcess, getProcessFilters, filters])

  return (
    <div className="box">
      <p>Filtros</p>
      {filters.years
        ? filters.years.map(filter => {
            return <li key={filter.value}>{`${filter.label}`}</li>
          })
        : null}
      {filters.graduationLevels
        ? filters.graduationLevels.map(filter => {
            return <li key={filter.value}>{`${filter.label}`}</li>
          })
        : null}
      {filters.courses
        ? filters.courses.map(filter => {
            return <li key={filter.value}>{`${filter.label}`}</li>
          })
        : null}
      {filters.assignments
        ? filters.assignments.map(filter => {
            return <li key={filter.value}>{`${filter.label}`}</li>
          })
        : null}

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
  getProcessFilters
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessList)
