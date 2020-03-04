import _ from 'lodash'
import {
  LOADING_ASSIGNMENT,
  CREATE_ASSIGNMENT,
  READ_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  LIST_ASSIGNMENT
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
    case LOADING_ASSIGNMENT:
      return { ...state, loading: true }
    case CREATE_ASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case READ_ASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case UPDATE_ASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case DELETE_ASSIGNMENT:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case LIST_ASSIGNMENT:
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
