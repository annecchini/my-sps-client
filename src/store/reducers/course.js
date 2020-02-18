import _ from 'lodash'

import { LOADING_COURSE, CREATE_COURSE, READ_COURSE, UPDATE_COURSE, DELETE_COURSE, LIST_COURSE } from '../actionTypes'
import { compareByName } from '../../utils/compareBy'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const filterRemoveIds = ids => value => {
  return !ids.includes(value.id)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_COURSE:
      return { ...state, loading: true }
    case CREATE_COURSE:
      return {
        ...state,
        loading: false,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: { ...state.byId, [action.payload.id]: action.payload }.sort(compareByName).map(x => x.id)
      }
    case READ_COURSE:
      return {
        ...state,
        loading: false,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: { ...state.byId, [action.payload.id]: action.payload }.sort(compareByName).map(x => x.id)
      }
    case UPDATE_COURSE:
      return {
        ...state,
        loading: false,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: { ...state.byId, [action.payload.id]: action.payload }.sort(compareByName).map(x => x.id)
      }
    case DELETE_COURSE:
      return {
        ...state,
        loading: false,
        byId: _.omit(state, action.payload),
        allIds: _.omit(state, action.payload).sort(compareByName).map(x => x.id) //prettier-ignore
      }
    case LIST_COURSE:
      return {
        ...state,
        loading: false,
        byId: { ...state, ..._.mapKeys(action.payload, 'id') },
        allIds: { ...state, ..._.mapKeys(action.payload, 'id') }.sort(compareByName).map(x => x.id)
      }
    default:
      return state
  }
}
