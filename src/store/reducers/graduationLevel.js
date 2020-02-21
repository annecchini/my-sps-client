import _ from 'lodash'
import {
  LOADING_GRADUATIONLEVEL,
  CREATE_GRADUATIONLEVEL,
  READ_GRADUATIONLEVEL,
  UPDATE_GRADUATIONLEVEL,
  DELETE_GRADUATIONLEVEL,
  LIST_GRADUATIONLEVEL
} from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const sortAllIdsByName = byId => (a, b) => {
  if (byId[a].name.toLowerCase() < byId[b].name.toLowerCase()) return -1
  if (byId[a].name.toLowerCase() > byId[b].name.toLowerCase()) return 1
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
    case LOADING_GRADUATIONLEVEL:
      return { ...state, loading: true }
    case CREATE_GRADUATIONLEVEL:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case READ_GRADUATIONLEVEL:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case UPDATE_GRADUATIONLEVEL:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case DELETE_GRADUATIONLEVEL:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case LIST_GRADUATIONLEVEL:
      newState = resetList(action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    default:
      return state
  }
}
