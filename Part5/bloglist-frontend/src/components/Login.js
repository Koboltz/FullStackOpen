import React from 'react'

const Login = (props) => (
  <div>
    <h1>Log in to the application</h1>
    <form onSubmit={props.handleLogin}>
        <div>
            <br />
            <h2>username: <br /></h2>
            {
            //debug: {props.username}
            }
            <input 
            type='text'
            value={props.username}
            name='username'
            onChange={({target}) => props.setUsername(target.value)}
            />
        </div>
        <div>
            <h2>password: <br /></h2>
            {
            //debug: {props.password}
            }
            <input 
            type='password'
            value={props.password}
            name='password'
            onChange={({target}) => props.setPassword(target.value)}
            />
        </div>
        <br />
        <button type='submit'>Login</button>
    </form>
  </div>  
)

export default Login