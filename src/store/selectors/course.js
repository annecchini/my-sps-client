import { createSelector } from 'reselect'

import { checkAccess } from '../../utils/permission-system-helpers'

export const selectCourses = (store, options = {}) => {
  let courses = store.courseStore.allIds.map(id => ({ ...store.courseStore.byId[id] }))

  if (options.withGraduationLevel === true) {
    courses = courses.map(co => ({ ...co, graduationLevel: store.graduationLevelStore.byId[co.graduationLevel_id] }))
  }

  return courses
}

export const selectCourseById = (store, id, options = {}) => {
  let course = store.courseStore.byId[id] ? { ...store.courseStore.byId[id] } : null

  if (course && options.withGraduationLevel === true) {
    course = { ...course, graduationLevel: store.graduationLevelStore.byId[course.graduationLevel_id] }
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

//Não importei a função do arquivo ./process por que tive problemas com a sequencia de load dos arquivos.
const selectProcessById_onCourse = (store, id, options = {}) => store.processStore.byId[id]
const selectCourses_onCourse = (store, id, options = {}) => selectCourses(store, options)
export const selectCourseByProcessIdV2 = createSelector(
  selectProcessById_onCourse,
  selectCourses_onCourse,
  (process, courses) => {
    return courses.find(x => x.id === process.course_id)
  }
)
