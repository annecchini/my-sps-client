import { spsApi } from '../../utils/api-helpers'
import { LOADING_GRADUATIONLEVEL, READ_GRADUATIONLEVEL } from '../actionTypes'
import { READ_ERROR } from '../actionTypes'

//GRADUATIONLEVEL loading
export const setGraduationLevelLoading = () => {
  return {
    type: LOADING_GRADUATIONLEVEL
  }
}

//read GRADUATIONLEVEL
export const readGraduationLevel = (id, options = {}) => dispatch => {
  dispatch(setGraduationLevelLoading())
  spsApi
    .get(`/v1/graduationLevel/${id}`)
    .then(res => {
      dispatch({ type: READ_GRADUATIONLEVEL, payload: res.data })
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
