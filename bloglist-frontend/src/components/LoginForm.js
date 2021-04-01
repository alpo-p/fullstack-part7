import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotification, setIsError } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import Notification from '../components/Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setIsError(true))
      dispatch(setNotification('invalid username or password', 5))
      setPassword('')
    }
  }

  return (
    <div className='container'>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' id='login-button' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm