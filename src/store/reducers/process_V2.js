import _ from 'lodash'
import {
  LOADING_PROCESS_V2,
  CREATE_PROCESS_V2,
  READ_PROCESS_V2,
  UPDATE_PROCESS_V2,
  DELETE_PROCESS_V2,
  LIST_PROCESS_V2,
  GET_PROCESS_FILTERS_V2
} from '../actionTypes'

const initialState = {
  loading: false,
  filters: [],
  info: {},
  byId: {},
  allIds: []
}

const sortAllIdsByIdentifier = byId => (a, b) => {
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
  const newById = _.omit(state, id)
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
    case LOADING_PROCESS_V2:
      return { ...state, loading: true }
    case CREATE_PROCESS_V2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case READ_PROCESS_V2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case UPDATE_PROCESS_V2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case DELETE_PROCESS_V2:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case LIST_PROCESS_V2:
      newState = resetList(action.payload.Processes)
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByIdentifier(newState.byId)).sort(sortAllIdsByYear(newState.byId))
      }
    case GET_PROCESS_FILTERS_V2:
      return {
        ...state,
        filters: action.payload
      }
    default:
      return state
  }
}
