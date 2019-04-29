export const UPDATE_MODAL_STATUS = 'modalStatus'
export const UPDATE_AUTH_STATUS = 'authStatus'


export function onUpdateModalStatus(status) {
  //console.log('General actions updateModalStatus:', status)
  return {
    type: UPDATE_MODAL_STATUS,
    payload: {
      status: status
    }
  }
}

export function onUpdateAuthStatus(status) {
  //console.log('General actions UPDATE_AUTH_STATUS:', status)
  return {
    type: UPDATE_AUTH_STATUS,
    payload: {
      status: status
    }
  }
}
