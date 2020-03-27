import { selectProcessAssignmentByProcessId } from './processAssignment'
import { selectCourseById } from './course'

export const selectProcessById = (store, id, options = {}) => {
  let process = store.processStore.byId[id] ? { ...store.processStore.byId[id] } : null

  if (process && options.withCourse) {
    process = { ...process, course: selectCourseById(store, process.course_id, { withGraduationLevel: true }) }
  }

  if (process && options.withAssignment === true) {
    const processAssignments = selectProcessAssignmentByProcessId(store, process.id, { withAssignment: true })
    process = {
      ...process,
      assignments: processAssignments.map(pa => (pa.assignment ? pa.assignment : null)).filter(assig => assig !== null)
    }
  }

  return process
}

export const selectProcesses = (store, options = {}) => {
  const ids = store.processStore.allIds
  return ids.map(id => {
    let process = { ...store.processStore.byId[id] }

    if (options.withCourse === true) {
      process = { ...process, course: selectCourseById(store, process.course_id, { withGraduationLevel: true }) }
    }

    if (options.withAssignment === true) {
      const processAssignments = selectProcessAssignmentByProcessId(store, process.id, { withAssignment: true })
      process = {
        ...process,
        assignments: processAssignments
          .map(pa => (pa.assignment ? pa.assignment : null))
          .filter(assig => assig !== null)
      }
    }

    return process
  })
}
