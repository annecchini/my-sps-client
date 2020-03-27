import { spsApi } from '../../utils/api-helpers'
import {
  READ_ERROR,
  LOADING_PROCESS,
  CREATE_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  GET_PROCESS_FILTERS
} from '../actionTypes'
import { readCourse } from './course'
import { listAddProcessAssignment } from './processAssigment'
import { convertIdArrayToString } from '../../utils/process-helpers'

//Process loading
export const setProcessLoading = () => {
  return {
    type: LOADING_PROCESS
  }
}

//create Process
export const createProcess = (processData, options = {}) => dispatch => {
  spsApi
    .post('/v1/process', processData)
    .then(res => {
      dispatch({ type: CREATE_PROCESS, payload: res.data })

      //run callbackOK
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//read Process
export const readProcess = (id, options = {}) => dispatch => {
  options.withCourse = 'withCourse' in options ? options.withCourse : true
  options.withGraduationLevel = 'withGraduationLevel' in options ? options.withGraduationLevel : true
  options.withProcessAssignment = 'withProcessAssignment' in options ? options.withProcessAssignment : false
  options.withAssignment = 'withAssignment' in options ? options.withAssignment : true

  dispatch(setProcessLoading())
  spsApi
    .get(`/v1/process/${id}`)
    .then(res => {
      dispatch({ type: READ_PROCESS, payload: res.data })

      //get course / graduationLevel
      if (options.withCourse === true)
        dispatch(readCourse(res.data.course_id, { withGraduationLevel: options.withGraduationLevel }))

      //get processAssignments / assignments
      if (options.withProcessAssignment === true) {
        const string_ids = convertIdArrayToString([res.data.id])
        dispatch(listAddProcessAssignment({ process_ids: string_ids, withAssignment: options.withAssignment }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//update Process
export const updateProcess = (id, processData, options = {}) => dispatch => {
  spsApi
    .put(`/v1/process/${id}`, processData)
    .then(res => {
      dispatch({ type: UPDATE_PROCESS, payload: res.data })

      //run callbackOK
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//delete Process
export const deleteProcess = (id, options = {}) => dispatch => {
  spsApi
    .delete(`/v1/process/${id}`)
    .then(res => {
      dispatch({ type: DELETE_PROCESS, payload: id })

      //run callbackOK
      if (options.callbackOk) options.callbackOk()
    })
    .catch(err => handleErrors(err, dispatch))
}

//get Process List
export const listProcess = (options = {}) => dispatch => {
  options.withCourse = 'withCourse' in options ? options.withCourse : true
  options.withGraduationLevel = 'withGraduationLevel' in options ? options.withGraduationLevel : true
  options.withProcessAssignment = 'withProcessAssignment' in options ? options.withProcessAssignment : false
  options.withAssignment = 'withAssignment' in options ? options.withAssignment : true

  let url = '/v1/process'

  //base parameters
  if (!options.page) options.page = 1
  url = url + `?page=${options.page}`

  if (!options.limit) options.limit = 10
  url = url + `&limit=${options.limit}`

  //filters
  if (options.years) url = url + `&years=${options.years}`
  if (options.courses) url = url + `&courses=${options.courses}`
  if (options.graduationLevels) url = url + `&graduationLevels=${options.graduationLevels}`
  if (options.assignments) url = url + `&assignments=${options.assignments}`

  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      dispatch({ type: LIST_PROCESS, payload: res.data })

      //get course for all processes
      if (options.withCourse === true) {
        const courseIds = [...new Set(res.data.Processes.map(pr => pr.course_id))]
        courseIds.map(courseId => {
          dispatch(readCourse(courseId, { withGraduationLevel: options.withGraduationLevel }))
          return null
        })
      }

      //get processAssignments for all process
      if (options.withProcessAssignment === true) {
        const process_ids = res.data.Processes.map(pr => pr.id)
        const string_ids = convertIdArrayToString(process_ids)
        const whereProcessIds = string_ids ? { process_ids: string_ids } : {}
        dispatch(listAddProcessAssignment({ ...whereProcessIds, withGraduationLevel: options.withGraduationLevel }))
      }
    })
    .catch(err => handleErrors(err, dispatch))
}

//get Process Filters
export const getProcessFilters = () => dispatch => {
  let url = '/v1/process/filters'
  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      //Build filters on right format
      const filters = res.data
      let indexes = Object.keys(filters)
      let state_filters = {}

      for (let index of indexes) {
        const filter = filters[index]
        let state_filter = []

        if (filter.length > 0) {
          state_filter = filter.map(item => {
            return { label: item.label, value: item.value, applied: false }
          })
        }

        state_filters[index] = state_filter
      }

      dispatch({ type: GET_PROCESS_FILTERS, payload: state_filters })
    })
    .catch(err => handleErrors(err, dispatch))
}

export const setProcessFilters = new_filters => dispatch => {
  dispatch({ type: GET_PROCESS_FILTERS, payload: new_filters })
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
