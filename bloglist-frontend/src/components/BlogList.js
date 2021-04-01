import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'

const BlogInAList = ({ blog }) => {
  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
    </tr>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <Table striped>
      <tbody>
        {blogs.map(blog =>
          <BlogInAList key={blog.id} blog={blog} />
        )}
      </tbody>
    </Table>
  )
}

export default BlogList