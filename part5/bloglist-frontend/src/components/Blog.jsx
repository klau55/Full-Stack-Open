import Togglable from './Togglable.jsx'
import blogService from '../services/blogs.js'



const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => {

  return (

<div style={blogStyle}>
  <p>{blog.title} by {blog.author}</p>
  <Togglable buttonLabel="view" buttonLabel2="hide">
    <p>url: {blog.url}</p>
    <p>likes: {blog.likes} <button>like</button></p>
    <p>creator: {blog.user.name}</p>
  </Togglable>
</div>  
)

}
export default Blog