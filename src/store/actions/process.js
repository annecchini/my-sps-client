import { spsApi } from '../../utils/api-helpers'
import { READ_ERROR, LIST_PROCESS, LOADING_PROCESS, GET_PROCESS_FILTERS } from '../actionTypes'

//Process loading
export const setProcessLoading = () => {
  return {
    type: LOADING_PROCESS
  }
}

//create Process
export const createProcess = (processData, callbackOk) => dispatch => {
  spsApi
    .post('/v1/process', processData)
    .then(res => {
      callbackOk()
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//get Process List
export const listProcess = (options = {}) => dispatch => {
  let url = '/v1/process'

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
    .then(res => {
      dispatch({
        type: LIST_PROCESS,
        payload: res.data
      })
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

      dispatch({
        type: GET_PROCESS_FILTERS,
        payload: state_filters
      })
    })
    .catch(err => {
      dispatch({
        type: READ_ERROR,
        payload: err.response.data
      })
    })
}

export const setProcessFilters = new_filters => dispatch => {
  dispatch({
    type: GET_PROCESS_FILTERS,
    payload: new_filters
  })
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
