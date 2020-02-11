import { spsApi } from '../../utils/api-helpers'
import jwt_decode from 'jwt-decode'

import { READ_ERROR, SET_CURRENT_USER } from '../actionTypes'

//Login
export const loginUser = userData => dispatch => {
  spsApi
    .post('/v1/auth', userData)
    .then(res => {
      const { access_token } = res.data

      //Set token on local storage
      localStorage.setItem('token', access_token)

      //set token for axios to send requests with (Autorization = token) header
      spsApi.setToken(access_token)

      //decode token to get user data && dispatch action to set user
      const decoded = jwt_decode(access_token)

      dispatch(setCurrentUser(decoded))
    })
    .catch(err => handleErrors(err, dispatch))
}

//Set User on auth
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

const handleErrors = (err, dispatch, source) => {
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
