import _ from 'lodash'
import {
  LOADING_PROCESSASSIGNMENT,
  CREATE_PROCESSASSIGNMENT,
  READ_PROCESSASSIGNMENT,
  UPDATE_PROCESSASSIGNMENT,
  DELETE_PROCESSASSIGNMENT,
  LIST_ADD_PROCESSASSIGNMENT
} from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
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

const putList = (state, list) => {
  const newById = { ...state.byId, ..._.mapKeys(list, 'id') }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

export default function(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOADING_PROCESSASSIGNMENT:
      return { ...state, loading: true }
    case CREATE_PROCESSASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds
      }
    case READ_PROCESSASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds
      }
    case UPDATE_PROCESSASSIGNMENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds
      }
    case DELETE_PROCESSASSIGNMENT:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds
      }
    case LIST_ADD_PROCESSASSIGNMENT:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds
      }
    default:
      return state
  }
}
