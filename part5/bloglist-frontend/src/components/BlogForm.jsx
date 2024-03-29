import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'

const BlogForm = ({user, blogs, addBlog}) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const blogFormRef = useRef()


    const blogToAdd = async (target) => {

    target.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user,
      creator: user.name
    }
    addBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    document.getElementById('addBlogForm').reset()
    blogFormRef.current.toggleVisibility()
  }
  return (
    <div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}> 
    <form onSubmit={blogToAdd} id="addBlogForm">
      <a>Create new blog:</a>
          <input name="title" id="title"
            onChange={({ target }) => setNewTitle(target.value)} placeholder="title"/>
          <input name="author" id="author"
            onChange={({ target }) => setNewAuthor(target.value)} placeholder="author"/>
          <input name="url" id="url"
            onChange={({ target }) => setNewUrl(target.value)} placeholder="url"/>
      <button type="submit" id="submit-button">create</button>
    </form>  
    </Togglable>
  </div>
  )
  }
  export default BlogForm