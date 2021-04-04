require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = async (request, response, next) => {
    const authorization = await request.get('Authorization')
    let token;
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
    } else {
        token = null
    }
    request.token = token

    next()
}

const userExtractor = async (request, response, next) => {

  const dec = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(dec.id)

    request.user = user
  

  next()
}



module.exports = {
  tokenExtractor,
  userExtractor
} 