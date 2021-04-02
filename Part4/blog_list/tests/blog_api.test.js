
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/backend_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
require('express-async-errors')

beforeEach(async () => {

    
        

    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
    console.log('saved')
    


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

describe('new blog creations' , () => {
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
        
        const response = await api
            .post('/api/blogs')
            .send({
                author: 'bad request'
            })
            .expect(400)
    
    })
})
describe('blog deletions', () => {
    test('deletes blog with valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        console.log('blogs', blogsAtStart)
        const blogToDelete = blogsAtStart[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
     

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)
    
        const results = blogsAfterDelete.map(blog => blog.title)
        console.log('after', results)

        expect(results).not.toContain(blogToDelete)
    })

    test('returns 404 Not Found if id is invalid', async () => {
        await api
            .delete('/api/blogs/terribleid')
            .expect(404)
    })

})

describe('update a blog', () => {
    test('updates a blog in the database correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                ...blogToUpdate,
                likes: 101
            })
            .expect(200)

        const blogsAfterUpdate = await helper.blogsInDb()
        
        expect(blogsAfterUpdate).toContainEqual(response.body)

    })

    test('returns 404 Not Found if id is invalid', async () => {
        await api
            .put('/api/blogs/terribleid')
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})