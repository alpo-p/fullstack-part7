import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG': {
    const changedId = action.data.id
    return state.map(b => b.id === changedId ? action.data : b)
  }
  case 'DELETE_BLOG': {
    const id = action.data
    return state.filter(b => b.id !== id)
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

const increaseLikes = (blogObject) => {
  return async (dispatch) => {
    const toBeUpdatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    const updatedBlog = await blogService.update(toBeUpdatedBlog._id, toBeUpdatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const addComment = (blogObject, comment) => {
  return async (dispatch) => {
    const updatedComments = [ ...blogObject.comments, comment ]
    const toBeUpdatedBlog = { ...blogObject, comments: updatedComments }
    const updatedBlog = await blogService.update(toBeUpdatedBlog._id, toBeUpdatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export default blogReducer
export { initBlogs, createBlog, increaseLikes, deleteBlog, addComment }