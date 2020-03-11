import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess_V2, getProcessFilters_V2, setProcessFilters_V2 } from '../../store/actions/process_V2'

import isEmpty from '../../utils/is-empty'
import { buildFilterStrings } from '../../utils/process-helpers'
import { selectProcesses_V2 } from '../../store/selectors/process'
import ProcessListV2 from '../../components/Process/ProcessListV2'

const ProcessListContainerV2 = props => {
  const { filters } = props.processStore_V2

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listProcess_V2({ processAssignment: true })

    //Baixar os filtros apenas se não os tiver.
    if (isEmpty(filters)) {
      props.getProcessFilters_V2()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changePage = (page, pageSize) => {
    props.listProcess_V2({ page: page, limit: pageSize, ...buildFilterStrings(filters), processAssignment: true })
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

    props.setProcessFilters_V2(newFilters)
    props.listProcess_V2({ page: 1, limit: 10, ...buildFilterStrings(newFilters), processAssignment: true })
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

    props.setProcessFilters_V2(newFilters)
    props.listProcess_V2({ page: 1, limit: 10, ...buildFilterStrings(newFilters), processAssignment: true })
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

  return <ProcessListV2 {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  processStore_V2: state.processStore_V2,
  info: state.processStore_V2.info,
  processes_V2: selectProcesses_V2(state, { withCourse: true, withGraduationLevel: true, withAssignment: true })
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listProcess_V2,
  getProcessFilters_V2,
  setProcessFilters_V2
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessListContainerV2)
