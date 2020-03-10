export const selectProcesses = state => state.processStore.processes

export const selectProcesses_V2 = (store, options = {}) => {
  const ids = store.processStore_V2.allIds
  return ids.map(id => {
    const process = store.processStore_V2.byId[id]

    if (options.withCourse === true) {
      process.course = store.courseStore.byId[process.course_id] ? store.courseStore.byId[process.course_id] : null

      if (process.course && options.withGraduationLevel === true) {
        process.course.graduationLevel = store.graduationLevelStore.byId[process.course.graduationLevel_id]
          ? store.graduationLevelStore.byId[process.course.graduationLevel_id]
          : null
      }
    }

    return process
  })
}
