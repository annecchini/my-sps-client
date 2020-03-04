import jwt_decode from 'jwt-decode'

import { spsApi, setSpsApiToken } from '../../utils/api-helpers'
import { READ_ERROR, SET_CURRENT_USER } from '../actionTypes'

//Login
export const loginUser = (userData, callback_ok) => dispatch => {
  spsApi
    .post('/v1/auth', userData)
    .then(res => {
      const { access_token } = res.data

      //Set token on local storage
      localStorage.setItem('token', access_token)

      //set token for axios to send requests with (Autorization = token) header
      setSpsApiToken(access_token)

      //decode token to get user data && dispatch action to set user
      const decoded = jwt_decode(access_token)

      dispatch(setCurrentUser(decoded))
      callback_ok()
    })
    .catch(err => handleErrors(err, dispatch))
}

//Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token')
  setSpsApiToken()
  dispatch(setCurrentUser({}))
}

//Set User on auth
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
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
