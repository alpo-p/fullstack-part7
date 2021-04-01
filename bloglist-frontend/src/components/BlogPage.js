import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { increaseLikes, addComment } from '../reducers/blogReducer'

const AddComment = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment(comment)
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          id='comment'
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant='primary' id='submit-comment' type='submit'>add comment</Button>
      </Form.Group>
    </Form>
  )
}

const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div>
      </div>
    )
  }
  return (
    <div>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

const BlogPage = ({ blog }) => {
  if (!blog)
    return <div></div>

  const [likes, setLikes] = useState(blog.likes)
  const [comments, setComments] = useState(blog.comments)

  const dispatch = useDispatch()

  const makeBlogObject = () => {
    return ({
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user,
      comments: blog.comments
    })
  }

  const updateLikes = () => {
    const blogObject = makeBlogObject()
    dispatch(increaseLikes(blogObject))
    setLikes(likes + 1)
  }

  const createComment = (comment) => {
    const blogObject = makeBlogObject()
    dispatch(addComment(blogObject, comment))
    setComments([...comments, comment])
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {likes} likes <Button onClick={updateLikes}>like</Button>
      <br />
      added by {blog.author}
      <br />
      <br />
      <strong>comments</strong>
      <AddComment createComment={createComment} />
      <Comments comments={comments}/>
    </div>
  )
}

export default BlogPage