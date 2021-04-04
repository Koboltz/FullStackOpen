
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/backend_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

require('express-async-errors')

beforeEach(async () => {

    await User.deleteMany({})
   // console.log('cleared')

    const userObjects = helper.initialUsers.map(user => new User(user))
    const promises = userObjects.map(user => user.save())
    await Promise.all(promises)
    //console.log('saved')

})

test('returns the correct amount of users in JSON format', async () => {
 //   console.log('Testing GET...')
    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
       
    
    expect(response.body).toHaveLength(helper.initialUsers.length)
})

describe('new user creations', () => {
    test('creates a new user and adds to database', async () => {
        const response = await api
            .post('/api/users')
            .send({
                    username: "TEST",
                    name:"TEST TEST",
                    password: "TEST"
                })
            .expect(201)
        
        const newUsers = await helper.usersInDb()

        const titles = newUsers.map(user => user.username)
        expect(titles).toContain('TEST')
    })

    test('returns 400 bad request if username is missing', async () => {
        await api
            .post('/api/users')
            .send({
                name: "hello",
                password: 'hello'
            })
            .expect(400)
    })

    test('returns 400 bad request if password is missing', async () => {
        await api
            .post('/api/users')
            .send({
                username: 'hello',
                name: "hello"
            })
            .expect(400)
    })

    test('returns 400 bad request if username is less than 3 characters', async () => {
        await api
            .post('/api/users')
            .send({
                username: 'he',
                name: "hello",
                password: 'hello'
            })
            .expect(400)
    })

    test('returns 400 bad request if password is less than 3 characters', async () => {
        await api
            .post('/api/users')
            .send({
                username: 'hello',
                name: "hello",
                password: 'he'
            })
            .expect(400)
        
    })


    test('returns 400 bad request if username already exists', async () => {

            await api
            .post('/api/users')
            .send({
                username: 'Koboltz',
                name: "hello",
                password: 'hello'
            })
            .expect(409)
            
        
    })
    
})

afterAll(() => {
    mongoose.connection.close(true)
})