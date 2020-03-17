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
  options.withCourse = options.withCourse ? options.withCourse : true
  options.withProcessAssignment = options.withProcessAssignment ? options.withProcessAssignment : false

  spsApi
    .get(`/v1/process/${id}`)
    .then(res => {
      dispatch({ type: READ_PROCESS, payload: res.data })

      //get course
      if (options.withCourse === true) dispatch(readCourse(res.data.course_id))

      //get processAssignments / assignments
      if (options.withProcessAssignment === true) dispatch(listAddProcessAssignment({ process_ids: [res.data.id] }))

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
  let url = '/v1/process'
  options.withCourse = options.withCourse ? options.withCourse : true
  options.withProcessAssignemnt = options.withProcessAssignemnt ? options.withProcessAssignemnt : false

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
      if (options.withCourse) {
        const courseIds = [...new Set(res.data.Processes.map(pr => pr.course_id))]
        courseIds.map(courseId => {
          dispatch(readCourse(courseId))
          return null
        })
      }

      //get processAssignments for all process
      if (options.withProcessAssignemnt) {
        const process_ids = res.data.Processes.map(pr => pr.id)
        const string_ids = convertIdArrayToString(process_ids)
        const options = string_ids ? { process_ids: string_ids } : {}
        dispatch(listAddProcessAssignment(options))
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
