import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

const initUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      blogService.setToken(parsedUser.token)
      dispatch({
        type: 'LOGIN',
        data: parsedUser
      })
    }
  }
}

const loginUser = (credentials) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(loggedUser)
    )
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'LOGIN',
      data: loggedUser
    })
  }
}

const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken('')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer
export { loginUser, initUser, logoutUser }