import {
  LOADING_PROCESS,
  CREATE_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS
} from '../actionTypes'

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
        processes: action.payload.processes
      }
    default:
      return state
  }
}
