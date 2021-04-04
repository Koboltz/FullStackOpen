import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null



const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response)
  return response.data
}

const blogsService = {
  getAll,
  setToken,
  create
}

export default blogsService