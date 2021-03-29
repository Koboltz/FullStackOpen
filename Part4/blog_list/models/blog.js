const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://testing:test@cluster0.nrqsm.mongodb.net/blog?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Unable to connect to database'))

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
