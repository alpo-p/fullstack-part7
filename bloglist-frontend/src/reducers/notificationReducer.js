const defaultState = {
  notification: '',
  isError: false
}

const notificationReducer = (state = defaultState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return { ...state, notification: action.notification }
  case 'SET_IS_ERROR':
    return { ...state, isError: action.isError }
  default:
    return state
  }
}

let timeoutID = null
const setNotification = (notification, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      notification: ''
    }), seconds * 1000)
  }
}

const setIsError = (isError) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_IS_ERROR',
      isError
    })
  }
}

export { setNotification, setIsError }
export default notificationReducer