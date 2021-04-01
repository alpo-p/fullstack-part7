import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog, userId }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: userId,
      comments: []
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='container'>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            id='title'
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            id='author'
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            id='url'
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant='primary' id='create-button' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
