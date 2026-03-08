import React, { useState } from 'react'
import "../Styles/form.scss"
import { Link } from 'react-router-dom'
import axios from "axios"
const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  function handleSubmit(e){
      e.preventDefault()

      axios.post("http://localhost:3000/api/auth/login",{
        username,
        password,
      },{withCredentials:true,})
      .then(res=>{
        console.log(res.data);
        
      })
  }
  return (
    <div>
   <main>
    <div className="form-container">
        <h1>login</h1>
        <form onSubmit={handleSubmit} >
            <input
              onInput={(e)=>{setusername(e.target.value)}}
            type="text" name="username" placeholder='enter usename'/>
            <input
             onInput={(e)=>{setpassword(e.target.value)}}
            type="password" name="password" placeholder='Enter password'/>
            <button type='submit'>Login</button>
        </form>
        <p>Dont have an accoutn <Link className='toggleAuthForm' to="/register">Register</Link></p>
    </div>
   </main>
    </div>
  )
}

export default Login
