const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./routers/blogs');
const mongoose = require('mongoose')
const config = require('./utils/config')


mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Unable to connect to database'))


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)



module.exports = app