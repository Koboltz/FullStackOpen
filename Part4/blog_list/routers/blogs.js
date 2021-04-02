const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})

      response.json(blogs)
  })
  
blogsRouter.post('/', (request, response) => {
    request.body.likes = 0
    const blog = new Blog(request.body)
    if (blog.url === undefined || blog.title === undefined) {
      response.status(400).end()
    }
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => null)
 
  })

module.exports = blogsRouter