import { combineReducers } from 'redux'

import errorStore from './reducers/error'
import authStore from './reducers/auth'
import processStore from './reducers/process'
import processStore_V2 from './reducers/process_V2'

import courseStore from './reducers/course'
import graduationLevelStore from './reducers/graduationLevel'
import processAssignmentStore from './reducers/processAssignment'
import assignmentStore from './reducers/assignment'

export default combineReducers({
  errorStore: errorStore,
  authStore: authStore,
  processStore: processStore,
  processStore_V2: processStore_V2,
  courseStore: courseStore,
  graduationLevelStore: graduationLevelStore,
  processAssignmentStore: processAssignmentStore,
  assignmentStore: assignmentStore
})
