import React, { useEffect,  } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser  } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  if (user === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <Router>
      <div className='container'>
        <h2>blogs</h2>
        <Menu />
      </div>
    </Router>
  )
}

export default App