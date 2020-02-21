import { spsApi } from '../../utils/api-helpers'
import { LOADING_COURSE, READ_COURSE, LIST_COURSE } from '../actionTypes'
import { READ_ERROR } from '../actionTypes'
import { readGraduationLevel } from '../actions/graduationLevel'

//course loading
export const setCourseLoading = () => {
  return {
    type: LOADING_COURSE
  }
}

//read course
export const readCourse = (id, options = {}) => dispatch => {
  const includeGraduationLevel = options.graduationLevel ? options.graduationLevel : true

  dispatch(setCourseLoading())
  spsApi
    .get(`/v1/course/${id}`)
    .then(res => {
      dispatch({
        type: READ_COURSE,
        payload: res.data
      })

      //include graduationLevel
      if (includeGraduationLevel) {
        dispatch(readGraduationLevel(res.data.graduationLevel_id))
      }
    })
    .catch(err => handleErrors(err, dispatch))
}

export const listCourse = (options = {}) => dispatch => {
  const includeGraduationLevels = options.graduationLevel ? options.graduationLevel : true
  dispatch(setCourseLoading())
  spsApi
    .get(`/v1/course`)
    .then(res => {
      dispatch({
        type: LIST_COURSE,
        payload: res.data
      })

      //include graduationLevel for each course
      if (includeGraduationLevels) {
        const graduationLevelIds = [...new Set(res.data.map(course => course.graduationLevel_id))]
        graduationLevelIds.map(graduationLevelId => {
          dispatch(readGraduationLevel(graduationLevelId))
        })
      }
    })
    .catch(err => handleErrors(err, dispatch))
}

const handleErrors = (err, dispatch) => {
  let errors = {}
  if (err.response) {
    errors.serverError = true
    errors.data = err.response.data
    dispatch({
      type: READ_ERROR,
      payload: errors
    })
  } else {
    errors.anotherError = true
    errors.data = err
    dispatch({
      type: READ_ERROR,
      payload: errors
    })
  }
}
