import { checkAccess } from '../../utils/permission-system-helpers'

export const selectCourseById = (store, id, options = {}) => {
  const course = store.courseStore.byId[id] ? store.courseStore.byId[id] : null

  if (course && options.withGraduationLevel === true) {
    course.graduationLevel = store.graduationLevelStore.byId[course.graduationLevel_id]
      ? store.graduationLevelStore.byId[course.graduationLevel_id]
      : null
  }

  return course
}

export const selectCoursesByAccess = (store, options = {}) => {
  //Retorna nada se uma permissão não for dada
  if (!options.permission) return []

  // get courses where the user have the permission
  const allCourses = store.courseStore.allIds.map(id => store.courseStore.byId[id])
  const filtredCourses = allCourses
    .map(course => {
      const accessOk = checkAccess({
        access: store.authStore.access,
        permission: options.permission,
        course_id: course.id
      })
      if (accessOk) return course
      else return null
    })
    .filter(course => course !== null)

  return filtredCourses
}
