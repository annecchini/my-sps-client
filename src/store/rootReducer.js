import { combineReducers } from 'redux'

import errorStore from './reducers/error'
import authStore from './reducers/auth'
import processStore from './reducers/process'

export default combineReducers({
  errorStore: errorStore,
  authStore: authStore,
  processStore: processStore
})
