import { LOADING_PROCESS, LIST_PROCESS, GET_PROCESS_FILTERS } from '../actionTypes'

const initialState = {
  loading: false,
  filters: [],
  info: {},
  processes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PROCESS:
      return {
        ...state,
        loading: true
      }
    case LIST_PROCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        processes: action.payload.Processes
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
