import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return (
      <div></div>
    )
  }

  const blogs = user.blogs

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User