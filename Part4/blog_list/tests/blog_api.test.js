
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/backend_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

require('express-async-errors')

beforeEach(async () => {
    await Blog.deleteMany({})
    //console.log('cleared')

    await User.deleteMany({})

    const password = await bcrypt.hash('test', 10)

    const user = new User({
        "username": "Koboltz",
        "name": "Test Tester",
        "passwordHash": password,
        "blogs": []
    })

    await user.save()


    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(async (blog) => {
        const user = await User.findOne({username: "Koboltz"})
        blog.user = user._id
        blog.save()
    
    })
   // console.log('blogs', await Blog.find({}))
    await Promise.all(promises)
   // console.log('saved')
    


})

test('blog returns the correct amount of blogs in JSON format', async () => {
  //  console.log('Testing GET...')
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
       
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog had a property called id', async () => {
   // console.log('Testing id property...')
    const response = await api
        .get('/api/blogs')
   
    expect(response.body[0].id).toBeDefined()
})

test('logging in returns a token', async () => {
    const authorized = await api
    .post('/api/login')
    .send({
        "username": "Koboltz",
        "password": "test"
    })
    .expect(200)
  
})

describe('new blog creations' , () => {
    test('blog creates a new blog and adds to database', async () => {
           const authorized = await api
                .post('/api/login')
                .send({
                    "username": "Koboltz",
                    "password": "test"
                })
                .expect(200)
            const token = JSON.parse(authorized.text).token
            
            const response = await api
                .post('/api/blogs')
                .auth(token, { type: 'bearer'})
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
        const authorized = await api
                .post('/api/login')
                .send({
                    "username": "Koboltz",
                    "password": "test"
                })
                .expect(200)
            const token = JSON.parse(authorized.text).token
    
        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer'})
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

        const authorized = await api
        .post('/api/login')
        .send({
            "username": "Koboltz",
            "password": "test"
        })
        .expect(200)
    const token = JSON.parse(authorized.text).token
        
        const response = await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer'})
            .send({
                author: 'bad request'
            })
            .expect(400)
    
    })
})
describe('blog deletions', () => {
    test('deletes blog with valid id', async () => {
        const authorized = await api
        .post('/api/login')
        .send({
            "username": "Koboltz",
            "password": "test"
        })
        .expect(200)
    const token = JSON.parse(authorized.text).token

        const blogsAtStart = await helper.blogsInDb()
        //console.log('blogs', blogsAtStart)
        const blogToDelete = blogsAtStart[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .auth(token, { type: 'bearer'})
            .expect(204)
     

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)
    
        const results = blogsAfterDelete.map(blog => blog.title)
       // console.log('after', results)

        expect(results).not.toContain(blogToDelete)
    })

    test('returns 404 Not Found if id is invalid', async () => {
        const authorized = await api
        .post('/api/login')
        .send({
            "username": "Koboltz",
            "password": "test"
        })
        .expect(200)
    const token = JSON.parse(authorized.text).token
        await api
            .delete('/api/blogs/terribleid')
            .auth(token, { type: 'bearer'})
            .expect(401)
    })

})

describe('update a blog', () => {
    test('updates a blog in the database correctly', async () => {

        const authorized = await api
        .post('/api/login')
        .send({
            "username": "Koboltz",
            "password": "test"
        })
        .expect(200)
    const token = JSON.parse(authorized.text).token

    await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer'})
    .send({
        title: 'TEST',
        author: 'tester',
        url: 'test@testing.com',
    })
    .expect(201)

    const blogToUpdate = await Blog.findOne({title: "TEST"})
  //  console.log(blogToUpdate)


        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .auth(token, { type: 'bearer'})
            .send({
                title: "NEWTEST",
                author: 'tester',
                url: 'test@testing.com'
            })
            .expect(200)

        
        expect(response.body.title).toContain("NEWTEST")

    })

    test('returns 404 Not Found if id is invalid', async () => {
        const authorized = await api
        .post('/api/login')
        .send({
            "username": "Koboltz",
            "password": "test"
        })
        .expect(200)
    const token = JSON.parse(authorized.text).token

        await api
            .put('/api/blogs/terribleid')
            .auth(token, { type: 'bearer'})
            .send({
                title: "NEWTEST",
                author: 'tester',
                url: 'test@testing.com'
            })
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})