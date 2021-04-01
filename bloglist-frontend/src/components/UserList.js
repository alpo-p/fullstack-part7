import React from 'react'
import { Link } from 'react-router-dom'

const UserInAList = ({ user }) => {
  const numberOfBlogsCreated = user.blogs.length
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{numberOfBlogsCreated}</td>
    </tr>
  )
}

const UserList = ({ users }) => {
  return (
    <div className='container'>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <UserInAList key={user.id} user={user} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList