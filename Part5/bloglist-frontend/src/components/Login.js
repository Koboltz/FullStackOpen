
import PropTypes from 'prop-types'

const Login = ({handleLogin, username, setUsername, password, setPassword}) => {


    return (
        <div>
            <h1>Log in to the application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <br />
                    <h2>username: <br /></h2>
                    {
                    //debug: {username}
                    }
                    <input 
                        type='text'
                        value={username}
                        name='username'
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <h2>password: <br /></h2>
                    {
                    //debug: {password}
                    }
                    <input 
                        type='password'
                        value={password}
                        name='password'
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>  
    )}


Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
}


export default Login