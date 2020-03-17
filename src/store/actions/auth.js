import jwt_decode from 'jwt-decode'

import { spsApi, setSpsApiToken } from '../../utils/api-helpers'
import { READ_ERROR, SET_CURRENT_USER, CLEAR_PROFILE } from '../actionTypes'

//Login
export const loginUser = (userData, options = {}) => dispatch => {
  spsApi
    .post('/v1/auth', userData)
    .then(res => {
      const { access_token } = res.data

      //Set token on local storage
      localStorage.setItem('token', access_token)

      //decode token to get user data && dispatch action to set user
      const decoded = jwt_decode(access_token)

      dispatch(setCurrentUser(decoded))
      setSpsApiToken(access_token)
      dispatch(readProfile())

      //run callbackOk
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Set User on auth
export const setCurrentUser = decoded => {
  return { type: SET_CURRENT_USER, payload: decoded }
}

//Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token')
  setSpsApiToken()
  dispatch(setCurrentUser({}))
  dispatch(clearProfile())
}

//readProfile
export const readProfile = () => dispatch => {
  spsApi
    .get('/v1/auth/profile')
    .then(res => {
      dispatch({ type: 'READ_PROFILE', payload: res.data })
    })
    .catch(err => handleErrors(err, dispatch))
}

//clearProfile
export const clearProfile = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE, payload: {} })
}

export const updateProfileUser = (updateData, options = {}) => dispatch => {
  spsApi
    .put('/v1/auth/profile/user', updateData)
    .then(res => {
      dispatch({ type: 'READ_PROFILE_USER', payload: res.data })

      //run callbackOk
      if (options.callbackOk) options.callbackOk(res.data)
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
