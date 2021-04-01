import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  const isError = useSelector(state => state.notification.isError)

  if (notification === '') {
    return <div></div>
  }

  if (isError) {
    return (
      <Alert variant='danger'>
        {notification}
      </Alert>
    )
  }

  return (
    <Alert variant='success'>
      {notification}
    </Alert>
  )
}

export default Notification