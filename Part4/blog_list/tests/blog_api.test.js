
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/backend_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {

    
        
    try {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
    console.log('saved')
    
    }
    catch (error){
        console.log(error)
    }

})

test('blog returns the correct amount of blogs in JSON format', async () => {
    console.log('Testing GET...')
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
       
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog had a property called id', async () => {
    console.log('Testing id property...')
    const response = await api
        .get('/api/blogs')
   
    expect(response.body[0].id).toBeDefined()
})

test('blog creates a new blog and adds to database', async () => {
        const response = await api
            .post('/api/blogs')
            .send({
                title: 'TEST',
                author: 'tester',
                url: 'test@testing.com',
            })
            .expect(201)
        const newBlogs = await helper.blogsInDb()

        expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1)

        const titles = newBlogs.map(b => b.title)
        expect(titles).toContain('TEST')
})
test('blog creates a new blog with default likes set to zero', async () => {
    const response = await api
        .post('/api/blogs')
        .send({
            title: 'TEST',
            author: 'tester',
            url: 'test@testing.com',
        })
        .expect(201)
    const newBlogs = await helper.blogsInDb()
    const createdNote = newBlogs.filter(blog => blog.title === 'TEST')[0].likes
    expect(createdNote).toBe(0)
})

test('blog returns 400 error if request body is missing title or url', async() => {
    
    try { const response = await api
        .post('/api/blogs')
        .send({
            author: 'bad request'
        })
        .expect(400)
    } catch(err) {
        console.log('error handled')
    }
})

afterAll(() => {
    mongoose.connection.close()
})