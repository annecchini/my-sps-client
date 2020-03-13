export const selectCourseById = (store, id, options = {}) => {
  const course = store.courseStore.byId[id] ? store.courseStore.byId[id] : null

  if (course && options.withGraduationLevel === true) {
    course.graduationLevel = store.graduationLevelStore.byId[course.graduationLevel_id]
      ? store.graduationLevelStore.byId[course.graduationLevel_id]
      : null
  }

  return course
}
