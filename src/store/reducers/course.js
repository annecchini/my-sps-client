import _ from 'lodash'
import { LOADING_COURSE, CREATE_COURSE, READ_COURSE, UPDATE_COURSE, DELETE_COURSE, LIST_COURSE } from '../actionTypes'

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
    case LOADING_COURSE:
      return { ...state, loading: true }
    case CREATE_COURSE:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case READ_COURSE:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case UPDATE_COURSE:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case DELETE_COURSE:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByName(newState.byId))
      }
    case LIST_COURSE:
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
