import { spsApi } from '../../utils/api-helpers'
import { LOADING_PROCESSASSIGNMENT, READ_PROCESSASSIGNMENT, LIST_ADD_PROCESSASSIGNMENT } from '../actionTypes'
import { READ_ERROR } from '../actionTypes'
import { readAssignment } from './assignments'

//PROCESSASSIGNMENT loading
export const setProcessAssignmentLoading = () => {
  return {
    type: LOADING_PROCESSASSIGNMENT
  }
}

//read PROCESSASSIGNMENT
export const readProcessAssignment = (id, options = {}) => dispatch => {
  dispatch(setProcessAssignmentLoading())
  spsApi
    .get(`/v1/processassignment/${id}`)
    .then(res => {
      dispatch({
        type: READ_PROCESSASSIGNMENT,
        payload: res.data
      })
    })
    .catch(err => handleErrors(err, dispatch))
}

//read PROCESSASSIGNMENT
export const listAddProcessAssignment = (options = {}) => dispatch => {
  const includeAssignments = options.assignment ? options.assignment : true

  let url = `/v1/processassignment`

  if (options.process_ids) {
    url = url + `?process_ids=${options.process_ids}`
  }

  dispatch(setProcessAssignmentLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      dispatch({
        type: LIST_ADD_PROCESSASSIGNMENT,
        payload: res.data
      })

      //load assigments related
      if (includeAssignments) {
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
