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

  const blogsList = () => {
    return (
      <div>
         <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleAddBlog={handleAddBlog} />
         <br />
        <h2>blogs</h2> 
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
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
    } catch (err) {
      alert('invalid-login')
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    blogsService.setToken(user.token)
   const response = await blogsService.create({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(response))
  } 

  return (
    <div>
      <Notification />
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