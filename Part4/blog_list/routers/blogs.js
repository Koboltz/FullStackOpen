const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
require('express-async-errors')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user')
 

      response.json(blogs)
  })
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user

    if (!request.token) {
      return response.status(401).json({ error: 'missing token'})
    }
    
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0,
      user: user._id
    }
    const blog = new Blog(newBlog)

    if (blog.url === undefined || blog.title === undefined) {
      response.status(400).end()
    }
  
   const res = await blog
      .save()

    user.blogs = user.blogs.concat(res._id)
    await user.save()

    response.status(201).json(res)
 
  })



blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  try {
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === request.user._id.toString()) {
  

  await Blog.findByIdAndRemove(request.params.id, (err) => {
    if (err) {
    response.status(404)
    }
  })
  
  response.status(204).end()
}
} catch(err) {
    response.status(401).json({error: 'Unauthorised attempt'})
}

  
})

blogsRouter.put('/:id', async (request, response) => {
  
 try {
  const blog = await Blog.findById(request.params.id)
  
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    
    response.status(200).json(updated)



 } catch (err) {
   response.status(404).end()
 }
})

module.exports = blogsRouter 