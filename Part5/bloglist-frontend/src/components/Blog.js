
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import blogsService from '../services/blogs'


const Blog = ({blog, fetchAll, user}) => {
    const [allInfo, setAllInfo] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const [owner, setOwner] = useState(false)
    const blogStyle = {
        padding: 10,
        border: '1px solid black',
        marginBottom: 3,
        borderRadius: 5
    }



    useEffect(() => {
        const ownerCheck = async () => { const blogOwner = await blogsService.verifyOwner(user.token)
        //console.log(blogOwner.id === blog.user.id)
            if (blogOwner.id === blog.user.id) {
                setOwner(true)
            } else {
                return null
            }
        }
        ownerCheck()
    }, [blog.user.id, user.token])

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

        fetchAll()
    }

    const handleDelete = async() => {
        if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            await blogsService.deleteBlog(blog.id)
            fetchAll()
        } else {
            return null
        }
    }
 
  
    const showDelete = owner === true ? {} :  {display: 'none'}

    const info = () => {
        return (
            <div>
                {blog.title} <button onClick={() => setAllInfo(false)}>hide</button><br />
                {blog.url} <br />
                likes: {likes} <button onClick={handleLike}>like</button> <br />
                {blog.author}
                <br />
                {blog.id}
                <br />
                <button onClick={handleDelete} style={showDelete}>Delete</button>
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

Blog.propTypes = {
    blog: PropTypes.shape({
        likes: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
    }),
    fetchAll: PropTypes.func.isRequired,
    user: PropTypes.shape({
        token: PropTypes.string
    })
}
export default Blog