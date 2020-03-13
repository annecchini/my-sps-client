import _ from 'lodash'
import {
  LOADING_PROCESS,
  CREATE_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  GET_PROCESS_FILTERS
} from '../actionTypes'

const initialState = {
  loading: false,
  filters: [],
  info: {},
  byId: {},
  allIds: []
}

const sortAllIdsByIdentifier = byId => (a, b) => {
  console.log()
  if (byId[a].identifier.toLowerCase() > byId[b].identifier.toLowerCase()) return -1
  if (byId[a].identifier.toLowerCase() < byId[b].identifier.toLowerCase()) return 1
  return 0
}

const sortAllIdsByYear = byId => (a, b) => {
  if (byId[a].year.toLowerCase() < byId[b].year.toLowerCase()) return -1
  if (byId[a].year.toLowerCase() > byId[b].year.toLowerCase()) return 1
  return 0
}

const putItem = (state, payload) => {
  const newById = { ...state.byId, [payload.id]: payload }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

const removeItem = (state, id) => {
  const newById = _.omit(state.byId, id)
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

const resetList = newList => {
  const newById = { ..._.mapKeys(newList, 'id') }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

export default function(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOADING_PROCESS:
      return { ...state, loading: true }
    case CREATE_PROCESS:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case READ_PROCESS:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case UPDATE_PROCESS:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case DELETE_PROCESS:
      newState = removeItem(state, action.payload)
      console.log(newState)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case LIST_PROCESS:
      newState = resetList(action.payload.Processes)
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case GET_PROCESS_FILTERS:
      return {
        ...state,
        filters: action.payload
      }
    default:
      return state
  }
}
