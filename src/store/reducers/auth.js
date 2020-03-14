import isEmpty from '../../utils/is-empty'

import { SET_CURRENT_USER, READ_PROFILE } from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  session: {},
  user: {},
  access: { isAdmin: false, UserRoles: [] }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        session: action.payload
      }
    case READ_PROFILE:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : {},
        access: action.payload.access ? action.payload.access : []
      }
    default:
      return state
  }
}
