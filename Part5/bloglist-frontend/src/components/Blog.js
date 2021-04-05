import { useState } from 'react'
const Blog = ({blog}) => {
  const [allInfo, setAllInfo] = useState(false)
  const blogStyle = {
    padding: 10,
    border: "1px solid black",
    marginBottom: 3,
    borderRadius: 5
  }

  const handleLike = async () => {

  }

  const info = () => {
    return (
      <div>
        {blog.title} <button onClick={() => setAllInfo(false)}>hide</button><br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleLike}>like</button> <br />
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