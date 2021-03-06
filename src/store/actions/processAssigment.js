import { spsApi } from '../../utils/api-helpers'
import {
  LOADING_PROCESSASSIGNMENT,
  CREATE_PROCESSASSIGNMENT,
  READ_PROCESSASSIGNMENT,
  DELETE_PROCESSASSIGNMENT,
  LIST_ADD_PROCESSASSIGNMENT
} from '../actionTypes'
import { READ_ERROR } from '../actionTypes'
import { readAssignment } from './assignment'

//PROCESSASSIGNMENT loading
export const setProcessAssignmentLoading = () => {
  return {
    type: LOADING_PROCESSASSIGNMENT
  }
}

//create ProcessAssignment
export const createProcessAssignment = (createData, options = {}) => dispatch => {
  dispatch(setProcessAssignmentLoading())
  spsApi
    .post(`/v1/processassignment`, createData)
    .then(res => {
      dispatch({ type: CREATE_PROCESSASSIGNMENT, payload: res.data })
      //run callbackOK
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//read PROCESSASSIGNMENT
export const readProcessAssignment = (id, options = {}) => dispatch => {
  dispatch(setProcessAssignmentLoading())
  spsApi
    .get(`/v1/processassignment/${id}`)
    .then(res => {
      dispatch({ type: READ_PROCESSASSIGNMENT, payload: res.data })
    })
    .catch(err => handleErrors(err, dispatch))
}

//delete ProcessAssignment
export const deleteProcessAssignment = (id, options = {}) => dispatch => {
  dispatch(setProcessAssignmentLoading())
  spsApi
    .delete(`/v1/processassignment/${id}`)
    .then(res => {
      dispatch({ type: DELETE_PROCESSASSIGNMENT, payload: id })
      //run callbackOK
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//read PROCESSASSIGNMENT
export const listAddProcessAssignment = (options = {}) => dispatch => {
  options.withAssignment = 'withAssignment' in options ? options.withAssignment : true

  let url = `/v1/processassignment`
  if (options.process_ids) url = url + `?process_ids=${options.process_ids}`

  dispatch(setProcessAssignmentLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      dispatch({ type: LIST_ADD_PROCESSASSIGNMENT, payload: res.data })

      //load assigments related
      if (options.withAssignment === true) {
        const assignmentIds = [...new Set(res.data.map(pa => pa.assignment_id))]
        assignmentIds.map(assignmentId => {
          dispatch(readAssignment(assignmentId))
          return null
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
