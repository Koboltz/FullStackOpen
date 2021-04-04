const { isValidObjectId } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200,
        "user": "123"

    }, 
    {
        "title": "myBlogtest2",
        "author": "koboltz456",
        "url": "myblogtest2.test.com",
        "likes": 123,
        "user": "123"
     },
    {
        "title": "myBlogtest3",
        "author": "koboltz546",
        "url": "myblogtest3.test.com",
        "likes": 400,
        "user": "123"
    }
]

const initialUsers = [
    {
        "username": "Koboltz",
        "name": "Test Tester",
        "_id": "123"
    },
    {
        "username": "Koboltz2",
        "name": "Test2 Tester2"
    },
    {
        "username": "Koboltz3",
        "name": "Test3 Tester3"
    },
]

const blogsInDb = async () => {
 
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    initialUsers,
    usersInDb
}