import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess, getProcessFilters, setProcessFilters } from '../../store/actions/process'
import isEmpty from '../../utils/is-empty'
import { buildFilterStrings } from '../../utils/process-helpers'
import MultiSelectFilter from '../../components/MultiSelectFilter'

const ProcessList = props => {
  const { info, filters, processes } = props.processStore

  const setPager = () => {
    let pager = []
    for (let i = 1; i <= info.numberOfPages; i++) {
      const active = i === info.currentPage ? '*' : null
      pager[i] = (
        <i key={i}>
          {i}
          {active}
        </i>
      )
    }
    return pager
  }
  const pager = setPager()

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

  const buildPager = (numberOfPages, currentPage, limit) => {}

  const onChangePage = (page, pageSize) => {
    props.listProcess({ page: page, limit: pageSize, ...buildFilterStrings(filters) })
  }

  return (
    <div className="box">
      <p>Filtros</p>
      <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
      <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
      <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
      <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
      <input type="button" value="Limpar" onClick={clearFilters} />

      <p>ProcessList</p>
      <ul>
        {processes.map(process => {
          return (
            <li key={process.id}>
              <p>{`${process.identifier}/${process.year}`}</p>
              <p>{graduationLevelStore.byId[courseStore.byId[process.course_id].graduationLevel_id].name}</p>
              <p>{courseStore.byId[process.course_id].name}</p>
              <p>
                {/* {processAssignments.byId.filter(pa=>pa.process_id === process.id).map(pa=>assignments.byId[pa.assignment_id])} */}
              </p>
            </li>
          )
        })}
      </ul>

      <p>Pagination</p>
      <ul>{pager}</ul>
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
