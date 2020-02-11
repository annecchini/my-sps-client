import { READ_ERROR, CLEAR_ERROR } from '../actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_ERROR:
      return action.payload
    case CLEAR_ERROR:
      return {}
    default:
      return state
  }
}
