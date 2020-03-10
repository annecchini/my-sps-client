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
  const {} = props

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
export default ProcessList
