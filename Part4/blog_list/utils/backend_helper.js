const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
    }, 
    {
        "title": "myBlogtest2",
        "author": "koboltz456",
        "url": "myblogtest2.test.com",
        "likes": 123
     },
    {
        "title": "myBlogtest3",
        "author": "koboltz546",
        "url": "myblogtest3.test.com",
        "likes": 400
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}