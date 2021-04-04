import axios from 'axios'

const baseUrl = '/api/login'

const login = async (loginObj) => {
    

    const response = await axios
         .post(baseUrl, loginObj)
        
    return response.data
}

const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
}
const loginService = {
    login,
    logout
}
export default loginService