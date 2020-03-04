import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearErrors } from '../../store/actions/error'
import { listProcess, getProcessFilters, setProcessFilters } from '../../store/actions/process'
import isEmpty from '../../utils/is-empty'
import { buildFilterStrings } from '../../utils/process-helpers'
import MultiSelectFilter from '../../components/MultiSelectFilter'
import { selectAssignmentById } from '../../store/selectors/assignment'
import { selectProcessAssignmentByProcessId } from '../../store/selectors/processAssignment'
import { selectCourseById } from '../../store/selectors/course'
import { selectGraduationLevelById } from '../../store/selectors/graduationLevel'

const ProcessList = props => {
  const { info, filters, processes } = props.processStore
  const { courseStore, graduationLevelStore, processAssignmentStore, assignmentStore } = props

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
    props.listProcess({ processAssignment: true })

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
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters), processAssignment: true })
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
    props.listProcess({ page: 1, limit: 10, ...buildFilterStrings(newFilters), processAssignment: true })
  }

  // const buildPager = (numberOfPages, currentPage, limit) => {}

  // const onChangePage = (page, pageSize) => {
  //   props.listProcess({ page: page, limit: pageSize, ...buildFilterStrings(filters) })
  // }

  return (
    <div className="box">
      <p>Novo Processo</p>
      <Link to="/process/create">Novo Processo</Link>

      <p>Filtros</p>
      <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
      <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
      <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
      <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
      <input type="button" value="Limpar" onClick={clearFilters} />

      <p>ProcessList</p>
      <ul className="list-group" style={{ diplay: 'table' }}>
        {processes.map(process => {
          const course = selectCourseById(courseStore, process.course_id)
          const graduationLevel = course
            ? selectGraduationLevelById(graduationLevelStore, course.graduationLevel_id)
            : null
          const processAssignments = selectProcessAssignmentByProcessId(processAssignmentStore, process.id)
          return (
            <li key={process.id} className="list-group-item">
              <p>{`${process.identifier}/${process.year}`}</p>
              <p>{graduationLevel ? graduationLevel.name : null}</p>
              <p>{course ? course.name : null}</p>
              <p>
                {processAssignments.length > 0
                  ? processAssignments.map(pa => {
                      const assignment = selectAssignmentById(assignmentStore, pa.assignment_id)
                      return assignment ? <span key={assignment.id}>{assignment.name}</span> : null
                    })
                  : 'Sem atribuições associadas'}
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
  processStore: state.processStore,
  courseStore: state.courseStore,
  graduationLevelStore: state.graduationLevelStore,
  processAssignmentStore: state.processAssignmentStore,
  assignmentStore: state.assignmentStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listProcess,
  getProcessFilters,
  setProcessFilters
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessList)
