import { selectProcessAssignmentByProcessId_V2 } from './processAssignment'
import { selectCourseById_V2 } from './course'

export const selectProcesses = state => state.processStore.processes

export const selectProcesses_V2 = (store, options = {}) => {
  const ids = store.processStore_V2.allIds
  return ids.map(id => {
    const process = store.processStore_V2.byId[id]

    if (options.withCourse === true) {
      process.course = selectCourseById_V2(store, process.course_id, { withGraduationLevel: true })
    }

    if (options.withAssignment === true) {
      const processAssignments = selectProcessAssignmentByProcessId_V2(store, process.id, { withAssignment: true })
      process.assignments = processAssignments
        .map(pa => (pa.assignment ? pa.assignment : null))
        .filter(assig => assig !== null)
    }

    return process
  })
}
