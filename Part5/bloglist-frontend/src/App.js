import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const blogsList = () => {
    return (
      <div>
         <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleAddBlog={handleAddBlog} />
         <br />
        <h2>blogs</h2> 
          {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
          <button type='button' onClick={handleLogout}>Logout</button>
          <br />
         
      </div>

      )
  }

  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogsService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Logged in Successfully')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (err) {
      setMessage('wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessage('')
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    setMessage('Successfully logged out')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleAddBlog = async (event) => {
    try {
    event.preventDefault()
    blogsService.setToken(user.token)
   const response = await blogsService.create({
      title,
      author,
      url,
    })
    setMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(response))
    
  } catch (err) {
    setError(true)
    setMessage('Blog could not be added')
    setTimeout(() => {
      setError(false)
      setMessage('')
    })
  }
  }
  

  return (
    <div>
      <Notification error={error} message={message}/>
      {user === null
      ? <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      : (
      <div>
        <h1>Hello {user.name}!</h1>
      {blogsList()}
      </div>
      )}
    </div>
  )
}

export default App