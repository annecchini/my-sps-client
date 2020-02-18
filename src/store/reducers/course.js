import { LOADING_COURSE, CREATE_COURSE, READ_COURSE, UPDATE_COURSE, DELETE_COURSE, LIST_COURSE } from '../actionTypes'
import { compareByName } from '../../utils/compareBy'

const initialState = {
  loading: false,
  courses: []
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
        courses: [...state.courses, action.payload].sort(compareByName)
      }
    case READ_COURSE:
      return {
        ...state,
        loading: false,
        courses: [...state.courses.filter(filterRemoveIds([action.payload.id])), action.payload].sort(compareByName)
      }
    case UPDATE_COURSE:
      return {
        ...state,
        loading: false,
        courses: [...state.courses.filter(filterRemoveIds([action.payload.id])), action.payload].sort(compareByName)
      }
    case DELETE_COURSE:
      return {
        ...state,
        loading: false,
        courses: [...state.courses.filter(filterRemoveIds([action.payload.id]))].sort(compareByName)
      }
    case LIST_COURSE:
      return {
        ...state,
        loading: false,
        courses: action.payload
      }
    default:
      return state
  }
}
