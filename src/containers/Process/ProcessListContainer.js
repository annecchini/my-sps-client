import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess, getProcessFilters, setProcessFilters } from '../../store/actions/process'

import isEmpty from '../../utils/is-empty'
import { buildFilterStrings } from '../../utils/process-helpers'
import { selectProcesses } from '../../store/selectors/process'
import ProcessList from '../../components/Process/ProcessList'

const ProcessListContainer = props => {
  const { filters } = props.processStore

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(filters), withProcessAssignment: true })

    //Baixar os filtros apenas se não os tiver.
    if (isEmpty(filters)) {
      props.getProcessFilters()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changePage = (page, pageSize) => {
    props.listProcess({ page: page, limit: pageSize, ...buildFilterStrings(filters), withProcessAssignment: true })
  }

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
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters), withProcessAssignment: true })
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
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters), withProcessAssignment: true })
  }

  const allProps = {
    ...props,
    //filters
    filters: filters,
    tickFilter: tickFilter,
    clearFilters: clearFilters,
    //pagination
    changePage: changePage
  }

  return <ProcessList {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  authStore: state.authStore,
  errorStore: state.errorStore,
  processStore: state.processStore,
  info: state.processStore.info,
  processes: selectProcesses(state, { withCourse: true, withGraduationLevel: true, withAssignment: true })
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listProcess,
  getProcessFilters,
  setProcessFilters
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessListContainer)
