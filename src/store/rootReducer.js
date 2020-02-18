import { combineReducers } from 'redux'

import errorStore from './reducers/error'
import authStore from './reducers/auth'
import processStore from './reducers/process'
import courseStore from './reducers/course'

export default combineReducers({
  errorStore: errorStore,
  authStore: authStore,
  processStore: processStore,
  courseStore: courseStore
})
