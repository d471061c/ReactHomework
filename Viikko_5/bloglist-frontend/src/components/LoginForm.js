import React from 'react'

const LoginForm = ({loginAction, username, password, handleInput}) => (
  <div>
    <h2> Log in to application </h2>
    <form onSubmit={loginAction}>
      <div>
        username:
        <input type="text"
              name="username"
              value={username}
              onChange={handleInput}/>
      </div>
      <div>
        password:
        <input type="password"
               name="password"
               value={password}
               onChange={handleInput}/>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

export default LoginForm