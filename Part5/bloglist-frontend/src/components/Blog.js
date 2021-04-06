import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({blog}) => {
  const [allInfo, setAllInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    padding: 10,
    border: "1px solid black",
    marginBottom: 3,
    borderRadius: 5
  }

  const handleLike = async() => {
   console.log(blog.id)
    const toUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

   await blogsService.update(toUpdate, blog.id)
  setLikes(likes + 1)
    
    

  }

  const info = () => {
    return (
      <div>
        {blog.title} <button onClick={() => setAllInfo(false)}>hide</button><br />
        {blog.url} <br />
        likes: {likes} <button onClick={handleLike}>like</button> <br />
        {blog.author}
      </div>
    )
  }

  const basic = () => {
    return (
      <div>
        {blog.title} {blog.author} <button onClick={() => setAllInfo(true)}>view</button>
      </div>
    )
  }

 return (
  <div style={blogStyle}>
    {allInfo === false
    ? basic()
    : info()
    }
  </div>  
)
  }
export default Blog