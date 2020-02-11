import { spsApi } from '../../utils/api-helpers'
import { READ_ERROR, LIST_PROCESS, LOADING_PROCESS } from '../actionTypes'

//Process loading
export const setProcessLoading = () => {
  return {
    type: LOADING_PROCESS
  }
}

//get Process List
export const listProcess = (options = {}) => dispatch => {
  let url = '/v1/selectiveprocesses'

  //base parameters
  if (!options.page) {
    options.page = 1
  }
  url = url + `?page=${options.page}`

  if (!options.limit) {
    options.limit = 10
  }
  url = url + `&limit=${options.limit}`

  //filters
  if (options.years) {
    url = url + `&years=${options.years}`
  }

  if (options.courses) {
    url = url + `&courses=${options.courses}`
  }

  if (options.graduationLevels) {
    url = url + `&graduationLevels=${options.graduationLevels}`
  }

  if (options.assignments) {
    url = url + `&assignments=${options.assignments}`
  }

  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res =>
      dispatch({
        type: LIST_PROCESS,
        payload: res.data
      })
    )
    .catch(err => err => handleErrors(err, dispatch))
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
