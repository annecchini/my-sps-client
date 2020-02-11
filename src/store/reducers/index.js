import { combineReducers } from 'redux'

import errorStore from './error'
import authStore from './auth'

export default combineReducers({
  errorStore: errorStore,
  authStore: authStore
})
