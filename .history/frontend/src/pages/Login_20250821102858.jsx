import React from 'react'

const Login = () => {
  return (
    <div>
      <h2>Employee Managemnt System</h2>
      <form action="">
        <h2>Login</h2>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
        </div>
      </form>
    </div>
  )
}

export default Login
