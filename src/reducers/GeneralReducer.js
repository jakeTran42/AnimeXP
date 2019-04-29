import { UPDATE_MODAL_STATUS, UPDATE_AUTH_STATUS } from '../actions/GeneralActions.js'
export default function generalReducer(state={}, { type, payload }) {
  //Cant use spread operator on state because babel is not working
  switch (type) {
    case UPDATE_MODAL_STATUS:
      //console.log("Update modal status reducer called: ", payload)
      return {
        ...state,
        modalStatus: payload.status
      }
    case UPDATE_AUTH_STATUS:
      return {
        ...state,
        authStatus: payload.status
      }
    default:
      return {...state};
  }
}
