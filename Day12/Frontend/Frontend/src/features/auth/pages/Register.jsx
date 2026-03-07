import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
  return (
    <div>
      <main>
        <div className="form-container">
            <h1>Register</h1>
            <form >
                <input type="text" name="username" placeholder='Enter username' />
                <input type="text" name='email' placeholder='Enter email' />
                <input type="password" name='password' placeholder='Enter password' />
                <button>Register</button>
            </form>
            <p>Already have an account <Link className='toggleAuthForm' to="/login">Login</Link> </p>
        </div>
      </main>
    </div>
  )
}

export default Register
