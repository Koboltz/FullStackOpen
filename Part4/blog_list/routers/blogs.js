const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})

      response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    request.body.likes = 0
    const blog = new Blog(request.body)
    if (blog.url === undefined || blog.title === undefined) {
      response.status(400).end()
    }
  
   const res = await blog
      .save()
    
    response.status(201).json(res)
 
  })

blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id, (err) => {
    response.status(404)
  })
  
  response.status(204).end()

  
  
})

blogsRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true}, (err) => {
    response.status(404)
  })
  response.status(200).json(updated)
})

module.exports = blogsRouter