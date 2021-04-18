
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import blogsService from '../services/blogs'


const Blog = ({blog, fetchAll, user, blogs, handleLike}) => {
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
       
            if (blogOwner.id === blog.user.id) {
                setOwner(true)
            } else {
                return null
            }
        }
        ownerCheck()
        
    }, [blog.user.id, user.token, blogs, owner])

    const handleNewLike = async() => {
        // console.log(blog.id)
        const toUpdate = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author, 
            title: blog.title,
            url: blog.url
        }
        try {
            setLikes(likes + 1)
            handleLike(toUpdate, blog.id)
        } catch (err) {
            return (<div>Unable to send a like</div>  )
        }
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
                likes: {likes} <button className='like-button' onClick={handleNewLike}>like</button> <br />
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
            <div className='basic'>
                {blog.title} {blog.author} <button className='show-info' onClick={() => setAllInfo(true)}>view</button>
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
        user:  PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        id: PropTypes.string,
    }),
    fetchAll: PropTypes.func,
    user: PropTypes.object,
    blogs: PropTypes.array
}
export default Blog