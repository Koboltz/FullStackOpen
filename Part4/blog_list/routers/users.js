const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {

    const saltRounds = 10
    if (!req.body.password || req.body.password.length < 3) {
        res.status(400).end()
    }
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = {
        username: req.body.username,
        name: req.body.name,
        passwordHash
    }

    const user = new User(newUser)
    
    try {
    const response = await user.save()
      //console.log('response', response)
    res.status(201).json(response)
    } catch(err) {
       // console.log('err', err.message)
       if (err.message.includes('expected `username` to be unique')) {
           res.status(409).send({error: 'username already exists. It must be unique'})
       } else {
        res.status(400).send({error: 'Invalid user'})
       }
    }
  
  

})

usersRouter.post('/check', async (req, res) => {
    const response = jwt.verify(req.body.token, process.env.SECRET)
    res.send(response)
})





module.exports = usersRouter