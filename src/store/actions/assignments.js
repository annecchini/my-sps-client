import { spsApi } from '../../utils/api-helpers'
import { LOADING_ASSIGNMENT, READ_ASSIGNMENT } from '../actionTypes'
import { READ_ERROR } from '../actionTypes'

//ASSIGNMENT loading
export const setAssignmentLoading = () => {
  return {
    type: LOADING_ASSIGNMENT
  }
}

//read ASSIGNMENT
export const readAssignment = (id, options = {}) => dispatch => {
  dispatch(setAssignmentLoading())
  spsApi
    .get(`/v1/assignment/${id}`)
    .then(res => {
      dispatch({
        type: READ_ASSIGNMENT,
        payload: res.data
      })
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
