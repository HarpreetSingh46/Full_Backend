import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    async function   handleFormSubmit(e) {
      e.preventDefault()
    
    }
  return (
    <div>
      <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit} >
                <input 
                onInput={(e)=>{
                 setusername( e.target.value)
                }} type="text" name="username" placeholder='Enter username' />
                <input
                onInput={(e)=>{
                 setemail( e.target.value)
                }}  
                type="text" name='email' placeholder='Enter email' />
                <input onInput={(e)=>{
                 setpassword( e.target.value)
                }}  type="password" name='password' placeholder='Enter password' />
                <button>Register</button>
            </form>
            <p>Already have an account <Link className='toggleAuthForm' to="/login">Login</Link> </p>
        </div>
      </main>
    </div>
  )
}

export default Register
