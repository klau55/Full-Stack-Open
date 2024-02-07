import Togglable from './Togglable.jsx'
import blogService from '../services/blogs.js'



const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}



const Blog = ({ blog, likeBlog, user, deleteBlogs }) => {
  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService
      .remove(blog.id)
      deleteBlogs(blog.id)
    }
  }
  return (

<div style={blogStyle}>
  <p>{blog.title} by {blog.author}</p>
  <Togglable buttonLabel="view" buttonLabel2="hide">
    <p>url: {blog.url}</p>
    <p>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
    <p>creator: {blog.creator ? blog.creator : blog.user[0].name}</p>
    {user || user.username === blog.creator ? <button onClick={() => deleteBlog(blog)}>delete</button> : null}
  </Togglable>
</div>  
)

}
export default Blog