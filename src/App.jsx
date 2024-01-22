import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  useEffect(() => {
    blogService.getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const blogForm = () => (
    
    <form onSubmit={addBlog}>
      <a>Create new blog:</a>
          <input name="title" id="title"
            onChange={({ target }) => setNewTitle(target.value)} placeholder="title"/>
          <input name="author" id="author"
            onChange={({ target }) => setNewAuthor(target.value)} placeholder="author"/>
          <input name="url" id="url"
            onChange={({ target }) => setNewUrl(target.value)} placeholder="url"/>
      <button type="submit">create</button>
    </form>  
  )
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }
  const addBlog = async (target) => {

    target.preventDefault()
    const newBlog = {
      title:newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user,
      creator: user.name
    }
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
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const generateUniqueId =() => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  return (
    <div>
      <h2>blogs</h2>
    {!user && loginForm()} 
    {user && <div>
       <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
         {blogForm()}
            {blogs.map(blog =>
        <Blog key={blog.id || generateUniqueId()} blog={blog} />
      )}
      </div>
    } 
    </div>
  )
}

export default App