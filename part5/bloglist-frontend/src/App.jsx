import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setErrorMessage('Logged in')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="message">
        {message}
      </div>
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const generateUniqueId =() => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  const addBlog = async (newBlog) => {
    try {
      await blogService
        .create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage('Added new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Error! Check entries')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1
    }
    await blogService
      .update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
  }

  const deleteBlogs = (id) => {
    var blogsCopy = [...blogs.filter(b => b.id !== id)]
    setBlogs(blogsCopy)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
    {!user && loginForm()} 
    {user && <div>
       <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
         <BlogForm message={errorMessage} user={user} blogs={blogs} addBlog={addBlog}/>
        {sortedBlogs.map(blog =>
        <Blog key={blog.id || generateUniqueId()} blog={blog} likeBlog={likeBlog} user={user} deleteBlogs={deleteBlogs}/>
         )}
      </div>
      
    } 
    </div>
  )
}

export default App