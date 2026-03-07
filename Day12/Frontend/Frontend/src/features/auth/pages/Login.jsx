import React from 'react'
import "../Styles/form.scss"
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div>
   <main>
    <div className="form-container">
        <h1>login</h1>
        <form >
            <input type="text" name="username" placeholder='enter usename'/>
            <input type="password" name="password" placeholder='Enter password'/>
            <button type='submit'>Login</button>
        </form>
        <p>Dont have an accoutn <Link className='toggleAuthForm' to="/register">Register</Link></p>
    </div>
   </main>
    </div>
  )
}

export default Login
