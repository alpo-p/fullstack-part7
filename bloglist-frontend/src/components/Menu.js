import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import { logoutUser } from '../reducers/userReducer'
import { setNotification, setIsError } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import UserList from './UserList'
import UserPage from './UserPage'
import BlogPage from './BlogPage'
import userService from '../services/users'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logoutUser())
  }


  const blogForm = () => {
    const blogFormRef = useRef()
    const addBlog = (blogObject) => {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
        .then(() => {
          dispatch(setIsError(false))
          dispatch(setNotification(
            `a new blog ${blogObject.title} by ${blogObject.author} added`, 5
          ))
        })
    }

    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} userId={user.id}/>
      </Togglable>
    )
  }

  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    userService.getAll()
      .then(u => setUsers(u))
  }, [])

  const userMatch = useRouteMatch('/users/:id')
  const userToShow = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Notification />
      <div>
        <Link style={padding} to ='/blogs'>blogs</Link>
        <Link style={padding} to ='/users'>users</Link>
        <span>{ user.name } logged in </span>
        <Button onClick={handleLogout}>logout</Button>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <UserPage user={userToShow} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogPage blog={blogToShow} />
        </Route>
        <Route path='/blogs'>
          {blogForm()}
          <br />
          <BlogList />
        </Route>
        <Route path='/users'>
          <UserList users={users}/>
        </Route>
        <Route path='/'>
          {blogForm()}
          <br />
          <BlogList />
        </Route>
      </Switch>

    </div>
  )
}

export default Menu